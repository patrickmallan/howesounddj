import { expect, test } from "@playwright/test";
import { CANONICAL_REVIEWS } from "../../src/config/reviews";

test("reviews page keeps the full customer words and useful topic navigation", async ({ page }) => {
  await page.goto("/reviews");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("figure blockquote")).toHaveCount(CANONICAL_REVIEWS.length);
  for (const review of CANONICAL_REVIEWS) {
    await expect(page.locator("figure blockquote").filter({ hasText: review.quote })).toHaveCount(1);
  }

  await page.getByRole("link", { name: "The whole day" }).click();
  await expect(page).toHaveURL(/#whole-day-reviews$/);
  const sectionTop = await page.locator("#whole-day-reviews").evaluate((section) => section.getBoundingClientRect().top);
  expect(sectionTop).toBeGreaterThan(90);
});

for (const width of [320, 390, 768, 1440]) {
  test(`reviews page keeps every quote readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/reviews");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      clippedQuotes: [...document.querySelectorAll("main figure")].filter((figure) => {
        const frame = figure.getBoundingClientRect();
        const quote = figure.querySelector("blockquote")!.getBoundingClientRect();
        return quote.left < frame.left - 2 || quote.right > frame.right + 2 || quote.bottom > frame.bottom + 2;
      }).length,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    expect(dimensions.clippedQuotes).toBe(0);
  });
}

test("reviews motion stops when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/reviews");
  const motion = await page.evaluate(() => ({
    vinyl: getComputedStyle(document.querySelector("[class*=recordArt]")!).animationName,
    waveform: getComputedStyle(document.querySelector("[class*=waveTrack]")!).animationName,
  }));
  expect(motion).toEqual({ vinyl: "none", waveform: "none" });
});

for (const width of [390, 1920, 2560]) {
  test(`dance-floor waveform loops without an empty gap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/reviews");
    const display = await page.evaluate(() => {
      const banner = document.querySelector<HTMLElement>("[class*=waveBanner]:not([class*=waveBannerHeader])")!;
      const viewport = banner.querySelector<HTMLElement>("[class*=waveViewport]")!;
      const track = viewport.querySelector<HTMLElement>("[class*=waveTrack]")!;
      const tiles = [...track.querySelectorAll("svg")];
      const animation = track.getAnimations()[0];
      const coveredAt = [0, 16900].map((time) => {
        animation.currentTime = time;
        const lane = viewport.getBoundingClientRect();
        const intervals = tiles.map((tile) => tile.getBoundingClientRect()).sort((a, b) => a.left - b.left);
        return intervals[0].left <= lane.left + 1 && intervals[0].right >= intervals[1].left - 1 && intervals[1].right >= lane.right - 1;
      });
      return {
        bannerWidth: banner.getBoundingClientRect().width,
        viewportWidth: document.documentElement.clientWidth,
        laneWidth: viewport.getBoundingClientRect().width,
        tileWidths: tiles.map((tile) => tile.getBoundingClientRect().width),
        coveredAt,
        animation: getComputedStyle(track).animationName,
        media: banner.querySelectorAll("img, video, canvas").length,
      };
    });
    expect(display.bannerWidth).toBeGreaterThanOrEqual(display.viewportWidth - 2);
    expect(display.tileWidths).toHaveLength(2);
    expect(display.tileWidths.every((tileWidth) => tileWidth >= display.laneWidth)).toBe(true);
    expect(display.coveredAt).toEqual([true, true]);
    expect(display.animation).not.toBe("none");
    expect(display.media).toBe(0);
  });
}
