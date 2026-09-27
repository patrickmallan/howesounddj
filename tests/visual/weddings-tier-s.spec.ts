import { expect, test, type Page } from "@playwright/test";

const route = "/weddings";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function resourceProfile(page: Page) {
  return page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const entries: Array<PerformanceResourceTiming | PerformanceNavigationTiming> = navigation
      ? [navigation, ...resources]
      : resources;
    const groups: Record<string, { count: number; decodedBytes: number; transferBytes: number }> = {};
    const urls = entries.map((resource) => {
      const url = new URL(resource.name);
      const extension = url.pathname.split(".").pop()?.toLowerCase();
      const type = resource.entryType === "navigation"
        ? "document"
        : resource.initiatorType === "img" || ["avif", "webp", "png", "jpg", "jpeg", "svg", "ico"].includes(extension ?? "")
        ? "image"
        : resource.initiatorType === "script" || extension === "js"
          ? "script"
          : resource.initiatorType === "css" || extension === "css"
            ? "style"
            : ["woff", "woff2"].includes(extension ?? "")
              ? "font"
              : resource.initiatorType;
      const group = groups[type] ?? { count: 0, decodedBytes: 0, transferBytes: 0 };
      group.count += 1;
      group.decodedBytes += resource.decodedBodySize;
      group.transferBytes += resource.transferSize;
      groups[type] = group;
      return {
        path: `${url.pathname}${url.search}`,
        type,
        decodedBytes: resource.decodedBodySize,
        transferBytes: resource.transferSize,
      };
    });

    return {
      groups,
      urls,
      nodes: document.querySelectorAll("*").length,
      resources: entries.length,
      totalDecodedBytes: entries.reduce((total, resource) => total + resource.decodedBodySize, 0),
      totalTransferBytes: entries.reduce((total, resource) => total + resource.transferSize, 0),
    };
  });
}

