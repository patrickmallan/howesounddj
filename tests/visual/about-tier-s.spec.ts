import { expect, test } from "@playwright/test";

const widths = [320, 390, 768, 1440] as const;

for (const width of widths) {
  test(`About remains contained and readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto("/about", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    for (const section of await page.locator("main section").all()) await section.scrollIntoViewIfNeeded();

    const geometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clippedText: [...document.querySelectorAll("main h1, main h2, main h3, main p, main li")]
        .filter((element) => {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return box.width > 0 && box.height > 0 && style.display !== "none" &&
            (box.left < -2 || box.right > document.documentElement.clientWidth + 2);
        })
        .map((element) => element.textContent?.trim().slice(0, 70)),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 2);
    expect(geometry.clippedText).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("About actions use meaningful DJ hardware and do not prefetch other routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const routeRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["/contact", "/reviews"].includes(url.pathname)) routeRequests.push(url.pathname);
  });
  await page.goto("/about", { waitUntil: "networkidle" });

  const actions = page.locator("main a[data-physical-control]");
  await expect(actions).toHaveCount(4);
  for (const action of await actions.all()) {
    await expect(action.locator("img")).toHaveCount(1);
    const box = await action.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page.waitForTimeout(500);
  expect(routeRequests).toEqual([]);
});

test("About music console uses performance pads and updates accessibly", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const controls = page.locator(".about-console-controls button");
  await expect(controls).toHaveCount(4);
  await controls.nth(3).scrollIntoViewIfNeeded();
  await controls.nth(3).click();
  await expect(controls.nth(3)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#about-console-display")).toContainText("No awkward wait for a brave first dancer.");
  for (const control of await controls.all()) {
    await expect(control.locator(".about-console-pad")).toHaveCount(1);
  }
});

test("About hero motion pauses off-screen and honors reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/about");
  const video = page.locator(".about-hero-groove-media").filter({ has: page.locator("source") });
  await expect(video).toHaveCount(1);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  await page.locator(".about-close").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await context.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto("/about");
  await expect(reducedPage.locator(".about-hero-portrait video")).toHaveCount(0);
  await expect(reducedPage.locator(".about-hero-portrait img")).toHaveCount(1);
  await reduced.close();
});

test("About server document carries canonical metadata and structured identity", async ({ request }) => {
  const response = await request.get("/about");
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('<link rel="canonical" href="https://www.howesounddj.com/about"');
  expect(html).toContain('"@type":"AboutPage"');
  expect(html).toContain('"@type":"Person"');
  expect(html).toContain("Patrick Mallan");
});
