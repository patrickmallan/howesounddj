import { expect, test } from "@playwright/test";
import { ACTIVE_VENUE_PAGES } from "../../src/config/venue-pages";

for (const width of [390, 1440]) {
  test(`review artwork moves while visible and pauses offscreen at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/reviews");
    const record = page.locator('[class*="recordArt"]').first();
    const region = page.locator('[data-review-motion]').first();
    await record.scrollIntoViewIfNeeded();
    await expect(region).toHaveAttribute("data-motion-active", "true");
    const before = await record.evaluate(el => getComputedStyle(el).transform);
    await expect.poll(() => record.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
    const track = page.locator('[class*="waveTrack"]').first();
    await track.scrollIntoViewIfNeeded();
    await expect(region).toHaveAttribute("data-motion-active", "false");
    const waveBefore = await track.evaluate(el => getComputedStyle(el).transform);
    await expect.poll(() => track.evaluate(el => getComputedStyle(el).transform)).not.toBe(waveBefore);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => record.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    await expect.poll(() => track.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    await expect.poll(() => page.locator('[class*=waveformPlayhead]').first().evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    await expect(region).toHaveAttribute("data-motion-active", "false");
  });
}

test("all venue pages retain distinct art and contained headings at phone and desktop sizes", async ({ page }) => {
  const portraits = new Set<string>();
  const storyScenes = new Set<string>();
  for (const venue of ACTIVE_VENUE_PAGES) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/venues/${venue.slug}`);
      const heroArt = page.locator(".venue-dossier-hero-art img");
      const details = page.locator(".venue-dossier-details");
      const storyScene = await details.evaluate((element) => getComputedStyle(element).backgroundImage);
      await expect(heroArt).toBeVisible();
      expect(storyScene).toContain("url(");
      if (width === 390) {
        portraits.add(await heroArt.getAttribute("src") ?? "");
        storyScenes.add(storyScene);
      }
      for (const heading of [page.locator("#venue-dossier-title"), page.locator("#venue-dossier-details-title")]) {
        const bounds = await heading.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(-1);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
      }
    }
  }
  expect(portraits.size).toBe(ACTIVE_VENUE_PAGES.length);
  expect(storyScenes.size).toBe(ACTIVE_VENUE_PAGES.length);
});
