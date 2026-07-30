#!/usr/bin/env node
/**
 * Geometry certification for Availability Success V3 implementation.
 * Outputs research/availability-success-v3/implementation-geometry-proof.json
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3459";
const OUT_DIR = join(process.cwd(), "research/availability-success-v3");
const OUT = join(OUT_DIR, "implementation-geometry-proof.json");

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

  await panel.getByPlaceholder("YYYY").fill("2028");
  await panel.getByPlaceholder("MM").fill("06");
  await panel.getByPlaceholder("DD").fill("15");
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await page
    .locator("#post-availability-success-heading-compact")
    .waitFor({ timeout: 30000 });

  const metrics = await panel.evaluate((el) => {
    const panelRect = el.getBoundingClientRect();
    const success = el.querySelector(
      '[aria-labelledby="post-availability-success-heading-compact"]',
    );
    const bodyScroll = success?.querySelector(".overflow-y-auto");
    const footer = success?.querySelector("footer");
    const cta = footer?.querySelector("a[href*='calendly']");
    const editDate = success?.querySelector('button[aria-label*="Edit wedding date"]');
    const closeBtn = el.querySelector('button[aria-label="Close availability check"]');
    const checkBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Check Availability"),
    );
    const dateInputs = el.querySelectorAll(
      'input[placeholder="YYYY"], input[placeholder="MM"], input[placeholder="DD"]',
    );
    const heading = document.getElementById("post-availability-success-heading-compact");
    const ctaRect = cta?.getBoundingClientRect();
    const footerRect = footer?.getBoundingClientRect();
    const bodyRect = bodyScroll?.getBoundingClientRect();
    const ctaVisible =
      ctaRect &&
      ctaRect.top >= 0 &&
      ctaRect.bottom <= window.innerHeight &&
      ctaRect.width > 0;

    const ctaStyles = cta ? window.getComputedStyle(cta) : null;
    const ctaWraps =
      cta &&
      (cta.scrollWidth > cta.clientWidth + 1 ||
        (ctaStyles?.whiteSpace !== "nowrap" && cta.getClientRects().length > 1));

    return {
      panelTop: Math.round(panelRect.top),
      panelHeight: Math.round(panelRect.height),
      bodyClientHeight: bodyScroll ? Math.round(bodyScroll.clientHeight) : null,
      bodyScrollHeight: bodyScroll ? Math.round(bodyScroll.scrollHeight) : null,
      bodyTop: bodyRect ? Math.round(bodyRect.top) : null,
      footerHeight: footerRect ? Math.round(footerRect.height) : null,
      ctaTop: ctaRect ? Math.round(ctaRect.top) : null,
      ctaBottom: ctaRect ? Math.round(ctaRect.bottom) : null,
      ctaInitiallyVisible: Boolean(ctaVisible),
      ctaWraps: Boolean(ctaWraps),
      formStillVisible: Boolean(checkBtn) || Array.from(dateInputs).some((i) => i.offsetParent !== null),
      activeFocusTarget:
        document.activeElement?.id ||
        document.activeElement?.getAttribute("aria-label") ||
        document.activeElement?.tagName,
      headingHasFocus: document.activeElement === heading,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      editDateVisible: editDate ? editDate.getBoundingClientRect().height > 0 : false,
      closeControlVisible: closeBtn ? closeBtn.getBoundingClientRect().height > 0 : false,
      safeAreaPaddingBottom: footer
        ? window.getComputedStyle(footer).paddingBottom
        : null,
    };
  });

  await context.close();
  return { viewport: vp.name, size: `${vp.width}x${vp.height}`, metrics };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const vp of VIEWPORTS) {
      results.push(await measureViewport(browser, vp));
    }
    const summary = {
      generatedAt: new Date().toISOString(),
      baseUrl: BASE,
      variant: "human_connection_v3",
      viewports: results,
      pass:
        results.every((r) => r.metrics.ctaInitiallyVisible === true) &&
        results.every((r) => r.metrics.formStillVisible === false) &&
        results.every((r) => r.metrics.horizontalOverflow === false) &&
        results.every((r) => r.metrics.headingHasFocus === true),
    };
    writeFileSync(OUT, JSON.stringify(summary, null, 2));
    console.log(`Implementation geometry proof written to ${OUT}`);
    console.log(JSON.stringify(summary, null, 2));
    if (!summary.pass) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
