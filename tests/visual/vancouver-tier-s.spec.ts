import { expect, test } from "@playwright/test";

const route = "/vancouver-wedding-dj";

for (const width of [320, 390, 768, 1440]) {
  test(`Vancouver route stays complete and inside the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(4);
    await expect(page.locator("main")).toContainText("One less drive up the Sea-to-Sky");
    await expect(page.locator("main")).toContainText("That's the useful part of hiring local.");
    await expect(page.locator("main")).toContainText("For Vancouver couples celebrating in Squamish.");

    for (const selector of ["main h1", "main h2", ".vancouver-date-control"]) {
      for (const element of await page.locator(selector).all()) {
        const box = await element.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(-1);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
      }
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("Vancouver route ships compact semantic HTML and structured search signals", async ({ request }) => {
  const response = await request.get(route);
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  expect(Buffer.byteLength(html)).toBeLessThan(100_000);
  expect(html).toContain('rel="canonical" href="https://www.howesounddj.com/vancouver-wedding-dj"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  expect(html).toContain("Vancouver plans. Squamish party.");
  expect(html).toContain("One less drive up the Sea-to-Sky just to talk songs.");
  expect(html).not.toContain("fixture-lens-heading");
});

test("Vancouver route prioritizes only its responsive hero artwork", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route, { waitUntil: "domcontentloaded" });

  const heroPreload = page.locator('link[rel="preload"][as="image"][imagesrcset*="vancouver-hero-afterparty-collage-v1.webp"]');
  await expect(heroPreload).toHaveCount(1);
  await expect(page.locator(".vancouver-route-hero-art")).toBeVisible();

  const riverArt = page.locator(".vancouver-route-river-panel img");
  await expect(riverArt).toHaveCount(9);
  for (const image of await riverArt.all()) await expect(image).toHaveAttribute("loading", "lazy");
});

test("Vancouver reading does not prefetch destination routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const requested: string[] = [];
  page.on("request", (request) => requested.push(new URL(request.url()).pathname));

  await page.goto(route);
  for (let top = 0; top < await page.evaluate(() => document.documentElement.scrollHeight); top += 600) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(30);
  }

  for (const destination of ["/contact", "/venues", "/reviews"]) {
    expect(requested.filter((path) => path === destination), destination).toEqual([]);
  }

  const visibleArtLoaded = await page.locator(".vancouver-route-river-panel img").evaluateAll((images) => images
    .filter((image) => getComputedStyle(image.parentElement!).display !== "none")
    .every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0));
  expect(visibleArtLoaded).toBe(true);
});

test("Vancouver date actions are accessible DJ-gear controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const controls = page.locator(".vancouver-date-control");
  await expect(controls).toHaveCount(2);
  for (const control of await controls.all()) {
    await expect(control).toHaveAttribute("href", "/contact");
    await expect(control.locator('img[src*="cue-round.png"]')).toHaveCount(1);
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }

  await controls.first().focus();
  await expect(controls.first()).toHaveCSS("outline-style", "solid");
  await page.locator('a[href="#planning-from-vancouver"]').click();
  await expect(page).toHaveURL(/#planning-from-vancouver$/);
});

test("Vancouver route survives a client-side arrival", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/squamish-wedding-dj");
  const routeLink = page.locator('main a[href="/vancouver-wedding-dj"]');
  await routeLink.scrollIntoViewIfNeeded();
  await routeLink.click();
  await expect(page).toHaveURL(/\/vancouver-wedding-dj$/);
  await expect(page.locator("#vancouver-route-title")).toContainText("Vancouver plans. Squamish party.");
  await expect(page.locator(".vancouver-route-hero-art")).toBeVisible();
});

test("Vancouver motion becomes static for reduced-motion visitors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route);
  await expect(page.locator(".vancouver-route-mix-art-pink")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".vancouver-route-local-light")).toHaveCSS("animation-name", "none");
});
