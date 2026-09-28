import { expect, test, type Page } from "@playwright/test";

const guides = [
  {
    route: "/guides/how-to-choose-a-wedding-dj-in-squamish",
    title: "How to Choose a Wedding DJ in Squamish",
    lastHeading: "Check your date. If it is open, book a consult.",
    initialBudget: 750_000,
    totalBudget: 1_050_000,
  },
  {
    route: "/guides/how-to-keep-a-wedding-dance-floor-packed",
    title: "How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding",
    lastHeading: "Check your date. If it is open, book a consult.",
    initialBudget: 1_075_000,
    totalBudget: 1_375_000,
  },
] as const;

async function delivery(page: Page) {
  return page.evaluate(() => {
    const entries = [
      ...(performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]),
      ...(performance.getEntriesByType("resource") as PerformanceResourceTiming[]),
    ];
    return {
      bytes: entries.reduce((total, entry) => total + entry.encodedBodySize, 0),
      nodes: document.querySelectorAll("*").length,
      requests: entries.length,
      routeRequests: entries
        .map((entry) => new URL(entry.name).pathname)
        .filter((pathname) => !pathname.startsWith("/_next/") && !pathname.includes(".")),
    };
  });
}

async function scrollPage(page: Page) {
  await page.evaluate(async () => {
    const distance = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    for (let y = 0; y < distance; y += innerHeight * 0.8) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    scrollTo(0, distance);
  });
  await page.waitForTimeout(400);
}

for (const guide of guides) {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`${guide.title} delivery stays intentional on ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];
      const pageErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));

      const response = await page.goto(guide.route, { waitUntil: "networkidle" });
      expect(response?.ok()).toBe(true);
      const initial = await delivery(page);
      await scrollPage(page);
      const afterScroll = await delivery(page);
      console.log("GUIDE_ARTICLE_TIER_S_METRICS", JSON.stringify({ route: guide.route, viewport: viewport.name, initial, afterScroll }));

      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(initial.nodes).toBeLessThanOrEqual(600);
      expect(afterScroll.nodes).toBeLessThanOrEqual(900);
      expect(initial.bytes).toBeLessThanOrEqual(guide.initialBudget);
      expect(afterScroll.bytes).toBeLessThanOrEqual(guide.totalBudget);
      expect(initial.routeRequests).toEqual([guide.route]);
      expect(afterScroll.routeRequests).toEqual([guide.route]);
      await context.close();
    });
  }

  for (const width of [320, 390, 768, 1440]) {
    test(`${guide.title} remains contained and readable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
      const response = await page.goto(guide.route, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBe(true);
      await scrollPage(page);

      const audit = await page.evaluate(() => {
        const visible = (element: Element) => {
          const bounds = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return bounds.width > 0 && bounds.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        };
        const outOfBounds = [...document.querySelectorAll("main h1, main h2, main p, main li, main a")]
          .filter(visible)
          .map((element) => {
            const bounds = element.getBoundingClientRect();
            return { left: bounds.left, right: bounds.right, text: element.textContent?.trim().slice(0, 60) ?? "" };
          })
          .filter((item) => item.left < -1 || item.right > innerWidth + 1);
        const controls = [...document.querySelectorAll<HTMLElement>("main .hsdj-physical-cta")];
        return {
          contentVisibility: [...document.querySelectorAll<HTMLElement>("main section")]
            .filter((section) => getComputedStyle(section).contentVisibility === "auto").length,
          documentWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll("main h1").length,
          outOfBounds,
          undersizedControls: controls.filter((control) => {
            const bounds = control.getBoundingClientRect();
            return bounds.width < 44 || bounds.height < 44;
          }).map((control) => control.textContent?.trim()),
          viewportWidth: document.documentElement.clientWidth,
        };
      });

      expect(audit.h1Count).toBe(1);
      expect(audit.contentVisibility).toBe(0);
      expect(audit.documentWidth).toBeLessThanOrEqual(audit.viewportWidth + 1);
      expect(audit.outOfBounds).toEqual([]);
      expect(audit.undersizedControls).toEqual([]);
    });
  }

  test(`${guide.title} content, metadata, links, and reduced motion remain accessible`, async ({ page, request }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(guide.route, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: guide.title })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.howesounddj.com${guide.route}`);

    const finalHeading = page.getByRole("heading", { level: 2, name: guide.lastHeading });
    await expect(finalHeading).toHaveCount(1);
    await expect(finalHeading).toHaveAccessibleName(guide.lastHeading);
    const consultLink = page.getByRole("link", { name: /Book a consult/i });
    await expect(consultLink).toHaveCount(1);
    await expect(consultLink).toHaveAttribute("target", "_blank");
    await expect(consultLink).toHaveAttribute("rel", /noopener/);
    await expect(page.getByRole("link", { name: /Check your date/i })).toHaveCount(1);

    const internalHrefs = await page.locator("main a[href]").evaluateAll((links) => (
      [...new Set(links.map((link) => link.getAttribute("href") ?? ""))]
        .filter((href) => href.startsWith("/") && href !== "/go/consult")
    ));
    for (const href of internalHrefs) {
      const response = await request.get(href);
      expect(response.ok(), `${href} should resolve`).toBe(true);
    }

    const runningHeadings = await page.locator("main h2[data-letter-flash='running']").count();
    expect(runningHeadings).toBe(0);
    const articleJsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
      scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((value) => value["@type"] === "Article")
    ));
    expect(articleJsonLd.headline).toBe(guide.title);
  });
}

test("Both guide articles survive App Router navigation from the guides deck", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides");
  for (const guide of guides) {
    await page.goto("/guides");
    const link = page.locator(`a[href="${guide.route}"]`).first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${guide.route}$`));
    await expect(page.getByRole("heading", { level: 1, name: guide.title })).toBeVisible();
  }
});
