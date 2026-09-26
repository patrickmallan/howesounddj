import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const prototypePath = path.resolve(currentDir, '..', 'index.html');
const prototypeUrl = pathToFileURL(prototypePath).href;
const browser = await chromium.launch({ headless: true });

async function captureDesktop() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(prototypeUrl);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.screenshot({ path: path.join(currentDir, 'full-prototype-1440.png'), fullPage: true });

  const sections = [
    ['01-performance-pad-navigation.png', '#primitive-01'],
    ['02-primary-cue-control-idle.png', '#primitive-02'],
    ['03-rotary-information-markers.png', '#primitive-03'],
    ['04-animated-stereo-vu.png', '#primitive-04'],
    ['05-fader-channel-rail.png', '#primitive-05'],
    ['06a-background-mixer-substrate.png', '.fragment-substrate'],
    ['06b-background-hardware-intrusion.png', '.fragment-intrusion'],
    ['06c-background-human-machine.png', '.fragment-collision']
  ];

  for (const [name, selector] of sections) {
    const region = page.locator(selector);
    await region.scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);
    await region.screenshot({ path: path.join(currentDir, name) });
  }

  await page.locator('#primitive-02').scrollIntoViewIfNeeded();
  await page.locator('.cue-button').click();
  await page.waitForTimeout(120);
  await page.locator('#primitive-02').screenshot({ path: path.join(currentDir, '02-primary-cue-control-loading.png') });
  await page.waitForTimeout(900);
  await page.locator('#primitive-02').screenshot({ path: path.join(currentDir, '02-primary-cue-control-success.png') });

  await page.keyboard.press('Home');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.locator('#primitive-01').screenshot({ path: path.join(currentDir, '01-performance-pad-keyboard-focus.png') });
  await page.close();
}

async function captureReducedMotion() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(prototypeUrl);
  await page.locator('#primitive-04').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.locator('#primitive-04').screenshot({ path: path.join(currentDir, '04-stereo-vu-reduced-motion.png') });
  await page.close();
}

async function captureMobile() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(prototypeUrl);
  await page.locator('#primitive-01').screenshot({ path: path.join(currentDir, 'mobile-01-performance-pads.png') });
  await page.locator('#primitive-02').screenshot({ path: path.join(currentDir, 'mobile-02-cue.png') });
  await page.locator('.fragment-collision').screenshot({ path: path.join(currentDir, 'mobile-06c-human-machine.png') });
  await page.close();
}

await captureDesktop();
await captureReducedMotion();
await captureMobile();
await browser.close();
