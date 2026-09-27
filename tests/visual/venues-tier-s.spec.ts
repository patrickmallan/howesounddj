import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

type ResourceSummary = {
  count: number;
  decodedBytes: number;
  transferBytes: number;
};

async function summarizeResources(page: Page) {
  return page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const groups: Record<string, ResourceSummary> = {};

    for (const resource of resources) {
      const pathname = new URL(resource.name).pathname;
      const extension = pathname.split(".").pop()?.toLowerCase();
      const type = resource.initiatorType === "img" || ["avif", "webp", "png", "jpg", "jpeg", "svg", "ico"].includes(extension ?? "")
        ? "image"
        : resource.initiatorType === "script" || extension === "js"
          ? "script"
          : resource.initiatorType === "css" || extension === "css"
            ? "style"
            : resource.initiatorType === "link" && ["woff", "woff2"].includes(extension ?? "")
              ? "font"
              : resource.initiatorType;
      const group = groups[type] ?? { count: 0, decodedBytes: 0, transferBytes: 0 };
      group.count += 1;
      group.decodedBytes += resource.decodedBodySize;
      group.transferBytes += resource.transferSize;
      groups[type] = group;
    }

    return {
      groups,
      nodes: document.querySelectorAll("*").length,
      resources: resources.length,
      totalDecodedBytes: resources.reduce((total, resource) => total + resource.decodedBodySize, 0),
      totalTransferBytes: resources.reduce((total, resource) => total + resource.transferSize, 0),
    };
  });
}

async function scrollThroughPage(page: Page) {
  const rendering = await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * .75));
    const startedAt = performance.now();
    let previousFrame = startedAt;
    const frameGaps: number[] = [];
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const frame = performance.now();
      frameGaps.push(frame - previousFrame);
      previousFrame = frame;
      window.scrollTo(0, top);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return {
      durationMs: performance.now() - startedAt,
      frames: frameGaps.length,
      maxFrameGapMs: Math.max(...frameGaps),
      meanFrameGapMs: frameGaps.reduce((total, gap) => total + gap, 0) / frameGaps.length,
    };
  });
  await page.waitForTimeout(500);
  return rendering;
}

for (const viewport of viewports) {
  test(`Venues production resource profile — ${viewport.name}`, async ({ browser }) => {
    const page = await browser.newPage({ viewport });
    await page.addInitScript(() => {
      const metrics = { cumulativeLayoutShift: 0, longTaskCount: 0, longTaskDurationMs: 0 };
      (window as unknown as Window & { __venuesPerformance: typeof metrics }).__venuesPerformance = metrics;
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
    });
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];
    const detailRequests = new Set<string>();
    const routeRequests = new Set<string>();

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));
    page.on("request", (request) => {
      const pathname = new URL(request.url()).pathname;
      if (/^\/venues\/[^/]+\/?$/.test(pathname)) detailRequests.add(pathname);
      if (!pathname.startsWith("/_next/") && pathname !== "/venues" && pathname !== "/venues/") {
        routeRequests.add(pathname);
      }
    });

    const response = await page.goto("/venues", { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    const initial = await summarizeResources(page);
    const initialDetailRoutes = [...detailRequests].sort();
    const initialRouteRequests = [...routeRequests].sort();
    const rendering = await scrollThroughPage(page);
    const afterScroll = await summarizeResources(page);
    const runtimePerformance = await page.evaluate(() => (
      (window as unknown as Window & { __venuesPerformance: {
        cumulativeLayoutShift: number;
        longTaskCount: number;
        longTaskDurationMs: number;
      } }).__venuesPerformance
    ));

    console.log("VENUES_METRICS", JSON.stringify({
      viewport: viewport.name,
      initial,
      afterScroll,
      initialDetailRoutesFetched: initialDetailRoutes,
      detailRoutesFetched: [...detailRequests].sort(),
      initialRouteRequests,
      routeRequests: [...routeRequests].sort(),
      rendering,
      runtimePerformance,
      documentHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    }));

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect(runtimePerformance.cumulativeLayoutShift).toBeLessThan(.1);
    expect(runtimePerformance.longTaskDurationMs).toBeLessThan(100);
    expect(afterScroll.resources).toBeLessThanOrEqual(40);
    expect(initialDetailRoutes).toEqual([]);
    expect([...detailRequests]).toEqual([]);
    for (const unrelatedRoute of ["/faq", "/guides", "/packages", "/reviews", "/stories", "/weddings"]) {
      expect(routeRequests.has(unrelatedRoute), `${unrelatedRoute} should wait for an intentional navigation`).toBe(false);
    }
    await page.close();
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Venues stays contained, readable, and operable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));

    const response = await page.goto("/venues", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await scrollThroughPage(page);

    const audit = await page.evaluate(() => {
      const visible = (element: Element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const headings = [...document.querySelectorAll("main h1, main h2, main h3")].filter(visible);
      const outOfBoundsHeadings = headings.map((heading) => {
        const rect = heading.getBoundingClientRect();
        return { left: rect.left, right: rect.right, text: heading.textContent?.trim() ?? "" };
      }).filter((heading) => heading.left < -1 || heading.right > innerWidth + 1);
      const actions = [...document.querySelectorAll<HTMLElement>(".venue-route-actions a")];

      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        h1Count: document.querySelectorAll("main h1").length,
        itemCount: document.querySelectorAll(".venue-route-stop").length,
        outOfBoundsHeadings,
        undersizedActions: actions.filter((action) => action.getBoundingClientRect().height < 43).map((action) => action.textContent?.trim()),
        unusedLedAttributes: document.querySelectorAll("[data-led]").length,
        stopVisibility: actions.length > 0 && getComputedStyle(document.querySelector(".venue-route-stop")!).contentVisibility,
      };
    });

    expect(audit.h1Count).toBe(1);
    expect(audit.itemCount).toBe(13);
    expect(audit.documentWidth).toBeLessThanOrEqual(audit.viewportWidth + 1);
    expect(audit.outOfBoundsHeadings).toEqual([]);
    expect(audit.undersizedActions).toEqual([]);
    expect(audit.unusedLedAttributes).toBe(0);
    expect(audit.stopVisibility).toBe("visible");
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
}

test("Venues directory retains crawlable structured data and working navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/venues");

  const itemList = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
    scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
      .find((value) => value["@type"] === "ItemList")
  ));
  expect(itemList.numberOfItems).toBe(13);
  expect(itemList.itemListElement).toHaveLength(13);

  const firstVenueLink = page.locator('.venue-route-stop h3 a[href^="/venues/"]').first();
  await firstVenueLink.scrollIntoViewIfNeeded();
  await firstVenueLink.focus();
  expect(await firstVenueLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await firstVenueLink.click();
  await expect(page).toHaveURL(/\/venues\/[^/]+$/);
  await expect(page.locator("main h1")).toHaveCount(1);
});
