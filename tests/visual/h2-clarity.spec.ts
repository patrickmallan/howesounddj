import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/guides",
  "/packages",
  "/reviews",
  "/squamish-wedding-dj",
  "/stories",
  "/vancouver-wedding-dj",
  "/venues",
  "/weddings",
  "/whistler-wedding-dj",
] as const;

for (const width of [320, 390, 768, 1440]) {
  test(`ordinary H2s stay crisp at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });

    for (const route of routes) {
      await page.goto(route);
      const headings = page.locator("main h2:not(.sr-only):not(.hsdj-lightboard-heading):not([class*='hsdj-meter--'])");
      const styles = await headings.evaluateAll((elements) => elements.map((heading) => {
        const style = getComputedStyle(heading);
        return { filter: style.filter, textShadow: style.textShadow };
      }));

      for (const style of styles) {
        expect(style.filter, `${route} should not blur an H2`).toBe("none");
        const shadowLengths = [...style.textShadow.matchAll(/-?[\d.]+px/g)].map((match) => Number.parseFloat(match[0]));
        for (let index = 2; index < shadowLengths.length; index += 3) {
          expect(shadowLengths[index], `${route} should not use a soft-focus H2 shadow`).toBe(0);
        }
      }
    }
  });
}

test("Squamish copy scenes remain inside a narrow phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/squamish-wedding-dj");

  const scenes = page.locator([
    ".sq-place-copy",
    ".sq-field-note",
    ".sq-local-notes",
    ".sq-music-copy",
    ".sq-venue-copy",
    ".sq-outro-copy",
  ].join(","));

  await expect(scenes).toHaveCount(6);
  for (const scene of await scenes.all()) {
    const box = await scene.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(321);
  }
});
