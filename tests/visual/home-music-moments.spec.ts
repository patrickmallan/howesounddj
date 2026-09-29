import { expect, test } from "@playwright/test";

for (const width of [320, 390, 1440]) {
  test(`home music story opens on ceremony and keeps its heading in view at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const heading = page.locator("#read-room-heading");
    await expect(heading).toContainText("Your musicstarts it.I readthe room.");
    const headingBounds = await heading.boundingBox();
    expect(headingBounds).not.toBeNull();
    expect(headingBounds!.x).toBeGreaterThanOrEqual(-1);
    expect(headingBounds!.x + headingBounds!.width).toBeLessThanOrEqual(width + 1);
    for (const line of await heading.locator("span").all()) {
      const bounds = await line.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(-1);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    }

    await expect(page.getByTestId("night-scene-heading")).toHaveText("HEARD");
    await expect(page.getByRole("slider", { name: /music changes through the wedding night/i })).toHaveValue("0");
    await expect(page.getByRole("button", { name: /01 ceremony/i })).toHaveClass(/active/);
    await page.getByRole("button", { name: /03 dinner/i }).click();
    await expect(page.getByTestId("night-scene-heading")).toHaveText(/DON'T\s+RUSH IT/);
    await page.getByRole("button", { name: /01 ceremony/i }).click();
    await expect(page.getByTestId("night-scene-heading")).toHaveText("HEARD");
  });
}

test("desktop video overlay uses the live mobile-style display lettering", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const frame = page.getByTestId("home-video-proof-inner");
  await frame.scrollIntoViewIfNeeded();
  const title = frame.locator("[data-video-overlay-title]");
  await expect(title).toBeVisible();
  await expect(title).toContainText("Howe SoundWedding DJ");
  await expect(frame.locator("[data-video-overlay-lockup]")).toHaveCount(0);
  await expect(frame.locator("[data-video-overlay-mountains] img")).toHaveAttribute("src", /hsdj-mountain-backdrop-v5\.svg/);
  expect(await title.locator("b").evaluate((element) => getComputedStyle(element).fontFamily)).toContain("HSDJ Meter Matrix");
});

for (const width of [390, 1440]) {
  test(`wedding moments keep faces framed and first dance feels inviting at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    for (const [button, heading, position] of [
      [/01 ceremony/i, "HEARD", "5%"],
      [/04 first dance/i, "HAVE FUN WITH THIS ONE", "5%"],
      [/05 open floor/i, "NOW WE GO", "15%"],
    ] as const) {
      await page.getByRole("button", { name: button }).click();
      const scene = page.getByTestId("night-scene");
      await expect(page.getByTestId("night-scene-heading")).toHaveText(heading);
      expect(await scene.locator("img").evaluate((image) => getComputedStyle(image).objectPosition)).toMatch(new RegExp(`(?:50%|center) ${position}`));
    }

    const firstDance = page.getByRole("button", { name: /04 first dance/i });
    await firstDance.click();
    const headline = await page.getByTestId("night-scene-heading").boundingBox();
    const description = await page.getByTestId("night-scene-description").boundingBox();
    expect(headline).not.toBeNull();
    expect(description).not.toBeNull();
    expect(headline!.y + headline!.height).toBeLessThanOrEqual(description!.y + 1);
  });
}
