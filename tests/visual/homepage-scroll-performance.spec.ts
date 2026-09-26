import { expect, test, type Page } from "@playwright/test";

type ScrollSample = {
  averageFrameMs: number;
  frameCount: number;
  maxFrameMs: number;
  p95FrameMs: number;
  slowFrameCount: number;
  slowFrameRatio: number;
};

async function measureScroll(
  page: Page,
  options: { distance: number | "full"; durationMs: number },
): Promise<ScrollSample> {
  return page.evaluate(async ({ distance, durationMs }) => {
    window.scrollTo(0, 0);

    const frameTimes: number[] = [];
    let previous = performance.now();
    const started = previous;
    const scrollDistance = distance === "full"
      ? Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      : distance;

    await new Promise<void>((resolve) => {
      const frame = (now: number) => {
        frameTimes.push(now - previous);
        previous = now;

        const progress = Math.min(1, (now - started) / durationMs);
        window.scrollTo(0, scrollDistance * progress);

        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      };

      requestAnimationFrame(frame);
    });

    window.scrollTo(0, 0);

    // Ignore the first three requestAnimationFrame callbacks while the test
    // begins. They measure test startup rather than the page's scroll work.
    const measured = frameTimes.slice(3).sort((a, b) => a - b);
    const slowFrames = measured.filter((time) => time > 25);
    const total = measured.reduce((sum, time) => sum + time, 0);

    return {
      averageFrameMs: total / measured.length,
      frameCount: measured.length,
      maxFrameMs: measured.at(-1) ?? 0,
      p95FrameMs: measured[Math.floor(measured.length * 0.95)] ?? 0,
      slowFrameCount: slowFrames.length,
      slowFrameRatio: slowFrames.length / measured.length,
    };
  }, options);
}

function expectSmoothScroll(sample: ScrollSample, label: string) {
  // These budgets intentionally catch a real visual regression rather than
  // harmless machine-to-machine timing noise. The September 2026 baseline is
  // ~16.7 ms at p95 with no frames above 25 ms.
  expect(sample.frameCount, `${label}: enough frames must be sampled`).toBeGreaterThan(90);
  expect(sample.p95FrameMs, `${label}: p95 frame time`).toBeLessThanOrEqual(24);
  expect(sample.maxFrameMs, `${label}: worst single frame`).toBeLessThanOrEqual(80);
  expect(sample.slowFrameRatio, `${label}: frames slower than 25 ms`).toBeLessThanOrEqual(0.02);
}

test("homepage retains the approved smooth-scroll baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // Warm the production route once so this test measures the page rather than
  // first-request image optimization or browser startup.
  await page.goto("/", { waitUntil: "networkidle" });
  await page.reload({ waitUntil: "networkidle" });

  // A single slow frame near the 2% boundary varies with local scheduler load.
  // Hold the existing budget against the median of three identical passes;
  // sustained regressions still fail without redefining the threshold.
  const firstTransitionSamples: ScrollSample[] = [];
  for (let pass = 0; pass < 3; pass += 1) {
    firstTransitionSamples.push(await measureScroll(page, {
      distance: 1800,
      durationMs: 3000,
    }));
  }
  const medianFirstTransition = firstTransitionSamples
    .toSorted((left, right) => left.slowFrameRatio - right.slowFrameRatio)[1];
  expectSmoothScroll(medianFirstTransition, "hero and first transition (three-run median)");

  const completeHomepage = await measureScroll(page, {
    distance: "full",
    durationMs: 6000,
  });
  expectSmoothScroll(completeHomepage, "complete homepage");
});

test("mobile hero remains responsive with a constrained CPU", async ({ browser }) => {
  test.setTimeout(120_000);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const devtools = await context.newCDPSession(page);
  await devtools.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  try {
    // Background artwork and analytics can keep the network busy after the
    // first screen is usable; test interaction after load, not network silence.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const heroAndFirstTransition = await measureScroll(page, { distance: 1500, durationMs: 2200 });
    console.log(`HSDJ_THROTTLED_MOBILE_SCROLL=${JSON.stringify(heroAndFirstTransition)}`);
    expect(heroAndFirstTransition.frameCount).toBeGreaterThan(90);
    expect(heroAndFirstTransition.p95FrameMs).toBeLessThanOrEqual(30);
    expect(heroAndFirstTransition.slowFrameRatio).toBeLessThanOrEqual(0.08);
  } finally {
    await context.close();
  }
});
