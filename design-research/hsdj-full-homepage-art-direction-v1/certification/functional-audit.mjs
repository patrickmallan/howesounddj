import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.resolve(currentDir, '..', 'index.html')).href;
const browser = await chromium.launch({ headless: true });
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  await page.waitForTimeout(250);
  assert(await page.locator('.chapter').count() === 8, 'CH00 through CH07 must all be present.');
  assert(await page.locator('.pad-link').count() === 6, 'Six semantic navigation pads are required.');
  assert(await page.locator('.pad-link span').evaluateAll(nodes => nodes.map(n => n.textContent.trim()).join('|')) === 'WEDDINGS|REVIEWS|ABOUT|VENUES|JOURNAL|CONTACT', 'Route labels must live on the pad faces.');
  assert(await page.locator('.cue-control').count() === 2, 'Arrival and Encore require physical CUE controls.');
  assert(await page.locator('.play-control').count() === 2, 'Arrival and Encore require physical PLAY controls.');
  assert(await page.locator('#peak .vu-segment').count() === 56, 'Peak must include the expanded stereo VU system.');
  assert(await page.locator('img').evaluateAll(nodes => nodes.every(img => img.complete && img.naturalWidth > 0)), 'Every source image must load.');
  assert(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, 'No horizontal overflow is permitted.');
  const targets = await page.locator('.pad-link, .physical-control').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return [r.width, r.height]; }));
  assert(targets.every(([width, height]) => width >= 44 && height >= 44), 'Physical controls must meet the 44px target minimum.');
  assert(errors.length === 0, `Runtime errors: ${errors.join('; ')}`);
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(`FAIL (${failures.length})`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('PASS — full homepage chapters, sources, controls, mobile and runtime assertions');
}
