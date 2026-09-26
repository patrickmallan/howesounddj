import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = "design-research/source-library/01-equipment";
const outputDirectory = "design-research/physical-visual-vocabulary-v1/contact-sheets";
const accepted = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const files = fs.readdirSync(sourceDirectory)
  .filter((file) => accepted.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

const audit = {
  "CDJ 3000.jpg": ["Full deck · screen · jog · buttons · fader", "LOW RES · TOPOLOGY REFERENCE"],
  "pexels-andrew-hawkes-2288355-4028924.jpg": ["CUE · fader cap/rail · rotary · labels · brushed surface", "STRONG · PHYSICAL DEPTH"],
  "pexels-anna-pou-8132448.jpg": ["Coloured rotary field · channel markings · faders", "STRONG MATERIAL · NOT DJ-SPECIFIC"],
  "pexels-borishamer-16645406.jpg": ["CUE · Sound Color FX · fader rail · knobs · shadows", "STRONG · PHYSICAL DEPTH"],
  "pexels-jake-l-davies-42710276-15262989.jpg": ["CUE · play/pause · pads · jog ring · jack · labels", "STRONG · FUNCTIONAL COLOUR"],
  "pexels-jo-seph-2693533-17225445.jpg": ["Large jog wheel · LED ring · deck surface", "GOOD SCALE · SOFTER FOCUS"],
  "pexels-julia-fuchs-19936537-7394229.jpg": ["TONE rotary · machining · printed scale · wear", "EXCEPTIONAL MATERIAL MACRO"],
  "pexels-kiril-georgiev-3492134-11900594.jpg": ["LOAD PREP · rotary · illuminated pads · dense labels", "EXCEPTIONAL CONTROL DETAIL"],
  "pexels-lynde-2123295-4693261.jpg": ["Tactile performance pads · bezels · coloured caps", "STRONG · PLAYABLE RHYTHM"],
  "pexels-pixabay-164746.jpg": ["CUE/ON buttons · channel LEDs · fader rails · markings", "STRONG · PALE SURFACE RANGE"],
  "pexels-quirva-14540963.jpg": ["Labelled button bank · rotary · meter-like graphics", "GOOD LANGUAGE · DEVICE UNCERTAIN"],
  "pexels-robert-dan-2759534-12467361.jpg": ["Red pads · CUE · play/pause · jog edge", "STRONG · LOUD FUNCTIONAL COLOUR"],
  "pexels-scott-platt-529822-6134554.jpg": ["Fader bank · rails · rotary rows · irregular positions", "STRONG STRUCTURE · NOT DJ-SPECIFIC"],
  "pexels-tony-entz-6229418-30859665.jpg": ["CUE · LOW–HI rotary · fader edge · channel labels", "EXCEPTIONAL TACTILE DETAIL"],
  "pexels-tstudio-34805588-14745818.jpg": ["MASTER/CUE · rotary stack · labels · partial jog", "STRONG · LAYERED CONTROL FIELD"],
  "pexels-tstudio-34805588-9871953.jpg": ["Fader row · rails · lit rotaries · turquoise buttons", "EXCEPTIONAL PERSPECTIVE"],
  "Screenshot 2026-09-10 at 10.52.10 PM.png": ["XLR male/female · shell · pins · cable relief", "REFERENCE ONLY · PROVENANCE UNKNOWN"],
  "Screenshot 2026-09-10 at 10.54.15 PM.png": ["Stacked waveform · cue markers · colour density", "REFERENCE ONLY · PROVENANCE UNKNOWN"],
};

const cardWidth = 520;
const cardHeight = 485;
const imageWidth = 480;
const imageHeight = 360;
const columns = 3;
const rows = 2;
const perSheet = columns * rows;

for (let page = 0; page < Math.ceil(files.length / perSheet); page += 1) {
  const subset = files.slice(page * perSheet, (page + 1) * perSheet);
  const composite = [];
  for (let index = 0; index < subset.length; index += 1) {
    const file = subset[index];
    const left = 20 + (index % columns) * cardWidth;
    const top = 20 + Math.floor(index / columns) * cardHeight;
    const image = await sharp(path.join(sourceDirectory, file))
      .rotate()
      .resize(imageWidth, imageHeight, { fit: "contain", background: "#11110f" })
      .toBuffer();
    const escaped = file.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const [objects, readiness] = audit[file] ?? ["Audit pending", "RESEARCH ONLY"];
    const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="95">
      <rect width="100%" height="100%" fill="#f3d62f"/>
      <text x="10" y="20" fill="#0a0a09" font-family="Arial" font-weight="700" font-size="13">${String(page * perSheet + index + 1).padStart(2, "0")} · ${escaped.slice(0, 55)}</text>
      <text x="10" y="45" fill="#0a0a09" font-family="Arial" font-size="12">${objects}</text>
      <text x="10" y="71" fill="#0a0a09" font-family="Arial" font-weight="700" font-size="11" letter-spacing="1.4">${readiness}</text>
      <text x="10" y="88" fill="#0a0a09" font-family="Arial" font-size="9">SRC-EQP-${String(page * perSheet + index + 1).padStart(3, "0")} · RESEARCH ONLY</text>
    </svg>`);
    composite.push({ input: image, left, top });
    composite.push({ input: label, left, top: top + imageHeight });
  }
  await sharp({
    create: {
      width: 1580,
      height: 1010,
      channels: 3,
      background: "#090a09",
    },
  }).composite(composite).png().toFile(path.join(outputDirectory, `source-contact-${page + 1}.png`));
}

fs.writeFileSync(
  path.join(outputDirectory, "source-order.txt"),
  files.map((file, index) => `${String(index + 1).padStart(2, "0")} ${file}`).join("\n") + "\n",
);

console.log(`Built ${Math.ceil(files.length / perSheet)} contact sheets for ${files.length} source images.`);
