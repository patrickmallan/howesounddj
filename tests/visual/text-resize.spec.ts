import { expect, test } from "@playwright/test";

for (const route of ["/", "/weddings", "/packages", "/reviews", "/faq", "/contact", "/squamish-wedding-dj"]) {
  test(`${route} has no page-level horizontal scroll with 200% text at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
