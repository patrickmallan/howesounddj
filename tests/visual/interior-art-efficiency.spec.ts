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

test("planning guide uses the existing optimized mixer hero", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides/how-to-choose-a-wedding-dj-in-squamish", { waitUntil: "domcontentloaded" });
  const background = await page.locator(".hsdj-interior-flow > header").evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(background).toContain("djm-a9-topdown-optimized.webp");
  expect(background).not.toContain("djm-a9-topdown.jpg");
});
