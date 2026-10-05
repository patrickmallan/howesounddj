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

test("microphone cards use the same failure-and-fix copy on mobile and desktop", async ({ page }) => {
  const expected = [
    /quiet vows and a gust of wind.*mic placement and levels/i,
    /toast can start in a noisy room.*voice above the chatter/i,
    /one person whispers.*ride the levels/i,
    /shout-out can vanish under the track.*get the beat right back/i,
  ];

  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const cards = page.locator('#services [role="listitem"]');
    await expect(cards).toHaveCount(4);
    for (let index = 0; index < expected.length; index += 1) {
      await expect(cards.nth(index)).toContainText(expected[index]);
    }

    if (width <= 390) {
      const first = await cards.nth(0).boundingBox();
      const second = await cards.nth(1).boundingBox();
      expect(first).not.toBeNull();
      expect(second).not.toBeNull();
      expect(second!.y).toBeGreaterThan(first!.y + first!.height - 1);
      expect(second!.x).toBeCloseTo(first!.x, 0);
      const textWidth = await cards.nth(0).locator("div").evaluate((element) => element.getBoundingClientRect().width);
      expect(textWidth).toBeGreaterThan(first!.width * .85);
      for (let index = 0; index < expected.length; index += 1) {
        const knob = await cards.nth(index).locator("span").first().boundingBox();
        const paragraph = await cards.nth(index).locator("p").boundingBox();
        expect(knob).not.toBeNull();
        expect(paragraph).not.toBeNull();
        expect(paragraph!.y).toBeGreaterThanOrEqual(knob!.y + knob!.height);
      }
    }
  }
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

test("reduced-motion phones still auto-advance the fader and can opt into DJ lights", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const heading = page.locator("#build-heading");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-letter-flash", "paused");

  const fader = page.getByTestId("night-fader");
  await fader.scrollIntoViewIfNeeded();
  const sceneTitle = page.getByTestId("night-scene-heading");
  await expect(sceneTitle).toHaveText(/CLEAR &\s*AUDIBLE/);
  await expect(sceneTitle).toHaveText("VIBE BEGINS", { timeout: 7_000 });

  await page.getByRole("button", { name: /DJ lights off.*turn on/i }).click();
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-letter-flash", "running");
  await expect.poll(
    () => heading.locator('span[class*="_off__"]').count(),
    { timeout: 4_000, intervals: [50, 50, 50, 50, 100] },
  ).toBeGreaterThanOrEqual(2);

  await page.reload();
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-letter-flash", "running");
  await page.getByRole("button", { name: /DJ lights on.*turn off/i }).click();
  await expect(heading).toHaveAttribute("data-letter-flash", "paused");
});
