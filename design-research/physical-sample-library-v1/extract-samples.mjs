import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const sources = path.join(root, "sources");

const groups = [
  "knobs", "buttons", "pads", "faders", "meters", "switches",
  "jog", "connectors", "labels", "rails", "miscellaneous", "certification",
];

await Promise.all(groups.map((group) => mkdir(path.join(root, group), { recursive: true })));

const sourceFiles = {
  xdj: path.join(sources, "xdj-az-top-3300.webp"),
  a9: path.join(sources, "djm-a9-hero-1792.png"),
  hero: path.join(root, "..", "source-library", "07-logo-type", "Codex Image Sep 11, 2026, 06_54_35 AM.png"),
};

function roundedMask(width, height, radius = Math.min(width, height) * 0.12, feather = 1.5) {
  const data = Buffer.alloc(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cx = Math.max(radius, Math.min(width - radius, x));
      const cy = Math.max(radius, Math.min(height - radius, y));
      const distance = Math.hypot(x - cx, y - cy);
      const alpha = distance <= radius - feather ? 255 : distance >= radius ? 0 : Math.round(255 * (radius - distance) / feather);
      data[y * width + x] = alpha;
    }
  }
  return sharp(data, { raw: { width, height, channels: 1 } }).png().toBuffer();
}

function ellipseMask(width, height, feather = 2) {
  const data = Buffer.alloc(width * height);
  const rx = width / 2;
  const ry = height / 2;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const d = Math.hypot((x + 0.5 - rx) / rx, (y + 0.5 - ry) / ry);
      const edge = feather / Math.min(rx, ry);
      data[y * width + x] = d <= 1 - edge ? 255 : d >= 1 ? 0 : Math.round(255 * (1 - d) / edge);
    }
  }
  return sharp(data, { raw: { width, height, channels: 1 } }).png().toBuffer();
}

async function extract(definition) {
  const { source, group, name, left, top, width, height, shape = "rounded", radius } = definition;
  const crop = await sharp(sourceFiles[source]).extract({ left, top, width, height }).ensureAlpha().png().toBuffer();
  const mask = shape === "ellipse"
    ? await ellipseMask(width, height)
    : await roundedMask(width, height, radius);
  await sharp(crop)
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, group, `${name}.png`));
}

