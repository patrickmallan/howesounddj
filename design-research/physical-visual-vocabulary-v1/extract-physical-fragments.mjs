import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "design-research/physical-visual-vocabulary-v1";
const sourceRoot = "design-research/source-library/01-equipment";

const fragments = [
  { id: "DRV-EQP-001", category: "faders", file: "cue-fader-andrew.jpg", sourceId: "SRC-EQP-002", source: "pexels-andrew-hawkes-2288355-4028924.jpg", crop: [0.13, 0.18, 0.58, 0.70], title: "CUE / fader / brushed deck", strength: "Physical depth, wear, typography and control hierarchy" },
  { id: "DRV-EQP-002", category: "knobs", file: "eq-grid-anna.jpg", sourceId: "SRC-EQP-003", source: "pexels-anna-pou-8132448.jpg", crop: [0.08, 0.24, 0.84, 0.60], title: "Analogue knob field", strength: "Colour-coded rotary rhythm and imperfect alignment" },
  { id: "DRV-EQP-003", category: "faders", file: "sound-colour-fader-boris.jpg", sourceId: "SRC-EQP-004", source: "pexels-borishamer-16645406.jpg", crop: [0.34, 0.14, 0.62, 0.68], title: "Sound Colour FX strip", strength: "Labels, rail, cap and shallow hardware shadows" },
  { id: "DRV-EQP-004", category: "buttons", file: "cue-play-pad-jake.jpg", sourceId: "SRC-EQP-005", source: "pexels-jake-l-davies-42710276-15262989.jpg", crop: [0.05, 0.48, 0.90, 0.41], title: "CUE / play / performance pads", strength: "Recognizable illuminated controls with club colour" },
  { id: "DRV-EQP-005", category: "jog-wheels", file: "green-jog-ring-jake.jpg", sourceId: "SRC-EQP-005", source: "pexels-jake-l-davies-42710276-15262989.jpg", crop: [0.08, 0.24, 0.84, 0.42], title: "Green jog-wheel ring", strength: "Large circular geometry and credible LED spill" },
  { id: "DRV-EQP-006", category: "jog-wheels", file: "green-jog-denon.jpg", sourceId: "SRC-EQP-006", source: "pexels-jo-seph-2693533-17225445.jpg", crop: [0.08, 0.34, 0.86, 0.52], title: "Denon jog-wheel macro", strength: "Bold circular anchor with real edge and surface texture" },
  { id: "DRV-EQP-007", category: "knobs", file: "tone-knob-julia.jpg", sourceId: "SRC-EQP-007", source: "pexels-julia-fuchs-19936537-7394229.jpg", crop: [0.07, 0.06, 0.78, 0.79], title: "TONE rotary macro", strength: "Exceptional material, concentric form, marking and wear" },
  { id: "DRV-EQP-008", category: "buttons", file: "load-prep-pads-kiril.jpg", sourceId: "SRC-EQP-008", source: "pexels-kiril-georgiev-3492134-11900594.jpg", crop: [0.16, 0.15, 0.73, 0.76], title: "LOAD PREP / pad bank", strength: "Orange and white illumination with dense printed labels" },
  { id: "DRV-EQP-009", category: "buttons", file: "tactile-pad-grid-lynde.jpg", sourceId: "SRC-EQP-009", source: "pexels-lynde-2123295-4693261.jpg", crop: [0.03, 0.19, 0.94, 0.73], title: "Tactile performance pad grid", strength: "Finger-scale controls, coloured caps and deep bezels" },
  { id: "DRV-EQP-010", category: "meters", file: "cue-on-led-rail-pixabay.jpg", sourceId: "SRC-EQP-010", source: "pexels-pixabay-164746.jpg", crop: [0.04, 0.24, 0.92, 0.66], title: "CUE / ON / channel indicators", strength: "Warm physical buttons, meter lights and marked fader rails" },
  { id: "DRV-EQP-011", category: "labels", file: "labelled-pad-bank-quirva.jpg", sourceId: "SRC-EQP-011", source: "pexels-quirva-14540963.jpg", crop: [0.05, 0.26, 0.90, 0.53], title: "Labelled illuminated controls", strength: "Dense operator language and stage-light colour" },
  { id: "DRV-EQP-012", category: "buttons", file: "cue-play-pads-robert.jpg", sourceId: "SRC-EQP-012", source: "pexels-robert-dan-2759534-12467361.jpg", crop: [0.06, 0.39, 0.89, 0.49], title: "Red pads / CUE / play", strength: "Aggressive colour and unmistakable playable hardware" },
  { id: "DRV-EQP-013", category: "faders", file: "fader-bank-scott.jpg", sourceId: "SRC-EQP-013", source: "pexels-scott-platt-529822-6134554.jpg", crop: [0.13, 0.23, 0.74, 0.67], title: "Mixing-console fader bank", strength: "Mechanical repetition, rails and irregular cap positions" },
  { id: "DRV-EQP-014", category: "knobs", file: "cue-low-high-tony.jpg", sourceId: "SRC-EQP-014", source: "pexels-tony-entz-6229418-30859665.jpg", crop: [0.09, 0.16, 0.84, 0.75], title: "CUE / LOW–HI rotary", strength: "Blue light, oversized dial and tactile button depth" },
  { id: "DRV-EQP-015", category: "labels", file: "master-cue-jog-tstudio.jpg", sourceId: "SRC-EQP-015", source: "pexels-tstudio-34805588-14745818.jpg", crop: [0.24, 0.08, 0.72, 0.78], title: "MASTER / CUE / jog edge", strength: "Layered controls and credible functional labelling" },
  { id: "DRV-EQP-016", category: "faders", file: "illuminated-fader-row-tstudio.jpg", sourceId: "SRC-EQP-016", source: "pexels-tstudio-34805588-9871953.jpg", crop: [0.15, 0.18, 0.72, 0.66], title: "Illuminated fader row", strength: "Strong perspective, turquoise lights and mechanical density" },
  { id: "DRV-EQP-017", category: "cables", file: "xlr-connectors-reference.png", sourceId: "SRC-EQP-017", source: "Screenshot 2026-09-10 at 10.52.10 PM.png", crop: [0.01, 0.08, 0.98, 0.84], title: "XLR connector reference", strength: "Useful connector silhouette; provenance prevents production use" },
  { id: "DRV-EQP-018", category: "meters", file: "software-waveform-reference.png", sourceId: "SRC-EQP-018", source: "Screenshot 2026-09-10 at 10.54.15 PM.png", crop: [0, 0, 1, 1], title: "DJ waveform reference", strength: "Authentic density and cue markers; provenance prevents production use" },
];

