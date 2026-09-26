import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`packages booking signal stays readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/packages");

    const journey = page.locator("[class*=afterScene]");
    const action = journey.locator("[class*=signalEnd]");

    expect(await journey.locator("ol li").count()).toBe(4);
    await expect(journey.getByText("One date. One conversation. Your call.")).toBeVisible();
    await expect(action.getByText("Put your date on the deck.")).toBeVisible();

    const measurements = await page.evaluate(() => {
      const actionHeading = document.querySelector<HTMLElement>("[class*=signalEnd] h3")!;
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        headingColor: getComputedStyle(actionHeading).color,
      };
    });

    expect(measurements.overflow).toBeLessThanOrEqual(0);
    expect(measurements.headingColor).toBe("rgb(9, 11, 11)");
  });
}
