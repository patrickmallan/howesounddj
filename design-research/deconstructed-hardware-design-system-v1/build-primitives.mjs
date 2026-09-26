import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "design-research/deconstructed-hardware-design-system-v1";
const sourceRoot = "design-research/source-library/01-equipment";
const cropsRoot = path.join(root, "source-crops");
const atomsRoot = path.join(root, "primitives");

for (const directory of [
  cropsRoot,
  path.join(atomsRoot, "faders"),
  path.join(atomsRoot, "buttons"),
  path.join(atomsRoot, "rotaries"),
  path.join(atomsRoot, "meters"),
  path.join(atomsRoot, "platters"),
  path.join(atomsRoot, "labels"),
  path.join(atomsRoot, "panels"),
  path.join(atomsRoot, "textures"),
  path.join(root, "boards"),
]) fs.mkdirSync(directory, { recursive: true });

const specs = [
  { id: "ATOM-FADER-01", sourceId: "SRC-EQP-016", source: "pexels-tstudio-34805588-9871953.jpg", file: "fader-cap.png", category: "faders", crop: [0.51, 0.34, 0.31, 0.28], mode: "fader-cap", title: "Fader cap", parts: ["cap body", "indicator stripe", "edge wear", "cast shadow"], uses: ["current-position marker", "draggable control", "chapter indicator"] },
  { id: "ATOM-FADER-02", sourceId: "SRC-EQP-016", source: "pexels-tstudio-34805588-9871953.jpg", file: "fader-rail.png", category: "faders", crop: [0.51, 0.34, 0.31, 0.28], mode: "fader-rail", title: "Fader rail", parts: ["rail", "slot", "tick texture", "end stops"], uses: ["chapter progress", "page seam", "image/type boundary"] },
  { id: "ATOM-BUTTON-01", sourceId: "SRC-EQP-014", source: "pexels-tony-entz-6229418-30859665.jpg", file: "cue-button-blue.png", category: "buttons", crop: [0.17, 0.49, 0.28, 0.29], mode: "soft-quad", title: "Blue CUE button", parts: ["face", "bezel", "label", "blue spill", "panel shadow"], uses: ["primary action", "selected navigation", "story trigger"] },
  { id: "ATOM-BUTTON-02", sourceId: "SRC-EQP-008", source: "pexels-kiril-georgiev-3492134-11900594.jpg", file: "load-prep-button.png", category: "buttons", crop: [0.48, 0.32, 0.29, 0.28], mode: "soft-quad", title: "LOAD PREP control", parts: ["button face", "orange bezel", "legend", "neighbour label", "light falloff"], uses: ["secondary action", "preparation state", "metadata switch"] },
  { id: "ATOM-PAD-01", sourceId: "SRC-EQP-005", source: "pexels-jake-l-davies-42710276-15262989.jpg", file: "cue-play-pad-cluster.png", category: "buttons", crop: [0.17, 0.57, 0.47, 0.29], mode: "soft-quad", title: "CUE / play control cluster", parts: ["CUE face", "play face", "bezels", "headphone jack", "surface glow"], uses: ["paired CTA", "binary choice", "conversion action"] },
  { id: "ATOM-ROTARY-01", sourceId: "SRC-EQP-007", source: "pexels-julia-fuchs-19936537-7394229.jpg", file: "tone-rotary-face.png", category: "rotaries", crop: [0.13, 0.11, 0.59, 0.66], mode: "ellipse", title: "Concentric TONE rotary", parts: ["machined face", "indicator", "ridged body", "scale", "wear"], uses: ["selector", "focus anchor", "circular type path"] },
  { id: "ATOM-ROTARY-02", sourceId: "SRC-EQP-014", source: "pexels-tony-entz-6229418-30859665.jpg", file: "low-hi-rotary.png", category: "rotaries", crop: [0.33, 0.21, 0.33, 0.56], mode: "ellipse-wide", title: "LOW–HI rotary + scale", parts: ["body", "indicator line", "range arc", "LOW/HI labels", "blue light"], uses: ["preference selector", "intensity control", "section anchor"] },
  { id: "ATOM-PLATTER-01", sourceId: "SRC-EQP-005", source: "pexels-jake-l-davies-42710276-15262989.jpg", file: "green-platter-ring.png", category: "platters", crop: [0.12, 0.25, 0.66, 0.38], mode: "ring", title: "Illuminated platter ring", parts: ["outer ring", "centre", "edge", "green spill", "partial deck"], uses: ["photo mask", "page interruption", "circular transition"] },
  { id: "ATOM-METER-01", sourceId: "SRC-EQP-010", source: "pexels-pixabay-164746.jpg", file: "channel-meter-column.png", category: "meters", crop: [0.44, 0.34, 0.21, 0.55], mode: "soft-strip", title: "Channel indicator column", parts: ["LED dots", "scale values", "source labels", "active state"], uses: ["chapter intensity", "navigation rhythm", "progress signal"] },
  { id: "ATOM-PANEL-01", sourceId: "SRC-EQP-015", source: "pexels-tstudio-34805588-14745818.jpg", file: "master-panel-strip.png", category: "panels", crop: [0.35, 0.02, 0.29, 0.94], mode: "soft-strip", title: "MASTER panel strip", parts: ["panel seam", "MASTER label", "CUE control", "screws", "channel marks"], uses: ["page spine", "navigation rail", "chapter divider"] },
  { id: "ATOM-LABEL-01", sourceId: "SRC-EQP-002", source: "pexels-andrew-hawkes-2288355-4028924.jpg", file: "cue-label-stencil.png", category: "labels", crop: [0.30, 0.46, 0.16, 0.14], mode: "threshold-light", title: "CUE label stencil", parts: ["printed legend", "button outline", "source grain"], uses: ["annotation", "overprint", "state label"] },
  { id: "ATOM-TEXTURE-01", sourceId: "SRC-EQP-002", source: "pexels-andrew-hawkes-2288355-4028924.jpg", file: "brushed-panel-texture.png", category: "textures", crop: [0.46, 0.30, 0.33, 0.46], mode: "texture", title: "Brushed black panel", parts: ["grain", "printed marks", "shallow scratch", "uneven reflection"], uses: ["type surface", "section field", "overprint material"] },
  { id: "ATOM-LED-01", sourceId: "SRC-EQP-016", source: "pexels-tstudio-34805588-9871953.jpg", file: "turquoise-led-row.png", category: "meters", crop: [0.04, 0.70, 0.32, 0.28], mode: "soft-strip", title: "Turquoise LED rhythm", parts: ["individual light", "repetition", "bloom", "panel edge"], uses: ["navigation rhythm", "chapter beats", "motion cadence"] },
];

