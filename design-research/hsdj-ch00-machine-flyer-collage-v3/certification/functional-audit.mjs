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
  assert(await page.locator('.poster-world[aria-hidden="true"]').count() === 1, 'Poster artwork must remain decorative and outside the accessibility tree.');
  assert(await page.locator('.poster-paper').count() === 3, 'The composition must contain three controlled poster fields.');
  assert(await page.locator('.poster-paper-yellow, .poster-paper-blue, .poster-paper-red').count() === 3, 'Yellow, blue and red must all exist as major physical fields.');
  assert(await page.locator('.pad-nav a').count() === 6, 'Pad navigation must expose six semantic destinations.');
  assert(await page.locator('.cue-action').getAttribute('aria-label').then((text) => text === 'Check your date'), 'Primary action must expose CHECK YOUR DATE as its accessible name.');
  assert(await page.locator('.secondary-action').getAttribute('aria-label').then((text) => text === 'Book a consult'), 'Secondary consultation action must expose BOOK A CONSULT as its accessible name.');
  assert(await page.locator('.signal-rail[aria-hidden="true"]').count() === 1, 'Decorative meter must be hidden from assistive technology.');
  assert(await page.locator('.chapter-fader[aria-hidden="true"]').count() === 1, 'Decorative fader must be hidden from assistive technology.');
  assert(await page.locator('.vu-segment').count() === 44, 'Stereo VU system must contain two independent channels.');
  assert(await page.locator('.human-world img').evaluate((image) => image.complete && image.naturalWidth > 0), 'Patrick image must load.');
  assert(await page.locator('.machine-environment').evaluate((node) => getComputedStyle(node).backgroundImage !== 'none'), 'Controller environment must load as page architecture.');
  assert(await page.locator('.nav-pad').evaluateAll((nodes) => nodes.every((node) => node.tagName === 'IMG' && node.complete && node.naturalWidth === 90 && node.src.includes('-isolated.png'))), 'Every navigation control must use a complete isolated 90px photographic asset.');
  assert(await page.locator('.nav-pad').evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).objectFit === 'contain' && getComputedStyle(node).backgroundImage === 'none')), 'Navigation hardware must render whole, without CSS background cropping.');
  assert(await page.locator('.cue-hardware').evaluate((node) => node.tagName === 'IMG' && node.complete && node.naturalWidth === 140 && node.src.includes('cue-control-isolated')), 'Primary action must contain the isolated real CUE control.');
  assert(await page.locator('.play-hardware').evaluate((node) => node.tagName === 'IMG' && node.complete && node.naturalWidth === 140 && node.src.includes('play-control-isolated')), 'Secondary action must contain the isolated real PLAY control.');
  assert(await page.locator('.cue-hardware, .play-hardware').evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).objectFit === 'contain' && getComputedStyle(node).backgroundImage === 'none')), 'CTA hardware must render whole, without CSS background cropping.');
  assert(await page.locator('.cue-action strong').evaluate((label) => {
    const action = label.closest('.cue-action').getBoundingClientRect();
    const text = label.getBoundingClientRect();
    return text.left >= action.left && text.right <= action.right && text.top >= action.top && text.bottom <= action.bottom;
  }), 'CHECK YOUR DATE must be physically integrated inside the CUE control link.');
  assert(await page.locator('.platter-hardware').evaluate((node) => getComputedStyle(node).backgroundImage.includes('xdj-az-left-platter')), 'Platter intervention must use the real XDJ-AZ crop.');
  assert(await page.locator('#arrival-title').evaluate((node) => node.textContent.replace(/\s+/g, ' ').trim()) === 'A PACKED DANCE FLOOR THAT STILL FEELS LIKE YOUR WEDDING.', 'The complete approved headline must remain intact and readable in source order.');

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
  console.log('PASS - CH00 V3 machine, poster, human, control, responsive and accessibility assertions');
}
