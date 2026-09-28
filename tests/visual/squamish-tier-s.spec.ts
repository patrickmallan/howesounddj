import { expect, test } from "@playwright/test";

const route = "/squamish-wedding-dj";

for (const width of [320, 390, 768, 1440]) {
  test(`Squamish stays complete and inside the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(5);
    await expect(page.locator("main")).toContainText("Practical local attention");
    await expect(page.locator("main")).toContainText("Different sounds. One room moving together.");

    for (const selector of ["main h1", "main h2", ".sq-gear-link"]) {
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

test("Squamish ships a compact semantic document and no live fixture rig", async ({ request }) => {
  const response = await request.get(route);
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  expect(Buffer.byteLength(html)).toBeLessThan(100_000);
  expect(html).toContain('rel="canonical" href="https://www.howesounddj.com/squamish-wedding-dj"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  expect(html).toContain("Your Squamish wedding, without the standard wedding-DJ playlist.");
  expect(html).not.toContain("fixture-lens-heading");
});

test("Squamish reading does not prefetch unrelated routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const requested: string[] = [];
  page.on("request", (request) => requested.push(new URL(request.url()).pathname));

  await page.goto(route);
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += 600) {
      scrollTo(0, top);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  });

  for (const destination of [
    "/vancouver-wedding-dj",
    "/guides/how-to-keep-a-wedding-dance-floor-packed",
    "/venues",
    "/contact",
  ]) {
    expect(requested.filter((path) => path === destination), destination).toEqual([]);
  }
});

test("Squamish actions use accessible DJ-gear controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const controls = page.locator(".sq-gear-link");
  await expect(controls).toHaveCount(3);
  for (const control of await controls.all()) {
    await expect(control.locator("img")).toHaveCount(1);
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }

  await page.locator(".sq-gear-link--hero").focus();
  await expect(page.locator(".sq-gear-link--hero")).toHaveCSS("outline-style", "solid");
  await page.locator(".sq-gear-link--hero").click();
  await expect(page).toHaveURL(/#sq-place$/);
});
