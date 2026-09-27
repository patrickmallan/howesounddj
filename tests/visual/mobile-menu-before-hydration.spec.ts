import { expect, test } from "@playwright/test";

const baseURL = process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000";

test("mobile navigation works without hydration", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/squamish-wedding-dj`);
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("dialog", { name: "Site menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("button", { name: "Weddings" }).click();
    const packages = menu.locator('a[href="/packages"]');
    await expect(packages).toBeVisible();
    await packages.click();
    await expect(page).toHaveURL(/\/packages$/);
  } finally {
    await context.close();
  }
});

test("the first mobile tap opens the menu before page load completes", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.route(/\.(?:png|jpe?g|webp|avif|woff2?)(?:\?|$)/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.continue();
    });
    await page.goto(`${baseURL}/squamish-wedding-dj`, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  } finally {
    await context.close();
  }
});
