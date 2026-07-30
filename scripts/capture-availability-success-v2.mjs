#!/usr/bin/env node
/**
 * One-off Playwright capture for HSDJ-WEB-AVAILABILITY-SUCCESS-V2 handoff screenshots.
 * Not part of the production test suite.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3459";
const OUT = join(process.cwd(), "docs/handoff/screenshots/availability-success-v2");

async function fillDate(page, prefix = "") {
  const year = prefix ? `#${prefix}-wedding-date-year` : "#wedding-date-year";
  const month = prefix ? `#${prefix}-wedding-date-month` : "#wedding-date-month";
  const day = prefix ? `#${prefix}-wedding-date-day` : "#wedding-date-day";

  await page.locator(year).fill("2028");
  await page.locator(month).fill("06");
  await page.locator(day).fill("15");
}

async function waitForSuccess(page) {
  await page.getByRole("heading", { name: /Patrick is available/i }).waitFor({
    timeout: 30000,
  });
}

async function captureContactFull(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/contact#availability`, { waitUntil: "networkidle" });
  await fillDate(page);
  await page.locator("#availability").getByRole("button", { name: "Check Availability" }).click();
  await waitForSuccess(page);
  const card = page.locator('[aria-labelledby="post-availability-success-heading-full"]');
  await card.screenshot({ path: join(OUT, "v2-full-desktop-1280.png") });
  await context.close();
}

async function captureContactMobile(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/contact#availability`, { waitUntil: "networkidle" });
  await fillDate(page);
  await page.locator("#availability").getByRole("button", { name: "Check Availability" }).click();
  await waitForSuccess(page);
  const card = page.locator('[aria-labelledby="post-availability-success-heading-full"]');
  await card.screenshot({ path: join(OUT, "v2-full-mobile-390.png") });
  await context.close();
}

async function captureCompactMobile(browser) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("banner").getByRole("button", { name: /Check Availability/i }).click();
  const panel = page.locator('[role="dialog"]');
  await panel.getByPlaceholder("YYYY").fill("2028");
  await panel.getByPlaceholder("MM").fill("06");
  await panel.getByPlaceholder("DD").fill("15");
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await waitForSuccess(page);
  const card = page.locator('[aria-labelledby="post-availability-success-heading-compact"]');
  await card.screenshot({ path: join(OUT, "v2-compact-mobile-375.png") });
  await context.close();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    await captureContactFull(browser);
    await captureContactMobile(browser);
    await captureCompactMobile(browser);
    console.log(`Screenshots saved to ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
