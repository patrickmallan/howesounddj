import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`homepage welcome sits between arrival and music at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const welcome = page.locator('section[aria-labelledby="welcome-heading"]');
    await expect(welcome).toContainText("Your musical taste comes first.");
    await expect(welcome).toContainText("I’ve got one of the best gigs on the planet.");
    await expect(welcome).not.toContainText("I’m Patrick");
    await expect(welcome.getByRole("link")).toHaveCount(0);
    expect(await welcome.evaluate(el => el.previousElementSibling?.getAttribute("aria-labelledby"))).toBe("home-arrival-heading");
    expect(await welcome.evaluate(el => el.nextElementSibling?.id)).toBe("night");
    await welcome.scrollIntoViewIfNeeded();
    const heroMeter = page.locator('section[aria-labelledby="home-arrival-heading"] .hsdj-vu-meter');
    const welcomeMeter = welcome.locator('.hsdj-vu-meter');
    if (width <= 700) {
      await expect(heroMeter).toBeHidden();
      await expect(welcomeMeter).toBeVisible();
      const meterBounds = await welcomeMeter.boundingBox();
      const headingBounds = await welcome.locator('h2').boundingBox();
      expect(meterBounds!.x).toBeGreaterThanOrEqual(0);
      expect(meterBounds!.x).toBeGreaterThanOrEqual(headingBounds!.x + headingBounds!.width);
      expect(meterBounds!.x + meterBounds!.width).toBeLessThanOrEqual(width);
      const cake = await welcome.locator('figure img').boundingBox();
      expect(meterBounds!.y).toBeGreaterThan(cake!.y + cake!.height);
      const hero = page.locator('section[aria-labelledby="home-arrival-heading"]');
      const gap = await hero.evaluate(el => el.getBoundingClientRect().bottom - el.querySelector('h1 + p')!.getBoundingClientRect().bottom);
      expect(gap).toBeLessThan(32);
      await hero.screenshot({ path: `/tmp/home-hero-spacing-${width}.png`, style: 'header { visibility: hidden !important; }' });
    } else {
      await expect(heroMeter).toBeVisible();
      await expect(welcomeMeter).toBeHidden();
    }
    await expect(welcome.locator("img")).toHaveCount(2);
    await expect(welcome.getByRole("img", { name: /^Imagined wedding artwork/ })).toHaveAttribute("src", /welcome-pink-cake-party-scenes-v5/);
    await expect(welcome.locator('figcaption')).toHaveCount(0);
    const photoStyle = await welcome.locator('figure img').evaluate(el => getComputedStyle(el).maskImage);
    if (width <= 700) expect(photoStyle).toBe('none');
    else expect(photoStyle).toContain('linear-gradient');
    const frame = await welcome.locator('figure').evaluate(el => ({ shadow: getComputedStyle(el).boxShadow, border: getComputedStyle(el).borderTopWidth }));
    expect(frame).toEqual({ shadow: 'none', border: '0px' });
    expect(await welcome.locator('p').evaluateAll(nodes => new Set(nodes.map(node => getComputedStyle(node).fontSize)).size)).toBe(1);
    const artBounds = await welcome.locator('figure img').boundingBox();
    expect(Math.abs(artBounds!.width - artBounds!.height)).toBeLessThan(1);
    const visibleArtwork = width <= 700 ? welcome.locator("figure img") : welcome.locator("img");
    await expect.poll(() => visibleArtwork.evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    // Isolate the complete spread; sticky navigation otherwise covers the art
    // when Playwright centers a tall section for its element screenshot.
    await welcome.screenshot({ path: `/tmp/home-welcome-${width}.png`, style: 'header { visibility: hidden !important; }' });
    expect(errors).toEqual([]);
    expect(await welcome.evaluate(el => [...el.querySelectorAll("h2, p, a")].every(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth && node.scrollWidth <= node.clientWidth + 1;
    }))).toBe(true);
    await welcome.evaluate(el => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().bottom - 350));
    await page.screenshot({ path: `/tmp/home-welcome-transition-${width}.png`, style: 'header:not([class*="buildHeading"]) { visibility: hidden !important; }' });
  });
}
