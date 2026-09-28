import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { CANONICAL_REVIEWS } from "../../src/config/reviews";

async function scrollThroughPage(page: import("@playwright/test").Page) {
  return page.evaluate(async () => {
    const frameGaps: number[] = [];
    let previousFrame = performance.now();
    const step = Math.max(300, Math.floor(innerHeight * .75));
    for (let top = 0; top <= document.documentElement.scrollHeight; top += step) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const frame = performance.now();
      frameGaps.push(frame - previousFrame);
      previousFrame = frame;
      scrollTo(0, top);
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return {
      maxFrameGapMs: Math.max(...frameGaps),
      meanFrameGapMs: frameGaps.reduce((total, gap) => total + gap, 0) / frameGaps.length,
    };
  });
}

function resourceSummary(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const entries = [
      ...(performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]),
      ...(performance.getEntriesByType("resource") as PerformanceResourceTiming[]),
    ];
    return {
      count: entries.length,
      encodedBytes: entries.reduce((total, entry) => total + entry.encodedBodySize, 0),
      decodedBytes: entries.reduce((total, entry) => total + entry.decodedBodySize, 0),
      urls: entries.map((entry) => new URL(entry.name).pathname).sort(),
    };
  });
}

test("reviews page keeps the full customer words and useful opening navigation", async ({ page }) => {
  await page.goto("/reviews");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("figure blockquote")).toHaveCount(CANONICAL_REVIEWS.length);
  for (const review of CANONICAL_REVIEWS) {
    await expect(page.locator("figure blockquote").filter({ hasText: review.quote })).toHaveCount(1);
  }

  await page.getByRole("link", { name: "Start reading" }).click();
  await expect(page).toHaveURL(/#first-review$/);
  const sectionTop = await page.locator("#first-review").evaluate((section) => section.getBoundingClientRect().top);
  expect(sectionTop).toBeGreaterThan(90);
});