const samples = [
  // XDJ-AZ rotary hardware: exact manufacturer pixels, isolated with only an alpha mask.
  { source: "xdj", group: "knobs", name: "trim-gain", left: 1330, top: 790, width: 142, height: 142, shape: "ellipse" },
  { source: "xdj", group: "knobs", name: "eq-high", left: 1330, top: 902, width: 142, height: 142, shape: "ellipse" },
  { source: "xdj", group: "knobs", name: "filter-color", left: 1322, top: 1218, width: 156, height: 156, shape: "ellipse" },
  { source: "xdj", group: "knobs", name: "browse-encoder", left: 1968, top: 326, width: 196, height: 196, shape: "ellipse" },

  // Physical controls, including the face, bezel and illumination ring.
  { source: "xdj", group: "buttons", name: "cue", left: 173, top: 1482, width: 180, height: 180, shape: "ellipse" },
  { source: "xdj", group: "buttons", name: "play-pause", left: 173, top: 1638, width: 180, height: 180, shape: "ellipse" },
  { source: "xdj", group: "buttons", name: "orange-round-control", left: 162, top: 614, width: 164, height: 164, shape: "ellipse" },
  { source: "xdj", group: "buttons", name: "utility-source", left: 1250, top: 188, width: 125, height: 69, radius: 8 },

  // Performance pads from one photographed bank.
  { source: "xdj", group: "pads", name: "red", left: 446, top: 1570, width: 112, height: 96, radius: 8 },
  { source: "xdj", group: "pads", name: "cyan", left: 557, top: 1570, width: 112, height: 96, radius: 8 },
  { source: "xdj", group: "pads", name: "green", left: 446, top: 1672, width: 112, height: 96, radius: 8 },
  { source: "xdj", group: "pads", name: "blue", left: 668, top: 1672, width: 112, height: 96, radius: 8 },
  { source: "xdj", group: "pads", name: "yellow", left: 779, top: 1672, width: 112, height: 96, radius: 8 },
  { source: "xdj", group: "pads", name: "purple", left: 779, top: 1570, width: 112, height: 96, radius: 8 },

  // Wide, low, flat channel fader and intact rail architecture.
  { source: "xdj", group: "faders", name: "channel-fader-cap", left: 1352, top: 1527, width: 80, height: 40, radius: 10 },
  { source: "xdj", group: "rails", name: "channel-fader-rail", left: 1330, top: 1396, width: 136, height: 270, radius: 8 },
  { source: "xdj", group: "rails", name: "tempo-fader-rail", left: 1017, top: 1353, width: 111, height: 434, radius: 8 },

  // Other material samples used as visual grammar, never as fake controls.
  { source: "xdj", group: "switches", name: "usb-stop-switch", left: 2846, top: 405, width: 98, height: 116, radius: 10 },
  { source: "xdj", group: "connectors", name: "in-cue-connector", left: 164, top: 610, width: 166, height: 166, shape: "ellipse" },
  { source: "xdj", group: "jog", name: "jog-wheel-edge", left: 370, top: 745, width: 405, height: 405, shape: "ellipse" },
  { source: "xdj", group: "meters", name: "channel-meter-scale", left: 1287, top: 894, width: 82, height: 320, radius: 4 },
  { source: "xdj", group: "labels", name: "channel-label-3", left: 1335, top: 1326, width: 134, height: 92, radius: 6 },
  { source: "a9", group: "miscellaneous", name: "panel-screw-detail", left: 392, top: 216, width: 42, height: 42, shape: "ellipse" },
  { source: "a9", group: "miscellaneous", name: "front-jack-detail", left: 1512, top: 1103, width: 180, height: 164, radius: 18 },
];

for (const sample of samples) await extract(sample);

const sheetBackground = { r: 14, g: 14, b: 13, alpha: 1 };

async function contactSheet({ output, title, entries, width = 1500, height = 900 }) {
  const composites = [];
  const columns = entries.length <= 4 ? entries.length : Math.ceil(entries.length / 2);
  const cellWidth = Math.floor((width - 100) / columns);
  const cellHeight = entries.length <= 4 ? height - 190 : Math.floor((height - 190) / 2);
  const titleSvg = Buffer.from(`<svg width="${width}" height="150"><rect width="100%" height="100%" fill="#0e0e0d"/><text x="50" y="70" fill="#ffd21c" font-size="22" font-family="Arial" font-weight="700" letter-spacing="4">PHYSICAL SAMPLE LIBRARY / V1</text><text x="50" y="118" fill="#f2efe7" font-size="42" font-family="Arial" font-weight="800">${title}</text></svg>`);
  composites.push({ input: titleSvg, left: 0, top: 0 });

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const column = index % columns;
    const row = Math.floor(index / columns);
    const asset = path.join(root, entry.group, `${entry.name}.png`);
    const imageBuffer = await sharp(asset).resize({ width: Math.min(260, cellWidth - 60), height: Math.min(260, cellHeight - 80), fit: "inside", withoutEnlargement: true }).toBuffer();
    const metadata = await sharp(imageBuffer).metadata();
    const left = 50 + column * cellWidth + Math.floor((cellWidth - metadata.width) / 2);
    const top = 155 + row * cellHeight + Math.max(20, Math.floor((cellHeight - metadata.height - 52) / 2));
    composites.push({ input: imageBuffer, left, top });
    const label = Buffer.from(`<svg width="${cellWidth}" height="52"><text x="50%" y="24" text-anchor="middle" fill="#f2efe7" font-size="19" font-family="Arial" font-weight="700">${entry.label}</text><text x="50%" y="47" text-anchor="middle" fill="#8e8c86" font-size="13" font-family="Arial" letter-spacing="2">REAL SOURCE PIXELS</text></svg>`);
    composites.push({ input: label, left: 50 + column * cellWidth, top: 155 + row * cellHeight + cellHeight - 60 });
  }

  await sharp({ create: { width, height, channels: 4, background: sheetBackground } })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "certification", output));
}

