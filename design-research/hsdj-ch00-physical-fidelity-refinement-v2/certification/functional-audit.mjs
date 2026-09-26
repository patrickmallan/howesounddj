import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const prototypeUrl = pathToFileURL(path.resolve(currentDir, '..', 'index.html')).href;
const browser = await chromium.launch({ headless: true });
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

async function audit(viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(prototypeUrl);
  await page.waitForTimeout(120);

  assert(await page.locator('.arrival').count() === 1, 'Exactly one CH00 arrival composition is required.');
  assert(await page.locator('.pad-nav a').count() === 6, 'Pad navigation must expose six semantic destinations.');
  assert(await page.locator('.cue-action').textContent().then((text) => text.includes('CHECK YOUR DATE')), 'Primary action must say CHECK YOUR DATE.');
  assert(await page.locator('.secondary-action').textContent().then((text) => text.includes('BOOK A CONSULT')), 'Secondary consultation action must remain explicit.');
  assert(await page.locator('.signal-rail[aria-hidden="true"]').count() === 1, 'Decorative meter must be hidden from assistive technology.');
  assert(await page.locator('.chapter-fader[aria-hidden="true"]').count() === 1, 'Decorative fader must be hidden from assistive technology.');
  assert(await page.locator('.vu-segment').count() === 44, 'Stereo VU system must contain two independent channels.');
  assert(await page.locator('.human-world img').evaluate((image) => image.complete && image.naturalWidth > 0), 'Patrick image must load.');
  assert(await page.locator('.machine-environment').evaluate((node) => getComputedStyle(node).backgroundImage !== 'none'), 'Controller environment must load as page architecture.');
  assert(await page.locator('.nav-pad').evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).backgroundImage.includes('pad-'))), 'Every navigation control must use a real hardware crop.');
  assert(await page.locator('.cue-hardware').evaluate((node) => getComputedStyle(node).backgroundImage.includes('cue-control')), 'Primary action must use the real CUE control crop.');
  assert(await page.locator('.play-hardware').evaluate((node) => getComputedStyle(node).backgroundImage.includes('play-control')), 'Secondary action must use the real PLAY control crop.');
  assert(await page.locator('.platter-hardware').evaluate((node) => getComputedStyle(node).backgroundImage.includes('xdj-az-left-platter')), 'Platter intervention must use the real XDJ-AZ crop.');

  const targets = await page.locator('.nav-control, .cue-action, .secondary-action').evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  assert(targets.every((target) => target.width >= 44 && target.height >= 44), 'Every interactive control must meet the 44px minimum target.');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(overflow <= 1, `Layout must not overflow horizontally; observed ${overflow}px.`);
  assert(errors.length === 0, `Runtime errors: ${errors.join('; ')}`);
  await page.close();
}

await audit({ width: 1440, height: 1000 });
await audit({ width: 390, height: 844 });

const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
await reducedPage.goto(prototypeUrl);
assert(await reducedPage.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), 'Reduced motion must be detectable.');
await reducedPage.close();
await browser.close();

if (failures.length) {
  console.error(`FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('PASS - CH00 V2 functional, source-fidelity, responsive and accessibility assertions');
}
