import { expect, test, type Page } from "@playwright/test";

type DeliveryMetrics = {
  initial: {
    totalEncodedBytes: number;
  };
  animation: {
    averageFrameMs: number;
    maxFrameMs: number;
    p95FrameMs: number;
    slowFrameRatio: number;
  };
  resources: {
    byType: Record<string, number>;
    heroArtworkRequests: number;
    footerArtworkRequests: number;
    largest: Array<{ bytes: number; name: string; type: string }>;
    totalEncodedBytes: number;
    totalTransferBytes: number;
  };
};

async function auditPackages(page: Page): Promise<DeliveryMetrics> {
  await page.goto("/packages", { waitUntil: "domcontentloaded" });
  const initial = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return {
      totalEncodedBytes: resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
    };
  });
  const sections = await page.locator("main section").all();
  for (const section of sections) await section.scrollIntoViewIfNeeded();

  return page.evaluate(async (initial) => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const byType: Record<string, number> = {};
    let totalEncodedBytes = 0;
    let totalTransferBytes = 0;
    for (const resource of resources) {
      const type = resource.initiatorType || "other";
      byType[type] = (byType[type] ?? 0) + resource.encodedBodySize;
      totalEncodedBytes += resource.encodedBodySize;
      totalTransferBytes += resource.transferSize;
    }

    window.scrollTo(0, 0);
    const frameTimes: number[] = [];
    let previous = performance.now();
    const started = previous;
    const durationMs = 4000;
    const distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    await new Promise<void>((resolve) => {
      const frame = (now: number) => {
        frameTimes.push(now - previous);
        previous = now;
        const progress = Math.min(1, (now - started) / durationMs);
        window.scrollTo(0, distance * progress);
        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

    const measured = frameTimes.slice(3).sort((a, b) => a - b);
    const slowFrames = measured.filter((time) => time > 25);
    const totalFrameTime = measured.reduce((sum, time) => sum + time, 0);
    return {
      initial,
      animation: {
        averageFrameMs: totalFrameTime / measured.length,
        maxFrameMs: measured.at(-1) ?? 0,
        p95FrameMs: measured[Math.floor(measured.length * .95)] ?? 0,
        slowFrameRatio: slowFrames.length / measured.length,
      },
      resources: {
        byType,
        heroArtworkRequests: resources.filter((resource) => resource.name.includes("/_next/image?") && resource.name.includes("footer-dj-mixer-collage-v2-optimized.webp")).length,
        footerArtworkRequests: resources.filter((resource) => resource.name.includes("/images/hsdj-redesign/footer/footer-dj-mixer-collage-v2-optimized.webp")).length,
        largest: resources
          .map((resource) => ({
            bytes: resource.encodedBodySize,
            name: new URL(resource.name).pathname,
            type: resource.initiatorType || "other",
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 12),
        totalEncodedBytes,
        totalTransferBytes,
      },
    };
  }, initial);
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844, initialBudget: 760_000, deliveredBudget: 780_000 },
  { name: "desktop", width: 1440, height: 900, initialBudget: 1_050_000, deliveredBudget: 1_100_000 },
] as const) {
  test(`reports packages delivery and scroll cost on ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const metrics = await auditPackages(page);
    console.log(`HSDJ_PACKAGES_PERFORMANCE_${viewport.name.toUpperCase()}=${JSON.stringify(metrics)}`);
    expect(metrics.animation.p95FrameMs).toBeLessThanOrEqual(24);
    expect(metrics.animation.slowFrameRatio).toBeLessThanOrEqual(.02);
    expect(metrics.resources.heroArtworkRequests).toBe(1);
    expect(metrics.resources.footerArtworkRequests).toBeLessThanOrEqual(1);
    expect(metrics.initial.totalEncodedBytes).toBeLessThanOrEqual(viewport.initialBudget);
    expect(metrics.resources.totalEncodedBytes).toBeLessThanOrEqual(viewport.deliveredBudget);
  });
}
