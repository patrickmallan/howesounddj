import { expect, test } from "@playwright/test";

for (const width of [320, 375, 390, 768, 1440, 2048]) {
  test(`weddings overview keeps its headline and flyer copy readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/weddings");

    const measurements = await page.evaluate(() => {
      const heading = document.querySelector("main h1")!;
      const cards = [...document.querySelectorAll("section[aria-labelledby='truths-heading'] article")];
      const bounds = (element: Element) => element.getBoundingClientRect();
      const titleCollisions = cards.flatMap((card, index) => cards.flatMap((other, otherIndex) => {
        if (index === otherIndex) return [];
        const frame = bounds(card);
        const title = other.querySelector("p");
        if (!title) return [];
        const text = bounds(title);
        const overlapX = Math.min(frame.right, text.right) - Math.max(frame.left, text.left);
        const overlapY = Math.min(frame.bottom, text.bottom) - Math.max(frame.top, text.top);
        return overlapX > 1 && overlapY > 1 ? [`${index}:${otherIndex}`] : [];
      }));
      return {
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        headingWidth: bounds(heading).width,
        titleCollisions,
        recordTextSize: Number.parseFloat(getComputedStyle(cards[1].lastElementChild!).fontSize),
      };
    });

    expect(measurements.pageOverflow).toBeLessThanOrEqual(0);
    expect(measurements.headingWidth).toBeLessThanOrEqual(width > 900 ? 850 : width);
    expect(measurements.titleCollisions).toEqual([]);
    expect(measurements.recordTextSize).toBeGreaterThanOrEqual(14);
  });
}