async function naturalScroll(page: Page) {
  return page.evaluate(async () => {
    const frameGaps: number[] = [];
    const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const steps = Math.max(24, Math.ceil(distance / 260));
    for (let step = 0; step <= steps; step += 1) {
      window.scrollTo(0, distance * (step / steps));
      const frameStarted = performance.now();
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const now = performance.now();
      frameGaps.push(now - frameStarted);
      await new Promise<void>((resolve) => setTimeout(resolve, 24));
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return {
      frames: frameGaps.length,
      maxFrameGapMs: Math.max(...frameGaps),
      meanFrameGapMs: frameGaps.reduce((sum, gap) => sum + gap, 0) / frameGaps.length,
    };
  });
}

for (const viewport of viewports) {
  test(`Overview production profile — ${viewport.name}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const metrics = {
        cls: 0,
        longTaskCount: 0,
        longTaskDurationMs: 0,
        lcp: 0,
        lcpElement: "",
        lcpUrl: "",
      };
      (window as unknown as Window & { __weddingsMetrics: typeof metrics }).__weddingsMetrics = metrics;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.longTaskCount += 1;
          metrics.longTaskDurationMs += entry.duration;
        }
      }).observe({ type: "longtask", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<PerformanceEntry & { hadRecentInput: boolean; value: number }>) {
          if (!entry.hadRecentInput) metrics.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entry = list.getEntries().at(-1) as PerformanceEntry & { element?: Element; url?: string };
        if (!entry) return;
        metrics.lcp = entry.startTime;
        metrics.lcpElement = entry.element?.tagName ?? "";
        metrics.lcpUrl = entry.url ? new URL(entry.url).pathname : "";
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
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));
    page.on("request", (request) => {
      const pathname = new URL(request.url()).pathname;
      if (!pathname.startsWith("/_next/") && !pathname.startsWith("/images/") && !pathname.startsWith("/fonts/") && pathname !== route) {
        routeRequests.add(pathname);
      }
    });

    // A bounded post-load settle is deterministic even when lazily mounted images
    // approach the viewport; networkidle is not a stable readiness signal here.
    const response = await page.goto(route, { waitUntil: "load" });
    expect(response?.ok()).toBe(true);
    await page.waitForTimeout(500);
    const initial = await resourceProfile(page);
    const initialRouteRequests = [...routeRequests].sort();
    const rendering = await naturalScroll(page);
    await page.waitForTimeout(800);
    const afterScroll = await resourceProfile(page);
    const metrics = await page.evaluate(() => (
      (window as unknown as Window & { __weddingsMetrics: unknown }).__weddingsMetrics
    ));

    console.log("WEDDINGS_METRICS", JSON.stringify({
      viewport: viewport.name,
      initial,
      afterScroll,
      initialRouteRequests,
      routeRequests: [...routeRequests].sort(),
      rendering,
      metrics,
      documentHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    }));

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect((metrics as { cls: number }).cls).toBeLessThan(.1);
    expect(initialRouteRequests).toEqual([]);
    expect(initial.nodes).toBeLessThanOrEqual(2_600);
    expect(initial.resources).toBeLessThanOrEqual(28);
    expect(initial.totalTransferBytes).toBeLessThanOrEqual(viewport.name === "mobile" ? 550_000 : 650_000);
    expect(afterScroll.totalTransferBytes).toBeLessThanOrEqual(viewport.name === "mobile" ? 800_000 : 950_000);
    for (const unrelated of ["/packages", "/reviews", "/venues", "/contact", "/stories"]) {
      expect(routeRequests.has(unrelated), `${unrelated} should wait for intentional navigation`).toBe(false);
    }
    await context.close();
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Overview remains contained and readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const beforeScroll = await page.evaluate(() => ({
      h1Count: document.querySelectorAll("main h1").length,
      headings: [...document.querySelectorAll("main h1, main h2, main h3")].map((heading) => heading.textContent?.replace(/\s+/g, " ").trim()),
      packageLinkText: document.querySelector('main a[href="/packages"]')?.textContent?.trim(),
    }));
    expect(beforeScroll.h1Count).toBe(1);
    expect(beforeScroll.headings).toContain("Wedding tidbits");
    expect(beforeScroll.packageLinkText).toContain("See packages");

    await naturalScroll(page);
    const audit = await page.evaluate(() => {
      const visible = (element: Element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const outOfBounds = [...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p, main a")]
        .filter(visible)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { text: element.textContent?.replace(/\s+/g, " ").trim(), left: rect.left, right: rect.right };
        })
        .filter((element) => element.left < -1 || element.right > innerWidth + 1);
      const actions = [...document.querySelectorAll<HTMLElement>("main a, main button")].filter(visible);
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        outOfBounds,
        undersizedActions: actions.filter((action) => {
          const rect = action.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        }).map((action) => action.textContent?.trim()),
      };
    });
    expect(audit.documentWidth).toBeLessThanOrEqual(audit.viewportWidth + 1);
    expect(audit.outOfBounds).toEqual([]);
    expect(audit.undersizedActions).toEqual([]);
  });
}

test("Overview respects reduced motion and package navigation", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(route);
  await expect(page.locator("main svg path").first()).toHaveCSS("animation-name", "none");
  const packageLink = page.locator('main a[href="/packages"]');
  await packageLink.scrollIntoViewIfNeeded();
  await packageLink.focus();
  await expect(packageLink).toBeFocused();
  await Promise.all([page.waitForURL("**/packages"), packageLink.press("Enter")]);
  await expect(page.locator("main h1")).toHaveCount(1);
  await context.close();
});

test("Overview artwork activates before each story card enters the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route, { waitUntil: "load" });
  const stages = page.locator("section[aria-labelledby='wedding-day-heading'] article");
  await expect(stages).toHaveCount(4);

  for (const stage of await stages.all()) {
    await stage.scrollIntoViewIfNeeded();
    const image = stage.locator("img");
    await expect(image).toHaveCount(1);
    await expect.poll(() => image.evaluate((element) => (
      (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0
    ))).toBe(true);
  }
});

test("Overview has crawlable metadata and direct HTML content", async ({ request }) => {
  const response = await request.get(route);
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain("<title>Squamish Wedding DJ | Music for the Whole Day");
  expect(html).toContain('rel="canonical" href="https://www.howesounddj.com/weddings"');
  expect(html).toContain("Wedding tidbits");
  expect(html).toContain('href="/packages"');
});
