import { expect, test } from "@playwright/test";

for (const width of [320, 390]) {
  test(`mobile welcome art and scene title fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");

    const welcome = page.locator('section[aria-labelledby="welcome-heading"]');
    const cake = welcome.locator("figure img");
    await expect(cake).toBeVisible();
    const cakeBox = await cake.boundingBox();
    expect(cakeBox).not.toBeNull();
    expect(cakeBox!.x).toBeCloseTo(0, 0);
    expect(cakeBox!.width).toBeCloseTo(width, 0);
    await expect(welcome.locator('div[class*="backdrop"]')).toBeHidden();

    const sceneTitle = page.getByTestId("night-scene-heading");
    const scene = page.getByTestId("night-scene");
    const stages = page.getByTestId("night-fader").locator("button");
    for (let index = 0; index < 5; index += 1) {
      await stages.nth(index).click();
      const titleBox = await sceneTitle.boundingBox();
      const sceneBox = await scene.boundingBox();
      expect(titleBox).not.toBeNull();
      expect(sceneBox).not.toBeNull();
      expect(titleBox!.x).toBeGreaterThanOrEqual(sceneBox!.x);
      expect(titleBox!.x + titleBox!.width).toBeLessThanOrEqual(sceneBox!.x + sceneBox!.width * .5 + 1);
      expect(await sceneTitle.evaluate((element) => element.scrollWidth)).toBeLessThanOrEqual(
        await sceneTitle.evaluate((element) => element.clientWidth) + 1,
      );
    }
  });
}

test("mobile microphone cards discuss audibility across the whole day", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const cards = page.locator('#services [role="listitem"]');
  await expect(cards).toHaveCount(4);
  await expect(cards.nth(1)).toContainText(/the mic is ready/i);
  await expect(cards.nth(3)).toContainText(/bring the mic up clean/i);
});

test("mobile H2 letters visibly flash when motion is allowed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const heading = page.locator("#build-heading");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-letter-flash", "running");
  await expect.poll(
    () => heading.locator('span[class*="_off__"]').count(),
    { timeout: 4_000, intervals: [50, 50, 50, 50, 100] },
  ).toBeGreaterThanOrEqual(2);
});
