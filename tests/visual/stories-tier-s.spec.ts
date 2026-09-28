import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844, initialBudget: 1_050_000, totalBudget: 2_600_000 },
  { name: "desktop", width: 1440, height: 900, initialBudget: 1_350_000, totalBudget: 3_000_000 },
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
    const duration = 2_500;
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
  await page.waitForTimeout(600);
}

for (const viewport of viewports) {
  test(`Stories delivery stays intentional on ${viewport.name}`, async ({ browser }) => {
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
      if (!pathname.startsWith("/_next/") && pathname !== "/stories" && !pathname.includes(".")) routeRequests.add(pathname);
    });

    const response = await page.goto("/stories", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await page.waitForTimeout(600);
    const initial = await delivery(page);
    const initialRoutes = [...routeRequests];
    await scrollPage(page);
    const afterScroll = await delivery(page);

    console.log("STORIES_TIER_S_METRICS", JSON.stringify({ viewport: viewport.name, initial, afterScroll }));
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    expect(initialRoutes).toEqual([]);
    expect([...routeRequests]).toEqual([]);
    expect(initial.nodes).toBeLessThanOrEqual(650);
    expect(initial.uses).toBe(0);
    expect(initial.bytes).toBeLessThanOrEqual(viewport.initialBudget);
    expect(afterScroll.bytes).toBeLessThanOrEqual(viewport.totalBudget);
    expect(afterScroll.urls.some((url) => url.includes("patrick-behind-the-booth-loop-v1.mp4"))).toBe(true);
    await context.close();
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Stories remains contained and readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
    const response = await page.goto("/stories", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await scrollPage(page);

    const audit = await page.evaluate(() => {
      const visible = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return bounds.width > 0 && bounds.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const outOfBounds = [...document.querySelectorAll("main h1, main h2, main h3, main p, main a")]
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
    expect(audit.controlCount).toBe(5);
    expect(audit.documentWidth).toBeLessThanOrEqual(audit.viewportWidth + 1);
    expect(audit.outOfBounds).toEqual([]);
    expect(audit.undersizedControls).toEqual([]);
  });
}

test("Stories semantics, hardware actions, content, and links remain accessible", async ({ page, context, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/stories");

  await expect(page.getByRole("heading", { level: 1, name: "What the room felt like." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Enter this story" })).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Hear from couples" })).toHaveAttribute("data-physical-control", "hot-cue");
  await expect(page.getByRole("link", { name: "Get into the planning" })).toHaveAttribute("data-physical-control", "hot-cue");

  const cdp = await context.newCDPSession(page);
  await cdp.send("Accessibility.enable");
  const accessibility = await cdp.send("Accessibility.getFullAXTree");
  const accessibleNames = accessibility.nodes.map((node) => node.name?.value ?? "");
  expect(accessibleNames.some((name) => name.toLowerCase().includes("we said one shot-ski"))).toBe(true);
  expect(accessibleNames.some((name) => name.toLowerCase().includes("the last formal dance"))).toBe(true);
  expect(accessibleNames.some((name) => name.toLowerCase().includes("get into the planning"))).toBe(true);

  for (const href of [
    "/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like",
    "/stories/what-a-sunwolf-riverside-wedding-reception-feels-like",
    "/stories/sea-to-sky-wedding-dance-floor-energy",
    "/reviews",
    "/guides",
  ]) {
    const response = await request.get(href);
    expect(response.ok(), `${href} should resolve`).toBe(true);
  }

  const firstStory = page.getByRole("link", { name: "Enter this story" }).first();
  await firstStory.focus();
  await expect(firstStory).toBeFocused();

  const breadcrumb = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
    scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
      .find((value) => value["@type"] === "BreadcrumbList")
  ));
  expect(breadcrumb.itemListElement.at(-1).item).toBe("https://www.howesounddj.com/stories");
});

test("Stories booth loop runs only when visible and motion is allowed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/stories");
  const video = page.getByLabel("Silent real footage of Patrick DJing and the wedding room, fading between two moments");
  await expect(video).toHaveJSProperty("paused", true);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});

test("Stories booth loop remains paused for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/stories");
  const video = page.getByLabel("Silent real footage of Patrick DJing and the wedding room, fading between two moments");
  await video.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expect(video).toHaveJSProperty("paused", true);
});

test("Stories survives an App Router client-side entry", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const link = page.locator('footer a[href="/stories"]');
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/stories$/);
  await expect(page.getByRole("heading", { level: 1, name: "What the room felt like." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(3);
});
