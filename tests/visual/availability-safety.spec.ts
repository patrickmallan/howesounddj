import { expect, test } from "@playwright/test";

test("a late date response cannot replace the visible date or stored result", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let releaseFirst: (() => void) | undefined;
  let firstRequestSeen: (() => void) | undefined;
  const firstRequest = new Promise<void>((resolve) => { firstRequestSeen = resolve; });
  const firstMayFinish = new Promise<void>((resolve) => { releaseFirst = resolve; });

  await page.route("**/api/availability", async (route) => {
    const { date } = route.request().postDataJSON() as { date: string };
    if (date === "2027-06-01") {
      firstRequestSeen?.();
      await firstMayFinish;
    }
    try {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          result: "AVAILABLE",
          date,
          message: "Your date currently appears available. Submit an inquiry to continue.",
          journeyId: `journey-${date}`,
        }),
      });
    } catch {
      // An aborted first request may already have been removed by the browser.
    }
  });

  await page.goto("/squamish-wedding-dj", { waitUntil: "load" });
  await page.getByRole("link", { name: /check\s*date/i }).first().click();
  const dialog = page.getByRole("dialog", { name: "Check wedding date availability" });
  await dialog.getByLabel("Year (YYYY)").fill("2027");
  await dialog.getByLabel("Month (MM)").fill("06");
  await dialog.getByLabel("Day (DD)").fill("01");
  await dialog.getByRole("button", { name: "Check Availability" }).click();
  await firstRequest;

  await dialog.getByLabel("Day (DD)").fill("02");
  await dialog.getByRole("button", { name: "Check Availability" }).click();
  await expect(dialog).toContainText("June 2, 2027");
  releaseFirst?.();
  await expect(dialog).toContainText("June 2, 2027");
  await expect(dialog).not.toContainText("June 1, 2027");
  await expect.poll(() => page.evaluate(() => {
    const stored = sessionStorage.getItem("hsdj_post_availability_context");
    return stored ? (JSON.parse(stored) as { selectedDate?: string }).selectedDate : null;
  })).toBe("2027-06-02");
});

test("the date dialog contains keyboard focus and restores the trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/squamish-wedding-dj", { waitUntil: "load" });
  const trigger = page.getByRole("link", { name: /check\s*date/i }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Check wedding date availability" });
  await expect(dialog).toBeVisible();
  await expect.poll(() => page.evaluate(() => [...document.body.children].some((child) => (child as HTMLElement).inert))).toBe(true);

  const close = dialog.getByRole("button", { name: "Close availability check" });
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Check Availability" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
