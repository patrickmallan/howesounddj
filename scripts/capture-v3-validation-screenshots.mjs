#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = join(process.cwd(), "research/availability-success-v3");
const OUT = join(process.cwd(), "docs/handoff/screenshots/availability-success-v3-validation");
const PAGES = [
  ["concept-2-pre-check.html", "c2-pre-check"],
  ["concept-2-human-connection.html", "c2-success"],
  ["concept-2-contact-full.html", "c2-contact-full"],
  ["concept-2-reduced-motion.html", "c2-reduced-motion"],
  ["current-v2-reference.html", "v2-reference"],
];
const VIEWPORTS = [
  { tag: "1280x720", width: 1280, height: 720 },
  { tag: "390x844", width: 390, height: 844, isMobile: true },
  { tag: "375x812", width: 375, height: 812, isMobile: true },
];

async function capture(browser, file, slug, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.isMobile ? 3 : 2,
    isMobile: Boolean(vp.isMobile),
  });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(join(ROOT, file)).href);
  await page.screenshot({ path: join(OUT, `${slug}-${vp.tag}.png`) });
  const metrics = await page.evaluate(() => {
    const panel = document.querySelector(".panel");
    const cta = document.querySelector(".cta");
    const pr = panel?.getBoundingClientRect();
    const cr = cta?.getBoundingClientRect();
    return {
      panelH: pr ? Math.round(pr.height) : null,
      ctaVisible: pr && cr ? cr.top >= pr.top && cr.bottom <= pr.bottom : null,
      scroll: panel ? panel.scrollHeight > panel.clientHeight : null,
    };
  });
  await ctx.close();
  return metrics;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  try {
    for (const [file, slug] of PAGES) {
      for (const vp of VIEWPORTS) {
        const m = await capture(browser, file, slug, vp);
        report.push({ file, slug, viewport: vp.tag, ...m });
        console.log(slug, vp.tag, m);
      }
    }
  } finally {
    await browser.close();
  }
}

main();
