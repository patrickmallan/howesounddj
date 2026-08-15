import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const MOBILE_VIEWPORTS = [
  { name: "375x812", width: 375, height: 812 },
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
] as const;

const SHOT_DIR = join(process.cwd(), "docs/handoff/screenshots/mobile-visual-rhythm-v2");

function ensureShotDir() {
  mkdirSync(SHOT_DIR, { recursive: true });
}

async function gapBetween(
  page: import("@playwright/test").Page,
  upperSelector: string,
  lowerSelector: string,
) {
  return page.evaluate(
    ({ upperSelector, lowerSelector }) => {
      const articles = document.querySelectorAll('[data-testid="home-venues-band"] article');
      const upper =
        upperSelector.includes("home-venues-band") && upperSelector.includes("article")
          ? articles[articles.length - 1]
          : document.querySelector(upperSelector);
      const lower = document.querySelector(lowerSelector);
      if (!upper || !lower) return -1;
      const scrollY = window.scrollY;
      const upperBottom = upper.getBoundingClientRect().bottom + scrollY;
      const lowerTop = lower.getBoundingClientRect().top + scrollY;
      return Math.round(lowerTop - upperBottom);
    },
    { upperSelector, lowerSelector },
  );
}

test.describe("mobile visual rhythm V2", () => {
  test.beforeAll(() => {
    ensureShotDir();
  });

  for (const viewport of MOBILE_VIEWPORTS) {
    test(`captures transition evidence at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const transitions = [
        {
          id: "venue-to-services",
          upper: '[data-testid="home-venues-band"] article:last-child',
          lower: '[data-testid="home-services-eyebrow"]',
          maxGap: 56,
        },
        {
          id: "hero-to-in-motion",
          upper: "section.relative.overflow-hidden.border-b .atmosphere-grain",
          lower: '[data-testid="home-video-proof-eyebrow"]',
          maxGap: 56,
        },
        {
          id: "faq-to-finale",
          upper: "section#faq",
          lower: '[data-testid="home-finale-well"]',
          maxGap: 96,
        },
        {
          id: "portrait-to-about",
          upper: '[data-testid="home-patrick-portrait"]',
          lower: '[data-testid="home-about-copy"] .text-amber-300',
          maxGap: 48,
        },
      ] as const;

      for (const transition of transitions) {
        await page.locator(transition.lower).scrollIntoViewIfNeeded();
        const gap = await gapBetween(page, transition.upper, transition.lower);
        expect(gap, `${transition.id} at ${viewport.name}`).toBeGreaterThan(0);
        expect(
          gap,
          `${transition.id} gap at ${viewport.name} should be ≤ ${transition.maxGap}px (measured ${gap}px)`,
        ).toBeLessThanOrEqual(transition.maxGap);

        const scrollTarget =
          transition.id === "venue-to-services"
            ? page.locator('[data-testid="home-venues-band"] article').last()
            : page.locator(transition.upper).first();
        await scrollTarget.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await page.screenshot({
          path: join(SHOT_DIR, `${viewport.name}-${transition.id}.png`),
          fullPage: false,
        });
      }

      await page.screenshot({
        path: join(SHOT_DIR, `${viewport.name}-homepage-overview.png`),
        fullPage: true,
      });
    });
  }

  test("captures desktop overview at 1440x900", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: join(SHOT_DIR, "1440x900-homepage-overview.png"),
      fullPage: true,
    });
  });
});
