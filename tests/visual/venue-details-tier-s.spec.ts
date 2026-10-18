import { expect, test } from "@playwright/test";
import { ACTIVE_VENUE_PAGES } from "../../src/config/venue-pages";
import { VENUE_EDITORIAL } from "../../src/config/venue-editorial";
import { VENUE_HEADING_ART } from "../../src/config/venue-heading-art";

const viewports = [320, 390, 1280, 1920] as const;

test("Every active venue has heading art and researched editorial content", () => {
  const slugs = ACTIVE_VENUE_PAGES.map((venue) => venue.slug).sort();
  expect(Object.keys(VENUE_HEADING_ART).sort()).toEqual(slugs);
  expect(Object.keys(VENUE_EDITORIAL).sort()).toEqual(slugs);
});

for (const venue of ACTIVE_VENUE_PAGES) {
  for (const width of viewports) {
    test(`${venue.name} has readable, non-overlapping content at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 1080 });
      const response = await page.goto(`/venues/${venue.slug}`, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(venue.name);
      await expect(page.locator(".venue-dossier-heading img")).toBeVisible();
      await expect(page.locator(".venue-dossier-facts li")).toHaveCount(3);
      await expect(page.locator(".venue-dossier-cues li")).toHaveCount(3);
      await expect(page.locator(".venue-dossier-research-note a").first()).toHaveAttribute("href", VENUE_EDITORIAL[venue.slug].sources[0].url);
      await expect(page.locator(".venue-dossier-date-cue")).toHaveAttribute("href", "/contact#availability");
      await expect(page.locator(".venue-dossier-art-caption, .venue-dossier-section-number, .venue-dossier-cue-index")).toHaveCount(0);

      const layout = await page.evaluate(() => {
        const box = (selector: string) => document.querySelector(selector)?.getBoundingClientRect();
        const detailsHeading = box(".venue-dossier-details h2");
        const facts = box(".venue-dossier-facts");
        const planHeading = box(".venue-dossier-plan h2");
        const cues = box(".venue-dossier-cues");
        const headings = [...document.querySelectorAll<HTMLElement>(".venue-dossier-details h2, .venue-dossier-plan h2, .venue-dossier-outro h2")];
        const cards = [...document.querySelectorAll<HTMLElement>(".venue-dossier-facts li, .venue-dossier-cues li")];
        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          detailsClearance: detailsHeading && facts ? facts.top - detailsHeading.bottom : -1,
          planClearance: planHeading && cues ? cues.top - planHeading.bottom : -1,
          headings: headings.map((heading) => {
            const style = getComputedStyle(heading);
            return {
              font: style.fontFamily,
              lineRatio: parseFloat(style.lineHeight) / parseFloat(style.fontSize),
              width: heading.getBoundingClientRect().width,
            };
          }),
          venueBackgrounds: [".venue-dossier-details", ".venue-dossier-plan", ".venue-dossier-outro"].map((selector) => getComputedStyle(document.querySelector(selector)!).backgroundImage),
          cardOverflow: cards.some((card) => card.scrollWidth > card.clientWidth + 1),
        };
      });

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.detailsClearance).toBeGreaterThan(16);
      expect(layout.planClearance).toBeGreaterThan(16);
      expect(layout.cardOverflow).toBe(false);
      expect(layout.headings).toHaveLength(3);
      for (const heading of layout.headings) {
        expect(heading.font).toContain("HSDJ Meter Matrix V6");
        expect(heading.lineRatio).toBeGreaterThanOrEqual(1.3);
        expect(heading.width).toBeGreaterThan(width < 800 ? 200 : 500);
      }
      for (const background of layout.venueBackgrounds) {
        expect(background).toContain(VENUE_EDITORIAL[venue.slug].portrait);
      }
    });
  }
}

for (const venue of ACTIVE_VENUE_PAGES.filter((item) => ["sea-to-sky-gondola", "sitka-farms", "capilano-university-squamish-campus"].includes(item.slug))) {
  test(`${venue.name} keeps its essential content without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      const response = await page.goto(`/venues/${venue.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(venue.name);
      await expect(page.locator(".venue-dossier-facts li")).toHaveCount(3);
      await expect(page.locator(".venue-dossier-research-note a").first()).toBeVisible();
    } finally {
      await context.close();
    }
  });
}
