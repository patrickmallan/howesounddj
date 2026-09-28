import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844, initialBudget: 720_000, totalBudget: 820_000 },
  { name: "desktop", width: 1440, height: 900, initialBudget: 850_000, totalBudget: 990_000 },
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
      urls: entries.map((entry) => {
        const url = new URL(entry.name);
        return `${url.pathname}${url.search}`;
      }),
      uses: document.querySelectorAll("use").length,
    };
  });
}

async function scrollPage(page: Page) {
  await page.evaluate(async () => {
    const distance = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const duration = 2_000;
    const start = performance.now();
    await new Promise<void>((resolve) => {
      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        scrollTo(0, distance * progress);
        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });
  });
  await page.waitForTimeout(500);
}

for (const viewport of viewports) {
  test(`Guides delivery stays intentional on ${viewport.name}`, async ({ browser }) => {
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
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));
    page.on("request", (request) => {
      const pathname = new URL(request.url()).pathname;
      if (!pathname.startsWith("/_next/") && pathname !== "/guides" && !pathname.includes(".")) routeRequests.add(pathname);
    });

    const response = await page.goto("/guides", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await page.waitForTimeout(600);
    const initial = await delivery(page);
    const initialRoutes = [...routeRequests];
    await scrollPage(page);
    const afterScroll = await delivery(page);

    console.log("GUIDES_TIER_S_METRICS", JSON.stringify({ viewport: viewport.name, initial, afterScroll }));
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect(initialRoutes).toEqual([]);
    expect([...routeRequests]).toEqual([]);
    expect(initial.nodes).toBeLessThanOrEqual(500);
    expect(initial.uses).toBe(0);
    expect(initial.bytes).toBeLessThanOrEqual(viewport.initialBudget);
    expect(afterScroll.bytes).toBeLessThanOrEqual(viewport.totalBudget);
    expect(afterScroll.urls.some((url) => url.includes("guides-turntable-deck"))).toBe(true);
    expect(afterScroll.urls.some((url) => url.includes("guides-vinyl-record"))).toBe(true);
    await context.close();
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Guides remains contained and readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
    const response = await page.goto("/guides", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await scrollPage(page);

    const audit = await page.evaluate(() => {
      const visible = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return bounds.width > 0 && bounds.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const outOfBounds = [...document.querySelectorAll("main h1, main h2, main p, main a")]
        .filter(visible)
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          return { left: bounds.left, right: bounds.right, text: element.textContent?.trim().slice(0, 60) ?? "" };
        })
        .filter((item) => item.left < -1 || item.right > innerWidth + 1);
      const controls = [...document.querySelectorAll<HTMLElement>("main a[data-physical-control]")];
      return {
        controlCount: controls.length,
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
    expect(audit.controlCount).toBe(6);
    expect(audit.documentWidth).toBeLessThanOrEqual(audit.viewportWidth + 1);
    expect(audit.outOfBounds).toEqual([]);
    expect(audit.undersizedControls).toEqual([]);
  });
}

test("Guides semantics, hardware actions, and turntable motion remain accessible", async ({ page, context, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides");

  await expect(page.getByRole("heading", { level: 1, name: "Good parties are made on purpose." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Read the floor guide" })).toHaveAttribute("data-physical-control", "play");
  await expect(page.getByRole("link", { name: "Read the choosing guide" })).toHaveAttribute("data-physical-control", "play");
  await expect(page.getByRole("link", { name: "Follow the venue route" })).toHaveAttribute("data-physical-control", "hot-cue");

  const cdp = await context.newCDPSession(page);
  await cdp.send("Accessibility.enable");
  const accessibility = await cdp.send("Accessibility.getFullAXTree");
  const accessibleNames = accessibility.nodes.map((node) => node.name?.value ?? "");
  expect(accessibleNames.some((name) => name.toLowerCase() === "how to keep a wedding dance floor packed.")).toBe(true);
  expect(accessibleNames.some((name) => name.toLowerCase() === "how to choose the dj who gets your wedding.")).toBe(true);
  expect(accessibleNames.some((name) => name.toLowerCase().includes("read the floor guide"))).toBe(true);
  expect(accessibleNames.some((name) => name.toLowerCase().includes("read the choosing guide"))).toBe(true);

  for (const href of [
    "/guides/how-to-keep-a-wedding-dance-floor-packed",
    "/guides/how-to-choose-a-wedding-dj-in-squamish",
    "/venues",
    "/faq",
  ]) {
    const response = await request.get(href);
    expect(response.ok(), `${href} should resolve`).toBe(true);
  }

  await page.getByRole("link", { name: "Build the dance floor" }).focus();
  await expect(page.getByRole("link", { name: "Build the dance floor" })).toBeFocused();
  await page.getByRole("link", { name: "Build the dance floor" }).press("Enter");
  await expect(page).toHaveURL(/#guide-one$/);

  const breadcrumb = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
    scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
      .find((value) => value["@type"] === "BreadcrumbList")
  ));
  expect(breadcrumb.itemListElement.at(-1).item).toBe("https://www.howesounddj.com/guides");

  const turntable = page.getByRole("img", { name: /Gala, Freed from Desire/ });
  await turntable.scrollIntoViewIfNeeded();
  await expect(turntable).toHaveAttribute("data-motion-active", "");
  await page.evaluate(() => scrollTo(0, 0));
  await expect(turntable).not.toHaveAttribute("data-motion-active", "");
});

test("Guides recurring motion is disabled when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides");
  const turntable = page.getByRole("img", { name: /Gala, Freed from Desire/ });
  await turntable.scrollIntoViewIfNeeded();
  await expect(turntable.locator(".guides-deck-record")).toHaveCSS("animation-name", "none");
});

test("Guides survives an App Router client-side entry", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const link = page.locator('footer a[href="/guides"]');
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/guides$/);
  await expect(page.getByRole("heading", { level: 1, name: "Good parties are made on purpose." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(2);
});
