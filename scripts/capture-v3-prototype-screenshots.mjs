#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = join(process.cwd(), "research/availability-success-v3");
const OUT = join(process.cwd(), "docs/handoff/screenshots/availability-success-v3");
const PAGES = [
  "concept-1-celebration.html",
  "concept-2-human-connection.html",
  "concept-3-wedding-becomes-real.html",
  "current-v2-reference.html",
];
const VIEWPORTS = [
  { tag: "1280x720", width: 1280, height: 720 },
  { tag: "1512x982", width: 1512, height: 982 },
  { tag: "390x844", width: 390, height: 844, mobile: true },
  { tag: "375x812", width: 375, height: 812, mobile: true },
];

async function capture(browser, pageName, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.mobile ? 3 : 2,
    isMobile: Boolean(vp.mobile),
  });
  const page = await context.newPage();
  const url = pathToFileURL(join(ROOT, pageName)).href;
  await page.goto(url);
  const slug = pageName.replace(".html", "");
  const outPath = join(OUT, `${slug}-${vp.tag}.png`);
  await page.screenshot({ path: outPath, fullPage: false });
  const metrics = await page.evaluate(() => {
    const panel = document.querySelector(".panel");
    const cta = document.querySelector(".cta");
    const pr = panel?.getBoundingClientRect();
    const cr = cta?.getBoundingClientRect();
    return {
      panelHeight: pr ? Math.round(pr.height) : null,
      ctaVisible:
        pr && cr ? cr.top >= pr.top && cr.bottom <= pr.bottom : null,
      scrollRequired: panel ? panel.scrollHeight > panel.clientHeight : null,
    };
  });
  await context.close();
  return metrics;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const pageName of PAGES) {
      for (const vp of VIEWPORTS) {
        const m = await capture(browser, pageName, vp);
        console.log(`${pageName} @ ${vp.tag}`, m);
      }
    }
    console.log(`Screenshots in ${OUT}`);
  } finally {
    await browser.close();
  }
}

main();
