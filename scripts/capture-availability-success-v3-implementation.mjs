#!/usr/bin/env node
/**
 * Playwright capture for HSDJ-WEB-AVAILABILITY-SUCCESS-V3 implementation screenshots.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3459";
const OUT = join(process.cwd(), "docs/handoff/screenshots/availability-success-v3-implementation");

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

async function waitForCompactSuccess(page) {
  await page.locator("#post-availability-success-heading-compact").waitFor({ timeout: 30000 });
}

async function waitForFullSuccess(page) {
  await page.locator("#post-availability-success-heading-full").waitFor({ timeout: 30000 });
}

async function openHeaderPanel(page) {
  await page.getByRole("banner").getByRole("button", { name: /Check Availability/i }).click();
  return page.getByRole("dialog", { name: "Check wedding date availability" });
}

async function captureCompactPreCheck(browser, width, height, name, mobile = false) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: mobile,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const panel = await openHeaderPanel(page);
  await panel.screenshot({ path: join(OUT, name) });
  await context.close();
}

async function captureCompactAvailable(browser, width, height, name, mobile = false) {
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

async function captureCompactReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const panel = await openHeaderPanel(page);
  await fillDateInPanel(panel);
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await waitForCompactSuccess(page);
  await panel.screenshot({ path: join(OUT, "compact-available-reduced-motion-1280.png") });
  await context.close();
}

async function captureCompactEditDateRestored(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const panel = await openHeaderPanel(page);
  await fillDateInPanel(panel);
  await panel.getByRole("button", { name: "Check Availability" }).click();
  await waitForCompactSuccess(page);
  await panel.getByRole("button", { name: /Edit wedding date/i }).click();
  await panel.getByPlaceholder("YYYY").waitFor();
  await panel.screenshot({ path: join(OUT, "compact-edit-date-restored-1280.png") });
  await context.close();
}

async function captureContactPreCheck(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/contact#availability`, { waitUntil: "networkidle" });
  const section = page.locator("#availability");
  await section.screenshot({ path: join(OUT, "contact-full-pre-check-1280.png") });
  await context.close();
}

async function captureContactAvailable(browser, width, height, name, mobile = false) {
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

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    await captureCompactPreCheck(browser, 1280, 720, "compact-pre-check-1280.png");
    await captureCompactAvailable(browser, 1280, 720, "compact-available-1280x720.png");
    await captureCompactAvailable(browser, 1512, 982, "compact-available-1512x982.png");
    await captureCompactAvailable(browser, 390, 844, "compact-available-390x844.png", true);
    await captureCompactAvailable(browser, 375, 812, "compact-available-375x812.png", true);
    await captureCompactReducedMotion(browser);
    await captureCompactEditDateRestored(browser);
    await captureContactPreCheck(browser);
    await captureContactAvailable(browser, 1280, 900, "contact-full-available-1280.png");
    await captureContactAvailable(browser, 390, 844, "contact-full-available-390.png", true);
    console.log(`Screenshots saved to ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
