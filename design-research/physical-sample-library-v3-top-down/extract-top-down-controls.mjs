import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(new URL(import.meta.url).pathname);
const xdj = path.resolve(root, '../physical-sample-library-v1/sources/xdj-az-top-3300.webp');
const djm = path.resolve(root, '../top-down-source-audit-v1/djm-a9-news/002-1792x1316.png');
const djmRotary = path.resolve(root, '../top-down-source-audit-v1/djm-a9/004-1053x1053.jpg');
const djmInput = path.resolve(root, '../top-down-source-audit-v1/djm-a9/026-480x300.png');

const assets = [
  // XDJ-AZ performance-pad bank, left deck.
  { file: 'pads/red.png', source: xdj, box: [451, 1577, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/cyan.png', source: xdj, box: [559, 1577, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/lime.png', source: xdj, box: [667, 1577, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/purple.png', source: xdj, box: [775, 1577, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/green.png', source: xdj, box: [451, 1684, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/orange.png', source: xdj, box: [559, 1684, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/blue.png', source: xdj, box: [667, 1684, 101, 101], shape: ['roundrect', 8] },
  { file: 'pads/yellow.png', source: xdj, box: [775, 1684, 101, 101], shape: ['roundrect', 8] },

  // XDJ-AZ pad-mode buttons above the bank.
  { file: 'buttons/hot-cue-mode.png', source: xdj, box: [454, 1517, 94, 26], shape: ['roundrect', 3] },
  { file: 'buttons/beat-loop-mode.png', source: xdj, box: [562, 1517, 94, 26], shape: ['roundrect', 3] },
  { file: 'buttons/slip-loop-mode.png', source: xdj, box: [670, 1517, 94, 26], shape: ['roundrect', 3] },
  { file: 'buttons/beat-jump-mode.png', source: xdj, box: [778, 1517, 94, 26], shape: ['roundrect', 3] },
  { file: 'buttons/gate-cue-mode.png', source: xdj, box: [454, 1548, 94, 19], shape: ['roundrect', 3] },
  { file: 'buttons/beat-loop-2-mode.png', source: xdj, box: [562, 1548, 94, 19], shape: ['roundrect', 3] },
  { file: 'buttons/key-shift-mode.png', source: xdj, box: [670, 1548, 94, 19], shape: ['roundrect', 3] },
  { file: 'buttons/beat-jump-2-mode.png', source: xdj, box: [778, 1548, 94, 19], shape: ['roundrect', 3] },

  // XDJ-AZ large deck actions.
  { file: 'buttons/cue-round.png', source: xdj, box: [190, 1504, 130, 130], shape: ['circle'] },
  { file: 'buttons/play-pause-round.png', source: xdj, box: [190, 1657, 130, 130], shape: ['circle'] },

  // DJM-A9 detail renders provide materially more pixels per physical rotary.
  { file: 'rotary/trim-gray.png', source: djmRotary, box: [110, 86, 82, 82], shape: ['circle'] },
  // These bounds stop at the removable knob body. The white horseshoe graphics
  // visible in the source are silk-screened onto the mixer faceplate.
  { file: 'rotary/eq-black.png', source: djmRotary, box: [113, 269, 76, 76], shape: ['scalloped', 12, 0.455, 0.018, -0.18] },
  { file: 'rotary/color-silver.png', source: djmRotary, box: [108, 907, 86, 86], shape: ['scalloped', 12, 0.465, 0.022, -0.18] },
  { file: 'rotary/input-selector.png', source: djmInput, box: [187, 96, 110, 110], shape: ['circle'] },

  // XDJ-AZ vertical and horizontal motion controls.
  { file: 'faders/channel-fader-cap.png', source: xdj, box: [1355, 1524, 69, 29], shape: ['roundrect', 7] },
  { file: 'faders/channel-fader-rail.png', source: xdj, box: [1334, 1443, 126, 233], shape: ['roundrect', 5] },
  { file: 'faders/tempo-fader-cap.png', source: xdj, box: [1059, 1477, 68, 76], shape: ['roundrect', 7] },
  { file: 'faders/tempo-fader-rail.png', source: xdj, box: [1049, 1329, 88, 454], shape: ['roundrect', 10] },
  { file: 'faders/crossfader-cap.png', source: xdj, box: [1571, 1713, 62, 61], shape: ['roundrect', 8] },
  { file: 'faders/crossfader-rail.png', source: xdj, box: [1485, 1705, 230, 77], shape: ['roundrect', 5] },

  // XDJ-AZ meter and compact buttons.
  { file: 'meters/channel-meter.png', source: xdj, box: [1310, 845, 28, 344], shape: ['roundrect', 2] },
  { file: 'buttons/channel-cue-orange.png', source: xdj, box: [1350, 1323, 83, 35], shape: ['roundrect', 5] },
  { file: 'buttons/fx-low-blue.png', source: xdj, box: [1933, 1065, 57, 35], shape: ['roundrect', 5] },

  // DJM-A9 master meter: same overhead axis, a different functional family.
  { file: 'meters/djm-a9-master-meter.png', source: djm, box: [1110, 305, 70, 210], shape: ['roundrect', 2] },
];

function mask(width, height, shape) {
  const [kind, radius = 0] = shape;
  let geometry;
  if (kind === 'circle') {
    geometry = `<ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2 - 1}" ry="${height / 2 - 1}" fill="white"/>`;
  } else if (kind === 'scalloped') {
    const [, lobes, radiusRatio, depthRatio, phase] = shape;
    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height);
    const samples = lobes * 16;
    const points = Array.from({ length: samples }, (_, index) => {
      const angle = (index / samples) * Math.PI * 2;
      const wave = (1 + Math.cos(lobes * angle + phase)) / 2;
      const r = scale * (radiusRatio - depthRatio * wave);
      return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
    }).join(' ');
    geometry = `<polygon points="${points}" fill="white"/>`;
  } else {
    geometry = `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}" fill="white"/>`;
  }
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${geometry}</svg>`);
}

const manifest = [];
for (const stale of [
  'assets/buttons/release-fx-mode.png',
  'assets/rotary/master-level.png',
  'assets/rotary/time.png',
  'assets/rotary/level-depth.png',
  'assets/rotary/browse-encoder.png',
]) await fs.rm(path.join(root, stale), { force: true });
for (const asset of assets) {
  const [left, top, width, height] = asset.box;
  const output = path.join(root, 'assets', asset.file);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(asset.source)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .composite([{ input: mask(width, height, asset.shape), blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(output);
  manifest.push({
    file: `assets/${asset.file}`,
    source: path.basename(asset.source),
    nativeWidth: width,
    nativeHeight: height,
    sourceCoordinates: { left, top, width, height },
    cameraAxis: 'directly-overhead',
    upscaled: false,
  });
}

await fs.writeFile(path.join(root, 'asset-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Exported ${manifest.length} native-resolution top-down controls.`);
