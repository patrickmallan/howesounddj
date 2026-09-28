import { expect, test } from "@playwright/test";

test("home montage waits until the visitor approaches it", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("hsdj-hero-montage-web-v1.mp4")) requests.push(request.url());
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  expect(requests).toHaveLength(0);

  const video = page.locator("#playback video");
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentSrc)).toContain("hsdj-hero-montage-web-v1.mp4");
  expect(requests.length).toBeGreaterThan(0);
});

test("reduced motion keeps the montage as a still image", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("hsdj-hero-montage-web-v1.mp4")) requests.push(request.url());
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const video = page.locator("#playback video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute("poster", /hsdj-hero-montage-poster-v1\.jpg/);
  expect(requests).toHaveLength(0);
});

test("FAQ finale stays server-rendered and avoids the shared cassette payload", async ({ page }) => {
  const cassetteRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("cassette-chassis-skin") || request.url().includes("cassette-bay-skin")) {
      cassetteRequests.push(request.url());
    }
  });

  await page.goto("/faq", { waitUntil: "domcontentloaded" });
  const finale = page.locator(".faq-mixer-finale-actions");
  await finale.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  expect(cassetteRequests).toHaveLength(0);
  await expect(finale.locator("a[data-physical-control='cue']")).toHaveCount(1);
  await expect(finale.locator("a[data-physical-control='cue'] img")).toBeVisible();
});