function maskSvg(spec, width, height) {
  const mode = spec.mode;
  if (mode === "fader-cap") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.41} ${height * 0.36} L ${width * 0.57} ${height * 0.19} Q ${width * 0.65} ${height * 0.14} ${width * 0.73} ${height * 0.20} L ${width * 0.93} ${height * 0.40} L ${width * 0.93} ${height * 0.61} L ${width * 0.68} ${height * 0.70} L ${width * 0.42} ${height * 0.52} Z" fill="white"/></svg>`);
  if (mode === "fader-rail") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.02} ${height * 0.48} L ${width * 0.58} ${height * 0.34} L ${width * 0.67} ${height * 0.66} L ${width * 0.08} ${height * 0.91} Z" fill="white"/></svg>`);
  if (spec.id === "ATOM-BUTTON-01") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.11} ${height * 0.62} L ${width * 0.49} ${height * 0.53} L ${width * 0.95} ${height * 0.73} Q ${width} ${height * 0.79} ${width * 0.94} ${height * 0.97} L ${width * 0.13} ${height * 0.99} Q ${width * 0.03} ${height * 0.92} ${width * 0.05} ${height * 0.75} Z" fill="white"/></svg>`);
  if (spec.id === "ATOM-BUTTON-02") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.30} ${height * 0.22} L ${width * 0.83} ${height * 0.37} L ${width * 0.93} ${height * 0.58} L ${width * 0.40} ${height * 0.77} L ${width * 0.18} ${height * 0.60} Z" fill="white"/></svg>`);
  if (spec.id === "ATOM-PAD-01") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.03} ${height * 0.18} L ${width * 0.55} ${height * 0.02} L ${width * 0.98} ${height * 0.26} L ${width * 0.92} ${height * 0.94} L ${width * 0.10} ${height * 0.98} Z" fill="white"/></svg>`);
  if (mode === "ellipse") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="${width * 0.49}" cy="${height * 0.48}" rx="${width * 0.47}" ry="${height * 0.46}" fill="white"/></svg>`);
  if (mode === "ellipse-wide") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="${width * 0.50}" cy="${height * 0.50}" rx="${width * 0.48}" ry="${height * 0.48}" fill="white"/></svg>`);
  if (mode === "ring") {
    const cx = width * 0.50;
    const cy = height * 0.50;
    const ox = width * 0.49;
    const oy = height * 0.47;
    const ix = width * 0.31;
    const iy = height * 0.25;
    return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path fill="white" fill-rule="evenodd" d="M ${cx - ox} ${cy} a ${ox} ${oy} 0 1 0 ${ox * 2} 0 a ${ox} ${oy} 0 1 0 ${-ox * 2} 0 M ${cx - ix} ${cy} a ${ix} ${iy} 0 1 1 ${ix * 2} 0 a ${ix} ${iy} 0 1 1 ${-ix * 2} 0"/></svg>`);
  }
  if (spec.id === "ATOM-LED-01") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M ${width * 0.34} 0 L ${width * 0.75} 0 L ${width * 0.86} ${height * 0.15} L ${width * 0.70} ${height * 0.25} L ${width * 0.40} ${height * 0.17} Z" fill="white"/><path d="M ${width * 0.55} ${height * 0.12} L ${width * 0.96} ${height * 0.20} L ${width} ${height * 0.41} L ${width * 0.82} ${height * 0.50} L ${width * 0.58} ${height * 0.36} Z" fill="white"/><path d="M ${width * 0.78} ${height * 0.36} L ${width} ${height * 0.43} L ${width} ${height * 0.70} L ${width * 0.90} ${height * 0.74} L ${width * 0.75} ${height * 0.55} Z" fill="white"/></svg>`);
  if (mode === "soft-quad") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="${width * 0.02}" y="${height * 0.02}" width="${width * 0.96}" height="${height * 0.96}" rx="${Math.min(width, height) * 0.08}" fill="white"/></svg>`);
  if (mode === "soft-strip") return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="${width * 0.03}" y="${height * 0.01}" width="${width * 0.94}" height="${height * 0.98}" rx="${Math.min(width, height) * 0.05}" fill="white"/></svg>`);
  return null;
}

