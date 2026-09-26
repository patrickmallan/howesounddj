import { expect, test } from "@playwright/test";

test("mobile navigation and date-check entry remain reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/weddings", { waitUntil: "domcontentloaded" });
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Site menu" });
  await expect(menu).toBeVisible();
  await menu.getByRole("button", { name: "Weddings" }).click();
  await menu.getByRole("link", { name: /Packages Coverage/ }).click();
  await expect(page).toHaveURL(/\/packages$/);
  await page.goto("/contact#availability", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Have a wedding date?" })).toBeVisible();
  await expect(page.getByRole("button", { name: /check.*date/i }).first()).toBeVisible();
});

test("reviews stay readable and reduced motion remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/reviews", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: /cue 1: review by/i })).toBeVisible();
});
