import { expect, test } from "@playwright/test";

for (const width of [1280, 1440]) {
  test(`desktop header controls balance the logo at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "load" });

    const buttons = page.locator("header nav[aria-label='Primary'] .hsdj-nav-pad");
    const date = page.locator(".hsdj-header-cue");
    await expect(buttons).toHaveCount(5);

    const geometry = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const logoRect = rect(".hsdj-wordmark");
      const deckRect = rect(".hsdj-header-controller");
      const padRect = rect("header nav[aria-label='Primary'] .hsdj-nav-pad");
      const dateRect = rect(".hsdj-header-cue");
      return {
        logoRight: logoRect.right,
        deckLeft: deckRect.left,
        deckRight: deckRect.right,
        deckWidth: deckRect.width,
        padWidth: padRect.width,
        padHeight: padRect.height,
        dateWidth: dateRect.width,
        dateHeight: dateRect.height,
        viewportWidth: window.innerWidth,
        pageWidth: document.documentElement.scrollWidth,
      };
    });

    expect(geometry.deckWidth).toBeGreaterThan(760);
    expect(geometry.padWidth).toBeGreaterThanOrEqual(125);
    expect(geometry.padHeight).toBeGreaterThanOrEqual(80);
    expect(geometry.dateWidth).toBeGreaterThanOrEqual(125);
    expect(geometry.dateHeight).toBeGreaterThanOrEqual(80);
    expect(geometry.deckLeft).toBeGreaterThan(geometry.logoRight);
    expect(geometry.deckRight).toBeLessThanOrEqual(width);
    expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth);

    await buttons.first().click();
    await expect(page.getByRole("menu", { name: "Weddings" })).toBeVisible();
    await page.keyboard.press("Escape");
    await date.click();
    await expect(page.getByRole("dialog", { name: "Check wedding date availability" })).toBeVisible();
  });
}

test("mobile header keeps its compact controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });
  await expect(page.locator("header nav[aria-label='Primary']")).toBeHidden();
  await expect(page.locator(".hsdj-mobile-pad")).toBeVisible();
  const width = await page.locator(".hsdj-header-cue").evaluate((element) => element.getBoundingClientRect().width);
  expect(width).toBeLessThan(100);
});
