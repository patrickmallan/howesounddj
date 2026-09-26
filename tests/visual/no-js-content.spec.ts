import { expect, test } from "@playwright/test";

for (const [path, heading] of [
  ["/", /your wedding/i],
  ["/packages", /tell me what kind of day/i],
  ["/contact", /have a wedding date/i],
] as const) {
  test(`${path} keeps its core message readable without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
      await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
    } finally {
      await context.close();
    }
  });
}
