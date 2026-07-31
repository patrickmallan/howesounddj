#!/usr/bin/env node
/**
 * Screenshot capture for Availability Success V3.2 visual hierarchy certification.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3459";
const OUT = join(process.cwd(), "docs/handoff/screenshots/availability-success-v3-2");

async function fillDateInPanel(panel) {
  await panel.getByPlaceholder("YYYY").fill("2028");
  await panel.getByPlaceholder("MM").fill("06");
  await panel.getByPlaceholder("DD").fill("15");
}

async function fillDateOnContact(page) {
  await page.locator("#wedding-date-year").fill("2028");
  await page.locator("#wedding-date-month").fill("06");
  await page.locator("#wedding-date-day").fill("15");
}

async function openHeaderPanel(page) {
  await page.getByRole("banner").getByRole("button", { name: /Check Availability/i }).click();
  return page.getByRole("dialog", { name: "Check wedding date availability" });
}

async function waitForCompactSuccess(page) {
  await page.locator("#post-availability-success-heading-compact").waitFor({ timeout: 30000 });
}

async function waitForFullSuccess(page) {
  await page.locator("#post-availability-success-heading-full").waitFor({ timeout: 30000 });
}

async function captureCompact(browser, width, height, name, mobile = false) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: mobile,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const panel = await openHeaderPanel(page);
  await fillDateInPanel(panel);
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await waitForCompactSuccess(page);
  await panel.screenshot({ path: join(OUT, name) });
  await context.close();
}

async function captureContactFull(browser, width, height, name, mobile = false) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: mobile,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/contact#availability`, { waitUntil: "networkidle" });
  await fillDateOnContact(page);
  await page.locator("#availability").getByRole("button", { name: "Check Availability" }).click();
  await waitForFullSuccess(page);
  const card = page.locator('[aria-labelledby="post-availability-success-heading-full"]');
  await card.screenshot({ path: join(OUT, name) });
  await context.close();
}

async function captureZoom200(browser) {
  const context = await browser.newContext({
    viewport: { width: 640, height: 360 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  const panel = await openHeaderPanel(page);
  await fillDateInPanel(panel);
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await waitForCompactSuccess(page);
  await panel.screenshot({ path: join(OUT, "compact-available-zoom-200-640.png") });
  await context.close();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    await captureCompact(browser, 1280, 720, "compact-available-1280x720.png");
    await captureCompact(browser, 390, 844, "compact-available-390x844.png", true);
    await captureCompact(browser, 375, 812, "compact-available-375x812.png", true);
    await captureContactFull(browser, 1280, 900, "contact-full-available-1280.png");
    await captureZoom200(browser);
    console.log(`V3.2 screenshots saved to ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