for (const width of [320, 390, 768, 1440]) {
  test(`reviews page keeps every quote readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/reviews");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      clippedQuotes: [...document.querySelectorAll("main figure")].filter((figure) => {
        const frame = figure.getBoundingClientRect();
        const quote = figure.querySelector("blockquote")!.getBoundingClientRect();
        return quote.left < frame.left - 2 || quote.right > frame.right + 2 || quote.bottom > frame.bottom + 2;
      }).length,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    expect(dimensions.clippedQuotes).toBe(0);
  });
}

test("reviews motion stops when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/reviews");
  const motion = await page.evaluate(() => ({
    vinyl: getComputedStyle(document.querySelector("[class*=recordArt]")!).animationName,
    waveform: getComputedStyle(document.querySelector("[class*=waveTrack]")!).animationName,
  }));
  expect(motion).toEqual({ vinyl: "none", waveform: "none" });
});

test("featured review controls remain keyboard-operable and clearly labelled", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/reviews");
  const secondCue = page.getByRole("button", { name: "Cue 2: review by Danielle Lafontaine" });
  await secondCue.scrollIntoViewIfNeeded();
  await secondCue.focus();
  await page.keyboard.press("Enter");
  await expect(secondCue).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Danielle Lafontaine", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read on Google (opens in a new tab)" })).toHaveAttribute("target", "_blank");

  const tapTargets = await page.locator("[class*=cueButton]").evaluateAll((buttons) => (
    buttons.map((button) => button.getBoundingClientRect().height)
  ));
  expect(tapTargets.every((height) => height >= 44)).toBe(true);
});

test("client-side navigation into Reviews remains clean", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog", { name: "Site menu" });
  await menu.getByRole("button", { name: "Weddings" }).click();
  await menu.locator('a[href="/reviews"]').click();
  await expect(page).toHaveURL(/\/reviews$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const) {
  test(`reviews production delivery remains intentional on ${viewport.name}`, async ({ browser }) => {
    const page = await browser.newPage({ viewport });
    await page.addInitScript(() => {
      const metrics = { cumulativeLayoutShift: 0, longTaskCount: 0, longTaskDurationMs: 0, lcpElement: "" };
      (window as unknown as Window & { __reviewsPerformance: typeof metrics }).__reviewsPerformance = metrics;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.longTaskCount += 1;
          metrics.longTaskDurationMs += entry.duration;
        }
      }).observe({ type: "longtask", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<PerformanceEntry & { hadRecentInput: boolean; value: number }>) {
          if (!entry.hadRecentInput) metrics.cumulativeLayoutShift += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const latest = list.getEntries().at(-1) as PerformanceEntry & { element?: Element };
        if (latest?.element) metrics.lcpElement = `${latest.element.tagName.toLowerCase()}.${latest.element.className}`;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];
    const routeRequests = new Set<string>();
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => failedRequests.push(request.url()));
    page.on("request", (request) => {
      const pathname = new URL(request.url()).pathname;
      if (!pathname.startsWith("/_next/") && !pathname.startsWith("/images/") && !pathname.startsWith("/fonts/") && pathname !== "/reviews") {
        routeRequests.add(pathname);
      }
    });

    const response = await page.goto("/reviews", { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    const initial = await resourceSummary(page);
    const rendering = await scrollThroughPage(page);
    await page.waitForTimeout(500);
    const afterScroll = await resourceSummary(page);
    const documentAudit = await page.evaluate(() => ({
      nodes: document.querySelectorAll("*").length,
      hiddenMeaningfulSections: [...document.querySelectorAll("main section")].filter((section) => {
        const style = getComputedStyle(section);
        return style.display === "none" || style.visibility === "hidden" || style.contentVisibility === "hidden";
      }).length,
    }));
    const runtimePerformance = await page.evaluate(() => (
      (window as unknown as Window & { __reviewsPerformance: {
        cumulativeLayoutShift: number;
        longTaskCount: number;
        longTaskDurationMs: number;
        lcpElement: string;
      } }).__reviewsPerformance
    ));

    console.log("REVIEWS_METRICS", JSON.stringify({ viewport: viewport.name, initial, afterScroll, rendering, runtimePerformance, documentAudit }));
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect(documentAudit.hiddenMeaningfulSections).toBe(0);
    expect(runtimePerformance.cumulativeLayoutShift).toBeLessThan(.1);
    expect(runtimePerformance.longTaskDurationMs).toBeLessThan(150);
    expect(runtimePerformance.lcpElement).toContain("img");
    expect(afterScroll.count).toBeLessThanOrEqual(42);
    expect([...routeRequests]).toEqual([]);
    await page.close();
  });
}

test("generated Reviews document stays inside its decorative-markup budget", () => {
  const html = readFileSync(".next/server/app/reviews.html", "utf8");
  expect(Buffer.byteLength(html)).toBeLessThanOrEqual(360_000);
  expect((html.match(/<path/g) ?? []).length).toBeLessThanOrEqual(50);
  expect(html).toContain('<link rel="canonical" href="https://www.howesounddj.com/reviews"/>');
  for (const review of CANONICAL_REVIEWS) expect(html).toContain(review.quote);
});

for (const width of [390, 1920, 2560]) {
  test(`dance-floor waveform loops without an empty gap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/reviews");
    const display = await page.evaluate(() => {
      const banner = document.querySelector<HTMLElement>("[class*=waveBanner]:not([class*=waveBannerHeader])")!;
      const viewport = banner.querySelector<HTMLElement>("[class*=waveViewport]")!;
      const track = viewport.querySelector<HTMLElement>("[class*=waveTrack]")!;
      const tiles = [...track.querySelectorAll("svg")];
      const animation = track.getAnimations()[0];
      const coveredAt = [0, 16900].map((time) => {
        animation.currentTime = time;
        const lane = viewport.getBoundingClientRect();
        const intervals = tiles.map((tile) => tile.getBoundingClientRect()).sort((a, b) => a.left - b.left);
        return intervals[0].left <= lane.left + 1 && intervals[0].right >= intervals[1].left - 1 && intervals[1].right >= lane.right - 1;
      });
      return {
        bannerWidth: banner.getBoundingClientRect().width,
        viewportWidth: document.documentElement.clientWidth,
        laneWidth: viewport.getBoundingClientRect().width,
        tileWidths: tiles.map((tile) => tile.getBoundingClientRect().width),
        coveredAt,
        animation: getComputedStyle(track).animationName,
        media: banner.querySelectorAll("img, video, canvas").length,
      };
    });
    expect(display.bannerWidth).toBeGreaterThanOrEqual(display.viewportWidth - 2);
    expect(display.tileWidths).toHaveLength(2);
    expect(display.tileWidths.every((tileWidth) => tileWidth >= display.laneWidth)).toBe(true);
    expect(display.coveredAt).toEqual([true, true]);
    expect(display.animation).not.toBe("none");
    expect(display.media).toBe(0);
  });
}
