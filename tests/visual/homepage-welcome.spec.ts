import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`homepage welcome sits between arrival and music at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const welcome = page.locator('section[aria-labelledby="welcome-heading"]');
    await expect(welcome).toContainText("I believe I’ve got one of the");
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
      expect(meterBounds!.x + meterBounds!.width).toBeLessThanOrEqual(headingBounds!.x);
    } else {
      await expect(heroMeter).toBeVisible();
      await expect(welcomeMeter).toBeHidden();
    }
    await expect(welcome.locator("img")).toHaveCount(2);
    await expect(welcome.getByRole("img", { name: /^Imagined wedding artwork/ })).toHaveAttribute("src", /welcome-castle-wedding-daydream-v1/);
    await expect.poll(() => welcome.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await welcome.screenshot({ path: `/tmp/home-welcome-${width}.png` });
    expect(await welcome.evaluate(el => [...el.querySelectorAll("h2, p, a")].every(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth && node.scrollWidth <= node.clientWidth + 1;
    }))).toBe(true);
  });
}
