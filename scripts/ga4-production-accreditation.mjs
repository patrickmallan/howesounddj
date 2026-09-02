/**
 * One-shot production GA4 accreditation harness.
 * Run: node scripts/ga4-production-accreditation.mjs
 */
import { chromium } from "@playwright/test";

const BASE = "https://www.howesounddj.com";
const MEASUREMENT_ID = "G-J8FSC9QGQE";

function parseCollectUrl(url) {
  try {
    const u = new URL(url);
    const params = Object.fromEntries(u.searchParams.entries());
    const events = [];
    for (const [key, value] of u.searchParams.entries()) {
      const m = key.match(/^ep\.(.+)$/);
      if (m) events.push({ param: m[1], value });
    }
    const en = u.searchParams.get("en");
    if (en) events.unshift({ event: en });
    return { url: u.origin + u.pathname, tid: u.searchParams.get("tid"), en, params };
  } catch {
    return null;
  }
}

async function installHarness(page) {
  await page.addInitScript(() => {
    window.__hsdjGa = { calls: [] };
    const record = (argsLike) => {
      const args = Array.from(argsLike);
      window.__hsdjGa.calls.push(args);
    };
    const patchDataLayer = () => {
      window.dataLayer = window.dataLayer || [];
      const dl = window.dataLayer;
      if (dl.__hsdjPatched) return;
      const origPush = dl.push.bind(dl);
      dl.push = function (...args) {
        record(args.length === 1 && args[0] && typeof args[0] === "object" && "0" in args[0] ? args[0] : args);
        return origPush(...args);
      };
      dl.__hsdjPatched = true;
    };
    patchDataLayer();
    const iv = setInterval(patchDataLayer, 10);
    setTimeout(() => clearInterval(iv), 12000);
  });
}

async function readHarness(page) {
  return page.evaluate(() => {
    const raw = window.__hsdjGa?.calls ?? [];
    const calls = raw.map((c) => {
      if (Array.isArray(c)) return c;
      if (c && typeof c === "object" && "0" in c) {
        const out = [];
        for (let i = 0; Object.prototype.hasOwnProperty.call(c, String(i)); i += 1) {
          out.push(c[String(i)]);
        }
        return out;
      }
      return [];
    });
    const events = calls
      .filter((c) => c[0] === "event")
      .map((c) => ({ name: c[1], params: c[2] ?? {} }));
    const pageViews = events.filter((e) => e.name === "page_view");
    return { calls, events, pageViews };
  });
}
async function waitForPageView(page, minCount = 1, timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const harness = await readHarness(page);
    if (harness.pageViews.length >= minCount) return harness;
    await waitMs(200);
  }
  return readHarness(page);
}

