import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768]) {
  test(`mobile menu stays tappable and keyboard-dismissable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/weddings");
    const trigger = page.getByRole("button", { name: "Menu" });
    await trigger.click();
    const menu = page.getByRole("dialog", { name: "Site menu" });
    await expect(menu).toBeVisible();
    const weddings = menu.getByRole("button", { name: "Weddings" });
    const hit = await weddings.evaluate((button) => {
      const box = button.getBoundingClientRect();
      const element = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      return element === button || button.contains(element);
    });
    expect(hit).toBe(true);
    await weddings.click();
    await expect(menu.getByRole("link", { name: /Packages Coverage/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

test("availability link lands below the sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact#availability");
  const placement = await page.evaluate(() => {
    const section = document.getElementById("availability")!;
    const header = document.querySelector("header")!;
    return { sectionTop: section.getBoundingClientRect().top, headerBottom: header.getBoundingClientRect().bottom };
  });
  expect(placement.sectionTop).toBeGreaterThanOrEqual(placement.headerBottom - 2);
  expect(placement.sectionTop).toBeLessThan(placement.headerBottom + 120);
  await expect(page.getByRole("heading", { name: "Have a wedding date?" })).toBeVisible();
});
