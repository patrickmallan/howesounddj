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
    await page.screenshot({ path: `/tmp/home-welcome-${width}.png` });
    expect(await welcome.evaluate(el => [...el.querySelectorAll("h2, p, a")].every(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth && node.scrollWidth <= node.clientWidth + 1;
    }))).toBe(true);
  });
}
