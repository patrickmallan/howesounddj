import { expect, test, type Page } from "@playwright/test";

type DeliveryMetrics = {
  animation: {
    averageFrameMs: number;
    maxFrameMs: number;
    p95FrameMs: number;
    slowFrameRatio: number;
  };
  resources: {
    byType: Record<string, number>;
    largest: Array<{ bytes: number; name: string; type: string }>;
    totalEncodedBytes: number;
    totalTransferBytes: number;
  };
};

async function auditHomepage(page: Page): Promise<DeliveryMetrics> {
  // The homepage deliberately keeps motion/media alive; an idle network is not
  // a meaningful readiness signal and can turn this diagnostic into a timeout.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const sections = await page.locator("main section").all();
  for (const section of sections) await section.scrollIntoViewIfNeeded();

  return page.evaluate(async () => {
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
    const durationMs = 6000;
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
      animation: {
        averageFrameMs: totalFrameTime / measured.length,
        maxFrameMs: measured.at(-1) ?? 0,
        p95FrameMs: measured[Math.floor(measured.length * .95)] ?? 0,
        slowFrameRatio: slowFrames.length / measured.length,
      },
      resources: {
        byType,
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
  });
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const) {
  test(`reports delivered bytes and scroll cost on ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const metrics = await auditHomepage(page);
    console.log(`HSDJ_PERFORMANCE_${viewport.name.toUpperCase()}=${JSON.stringify(metrics)}`);
    expect(metrics.animation.p95FrameMs).toBeLessThanOrEqual(24);
    expect(metrics.animation.slowFrameRatio).toBeLessThanOrEqual(.02);
  });
}
