import { expect, test } from "@playwright/test";

for (const width of [320, 390, 430]) {
  test(`homepage keeps its mobile sections connected at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");

    const measurements = await page.evaluate(() => {
      const box = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing ${selector}`);
        const bounds = element.getBoundingClientRect();
        return { top: bounds.top + scrollY, bottom: bounds.bottom + scrollY, height: bounds.height };
      };
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        hero: box("main section:first-of-type"),
        meter: box('[class*="arrivalVu"]'),
        build: box("main section#night"),
        review: box('[class*="reviewDeck"]'),
        photo: box('[class*="operatorPhoto"]'),
        aboutCopy: box('[class*="operatorCopy"]'),
        dateCopy: box('[class*="encoreCopy"]'),
        dateDeck: box('[data-testid="home-finale-section"] > div'),
      };
    });

    expect(measurements.overflow).toBeLessThanOrEqual(1);
    expect(measurements.hero.height).toBeLessThan(850);
    expect(measurements.meter.height).toBeLessThan(320);
    expect(measurements.build.height).toBeLessThan(1000);
    expect(measurements.review.height).toBeLessThan(700);
    expect(measurements.photo.height).toBeGreaterThan(390);
    expect(measurements.aboutCopy.top - measurements.photo.bottom).toBeLessThan(40);
    expect(measurements.dateDeck.top - measurements.dateCopy.bottom).toBeLessThan(60);

    await page.getByRole("button", { name: /04 first dance/i }).click();
    await expect(page.getByText("THIS ONE MATTERS", { exact: true }).last()).toBeVisible();
    await expect(page.getByText("First dance", { exact: true }).last()).toBeVisible();
  });
}

test("the compact mobile VU meter visibly changes while the hero is in view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForFunction(() => document.querySelectorAll(".hsdj-vu-leds .is-lit").length > 0);
  const samples: number[] = [];
  for (let index = 0; index < 8; index += 1) {
    samples.push(await page.locator(".hsdj-vu-leds .is-lit").count());
    await page.waitForTimeout(300);
  }
  expect(new Set(samples).size).toBeGreaterThan(1);
});

test("the VU meter arrives lit before JavaScript hydrates", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 650 }, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);
    await expect(page.locator(".hsdj-vu-leds .is-lit")).toHaveCount(35);
  } finally {
    await context.close();
  }
});

test("the VU meter keeps its full live programme when reduced motion is enabled", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 650 }, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);
    const samples: number[] = [];
    for (let index = 0; index < 12; index += 1) {
      samples.push(await page.locator(".hsdj-vu-leds .is-lit").count());
      await page.waitForTimeout(250);
    }
    expect(new Set(samples).size).toBeGreaterThan(4);
    expect(Math.max(...samples) - Math.min(...samples)).toBeGreaterThan(8);
  } finally {
    await context.close();
  }
});

test("the complete mobile hook and VU meter clear a short Safari-like first screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.goto("/");

  const geometry = await page.evaluate(() => {
    const bounds = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error(`Missing ${selector}`);
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };

    return {
      viewportHeight: innerHeight,
      header: bounds("header"),
      hero: bounds("main section:first-of-type"),
      headline: bounds("h1"),
      meter: bounds(".hsdj-vu-meter"),
    };
  });

  expect(geometry.hero.bottom).toBeLessThanOrEqual(geometry.viewportHeight + 1);
  expect(geometry.headline.bottom).toBeLessThan(geometry.viewportHeight - 90);
  expect(geometry.meter.top).toBeGreaterThanOrEqual(geometry.header.bottom);
  expect(geometry.meter.bottom).toBeLessThan(geometry.viewportHeight - 55);
  expect(geometry.meter.width).toBeGreaterThanOrEqual(62);
});

test("the mobile graphic equalizer stays live when reduced motion is enabled", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);
    const spectrum = page.getByTestId("night-spectrum");
    await spectrum.scrollIntoViewIfNeeded();
    await expect(spectrum).toBeVisible();

    const samples: string[] = [];
    for (let index = 0; index < 12; index += 1) {
      samples.push(await spectrum.locator("i").evaluateAll((bars) => bars
        .map((bar) => (bar as HTMLElement).style.getPropertyValue("--spectrum-level"))
        .join(",")));
      await page.waitForTimeout(150);
    }

    expect(new Set(samples).size).toBeGreaterThan(5);
  } finally {
    await context.close();
  }
});

