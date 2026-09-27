import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844, maxInitialRequests: 35, maxInitialTransferBytes: 1_300_000 },
  { name: "desktop", width: 1440, height: 900, maxInitialRequests: 33, maxInitialTransferBytes: 1_550_000 },
] as const;

const deferredArtwork = [
  "cassette-bay-skin",
  "cassette-chassis-skin",
  "speaker-skin",
  "dancefloor-wave-collage",
  "read-room-dancefloor",
  "wedding-night-collage",
];

async function summarizeDelivery(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const entries = [...navigation, ...resources];
    return {
      decodedBytes: entries.reduce((total, entry) => total + entry.decodedBodySize, 0),
      nodes: document.querySelectorAll("*").length,
      requests: entries.length,
      transferBytes: entries.reduce((total, entry) => total + entry.transferSize, 0),
      urls: entries.map((entry) => new URL(entry.name).pathname).sort(),
    };
  });
}

async function naturallyScroll(page: Page) {
  return page.evaluate(async () => {
    const samples: number[] = [];
    const distance = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const durationMs = 5_000;
    const started = performance.now();
    let previous = started;

    await new Promise<void>((resolve) => {
      const frame = (now: number) => {
        samples.push(now - previous);
        previous = now;
        const progress = Math.min(1, (now - started) / durationMs);
        scrollTo(0, distance * progress);
        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

    const measured = samples.slice(3).sort((left, right) => left - right);
    return {
      maxFrameMs: measured.at(-1) ?? 0,
      p95FrameMs: measured[Math.floor(measured.length * .95)] ?? 0,
      slowFrameRatio: measured.filter((sample) => sample > 25).length / measured.length,
    };
  });
}

for (const viewport of viewports) {
  test(`Home production delivery remains intentional on ${viewport.name}`, async ({ browser }) => {
    test.setTimeout(120_000);
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    const pageErrors: string[] = [];
    const routeRequests = new Set<string>();

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      const browserStoppedBackgroundMedia = request.resourceType() === "media" && request.failure()?.errorText === "net::ERR_ABORTED";
      if (!browserStoppedBackgroundMedia) failedRequests.push(request.url());
    });
    page.on("request", (request) => {
      const url = new URL(request.url());
      const isLocal = url.hostname === "127.0.0.1" || url.hostname === "localhost";
      const isRouteLike = !url.pathname.split("/").at(-1)?.includes(".");
      if (isLocal && isRouteLike && !url.pathname.startsWith("/_next/") && !url.pathname.startsWith("/api/") && url.pathname !== "/") {
        routeRequests.add(url.pathname);
      }
    });

    await page.addInitScript(() => {
      const metrics = { cumulativeLayoutShift: 0, longTaskDurationMs: 0 };
      (window as unknown as Window & { __homePerformance: typeof metrics }).__homePerformance = metrics;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) metrics.longTaskDurationMs += entry.duration;
      }).observe({ type: "longtask", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<PerformanceEntry & { hadRecentInput: boolean; value: number }>) {
          if (!entry.hadRecentInput) metrics.cumulativeLayoutShift += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await page.waitForTimeout(750);
    const initial = await summarizeDelivery(page);
    const initialRoutes = [...routeRequests].sort();
    const scroll = await naturallyScroll(page);
    await page.waitForTimeout(1_000);
    const afterScroll = await summarizeDelivery(page);
    const runtime = await page.evaluate(() => (
      (window as unknown as Window & { __homePerformance: {
        cumulativeLayoutShift: number;
        longTaskDurationMs: number;
      } }).__homePerformance
    ));

    console.log("HOME_TIER_S_METRICS", JSON.stringify({
      viewport: viewport.name,
      initial,
      afterScroll,
      initialRoutes,
      routeRequests: [...routeRequests].sort(),
      runtime,
      scroll,
    }));

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect(initialRoutes).toEqual([]);
    expect([...routeRequests]).toEqual([]);
    expect(initial.requests).toBeLessThanOrEqual(viewport.maxInitialRequests);
    expect(initial.transferBytes).toBeLessThanOrEqual(viewport.maxInitialTransferBytes);
    expect(initial.urls.some((url) => deferredArtwork.some((asset) => url.includes(asset)))).toBe(false);
    expect(runtime.cumulativeLayoutShift).toBeLessThan(.1);
    expect(scroll.p95FrameMs).toBeLessThanOrEqual(24);
    expect(scroll.slowFrameRatio).toBeLessThanOrEqual(.02);
    if (viewport.name === "mobile") {
      expect(afterScroll.urls.some((url) => url.endsWith(".mp4"))).toBe(false);
    }

    await context.close();
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Home remains contained and readable at ${width}px`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await naturallyScroll(page);

    const layout = await page.evaluate(() => {
      const visible = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return bounds.width > 0 && bounds.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const outOfBoundsHeadings = [...document.querySelectorAll("main h1, main h2, main h3")]
        .filter(visible)
        .map((heading) => {
          const bounds = heading.getBoundingClientRect();
          return { left: bounds.left, right: bounds.right, text: heading.textContent?.trim() ?? "" };
        })
        .filter((heading) => heading.left < -1 || heading.right > innerWidth + 1);

      return {
        contentVisibilitySections: [...document.querySelectorAll("main section")]
          .filter((section) => getComputedStyle(section).contentVisibility !== "visible").length,
        h1Count: document.querySelectorAll("main h1").length,
        outOfBoundsHeadings,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      };
    });

    expect(layout.h1Count).toBe(1);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.outOfBoundsHeadings).toEqual([]);
    expect(layout.contentVisibilitySections).toBe(0);

    if (width === 390) {
      const cdp = await context.newCDPSession(page);
      const accessibility = await cdp.send("Accessibility.getFullAXTree");
      const accessibleNames = accessibility.nodes.map((node) => node.name?.value ?? "");
      expect(accessibleNames).toContain("The music changes throughout the day.");
      expect(accessibleNames).toContain("What couples said after the last song.");
    }
  });
}

test("Home keeps its primary interactions keyboard operable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const fader = page.getByRole("slider", { name: "Explore how the music changes through the wedding night" });
  await fader.scrollIntoViewIfNeeded();
  await fader.focus();
  await fader.press("Home");
  await expect(fader).toHaveValue("0");
  await fader.press("ArrowRight");
  await expect(fader).toHaveValue("1");

  const reviews = page.getByRole("slider", { name: "Choose a customer review" });
  await reviews.scrollIntoViewIfNeeded();
  await reviews.focus();
  await reviews.press("End");
  await expect(reviews).toHaveAttribute("aria-valuenow", await reviews.getAttribute("aria-valuemax") ?? "");
  await reviews.press("Home");
  await expect(reviews).toHaveAttribute("aria-valuenow", "1");
});
