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
    if (width === 390) {
      await page.locator('[data-review-motion]').last().scrollIntoViewIfNeeded();
      await expect.poll(() => track.evaluate(el => getComputedStyle(el).animationName)).toContain("waveform-travel");
      const reducedWaveBefore = await track.evaluate(el => getComputedStyle(el).transform);
      await expect.poll(() => track.evaluate(el => getComputedStyle(el).transform)).not.toBe(reducedWaveBefore);
      await region.scrollIntoViewIfNeeded();
      await expect.poll(() => record.evaluate(el => getComputedStyle(el).animationName)).toContain("record-turn");
      const reducedRecordBefore = await record.evaluate(el => getComputedStyle(el).transform);
      await expect.poll(() => record.evaluate(el => getComputedStyle(el).transform)).not.toBe(reducedRecordBefore);
      const screenPlayhead = page.locator('[class*=waveformPlayhead]').first();
      await expect.poll(() => screenPlayhead.evaluate(el => getComputedStyle(el).animationName)).toContain("review-screen-scan");
      const reducedScanBefore = await screenPlayhead.evaluate(el => getComputedStyle(el).transform);
      await expect.poll(() => screenPlayhead.evaluate(el => getComputedStyle(el).transform)).not.toBe(reducedScanBefore);
    } else {
      await expect.poll(() => record.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
      await expect.poll(() => track.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    }
  });
}

test("all venue concepts have distinct artwork and contained labels at phone and desktop sizes", async ({ page }) => {
  const artwork = new Set<string>();
  for (const venue of ACTIVE_VENUE_PAGES) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/venues/${venue.slug}`);
      const figure = page.getByRole("figure", { name: `A possible celebration flow for ${venue.name}` });
      await expect(figure).toBeVisible();
      await expect(figure).toContainText("not a floor plan");
      await expect(figure).not.toContainText("SPEECHES");
      const svg = figure.locator("svg");
      if (width === 390) artwork.add(await svg.innerHTML());
      expect(await svg.evaluate(el => {
        const bounds = el.getBoundingClientRect();
        return [...el.querySelectorAll("text")].every(label => {
          const box = label.getBoundingClientRect();
          return box.left >= bounds.left && box.right <= bounds.right && box.bottom <= bounds.bottom;
        });
      })).toBe(true);
      const bounds = await figure.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
  }
  expect(artwork.size).toBe(ACTIVE_VENUE_PAGES.length);
});