const uses = {
  buttons: "Action control / navigation trigger / sectional punctuation",
  faders: "Progression / pacing / comparison / directional movement",
  knobs: "Local focus / counter-rhythm / controlled intensity",
  meters: "Signal / tempo / motion / transition language",
  "jog-wheels": "Large anchor / grid break / cropped circular scale",
  labels: "Metadata / operator language / annotated information surface",
  cables: "Physical assembly / working-life evidence / path-making",
};

for (const fragment of fragments) {
  const sourcePath = path.join(sourceRoot, fragment.source);
  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();
  const [x, y, width, height] = fragment.crop;
  const extract = {
    left: Math.max(0, Math.round(metadata.width * x)),
    top: Math.max(0, Math.round(metadata.height * y)),
    width: Math.min(metadata.width, Math.round(metadata.width * width)),
    height: Math.min(metadata.height, Math.round(metadata.height * height)),
  };
  extract.width = Math.min(extract.width, metadata.width - extract.left);
  extract.height = Math.min(extract.height, metadata.height - extract.top);
  const destination = path.join(root, "extracted", fragment.category, fragment.file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  let output = sharp(sourcePath).rotate().extract(extract).resize({ width: 1400, height: 1000, fit: "inside", withoutEnlargement: true });
  output = path.extname(destination).toLowerCase() === ".png" ? output.png() : output.jpeg({ quality: 91, mozjpeg: true });
  await output.toFile(destination);
  fragment.pixelCrop = extract;
  fragment.output = destination;
  fragment.designUse = uses[fragment.category] ?? "Physical evidence / collage material";
  fragment.transform = "rotation normalization; rectangular documentary crop; proportional resize only; no generative fill; no retouching";
  fragment.approval = "RESEARCH_ONLY";
}

fs.writeFileSync(path.join(root, "fragment-register.json"), `${JSON.stringify(fragments, null, 2)}\n`);
console.log(`Created ${fragments.length} traceable physical fragments.`);
