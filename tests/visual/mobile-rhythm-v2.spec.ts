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

async function expectBalancedInsets(page: import("@playwright/test").Page, selector: string) {
  const insets = await page.locator(selector).evaluate((element) => {
    const styles = window.getComputedStyle(element);
    return {
      top: Number.parseFloat(styles.paddingTop),
      bottom: Number.parseFloat(styles.paddingBottom),
    };
  });

  expect(insets.top, `${selector} needs meaningful top space`).toBeGreaterThanOrEqual(32);
  expect(insets.bottom, `${selector} needs meaningful bottom space`).toBeGreaterThanOrEqual(32);
  expect(Math.abs(insets.top - insets.bottom), `${selector} must be vertically balanced`).toBeLessThanOrEqual(1);
}

async function materializeBelowFoldSections(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: ".below-fold-content { content-visibility: visible !important; contain-intrinsic-size: none !important; }",
  });
  const sections = await page.locator("main section").all();
  for (const section of sections) {
    await section.scrollIntoViewIfNeeded();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe("mobile visual rhythm V2", () => {
  test.beforeAll(() => {
    ensureShotDir();
  });

  test.beforeEach(async ({ page }) => {
    // Production CSP upgrades subresources to HTTPS. The local test server is
    // HTTP-only, so proxy those upgraded requests back to the same local origin.
    await page.route(/^https:\/\/(?:127\.0\.0\.1|localhost):3000\//, async (route) => {
      const localUrl = route.request().url().replace(/^https:/, "http:");
      const response = await page.request.fetch(localUrl);
      await route.fulfill({ response });
    });
  });

  for (const viewport of MOBILE_VIEWPORTS) {
    test(`captures transition evidence at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "load" });

      for (const selector of [
        '[data-testid="home-hero-inner"]',
        '[data-testid="home-video-proof-inner"]',
        '[data-testid="home-venues-band"]',
        '[data-testid="home-services-section"]',
        '[data-testid="home-about-grid"]',
        '[data-testid="home-faq-section"]',
        '[data-testid="home-finale-section"]',
        '[data-testid="home-explore-inner"]',
      ]) {
        await expectBalancedInsets(page, selector);
      }

      await materializeBelowFoldSections(page);
      await page.screenshot({
        path: join(SHOT_DIR, `${viewport.name}-homepage-overview.png`),
        fullPage: true,
      });
    });
  }

  test("captures desktop overview at 1440x900", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "load" });
    await materializeBelowFoldSections(page);
    await page.screenshot({
      path: join(SHOT_DIR, "1440x900-homepage-overview.png"),
      fullPage: true,
    });
  });

  test("keeps finale bands balanced across public page types", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const routes = [
      "/about",
      "/contact",
      "/faq",
      "/guides",
      "/packages",
      "/reviews",
      "/squamish-wedding-dj",
      "/stories",
      "/vancouver-wedding-dj",
      "/venues",
      "/weddings",
      "/guides/how-to-choose-a-wedding-dj-in-squamish",
      "/stories/sea-to-sky-wedding-dance-floor-energy",
      "/venues/sea-to-sky-gondola",
    ];

    for (const route of routes) {
      await page.goto(route);
      const insets = await page.locator("main section").last().evaluate((section) => {
        const own = window.getComputedStyle(section);
        const inner = section.querySelector(":scope > div");
        const child = inner ? window.getComputedStyle(inner) : null;
        return {
          top: Number.parseFloat(own.paddingTop) + Number.parseFloat(child?.paddingTop ?? "0"),
          bottom: Number.parseFloat(own.paddingBottom) + Number.parseFloat(child?.paddingBottom ?? "0"),
        };
      });
      expect(Math.abs(insets.top - insets.bottom), `${route} finale must be balanced`).toBeLessThanOrEqual(1);
    }
  });
});
