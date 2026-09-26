import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const ROUTES = [
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

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const SHOT_DIR = join(process.cwd(), "tmp/site-responsive-audit");

function routeName(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "--");
}

async function materializePage(page: Page) {
  await page.addStyleTag({
    content: ".below-fold-content { content-visibility: visible !important; contain-intrinsic-size: none !important; }",
  });
  const sections = await page.locator("main section").all();
  for (const section of sections) await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
}

test("public routes remain readable and contained at mobile, tablet, and desktop sizes", async ({ browser }) => {
  test.setTimeout(600_000);
  mkdirSync(SHOT_DIR, { recursive: true });

  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    page.setDefaultNavigationTimeout(30_000);
    const runtimeErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    for (const route of ROUTES) {
      runtimeErrors.length = 0;
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} should load at ${viewport.name}`).toBe(true);
      await materializePage(page);

      const geometry = await page.evaluate(() => {
        const visible = (element: Element) => {
          const box = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return box.width > 0 && box.height > 0 && style.visibility !== "hidden" && style.display !== "none";
        };
        const outOfBoundsHeadings = [...document.querySelectorAll("main h1, main h2")]
          .filter(visible)
          .map((element) => {
            const box = element.getBoundingClientRect();
            return {
              text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "",
              left: box.left,
              right: box.right,
            };
          })
          .filter((heading) => heading.left < -2 || heading.right > window.innerWidth + 2);

        return {
          bodyWidth: document.body.scrollWidth,
          documentWidth: document.documentElement.scrollWidth,
          h1Count: [...document.querySelectorAll("main h1")].filter(visible).length,
          outOfBoundsHeadings,
          viewportWidth: window.innerWidth,
        };
      });

      expect(geometry.h1Count, `${route} needs one visible H1 at ${viewport.name}`).toBe(1);
      expect(
        Math.max(geometry.bodyWidth, geometry.documentWidth),
        `${route} has horizontal overflow at ${viewport.name}`,
      ).toBeLessThanOrEqual(geometry.viewportWidth + 2);
      expect(geometry.outOfBoundsHeadings, `${route} has clipped headings at ${viewport.name}`).toEqual([]);
      expect(runtimeErrors, `${route} has runtime errors at ${viewport.name}`).toEqual([]);

      await page.screenshot({
        path: join(SHOT_DIR, `${viewport.name}--${routeName(route)}.png`),
        fullPage: true,
      });
    }

    await page.close();
  }
});
