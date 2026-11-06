import { expect, test } from "@playwright/test";

test("homepage animations run only while their sections are onscreen, even with Reduce Motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const finale = page.getByTestId("home-finale-section");
  const night = page.getByTestId("night-fader");
  const scene = page.getByTestId("night-scene-heading");
  await night.scrollIntoViewIfNeeded();
  await expect(scene).toHaveText("VIBE BEGINS", { timeout: 7000 });
  await finale.scrollIntoViewIfNeeded();
  const pausedScene = await scene.textContent();
  await page.waitForTimeout(6100);
  await expect(scene).toHaveText(pausedScene ?? "");
  await night.scrollIntoViewIfNeeded();
  await expect(scene).not.toHaveText(pausedScene ?? "", { timeout: 7000 });

  const reviewFader = page.getByRole("slider", { name: "Choose a customer review" });
  await reviewFader.scrollIntoViewIfNeeded();
  const firstReview = await reviewFader.getAttribute("aria-valuenow");
  await expect(reviewFader).not.toHaveAttribute("aria-valuenow", firstReview ?? "", { timeout: 7000 });
  await finale.scrollIntoViewIfNeeded();
  const pausedReview = await reviewFader.getAttribute("aria-valuenow");
  await page.waitForTimeout(6100);
  await expect(reviewFader).toHaveAttribute("aria-valuenow", pausedReview ?? "");
  await reviewFader.scrollIntoViewIfNeeded();
  await expect(reviewFader).not.toHaveAttribute("aria-valuenow", pausedReview ?? "", { timeout: 7000 });
});
