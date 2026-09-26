import { chromium } from "playwright";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const output = path.join(root, "certification");
const url = "http://127.0.0.1:4173/design-research/physical-sample-library-v1/index.html";
const browser = await chromium.launch({ headless: true });

async function capture(name, viewport, options = {}) {
  const context = await browser.newContext({ viewport, reducedMotion: options.reducedMotion ?? "no-preference" });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true });
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    imageCount: document.images.length,
    incompleteImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
    headings: [...document.querySelectorAll("h1,h2")].map((heading) => heading.textContent.trim()),
  }));
  await context.close();
  return metrics;
}

const desktop = await capture("desktop-full-page", { width: 1440, height: 1000 });
const mobile = await capture("mobile-full-page", { width: 390, height: 844 });
const reduced = await capture("desktop-reduced-motion", { width: 1440, height: 1000 }, { reducedMotion: "reduce" });

const detailContext = await browser.newContext({ viewport: { width: 720, height: 500 }, deviceScaleFactor: 2 });
const detailPage = await detailContext.newPage();
await detailPage.goto(url, { waitUntil: "networkidle" });
await detailPage.locator("#fader").screenshot({ path: path.join(output, "fader-render-200-percent.png") });
await detailContext.close();

await browser.close();
console.log(JSON.stringify({ desktop, mobile, reduced }, null, 2));
