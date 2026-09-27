import { expect, test } from "@playwright/test";

const signalRoutes = [
  "/about",
  "/faq",
  "/guides",
  "/reviews",
  "/squamish-wedding-dj",
  "/stories",
  "/vancouver-wedding-dj",
  "/venues",
  "/weddings",
  "/whistler-wedding-dj",
] as const;

for (const width of [320, 390, 768, 1440]) {
  test(`hero signal plates stay inside the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    for (const route of signalRoutes) {
      await page.goto(route);
      const plate = page.locator(".hsdj-hero-signal-copy").first();
      await expect(plate).toBeAttached();
      const box = await plate.boundingBox();
      expect(box, `${route} should render a signal plate`).not.toBeNull();
      expect(box!.x, `${route} starts inside viewport`).toBeGreaterThanOrEqual(-1);
      expect(box!.x + box!.width, `${route} ends inside viewport`).toBeLessThanOrEqual(width + 1);
    }
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`Wedding Tidbits is compact and content-width at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    await page.goto("/weddings");
    const heading = page.getByRole("heading", { name: "Wedding tidbits" });
    const section = page.locator("section").filter({ has: heading });
    const [headingBox, sectionBox] = await Promise.all([heading.boundingBox(), section.boundingBox()]);
    expect(headingBox).not.toBeNull();
    expect(sectionBox).not.toBeNull();
    expect(headingBox!.width).toBeLessThan(sectionBox!.width * 0.72);
    expect(headingBox!.y - sectionBox!.y).toBeLessThanOrEqual(width <= 768 ? 32 : 48);
  });
}
