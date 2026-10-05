import { expect, test, type Page } from "@playwright/test";

const stories = [
  {
    route: "/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like",
    title: "What a Sea to Sky Gondola Dance Floor Feels Like",
    lastHeading: "If this atmosphere sounds like your day",
    initialBudget: 950_000,
    totalBudget: 1_200_000,
  },
  {
    route: "/stories/what-a-sunwolf-riverside-wedding-reception-feels-like",
    title: "What a Sunwolf Riverside Wedding Reception Feels Like",
    lastHeading: "If this pacing sounds like your day",
    initialBudget: 850_000,
    totalBudget: 1_150_000,
  },
  {
    route: "/stories/sea-to-sky-wedding-dance-floor-energy",
    title: "What a Packed Sea-to-Sky Wedding Dance Floor Feels Like",
    lastHeading: "See if your day fits this shape",
    initialBudget: 1_000_000,
    totalBudget: 1_300_000,
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
      uses: document.querySelectorAll("use").length,
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

for (const story of stories) {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`${story.title} delivery stays intentional on ${viewport.name}`, async ({ browser }) => {
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

      const response = await page.goto(story.route, { waitUntil: "networkidle" });
      expect(response?.ok()).toBe(true);
      const initial = await delivery(page);
      await scrollPage(page);
      const afterScroll = await delivery(page);
      console.log("STORY_ARTICLE_TIER_S_METRICS", JSON.stringify({ route: story.route, viewport: viewport.name, initial, afterScroll }));

      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(initial.nodes).toBeLessThanOrEqual(650);
      expect(afterScroll.nodes).toBeLessThanOrEqual(950);
      expect(initial.uses).toBe(0);
      expect(initial.bytes).toBeLessThanOrEqual(story.initialBudget);
      expect(afterScroll.bytes).toBeLessThanOrEqual(story.totalBudget);
      expect(initial.routeRequests).toEqual([story.route]);
      expect(afterScroll.routeRequests).toEqual([story.route]);
      await context.close();
    });
  }

  for (const width of [320, 390, 768, 1440]) {
    test(`${story.title} remains contained and readable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
      const response = await page.goto(story.route, { waitUntil: "domcontentloaded" });
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

  test(`${story.title} content, metadata, links, and reduced motion remain accessible`, async ({ page, context, request }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(story.route, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: story.title })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.howesounddj.com${story.route}`);

    const finalHeading = page.getByRole("heading", { level: 2, name: story.lastHeading });
    await expect(finalHeading).toHaveCount(1);
    await expect(finalHeading).toHaveAccessibleName(story.lastHeading);
    const cdp = await context.newCDPSession(page);
    await cdp.send("Accessibility.enable");
    const accessibility = await cdp.send("Accessibility.getFullAXTree");
    expect(accessibility.nodes.some((node) => node.name?.value.toLowerCase() === story.lastHeading.toLowerCase())).toBe(true);
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

    await finalHeading.scrollIntoViewIfNeeded();
    await expect(finalHeading).toHaveAttribute("data-letter-flash", "running");
    const articleJsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
      scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((value) => value["@type"] === "Article")
    ));
    expect(articleJsonLd.headline).toBe(story.title);
  });
}

test("All story articles survive App Router navigation from the stories deck", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const story of stories) {
    await page.goto("/stories");
    const link = page.locator(`a[href="${story.route}"]`).first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${story.route}$`));
    await expect(page.getByRole("heading", { level: 1, name: story.title })).toBeVisible();
  }
});
