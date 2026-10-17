import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/weddings",
  "/packages",
  "/about",
  "/reviews",
  "/faq",
  "/contact",
  "/venues",
  "/venues/sea-to-sky-gondola",
  "/guides",
  "/guides/sea-to-sky-wedding-dj-cost",
  "/guides/how-to-choose-a-wedding-dj-in-squamish",
  "/guides/how-to-keep-a-wedding-dance-floor-packed",
  "/stories",
  "/stories/sea-to-sky-wedding-dance-floor-energy",
  "/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like",
  "/stories/what-a-sunwolf-riverside-wedding-reception-feels-like",
  "/squamish-wedding-dj",
  "/whistler-wedding-dj",
  "/vancouver-wedding-dj",
] as const;

for (const width of [390, 1440]) {
  test(`public H1 and H2 styles follow the brand hierarchy at ${width}px`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 900 });
    const failures: string[] = [];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.ok(), `${route} should load`).toBe(true);

      const audit = await page.locator("main").evaluate((main) => {
        const visible = (element: Element) => {
          const bounds = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return bounds.width > 0 && bounds.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        };
        const headings = [...main.querySelectorAll("h1")].filter(visible);
        const missingFixture = headings.filter((heading) => !heading.querySelector("svg, img[src*='.svg']"));
        const wrongH2s = [...main.querySelectorAll("h2:not(.sr-only)")]
          .filter(visible)
          .filter((heading) => !getComputedStyle(heading).fontFamily.includes("HSDJ Meter Matrix V6"))
          .map((heading) => heading.textContent?.trim().replace(/\s+/g, " ").slice(0, 90));
        return { h1Count: headings.length, missingFixture: missingFixture.length, wrongH2s };
      });

      if (audit.h1Count !== 1) failures.push(`${route}: ${audit.h1Count} visible H1s`);
      if (audit.missingFixture) failures.push(`${route}: H1 without lit-fixture artwork`);
      if (audit.wrongH2s.length) failures.push(`${route}: non-matrix H2s: ${audit.wrongH2s.join(", ")}`);
    }
    expect(failures).toEqual([]);
  });
}

test("cost guide H2 flashes individual letters automatically on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides/sea-to-sky-wedding-dj-cost");
  const heading = page.locator("main h2:not(.sr-only)").first();
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-letter-flash-ready", "true");
  await expect(heading).toHaveAttribute("data-letter-flash", "running");
  await expect.poll(() => heading.locator('span[class*="_off__"]').count(), { timeout: 4_000 }).toBeGreaterThan(0);
});

const brightHeadings = [
  { route: "/packages", selector: '[class*="weddingCopy"] h2' },
  { route: "/packages", selector: '[class*="ticketBody"] h2' },
  { route: "/reviews", selector: '[class*="dayHeader"] h2' },
  { route: "/about", selector: ".about-console-section h2" },
  { route: "/faq", selector: ".faq-mixer-channel-2 h2" },
  { route: "/faq", selector: ".faq-mixer-channel-4 h2" },
  { route: "/faq", selector: ".faq-mixer-finale h2" },
  { route: "/venues", selector: ".venue-journey-outro h2" },
  { route: "/venues/sea-to-sky-gondola", selector: ".venue-dossier-outro h2" },
] as const;

for (const width of [390, 1440]) {
  test(`H2s on bright surfaces keep the appropriate contrast at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const { route, selector } of brightHeadings) {
      await page.goto(route);
      const heading = page.locator(selector);
      await expect(heading, `${route} ${selector} should exist`).toHaveCount(1);
      await expect(heading).toHaveCSS("font-palette", width < 768 ? "--hsdj-paper-light" : "--hsdj-ink-on-light");
    }
  });
}
