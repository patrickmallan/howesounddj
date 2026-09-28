import { expect, test } from "@playwright/test";

const sizes = [
  { width: 320, height: 760 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

test("legacy uppercase FAQ URL has one permanent hop to the canonical route", async ({ request }) => {
  const response = await request.get("/FAQ", { maxRedirects: 0 });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/faq");
});

test("FAQ keeps every answer searchable, semantic, and inside the viewport", async ({ page }) => {
  for (const size of sizes) {
    await page.setViewportSize(size);
    await page.goto("/faq", { waitUntil: "domcontentloaded" });

    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(6);
    await expect(page.locator(".faq-mixer-question")).toHaveCount(16);
    await expect(page.locator(".faq-mixer-answer")).toHaveCount(16);

    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(overflow.page, `${size.width}px has horizontal overflow`).toBeLessThanOrEqual(
      overflow.viewport,
    );

    const escapedHeadings = await page.locator("main h1, main h2").evaluateAll((headings) =>
      headings
        .map((heading) => {
          const rect = heading.getBoundingClientRect();
          return { text: heading.textContent?.trim(), left: rect.left, right: rect.right };
        })
        .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1),
    );
    expect(escapedHeadings, `${size.width}px has clipped headings`).toEqual([]);
  }
});

test("FAQ controls are real gear, keyboard-operable, and do not prefetch unrelated routes", async ({ page }) => {
  const unrelatedRequests: string[] = [];
  const cassetteRequests: string[] = [];

  page.on("request", (request) => {
    const pathname = new URL(request.url()).pathname;
    if (
      [
        "/guides/how-to-keep-a-wedding-dance-floor-packed",
        "/guides/how-to-choose-a-wedding-dj-in-squamish",
        "/stories",
        "/venues",
      ].includes(pathname)
    ) {
      unrelatedRequests.push(pathname);
    }
    if (pathname.includes("cassette-chassis-skin") || pathname.includes("cassette-bay-skin")) {
      cassetteRequests.push(pathname);
    }
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/faq", { waitUntil: "domcontentloaded" });

  const channelPads = page.locator(".faq-mixer-selector a[data-physical-control='performance-pad']");
  await expect(channelPads).toHaveCount(5);
  await expect(channelPads.locator("img")).toHaveCount(5);
  const padSizes = await channelPads.evaluateAll((controls) =>
    controls.map((control) => {
      const rect = control.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }),
  );
  expect(padSizes.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true);

  const firstQuestion = page.locator(".faq-mixer-question").first();
  const firstSummary = firstQuestion.locator("summary");
  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(firstQuestion).toHaveAttribute("open", "");

  await page.locator(".faq-mixer-finale").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const cue = page.locator(".faq-mixer-finale a[data-physical-control='cue']");
  await expect(cue).toHaveCount(1);
  const cueBox = await cue.boundingBox();
  expect(cueBox).not.toBeNull();
  expect(cueBox!.height).toBeGreaterThanOrEqual(44);
  expect(unrelatedRequests).toEqual([]);
  expect(cassetteRequests).toEqual([]);
});

test("FAQ metadata, structured data, and server document stay within their contracts", async ({ page, request }) => {
  const response = await request.get("/faq");
  const body = await response.body();
  expect(response.status()).toBe(200);
  expect(body.byteLength).toBeLessThan(130_000);

  await page.goto("/faq", { waitUntil: "domcontentloaded" });
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", "https://www.howesounddj.com/faq");

  const faqSchema = await page.locator("script[type='application/ld+json']").evaluateAll((scripts) =>
    scripts
      .map((script) => JSON.parse(script.textContent || "{}"))
      .find((entry) => entry["@type"] === "FAQPage"),
  );

  expect(faqSchema).toBeTruthy();
  expect(faqSchema.mainEntity).toHaveLength(16);

  for (const href of [
    "/guides/how-to-keep-a-wedding-dance-floor-packed",
    "/stories",
    "/guides/how-to-choose-a-wedding-dj-in-squamish",
    "/venues",
    "/contact#availability",
  ]) {
    const linkResponse = await request.get(href);
    expect(linkResponse.ok(), `${href} should resolve`).toBe(true);
  }
});
