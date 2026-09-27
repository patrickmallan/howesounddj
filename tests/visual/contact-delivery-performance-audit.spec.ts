import { expect, test, type Page } from "@playwright/test";

type ResourceSummary = {
  byType: Record<string, number>;
  largest: Array<{ bytes: number; name: string; type: string }>;
  totalEncodedBytes: number;
};

async function resourceSummary(page: Page): Promise<ResourceSummary> {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const entries = [...navigation, ...resources];
    const byType: Record<string, number> = {};
    let totalEncodedBytes = 0;
    for (const resource of entries) {
      const type = resource.entryType === "navigation" ? "document" : (resource as PerformanceResourceTiming).initiatorType || "other";
      byType[type] = (byType[type] ?? 0) + resource.encodedBodySize;
      totalEncodedBytes += resource.encodedBodySize;
    }
    return {
      byType,
      largest: entries
        .map((resource) => ({
          bytes: resource.encodedBodySize,
          name: new URL(resource.name).pathname,
          type: resource.entryType === "navigation" ? "document" : (resource as PerformanceResourceTiming).initiatorType || "other",
        }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 15),
      totalEncodedBytes,
    };
  });
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const) {
  test(`reports Contact delivery and scroll cost on ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    const requestedUrls: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => failedRequests.push(request.url()));
    page.on("request", (request) => requestedUrls.push(request.url()));

    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const initial = await resourceSummary(page);

    const sections = await page.locator("main section").all();
    for (const section of sections) {
      if (await section.isVisible()) await section.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(2500);
    const delivered = await resourceSummary(page);

    const animation = await page.evaluate(async () => {
      window.scrollTo(0, 0);
      const frameTimes: number[] = [];
      let previous = performance.now();
      const started = previous;
      const durationMs = 4000;
      const distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      await new Promise<void>((resolve) => {
        const frame = (now: number) => {
          frameTimes.push(now - previous);
          previous = now;
          const progress = Math.min(1, (now - started) / durationMs);
          window.scrollTo(0, distance * progress);
          if (progress < 1) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });
      const measured = frameTimes.slice(3).sort((a, b) => a - b);
      return {
        maxFrameMs: measured.at(-1) ?? 0,
        p95FrameMs: measured[Math.floor(measured.length * .95)] ?? 0,
        slowFrameRatio: measured.filter((time) => time > 25).length / measured.length,
      };
    });

    const metrics = { initial, delivered, animation, consoleErrors, failedRequests };
    console.log(`HSDJ_CONTACT_PERFORMANCE_${viewport.name.toUpperCase()}=${JSON.stringify(metrics)}`);
    expect(consoleErrors).toEqual([]);
    expect(requestedUrls.some((url) => url.includes("challenges.cloudflare.com/turnstile"))).toBe(false);
    expect(requestedUrls.some((url) => url.includes("hsdj-hero-montage-web-v1.mp4"))).toBe(false);
    expect(initial.totalEncodedBytes).toBeLessThanOrEqual(viewport.name === "mobile" ? 800_000 : 1_050_000);
    expect(delivered.totalEncodedBytes).toBeLessThanOrEqual(viewport.name === "mobile" ? 825_000 : 1_110_000);
    expect(animation.p95FrameMs).toBeLessThanOrEqual(24);
    expect(animation.slowFrameRatio).toBeLessThanOrEqual(.02);
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`keeps Contact content inside the ${width}px viewport`, async ({ page }, testInfo) => {
    const height = width <= 390 ? 844 : width === 768 ? 1024 : 900;
    await page.setViewportSize({ width, height });
    await page.goto("/contact", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);

    for (const heading of await page.locator("main h1, main h2").all()) {
      if (!(await heading.isVisible())) continue;
      const box = await heading.boundingBox();
      expect(box, await heading.textContent() ?? "heading").not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(-1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }

    await page.screenshot({ path: testInfo.outputPath(`contact-${width}.png`), fullPage: true });
  });
}

test("keeps the deferred Contact journeys functional", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("**/api/availability", async (route) => {
    const request = route.request();
    const body = request.postDataJSON() as { date: string };
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        result: "AVAILABLE",
        message: "Your date currently appears available. Submit an inquiry to continue.",
        date: body.date,
        journeyId: "contact-performance-regression",
      }),
    });
  });
  await page.route("**/api/availability-journey/event", (route) =>
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true }) }),
  );
  await page.goto("/contact");

  await page.getByLabel("Year (YYYY)").fill("2027");
  await page.getByLabel("Month (MM)").fill("09");
  await page.getByLabel("Day (DD)").fill("18");
  await page.getByRole("button", { name: "Check your date" }).click();
  await expect(page.getByText("Your wedding date is available.")).toBeVisible();

  await page.getByRole("button", { name: "Prefer email first?" }).click();
  await expect(page.getByLabel("Your name")).toBeVisible();

  await page.getByRole("button", { name: "Write a message" }).click();
  await expect(page.getByRole("button", { name: "Close message" })).toBeVisible();
  await expect(page.locator("#contact-message-form form")).toBeVisible();
});
