import { expect, test } from "@playwright/test";

test("header date control reaches Contact before JavaScript is ready", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/squamish-wedding-dj", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: /check\s*date/i }).first().click();
    await expect(page).toHaveURL(/\/contact#availability$/);
    await expect(page.getByRole("heading", { name: "Have a wedding date?" })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("hydrated header date control retains the quick-check panel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/squamish-wedding-dj", { waitUntil: "load" });
  const trigger = page.getByRole("link", { name: /check\s*date/i }).first();
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Check wedding date availability" })).toBeVisible();
  await expect(page).toHaveURL(/\/squamish-wedding-dj$/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Check wedding date availability" })).toBeHidden();
  await expect(trigger).toBeFocused();
});
