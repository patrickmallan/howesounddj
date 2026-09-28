import { expect, test } from "@playwright/test";
import { ACTIVE_VENUE_PAGES } from "../../src/config/venue-pages";
import { VENUE_HEADING_ART } from "../../src/config/venue-heading-art";

const viewports = [320, 390, 768, 1440] as const;

test("Every active venue has its own generated fixture artwork", () => {
  expect(Object.keys(VENUE_HEADING_ART).sort()).toEqual(ACTIVE_VENUE_PAGES.map((venue) => venue.slug).sort());
});

for (const slug of ["evans-lake", "capilano-university-squamish-campus", "railway-museum-of-british-columbia"]) {
  const venue = ACTIVE_VENUE_PAGES.find((candidate) => candidate.slug === slug)!;
  test(`${venue.name} retains content without JavaScript and through client navigation`, async ({ browser }) => {
    const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const noJsPage = await noJsContext.newPage();
      const response = await noJsPage.goto(`/venues/${slug}`);
      expect(response?.ok()).toBe(true);
      await expect(noJsPage.getByRole("heading", { level: 1 })).toHaveAccessibleName(`The room: ${venue.name}.`);
      await expect(noJsPage.locator(".venue-dossier-spread-copy p").first()).toBeVisible();
      await expect(noJsPage.getByRole("link", { name: /Visit the official venue site/ })).toHaveAttribute("href", venue.officialUrl);
      await expect(noJsPage.locator(".venue-dossier-date-cue")).toHaveAttribute("href", "/contact#availability");
    } finally {
      await noJsContext.close();
    }

    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    try {
      await page.goto("/venues");
      const link = page.locator(`a[href="/venues/${slug}"]`).first();
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/venues/${slug}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(`The room: ${venue.name}.`);
      await expect(page.locator(".venue-dossier-heading img")).toBeVisible();
    } finally {
      await page.close();
    }
  });
}