test("the crossfader keeps its changing scene visible beside the mobile control", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.goto("/");
  const fader = page.getByRole("slider", { name: "Explore how the music changes through the wedding night" });
  const preview = page.getByTestId("night-mobile-preview");
  await fader.scrollIntoViewIfNeeded();

  await expect(fader).toBeVisible();
  await expect(preview).toBeVisible();
  await fader.fill("4");
  await expect(preview.getByText("Open floor", { exact: true })).toBeVisible();
  await expect(preview.getByText("NOW WE GO", { exact: true })).toBeVisible();

  const geometry = await page.evaluate(() => {
    const control = document.querySelector('[aria-label="Explore how the music changes through the wedding night"]')?.getBoundingClientRect();
    const feedback = document.querySelector('[data-testid="night-mobile-preview"]')?.getBoundingClientRect();
    if (!control || !feedback) throw new Error("Missing crossfader feedback geometry");
    return { controlTop: control.top, feedbackBottom: feedback.bottom, feedbackTop: feedback.top };
  });
  expect(geometry.controlTop - geometry.feedbackBottom).toBeLessThan(20);
  expect(geometry.feedbackTop).toBeGreaterThanOrEqual(-1);
});

test("the complete mobile experience remains alive with the iPhone motion setting enabled", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);

    const montage = page.locator('[data-testid="home-video-proof-inner"] video');
    await montage.scrollIntoViewIfNeeded();
    await expect.poll(() => montage.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);

    const reviewFader = page.getByRole("slider", { name: "Choose a customer review" });
    await reviewFader.scrollIntoViewIfNeeded();
    const firstReview = await reviewFader.getAttribute("aria-valuenow");
    await expect.poll(() => reviewFader.getAttribute("aria-valuenow"), { timeout: 7_000 }).not.toBe(firstReview);

    const finale = page.getByTestId("home-finale-section");
    await finale.scrollIntoViewIfNeeded();
    await expect.poll(() => finale.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
  } finally {
    await context.close();
  }
});

test("review collage waits for its section and appears when approached", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const collageRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("review-couples-collage-v1.webp")) collageRequests.push(request.url());
  });
  await page.goto("/");
  await page.waitForTimeout(600);
  expect(collageRequests).toHaveLength(0);
  await page.locator('[class*="remembersArt"]').scrollIntoViewIfNeeded();
  await expect.poll(() => collageRequests.length).toBeGreaterThan(0);
  await expect(page.locator('[class*="remembersArt"] img')).toBeVisible();
});

test("review collage remains available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);
    await page.locator('[class*="remembersArt"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[class*="remembersArt"] img')).toBeVisible();
  } finally {
    await context.close();
  }
});

test("the mobile review fader changes the adjacent quote and stays on the chosen review", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000"}/`);
    const fader = page.getByRole("slider", { name: "Choose a customer review" });
    await fader.scrollIntoViewIfNeeded();
    const cap = await page.locator('[class*="faderCap"]').boundingBox();
    if (!cap) throw new Error("Review fader handle is missing");
    const x = cap.x + cap.width / 2;
    const y = cap.y + cap.height / 2;
    const input = await context.newCDPSession(page);
    await input.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 9; step += 1) {
      await input.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 19 }] });
    }
    await input.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(fader).toHaveAttribute("aria-valuenow", "3");
    await expect(page.getByText("Matthew Bundala", { exact: true }).first()).toBeVisible();
    await page.waitForTimeout(6000);
    await expect(fader).toHaveAttribute("aria-valuenow", "3");

    const track = await fader.boundingBox();
    if (!track) throw new Error("Review fader track is missing");
    const scrollBefore = await page.evaluate(() => scrollY);
    const trackX = track.x + track.width / 2;
    const trackY = track.y + track.height - 25;
    await input.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: trackX, y: trackY }] });
    for (let step = 1; step <= 8; step += 1) {
      await input.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: trackX, y: trackY - step * 16 }] });
      await page.waitForTimeout(20);
    }
    await input.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore + 40);
    await expect(fader).toHaveAttribute("aria-valuenow", "3");
  } finally {
    await context.close();
  }
});
