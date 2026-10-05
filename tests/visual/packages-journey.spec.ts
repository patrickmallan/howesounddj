import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1024, 1440, 2048]) {
  test(`packages booking signal stays readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/packages");

    const journey = page.locator("[class*=afterScene]");
    const action = journey.locator("[class*=signalEnd]");

    expect(await journey.locator("ol li").count()).toBe(4);
    const bookingHeading = journey.locator("[class*=afterHeading] h2");
    await expect(bookingHeading).toHaveText("One date. One convo. Your call.");
    await bookingHeading.scrollIntoViewIfNeeded();
    await expect(bookingHeading).toHaveAttribute("data-letter-flash-ready", "true");
    await expect(action.getByText("Put your date on the deck.")).toBeVisible();

    const measurements = await page.evaluate(() => {
      const actionHeading = document.querySelector<HTMLElement>("[class*=signalEnd] h3")!;
      const heroHeading = document.querySelector<HTMLElement>("[class*=heroHeading]")!;
      const bookingHeading = document.querySelector<HTMLElement>("[class*=afterHeading] h2")!;
      const bookingPanel = document.querySelector<HTMLElement>("[class*=afterDeck]")!;
      const headingLines = [...bookingHeading.querySelectorAll(":scope > span")];
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        heroHeadingRight: heroHeading.getBoundingClientRect().right,
        headingColor: getComputedStyle(actionHeading).color,
        headingTextFits: headingLines.every(line => line.scrollWidth <= line.clientWidth + 1),
        headingClearsPanel: headingLines.every(line => line.getBoundingClientRect().right <= bookingPanel.getBoundingClientRect().left),
        lettersStayInline: [...bookingHeading.querySelectorAll("[class*=character]")].every(letter => getComputedStyle(letter).display !== "block"),
      };
    });

    expect(measurements.overflow).toBeLessThanOrEqual(0);
    expect(measurements.heroHeadingRight).toBeLessThanOrEqual(width);
    expect(measurements.headingColor).toBe("rgb(9, 11, 11)");
    expect(measurements.headingTextFits).toBe(true);
    if (width > 820) expect(measurements.headingClearsPanel).toBe(true);
    expect(measurements.lettersStayInline).toBe(true);
  });
}