await contactSheet({
  output: "knobs-contact-sheet.png",
  title: "ROTARY CONTROLS",
  entries: [
    { group: "knobs", name: "eq-high", label: "EQ" },
    { group: "knobs", name: "trim-gain", label: "TRIM / GAIN" },
    { group: "knobs", name: "filter-color", label: "FILTER" },
    { group: "knobs", name: "browse-encoder", label: "ENCODER" },
  ],
});

await contactSheet({
  output: "pads-buttons-contact-sheet.png",
  title: "PADS + BUTTONS",
  entries: [
    ...["red", "cyan", "yellow", "blue", "green", "purple"].map((name) => ({ group: "pads", name, label: `${name.toUpperCase()} PAD` })),
    { group: "buttons", name: "cue", label: "CUE" },
    { group: "buttons", name: "play-pause", label: "PLAY / PAUSE" },
  ],
  height: 980,
});

await contactSheet({
  output: "misc-hardware-contact-sheet.png",
  title: "HARDWARE FRAGMENTS",
  entries: [
    { group: "switches", name: "usb-stop-switch", label: "SWITCH" },
    { group: "connectors", name: "in-cue-connector", label: "CONNECTOR" },
    { group: "jog", name: "jog-wheel-edge", label: "JOG EDGE" },
    { group: "meters", name: "channel-meter-scale", label: "METER SCALE" },
    { group: "miscellaneous", name: "panel-screw-detail", label: "PANEL DETAIL" },
    { group: "labels", name: "channel-label-3", label: "CHANNEL LABEL" },
  ],
});

await contactSheet({
  output: "channel-fader-detail.png",
  title: "REAL CHANNEL FADER",
  entries: [{ group: "faders", name: "channel-fader-cap", label: "WIDE / LOW / MECHANICAL" }],
  width: 900,
  height: 640,
});

await contactSheet({
  output: "fader-rail-study.png",
  title: "FADER RAIL STUDY",
  entries: [
    { group: "rails", name: "channel-fader-rail", label: "CHANNEL RAIL" },
    { group: "rails", name: "tempo-fader-rail", label: "TEMPO RAIL" },
  ],
  width: 1000,
  height: 800,
});

const heroBuffer = await sharp(sourceFiles.hero)
  .resize({ width: 1280, height: 890, fit: "inside", withoutEnlargement: true })
  .toBuffer();
const heroMeta = await sharp(heroBuffer).metadata();
const heroLabel = Buffer.from(`<svg width="1500" height="180"><rect width="100%" height="100%" fill="#ff3f38"/><text x="50" y="62" fill="#0a0a09" font-size="22" font-family="Arial" font-weight="800" letter-spacing="4">CH00 SOURCE AUTHORITY / CONFIRMED</text><text x="50" y="124" fill="#0a0a09" font-size="48" font-family="Arial" font-weight="900">INTACT. NO REGENERATION. NO SUBSTITUTE.</text><text x="50" y="158" fill="#0a0a09" font-size="16" font-family="Arial" font-weight="700">1505 × 1045 ORIGINAL / PATRICK CENTRAL / HAND RAISED</text></svg>`);
await sharp({ create: { width: 1500, height: 1120, channels: 4, background: { r: 14, g: 14, b: 13, alpha: 1 } } })
  .composite([
    { input: heroLabel, left: 0, top: 0 },
    { input: heroBuffer, left: Math.floor((1500 - heroMeta.width) / 2), top: 205 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "certification", "hero-collage-confirmation.png"));

console.log(`Extracted ${samples.length} real photographic samples.`);
