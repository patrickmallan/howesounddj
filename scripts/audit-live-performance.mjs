/**
 * Read-only cold-navigation lab sampling for the public site.
 *
 * Run with: HSDJ_PERF_BASE_URL=https://www.howesounddj.com node scripts/audit-live-performance.mjs
 * The default profile samples one URL per page template on mobile and desktop,
 * then repeats the three currently slow critical routes twice more on mobile.
 * Output is JSON lines so results can be retained without mixing in user data.
 * This is not Lighthouse or real-user Core Web Vitals.
 */
import { chromium } from "playwright";

const base = (process.env.HSDJ_PERF_BASE_URL || "https://www.howesounddj.com").replace(/\/$/, "");
const waitMs = Number(process.env.HSDJ_PERF_WAIT_MS || 6000);
const profiles = {
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, cpu: 4, latency: 150, download: 200_000, upload: 100_000 },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, cpu: 1, latency: 40, download: 1_000_000, upload: 500_000 },
};

async function routesFromSitemap() {
  const response = await fetch(`${base}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap returned ${response.status}`);
  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const venueDetail = paths.find((path) => path.startsWith("/venues/") && path !== "/venues/");
  if (!venueDetail) throw new Error("No venue-detail URL found in sitemap");
  const selected = [
    "/", "/weddings", "/packages", "/reviews", "/faq", "/contact", "/about",
    "/venues", venueDetail, "/guides", "/guides/how-to-choose-a-wedding-dj-in-squamish",
    "/stories", "/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like",
    "/squamish-wedding-dj", "/vancouver-wedding-dj",
  ];
  for (const path of selected) {
    if (!paths.includes(path)) {
      throw new Error(`Template sample not in sitemap: ${path}`);
    }
  }
  return selected;
}

async function sample(browser, profileName, path, run) {
  const profile = profiles[profileName];
  const context = await browser.newContext({
    viewport: profile.viewport,
    deviceScaleFactor: profile.deviceScaleFactor,
    isMobile: profile.isMobile,
    hasTouch: profile.hasTouch,
    ignoreHTTPSErrors: new URL(base).hostname === "127.0.0.1",
  });
  const page = await context.newPage();
  await page.addInitScript((trace) => {
    window.__hsdjPerfTrace = trace;
    window.__hsdjPerf = { lcp: 0, lcpTag: "", lcpUrl: "", cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__hsdjPerf.lcp = entry.startTime;
        window.__hsdjPerf.lcpTag = entry.element?.tagName || "";
        window.__hsdjPerf.lcpUrl = entry.url || "";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__hsdjPerf.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  }, process.env.HSDJ_PERF_TRACE === "1");
  const devtools = await context.newCDPSession(page);
  await devtools.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: profile.latency,
    downloadThroughput: profile.download,
    uploadThroughput: profile.upload,
  });
  await devtools.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });

  let status = null;
  let finalPath = null;
  let error = null;
  try {
    const response = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60_000 });
    status = response?.status() ?? null;
    finalPath = new URL(page.url()).pathname;
    await page.waitForTimeout(waitMs);
  } catch (cause) {
    error = String(cause instanceof Error ? cause.message : cause);
  }

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const lcpUrl = window.__hsdjPerf.lcpUrl;
    return {
      lcpMs: Math.round(window.__hsdjPerf.lcp),
      lcpTag: window.__hsdjPerf.lcpTag,
      lcpResource: lcpUrl ? new URL(lcpUrl).pathname : "",
      fcpMs: Math.round(performance.getEntriesByType("paint").find((entry) => entry.name === "first-contentful-paint")?.startTime || 0),
      cls: Number(window.__hsdjPerf.cls.toFixed(4)),
      domContentLoadedMs: Math.round(nav?.domContentLoadedEventEnd || 0),
      loadMs: Math.round(nav?.loadEventEnd || 0),
      requestCount: resources.length,
      reportedTransferKB: Math.round((resources.reduce((sum, entry) => sum + entry.transferSize, 0) + (nav?.transferSize || 0)) / 1024),
      slowResources: window.__hsdjPerfTrace
        ? resources.filter((entry) => entry.startTime < 7000)
            .map((entry) => ({
              path: new URL(entry.name).pathname,
              startMs: Math.round(entry.startTime),
              endMs: Math.round(entry.responseEnd),
              kb: Math.round(entry.transferSize / 1024),
            }))
            .sort((a, b) => b.endMs - a.endMs)
            .slice(0, 18)
        : undefined,
    };
  }).catch(() => ({}));
  await context.close();
  return { at: new Date().toISOString(), profile: profileName, path, finalPath, run, status, ...metrics, error };
}

const routes = await routesFromSitemap();
const browser = await chromium.launch({ headless: true });
try {
  const mode = process.env.HSDJ_PERF_MODE || "all";
  const critical = ["/", "/faq", "/contact"];
  const selectedRoutes = process.env.HSDJ_PERF_PATHS?.split(",").filter(Boolean) || (mode === "critical" ? critical : routes);
  const selectedProfiles = process.env.HSDJ_PERF_PROFILE ? [process.env.HSDJ_PERF_PROFILE] : Object.keys(profiles);
  for (const profile of selectedProfiles) {
    for (const path of selectedRoutes) {
      console.log(JSON.stringify(await sample(browser, profile, path, 1)));
    }
  }
  for (const path of selectedRoutes.filter((path) => critical.includes(path))) {
    for (let run = 2; run <= 3; run += 1) {
      console.log(JSON.stringify(await sample(browser, "mobile", path, run)));
    }
  }
} finally {
  await browser.close();
}