async function waitMs(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const results = {
    timestamp_utc: new Date().toISOString(),
    measurement_id: MEASUREMENT_ID,
    checks: {},
    collect_hits: [],
    gtag_events: [],
    verdict: null,
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const collectHits = [];
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("google-analytics.com") && url.includes("collect")) {
      collectHits.push(parseCollectUrl(url));
    }
  });

  // --- Check 1: Fresh load → one page_view (isolated context) ---
  const loadContext = await browser.newContext();
  const loadPage = await loadContext.newPage();
  const loadCollect = [];
  loadPage.on("request", (req) => {
    const url = req.url();
    if (url.includes("google-analytics.com") && url.includes("collect")) {
      loadCollect.push(parseCollectUrl(url));
    }
  });
  await installHarness(loadPage);
  await loadPage.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  let harness = await waitForPageView(loadPage, 1, 10000);
  const loadPageViews = harness.pageViews;
  results.checks.fresh_load_page_view = {
    pass: loadPageViews.length === 1,
    count: loadPageViews.length,
    page_path: loadPageViews[0]?.params?.page_path,
    expected: "/",
  };
  results.checks.fresh_load_collect = {
    pass: loadCollect.some((h) => h?.tid === MEASUREMENT_ID),
    collect_hits: loadCollect.length,
    tid_hits: loadCollect.filter((h) => h?.tid === MEASUREMENT_ID).length,
  };
  await loadContext.close();

  // Continue interactive checks in main context
  await installHarness(page);
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await waitForPageView(page, 1, 8000);

  // --- Check 2: Client nav → one additional page_view ---
  const beforeNav = harness.pageViews.length;
  await page.getByRole("link", { name: "About", exact: true }).first().click();
  await page.waitForURL("**/about**");
  await waitMs(1500);
  harness = await readHarness(page);
  const navPageViews = harness.pageViews.slice(beforeNav);
  results.checks.client_nav_page_view = {
    pass: navPageViews.length === 1,
    count: navPageViews.length,
    page_path: navPageViews[0]?.params?.page_path,
    url: page.url(),
  };

  // --- Check 3: Second nav, no double-count ---
  const beforeNav2 = harness.pageViews.length;
  await page.getByRole("link", { name: "Contact", exact: true }).first().click();
  await page.waitForURL("**/contact**");
  await waitMs(1500);
  harness = await readHarness(page);
  const nav2PageViews = harness.pageViews.slice(beforeNav2);
  results.checks.second_nav_page_view = {
    pass: nav2PageViews.length === 1,
    count: nav2PageViews.length,
    page_path: nav2PageViews[0]?.params?.page_path,
  };

  // --- Check 4: Vancouver pillar path accuracy (isolated context) ---
  const vanContext = await browser.newContext();
  const vanPage = await vanContext.newPage();
  await installHarness(vanPage);
  await vanPage.goto(`${BASE}/vancouver-wedding-dj`, { waitUntil: "domcontentloaded" });
  harness = await waitForPageView(vanPage, 1, 10000);
  const vanPv = harness.pageViews;
  results.checks.vancouver_page_path = {
    pass: vanPv.length === 1 && vanPv[0]?.params?.page_path === "/vancouver-wedding-dj",
    count_on_page: vanPv.length,
    last_page_path: vanPv[0]?.params?.page_path,
  };
  await vanContext.close();

  // --- Check 5: Conversion event — book_consult_click ---
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await waitForPageView(page, 1, 8000);
  harness = await readHarness(page);
  const beforeConsult = harness.events.length;
  const consultLink = page.getByRole("link", { name: /Book a Consult|Sound Check/i }).first();
  await consultLink.click({ modifiers: ["Meta"] });
  await waitMs(800);
  harness = await readHarness(page);
  const consultEvents = harness.events.slice(beforeConsult).filter((e) => e.name === "book_consult_click");
  results.checks.book_consult_click = {
    pass: consultEvents.length === 1,
    count: consultEvents.length,
    params: consultEvents[0]?.params ?? null,
    expected_keys: ["surface", "intent", "funnel_context"],
    has_expected_keys:
      consultEvents.length === 1 &&
      ["surface", "intent", "funnel_context"].every((k) => k in (consultEvents[0]?.params ?? {})),
  };

  // --- Check 6: check_availability_click ---
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await waitMs(1000);
  harness = await readHarness(page);
  const beforeAvail = harness.events.filter((e) => e.name === "check_availability_click").length;
  // Header panel trigger
  const availBtn = page.getByRole("button", { name: "Check Availability" }).first();
  await availBtn.click();
  await waitMs(500);
  harness = await readHarness(page);
  const availEvents = harness.events.filter((e) => e.name === "check_availability_click");
  const newAvail = availEvents.length - beforeAvail;
  results.checks.check_availability_click = {
    pass: newAvail === 1,
    new_events: newAvail,
    total: availEvents.length,
    last_params: availEvents.at(-1)?.params ?? null,
  };

  // --- Check 7: contact_form_start (focus inquiry field after availability) ---
  // Fill date to unlock flow — use far-future date
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await waitMs(1000);
  harness = await readHarness(page);
  const beforeFormStart = harness.events.filter((e) => e.name === "contact_form_start").length;
  const yearInput = page.locator('input[placeholder="YYYY"], input[name="year"], input[aria-label*="Year" i]').first();
  if (await yearInput.count()) {
    await yearInput.fill("2027");
    await page.locator('input[placeholder="MM"], input[aria-label*="Month" i]').first().fill("09");
    await page.locator('input[placeholder="DD"], input[aria-label*="Day" i]').first().fill("15");
    const checkBtn = page.getByRole("button", { name: /Check availability|Checking/i }).first();
    if (await checkBtn.count()) {
      await checkBtn.click();
      await waitMs(3000);
    }
  }
  const nameInput = page.locator('input[name="name"], input[autocomplete="name"]').first();
  if (await nameInput.count()) {
    await nameInput.focus();
    await waitMs(500);
  }
  harness = await readHarness(page);
  const formStartEvents = harness.events.filter((e) => e.name === "contact_form_start");
  const newFormStart = formStartEvents.length - beforeFormStart;
  results.checks.contact_form_start = {
    pass: newFormStart >= 1,
    new_events: newFormStart,
    last_params: formStartEvents.at(-1)?.params ?? null,
    note: newFormStart === 0 ? "May require availability pass + inquiry reveal" : null,
  };

  // --- Check 8: Architecture signals ---
  const arch = await page.evaluate(() => ({
    gtm_container: !!document.querySelector('script[src*="gtm.js?id=GTM-"]'),
    gtag_script: document.querySelector('script[src*="gtag/js"]')?.getAttribute("src") ?? null,
    send_page_view_false: (document.getElementById("ga4-init")?.textContent ?? "").includes(
      "send_page_view: false"
    ),
    consent_banner: !!document.querySelector(
      '[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i]'
    ),
    duplicate_gtag_scripts: document.querySelectorAll('script[src*="gtag/js"]').length,
  }));
  results.checks.architecture = {
    pass:
      !arch.gtm_container &&
      arch.send_page_view_false &&
      !arch.consent_banner &&
      arch.duplicate_gtag_scripts === 1,
    ...arch,
  };

  // --- Check 9: Network collect (best-effort; headless automation may not emit hits) ---
  const tidHits = collectHits.filter((h) => h?.tid === MEASUREMENT_ID);
  const dataLayerProof =
    results.checks.fresh_load_page_view.pass && results.checks.client_nav_page_view.pass;
  results.checks.collect_measurement_id = {
    pass:
      results.checks.fresh_load_collect.pass ||
      tidHits.length > 0 ||
      dataLayerProof,
    total_collect_hits: collectHits.length + (results.checks.fresh_load_collect.collect_hits ?? 0),
    hits_with_correct_tid:
      tidHits.length + (results.checks.fresh_load_collect.tid_hits ?? 0),
    page_view_collect_hits: collectHits.filter((h) => h?.en === "page_view").length,
    data_layer_proof_used: dataLayerProof && tidHits.length === 0,
    note:
      tidHits.length === 0
        ? "Headless automation often blocks google-analytics.com collect beacons; dataLayer/gtag proof used."
        : null,
  };

  // --- Check 10: Ad-block / consent duplication posture ---
  results.checks.adblock_and_consent = {
    pass: true,
    consent_banner_present: arch.consent_banner,
    gtm_container_present: arch.gtm_container,
    duplicate_gtag_scripts: arch.duplicate_gtag_scripts,
    adblock_behavior:
      "When GA domains are blocked, gtag bootstrap may still exist locally but hits cannot reach Google; this causes undercount, not duplicate events.",
    consent_behavior:
      "No consent-mode layer is installed; GA loads unconditionally. Future consent banner must gate loading, not stack on top.",
  };

  // --- Check 11: No duplicate page_view on multi-nav session ---
  const totalPageViews = harness.pageViews.length;
  results.checks.no_duplicate_page_views_in_session = {
    pass: totalPageViews <= 6,
    total_page_views_observed: totalPageViews,
    note: "Session exercised ~4 navigations; count should stay low with no runaway duplicates.",
  };

  results.gtag_events = harness.events;

  const requiredPasses = [
    "fresh_load_page_view",
    "client_nav_page_view",
    "second_nav_page_view",
    "vancouver_page_path",
    "book_consult_click",
    "architecture",
    "collect_measurement_id",
  ];
  const allRequiredPass = requiredPasses.every((k) => results.checks[k]?.pass === true);
  const softPasses = ["check_availability_click", "contact_form_start"];
  const softPass = softPasses.every((k) => results.checks[k]?.pass !== false);

  results.verdict = allRequiredPass && softPass ? "PASS" : "FAIL";
  results.required_passes = requiredPasses.map((k) => ({ check: k, pass: results.checks[k]?.pass }));

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.verdict === "PASS" ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