for (const venue of ACTIVE_VENUE_PAGES) {
  for (const width of viewports) {
    test(`${venue.name} is complete at ${width}px`, async ({ page, request, context }) => {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
      await page.addInitScript(() => {
        const metrics = { cumulativeLayoutShift: 0, longTaskCount: 0, longTaskDurationMs: 0 };
        (window as unknown as Window & { __venuePerformance: typeof metrics }).__venuePerformance = metrics;
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
      const errors: string[] = [];
      const failures: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("requestfailed", (failed) => failures.push(failed.url()));

      const route = `/venues/${venue.slug}`;
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(`The room: ${venue.name}.`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.howesounddj.com${route}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", venue.metaDescription);
      await expect(page.locator(".venue-dossier-overline").first()).toContainText(venue.locationLabel);
      await expect(page.locator(".venue-dossier-overline").first()).toContainText(venue.venueType);
      await expect(page.getByRole("link", { name: /Visit the official venue site/ })).toHaveAttribute("href", venue.officialUrl);
      await expect(page.getByRole("link", { name: /Visit the official venue site/ })).toHaveAttribute("target", "_blank");
      await expect(page.locator(".venue-dossier-spread-label")).toHaveCount(3);

      const initial = await page.evaluate(() => {
        const entries = [
          ...performance.getEntriesByType("navigation"),
          ...performance.getEntriesByType("resource"),
        ] as PerformanceResourceTiming[];
        const art = document.querySelector<HTMLImageElement>(".venue-dossier-heading img");
        return {
          bytes: entries.reduce((total, entry) => total + entry.encodedBodySize, 0),
          headingImageLoaded: Boolean(art?.complete && art.naturalWidth > 0),
          headingImageWidth: art?.getBoundingClientRect().width ?? 0,
          nodes: document.querySelectorAll("*").length,
          requests: entries.length,
        };
      });

      // Scroll as a visitor would, allowing in-view observers and route prefetch to fire.
      await page.evaluate(async () => {
        const step = Math.max(300, Math.floor(innerHeight * .8));
        for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
          scrollTo(0, top);
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
        scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(300);

      const afterScroll = await page.evaluate(() => {
        const entries = [
          ...performance.getEntriesByType("navigation"),
          ...performance.getEntriesByType("resource"),
        ] as PerformanceResourceTiming[];
        const textElements = [...document.querySelectorAll("main h1, main h2, main p, main a")];
        const outOfBounds = textElements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right, text: element.textContent?.trim().slice(0, 50) };
        }).filter((item) => item.left < -1 || item.right > innerWidth + 1);
        return {
          bytes: entries.reduce((total, entry) => total + entry.encodedBodySize, 0),
          documentWidth: document.documentElement.scrollWidth,
          outOfBounds,
          requests: entries.length,
          routeRequests: entries.map((entry) => new URL(entry.name).pathname)
            .filter((pathname) => !pathname.startsWith("/_next/") && !pathname.includes(".")),
          rendering: (window as unknown as Window & { __venuePerformance: {
            cumulativeLayoutShift: number;
            longTaskCount: number;
            longTaskDurationMs: number;
          } }).__venuePerformance,
          spreadCopyWidth: document.querySelector(".venue-dossier-spread-copy")?.getBoundingClientRect().width ?? 0,
          visibleLabels: [...document.querySelectorAll(".venue-dossier-spread-label")]
            .filter((label) => getComputedStyle(label).display !== "none").length,
          viewportWidth: document.documentElement.clientWidth,
        };
      });

      if (width === 390 || width === 1440) {
        console.log("VENUE_DETAIL_MATRIX", JSON.stringify({ slug: venue.slug, width, initial, afterScroll }));
      }
      expect(errors).toEqual([]);
      expect(failures).toEqual([]);
      expect(initial.headingImageLoaded).toBe(true);
      expect(initial.headingImageWidth).toBeGreaterThan(width < 800 ? 250 : 500);
      expect(initial.nodes).toBeLessThan(550);
      expect(initial.requests).toBeLessThan(32);
      expect(initial.bytes).toBeLessThan(480_000);
      expect(afterScroll.bytes).toBeLessThan(690_000);
      expect(afterScroll.documentWidth).toBeLessThanOrEqual(afterScroll.viewportWidth + 1);
      expect(afterScroll.outOfBounds).toEqual([]);
      expect(afterScroll.routeRequests).toEqual([route]);
      expect(afterScroll.rendering.cumulativeLayoutShift).toBeLessThan(.1);
      expect(afterScroll.rendering.longTaskDurationMs).toBeLessThan(250);
      expect(afterScroll.visibleLabels).toBe(3);
      expect(afterScroll.spreadCopyWidth).toBeGreaterThan(width < 800 ? 250 : 550);

      if (width === 390) {
        const breadcrumb = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
          scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
            .find((data) => data["@type"] === "BreadcrumbList")
        ));
        const service = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
          scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
            .find((data) => data["@type"] === "Service")
        ));
        expect(breadcrumb.itemListElement[2].name).toBe(venue.name);
        expect(breadcrumb.itemListElement[2].item).toBe(`https://www.howesounddj.com${route}`);
        expect(service.areaServed.name).toBe(venue.locationLabel);
        expect(service.audience.audienceType).toContain(venue.name);

        const cdp = await context.newCDPSession(page);
        await cdp.send("Accessibility.enable");
        const tree = await cdp.send("Accessibility.getFullAXTree");
        expect(tree.nodes.some((node) => node.name?.value === "The next cue is yours.")).toBe(true);

        for (const href of await page.locator('main a[href^="/"]').evaluateAll((links) => (
          [...new Set(links.map((link) => link.getAttribute("href") ?? ""))]
        ))) {
          expect((await request.get(href)).ok(), `${href} should resolve`).toBe(true);
        }
        const dateCue = page.locator(".venue-dossier-date-cue");
        const cueSize = await dateCue.evaluate((element) => element.getBoundingClientRect().toJSON());
        expect(cueSize.width).toBeGreaterThanOrEqual(44);
        expect(cueSize.height).toBeGreaterThanOrEqual(44);
        await dateCue.focus();
        expect(await dateCue.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/\/contact#availability$/);
      }
    });
  }
}
