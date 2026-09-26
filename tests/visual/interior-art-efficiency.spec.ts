import { expect, test } from "@playwright/test";

const customHeroCopy = [
  { path: "/squamish-wedding-dj", selector: ".sq-hero-copy > p" },
  { path: "/about", selector: ".about-hero-intro" },
  { path: "/venues", selector: ".venue-journey-lede" },
  { path: "/venues/sea-to-sky-gondola", selector: ".venue-dossier-hero-copy > p:not(.venue-dossier-overline)" },
  { path: "/stories", selector: ".contact-sheet-hero-copy > p:last-child" },
];

for (const { path, selector } of customHeroCopy) {
  test(`${path} does not load shared collage beneath its opaque hero copy`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const background = await page.locator(selector).evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(background).toBe("none");
  });
}

test("Packages prioritizes its first-screen collage without duplicate preload links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/packages", { waitUntil: "domcontentloaded" });
  await expect(page.locator('link[rel="preload"][as="image"][href="/images/hsdj-redesign/footer/footer-dj-mixer-collage-v2-optimized.webp"]')).toHaveCount(1);
});

test("Squamish prioritizes its visible hero collage once", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/squamish-wedding-dj", { waitUntil: "domcontentloaded" });
  await expect(page.locator('link[rel="preload"][as="image"][href="/images/hsdj-redesign/new-editorial/squamish-night-collage-v3-optimized.webp"]')).toHaveCount(1);
  const background = await page.locator(".sq-hero").evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(background).toContain("squamish-night-collage-v3-optimized.webp");
});

test("planning guide uses the existing optimized mixer hero", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides/how-to-choose-a-wedding-dj-in-squamish", { waitUntil: "domcontentloaded" });
  const background = await page.locator(".hsdj-interior-flow > header").evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(background).toContain("djm-a9-topdown-optimized.webp");
  expect(background).not.toContain("djm-a9-topdown.jpg");
});

test("Packages keeps its later scene art available as visitors scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/packages", { waitUntil: "domcontentloaded" });

  for (const artwork of [
    "packages-ceremony-clue-v2.webp",
    "packages-dinner-clue-v2.webp",
    "packages-dance-gear-clue-v2.webp",
    "packages-signal-journey-v1.webp",
  ]) {
    const image = page.locator(`img[src*="${artwork}"]`);
    await expect(image).toHaveAttribute("loading", "lazy");
    await image.scrollIntoViewIfNeeded();
    const width = await image.evaluate(async (element) => {
      const photo = element as HTMLImageElement;
      await photo.decode();
      return photo.naturalWidth;
    });
    expect(width).toBeGreaterThan(0);
  }
});
