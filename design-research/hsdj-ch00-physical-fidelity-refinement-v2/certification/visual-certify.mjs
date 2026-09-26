import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const outputDir = path.dirname(fileURLToPath(import.meta.url));
const prototypeUrl = pathToFileURL(path.resolve(outputDir, '..', 'index.html')).href;
const browser = await chromium.launch({ headless: true });

async function capture(name, viewport, reducedMotion = 'no-preference') {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion });
  await page.goto(prototypeUrl);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(outputDir, name) });
  await page.close();
}

await capture('ch00-v2-desktop-1440x1000.png', { width: 1440, height: 1000 });
await capture('ch00-v2-mobile-390x844.png', { width: 390, height: 844 });
await capture('ch00-v2-desktop-reduced-motion-1440x1000.png', { width: 1440, height: 1000 }, 'reduce');

const focusPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await focusPage.goto(prototypeUrl);
await focusPage.keyboard.press('Tab');
await focusPage.keyboard.press('Tab');
await focusPage.keyboard.press('Tab');
await focusPage.screenshot({ path: path.join(outputDir, 'ch00-v2-desktop-keyboard-focus-1440x1000.png') });
await focusPage.close();

await browser.close();
