import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const outputDir = path.dirname(fileURLToPath(import.meta.url));
const prototypeUrl = pathToFileURL(path.resolve(outputDir, '..', 'index.html')).href;
const browser = await chromium.launch({ headless: true });

async function pageFor(viewport, reducedMotion = 'no-preference') {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion });
  await page.goto(prototypeUrl);
  await page.waitForTimeout(450);
  return page;
}

let page = await pageFor({ width: 1440, height: 1000 });
await page.screenshot({ path: path.join(outputDir, 'homepage-v1-desktop-full-1440.png'), fullPage: true });
for (const id of ['arrival','sound-check','build','read-room','peak','operator','room-remembers','encore']) {
  await page.locator(`#${id}`).screenshot({ path: path.join(outputDir, `${id}-desktop-1440.png`) });
}
await page.close();

page = await pageFor({ width: 390, height: 844 });
await page.screenshot({ path: path.join(outputDir, 'homepage-v1-mobile-full-390.png'), fullPage: true });
for (const id of ['arrival','sound-check','build','read-room','peak','operator','room-remembers','encore']) {
  await page.locator(`#${id}`).screenshot({ path: path.join(outputDir, `${id}-mobile-390.png`) });
}
await page.close();

page = await pageFor({ width: 1440, height: 1000 }, 'reduce');
await page.screenshot({ path: path.join(outputDir, 'homepage-v1-reduced-motion-1440.png') });
await page.close();

page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
await page.goto(prototypeUrl);
await page.waitForTimeout(400);
await page.locator('.pad-nav').screenshot({ path: path.join(outputDir, 'navigation-pads-200-percent.png') });
await page.locator('.arrival-actions').screenshot({ path: path.join(outputDir, 'cue-play-optical-200-percent.png') });
await page.close();

page = await pageFor({ width: 1440, height: 1000 });
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
await page.screenshot({ path: path.join(outputDir, 'keyboard-focus-1440.png') });
await page.close();

await browser.close();