for (const spec of specs) {
  const sourcePath = path.join(sourceRoot, spec.source);
  const metadata = await sharp(sourcePath).rotate().metadata();
  const [x, y, w, h] = spec.crop;
  const box = {
    left: Math.round(metadata.width * x),
    top: Math.round(metadata.height * y),
    width: Math.round(metadata.width * w),
    height: Math.round(metadata.height * h),
  };
  box.width = Math.min(box.width, metadata.width - box.left);
  box.height = Math.min(box.height, metadata.height - box.top);
  const cropPath = path.join(cropsRoot, `${spec.id.toLowerCase()}-${path.basename(spec.file)}`);
  const cropped = await sharp(sourcePath).rotate().extract(box).resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).png().toBuffer();
  await sharp(cropped).toFile(cropPath);
  const cropMetadata = await sharp(cropped).metadata();
  const outputPath = path.join(atomsRoot, spec.category, spec.file);
  if (spec.mode.startsWith("threshold")) {
    let alpha = sharp(cropped).greyscale().normalize().threshold(168);
    if (spec.mode === "threshold") alpha = alpha.negate();
    const mono = await alpha.toColourspace("b-w").png().toBuffer();
    await sharp({ create: { width: cropMetadata.width, height: cropMetadata.height, channels: 3, background: { r: 255, g: 225, b: 38 } } })
      .joinChannel(mono)
      .png().toFile(outputPath);
  } else if (["texture"].includes(spec.mode)) {
    await sharp(cropped).modulate({ saturation: 0 }).normalize().linear(1.18, -18).png().toFile(outputPath);
  } else {
    const mask = maskSvg(spec, cropMetadata.width, cropMetadata.height);
    await sharp(cropped).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toFile(outputPath);
  }
  spec.pixelCrop = box;
  spec.cropPath = cropPath;
  spec.output = outputPath;
  spec.transform = spec.mode.startsWith("threshold")
    ? "source crop; greyscale; contrast normalisation; threshold; yellow overprint; alpha from source luminance"
    : spec.mode === "texture"
      ? "source crop; greyscale; contrast normalisation"
      : `source crop; source-pixel alpha mask (${spec.mode}); no generative fill; no redrawing`;
  spec.approval = "RESEARCH_ONLY";
}

fs.writeFileSync(path.join(root, "primitive-register.json"), `${JSON.stringify(specs, null, 2)}\n`);
console.log(`Built ${specs.length} source-traceable atomic primitives.`);
