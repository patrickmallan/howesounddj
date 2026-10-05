import { expect, test } from "@playwright/test";

const socialImage = "https://www.howesounddj.com/og-cake-party-v2.jpg";

for (const route of ["/", "/venues/sea-to-sky-gondola", "/guides/how-to-choose-a-wedding-dj-in-squamish"]) {
  test(`${route} shares the cake-party artwork`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", socialImage);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", socialImage);
  });
}

test("the cake-party social image is a full-size JPEG", async ({ page }) => {
  await page.goto("/");
  const response = await page.request.get("/og-cake-party-v2.jpg");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/jpeg");
  const dimensions = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/og-cake-party-v2.jpg";
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  });
  expect(dimensions).toEqual({ width: 1200, height: 630 });
});
