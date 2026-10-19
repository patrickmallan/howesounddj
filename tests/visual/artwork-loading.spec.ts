import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`Reviews loads one opening image and keeps later artwork at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const requested: string[] = [];
    page.on("request", (request) => requested.push(request.url()));

    await page.goto("/reviews", { waitUntil: "load" });
    const hero = page.locator("main section").first().locator("picture img");
    await expect(hero).toHaveAttribute("loading", "eager");
    await expect(hero).toHaveAttribute("fetchpriority", "high");
    expect(requested.filter((url) => url.includes("reviews-hero-love-notes-")).length).toBe(1);
    expect(requested.some((url) => url.includes(width < 721 ? "reviews-hero-love-notes-desktop" : "reviews-hero-love-notes-mobile"))).toBe(false);
    expect(requested.some((url) => url.includes("read-room-dancefloor-overhead-v1.webp") && !url.includes("/_next/image"))).toBe(false);

    const floorArt = page.locator("[id=dance-floor-reviews] img").first();
    await expect(floorArt).toHaveAttribute("loading", "eager");
    await expect(floorArt).toHaveAttribute("fetchpriority", "low");
    await expect(floorArt).toHaveAttribute("data-nimg", "fill");
    await floorArt.scrollIntoViewIfNeeded();
    expect(await floorArt.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      return element.naturalWidth;
    })).toBeGreaterThan(0);
  });

  test(`Cost guide loads the matching opening art and preserves later art at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const requested: string[] = [];
    page.on("request", (request) => requested.push(request.url()));

    await page.goto("/guides/sea-to-sky-wedding-dj-cost", { waitUntil: "load" });
    await expect(page.locator('link[rel="preload"][href*="cost-guide-hero-"]')).toHaveCount(2);
    const heroRequests = requested.filter((url) => url.includes("cost-guide-hero-") && !url.includes("/_next/image"));
    expect(heroRequests).toHaveLength(1);
    expect(heroRequests[0]).toContain(width < 801 ? "cost-guide-hero-mobile" : "cost-guide-hero-desktop");
    expect(requested.some((url) => url.includes("/images/hsdj-redesign/new-editorial/cost-guide-day-story-v1.webp") && !url.includes("/_next/image"))).toBe(false);

    const interludeArt = page.locator(".cost-guide-interlude img");
    await interludeArt.scrollIntoViewIfNeeded();
    expect(await interludeArt.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      return element.naturalWidth;
    })).toBeGreaterThan(0);
    const ctaArt = page.locator(".cost-guide-cta__art img");
    await expect(ctaArt).toHaveAttribute("data-nimg", "fill");
    await ctaArt.scrollIntoViewIfNeeded();
    expect(await ctaArt.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      return element.naturalWidth;
    })).toBeGreaterThan(0);
  });
}
