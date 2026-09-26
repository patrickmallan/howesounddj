import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const prototypeUrl = pathToFileURL(path.resolve(currentDir, '..', 'index.html')).href;
const browser = await chromium.launch({ headless: true });
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const runtimeErrors = [];
page.on('pageerror', (error) => runtimeErrors.push(error.message));
await page.goto(prototypeUrl);

assert(await page.locator('.primitive').count() === 6, 'Prototype must contain exactly six primitives.');
assert(await page.locator('.pad-bank a').count() === 3, 'Navigation pad bank must expose three semantic links.');
assert(await page.locator('.pad-disabled[aria-disabled="true"]').count() === 1, 'Disabled pad state must be explicit.');
assert(await page.locator('.vu-hardware[aria-hidden="true"]').count() === 1, 'Decorative VU meter must be hidden from assistive technology.');
assert(await page.locator('.vu-segment').count() === 48, 'Stereo VU meter must contain two independent 24-segment channels.');
assert(await page.locator('.fragment').count() === 3, 'Background system must contain three page-fragment studies.');

const padSizes = await page.locator('.performance-pad').evaluateAll((nodes) => nodes.map((node) => {
  const box = node.getBoundingClientRect();
  return { width: box.width, height: box.height };
}));
assert(padSizes.every(({ width, height }) => width >= 48 && height >= 48), 'Every performance pad must exceed the 48px touch target.');

await page.locator('.cue-button').click();
assert(await page.locator('.cue-button').getAttribute('data-state') === 'loading', 'CUE control must enter loading state.');
await page.waitForTimeout(1000);
assert(await page.locator('.cue-button').getAttribute('data-state') === 'success', 'CUE control must enter success state.');

const imagesLoaded = await page.locator('img').evaluateAll((nodes) => nodes.every((image) => image.complete && image.naturalWidth > 0));
assert(imagesLoaded, 'All documentary images must load.');
assert(runtimeErrors.length === 0, `Runtime errors detected: ${runtimeErrors.join('; ')}`);
await page.close();

const reducedPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
await reducedPage.goto(prototypeUrl);
assert(await reducedPage.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), 'Reduced-motion mode must be observable.');
await reducedPage.close();

const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobilePage.goto(prototypeUrl);
const mobileOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
assert(mobileOverflow <= 1, `Mobile layout must not create horizontal overflow; observed ${mobileOverflow}px.`);
await mobilePage.close();

await browser.close();

if (failures.length) {
  console.error(`FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('PASS — 11 controller-native functional and accessibility assertions');
}
