/**
 * Read-only mobile interaction probe. The availability endpoint is intercepted
 * with a clearly labeled fixture; this script never submits a real date check,
 * contact message, or consultation booking.
 *
 * HSDJ_VISITOR_BASE_URL=https://www.howesounddj.com node scripts/audit-visitor-interactions.mjs
 */
import { chromium } from "playwright";

const base = (process.env.HSDJ_VISITOR_BASE_URL || "http://127.0.0.1:3100").replace(/\/$/, "");
const date = "2028-08-07";
const browser = await chromium.launch({ headless: true });
const results = [];

async function scenario(name, run, action) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const devtools = await context.newCDPSession(page);
  await devtools.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 200_000,
    uploadThroughput: 100_000,
  });
  await devtools.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  // Synthetic actions must not pollute the site's analytics or live Operations.
  await context.route(/google-analytics\.com|googletagmanager\.com|google\.com\/g\/collect/, (route) => route.abort());
  await context.route("**/api/availability-journey/event", (route) => route.fulfill({ status: 204 }));
  try {
    const timings = await action(page, context);
    results.push({ name, run, ok: true, ...timings });
  } catch (error) {
    results.push({ name, run, ok: false, error: String(error instanceof Error ? error.message : error).slice(0, 220) });
  } finally {
    await context.close();
  }
}

function elapsed(started) {
  return Math.round(performance.now() - started);
}

for (let run = 1; run <= 3; run += 1) {
  await scenario("squamish-menu-to-contact", run, async (page) => {
    await page.goto(`${base}/squamish-wedding-dj`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.waitFor({ state: "visible" });
    const openedAt = performance.now();
    await menu.click();
    await page.getByRole("dialog", { name: "Site menu" }).waitFor({ state: "visible", timeout: 5000 });
    const menuResponseMs = elapsed(openedAt);

    const navigatedAt = performance.now();
    await page.getByRole("dialog", { name: "Site menu" }).getByRole("link", { name: "Contact" }).click();
    await page.waitForURL("**/contact", { timeout: 15_000 });
    await page.getByRole("textbox", { name: "Year (YYYY)" }).waitFor({ state: "visible", timeout: 15_000 });
    return { menuResponseMs, contactReadyMs: elapsed(navigatedAt) };
  });

  await scenario("reviews-cue", run, async (page) => {
    await page.goto(`${base}/reviews`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    const cue = page.getByRole("button", { name: /^Cue 3: review by / });
    await cue.scrollIntoViewIfNeeded();
    const started = performance.now();
    await cue.click();
    await page.waitForFunction(() => document.querySelector('[aria-label="Choose a couple\'s review"] button:nth-child(3)')?.getAttribute("aria-pressed") === "true", null, { timeout: 5000 });
    return { cueResponseMs: elapsed(started) };
  });

  await scenario("contact-message-and-date-fixture", run, async (page, context) => {
    let intercepted = 0;
    await context.route("**/api/availability", async (route) => {
      intercepted += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ result: "MANUAL_CONFIRMATION_REQUIRED", date, message: "Controlled test response." }),
      });
    });
    await page.goto(`${base}/contact`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    const drawerButton = page.getByRole("button", { name: "Write a message" });
    await drawerButton.scrollIntoViewIfNeeded();
    const drawerStarted = performance.now();
    await drawerButton.click();
    await page.locator("#contact-message-form").waitFor({ state: "visible", timeout: 5000 });
    const drawerResponseMs = elapsed(drawerStarted);

    const main = page.locator("main");
    await main.getByRole("textbox", { name: "Year (YYYY)" }).first().fill("2028");
    await main.getByRole("textbox", { name: "Month (MM)" }).first().fill("08");
    await main.getByRole("textbox", { name: "Day (DD)" }).first().fill("07");
    const dateStarted = performance.now();
    await main.getByRole("button", { name: "Check your date" }).first().click();
    await page.getByText("Checking Patrick's calendar for your wedding date.").waitFor({ state: "visible", timeout: 5000 });
    const feedbackMs = elapsed(dateStarted);
    await page.getByRole("heading", { name: "I need to check this one myself" }).waitFor({ state: "visible", timeout: 5000 });
    if (intercepted !== 1) throw new Error(`Expected exactly one intercepted availability request, received ${intercepted}`);
    return { drawerResponseMs, dateFeedbackMs: feedbackMs, fixtureResultMs: elapsed(dateStarted) };
  });
}

for (const result of results) console.log(JSON.stringify(result));
await browser.close();
if (results.some((result) => !result.ok)) process.exitCode = 1;
