#!/usr/bin/env node
/**
 * Forensic geometry audit for availability success (V3 research only).
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3459";
const OUT_DIR = join(process.cwd(), "research/availability-success-v3");
const OUT = join(OUT_DIR, "geometry-audit.json");

const VIEWPORTS = [
  { name: "desktop-1280", width: 1280, height: 720, mobile: false },
  { name: "desktop-1512", width: 1512, height: 982, mobile: false },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-375", width: 375, height: 812, mobile: true },
];

async function measureViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.mobile ? 3 : 2,
    isMobile: vp.mobile,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("banner").getByRole("button", { name: /Check Availability/i }).click();

  const panel = page.getByRole("dialog", { name: "Check wedding date availability" });
  await panel.waitFor();

  const preCheck = await panel.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const checkBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Check Availability"),
    );
    return {
      panelHeight: Math.round(rect.height),
      panelTop: Math.round(rect.top),
      panelMaxScroll: el.scrollHeight - el.clientHeight,
      formSectionHeight: el.querySelector(".space-y-4")
        ? Math.round(el.querySelector(".space-y-4").getBoundingClientRect().height)
        : null,
      checkButtonBottom: checkBtn ? Math.round(checkBtn.getBoundingClientRect().bottom) : null,
      viewportHeight: window.innerHeight,
    };
  });

  await panel.getByPlaceholder("YYYY").fill("2028");
  await panel.getByPlaceholder("MM").fill("06");
  await panel.getByPlaceholder("DD").fill("15");
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await page
    .locator('[aria-labelledby="post-availability-success-heading-compact"]')
    .waitFor({ timeout: 30000 });

  const postCheck = await panel.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const success = el.querySelector(
      '[aria-labelledby="post-availability-success-heading-compact"]',
    );
    const cta = success?.querySelector("a[href*='calendly']");
    const formBlock = el.querySelector(".space-y-4");
    const dateInputs = el.querySelectorAll(
      'input[placeholder="YYYY"], input[placeholder="MM"], input[placeholder="DD"]',
    );
    const ctaRect = cta?.getBoundingClientRect();
    const ctaVisible =
      ctaRect &&
      ctaRect.top >= rect.top &&
      ctaRect.bottom <= rect.bottom &&
      ctaRect.top < window.innerHeight;

    return {
      panelHeight: Math.round(rect.height),
      panelScrollHeight: el.scrollHeight,
      panelClientHeight: el.clientHeight,
      scrollRequired: el.scrollHeight > el.clientHeight,
      scrollOverflowPx: Math.max(0, el.scrollHeight - el.clientHeight),
      formStillVisible:
        dateInputs.length > 0 && Array.from(dateInputs).some((i) => i.offsetParent !== null),
      formBlockHeight: formBlock ? Math.round(formBlock.getBoundingClientRect().height) : null,
      resultHeight: success ? Math.round(success.getBoundingClientRect().height) : null,
      ctaTop: ctaRect ? Math.round(ctaRect.top) : null,
      ctaBottom: ctaRect ? Math.round(ctaRect.bottom) : null,
      ctaInitiallyVisible: Boolean(ctaVisible),
      panelScrollTop: el.scrollTop,
      focusActiveId: document.activeElement?.id || document.activeElement?.tagName,
    };
  });

  await context.close();
  return { viewport: vp.name, size: `${vp.width}x${vp.height}`, preCheck, postCheck };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const vp of VIEWPORTS) {
      results.push(await measureViewport(browser, vp));
    }
    writeFileSync(OUT, JSON.stringify(results, null, 2));
    console.log(`Geometry audit written to ${OUT}`);
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
