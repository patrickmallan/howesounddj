import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "design-research/deconstructed-hardware-design-system-v1";
const transformationRoot = path.join(root, "transformations");
const experimentRoot = path.join(root, "experiments");
const boardRoot = path.join(root, "boards");
for (const directory of [transformationRoot, experimentRoot, boardRoot]) fs.mkdirSync(directory, { recursive: true });

const registry = JSON.parse(fs.readFileSync(path.join(root, "primitive-register.json"), "utf8"));
const byId = Object.fromEntries(registry.map((item) => [item.id, item]));
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const palette = {
  black: "#080907",
  panel: "#11120f",
  white: "#f5f0e7",
  grey: "#a7a49d",
  yellow: "#ffe126",
  blue: "#155cff",
  red: "#ff3b20",
  cyan: "#18f0da",
  magenta: "#f42593",
};

function svg(width, height, content, background = "transparent") {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${background}"/>
    <style>
      .k { font: 800 15px Arial, sans-serif; letter-spacing: 4px; fill: ${palette.yellow}; }
      .h { font: 900 54px Arial, sans-serif; letter-spacing: -2px; fill: ${palette.white}; }
      .hh { font: 900 82px Arial, sans-serif; letter-spacing: -4px; fill: ${palette.white}; }
      .b { font: 400 24px Arial, sans-serif; fill: ${palette.grey}; }
      .m { font: 700 19px Arial, sans-serif; letter-spacing: 1px; fill: ${palette.white}; }
      .s { font: 400 16px Arial, sans-serif; fill: ${palette.grey}; }
      .x { font: 800 13px Arial, sans-serif; letter-spacing: 2px; fill: ${palette.yellow}; }
      .dark { fill: ${palette.black}; }
    </style>${content}</svg>`);
}

async function fit(input, width, height, options = {}) {
  return sharp(input).resize(width, height, { fit: options.fit ?? "contain", position: options.position ?? "attention", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

async function saveTransformation(id, filename, operation, note) {
  const item = byId[id];
  const target = path.join(transformationRoot, filename);
  await operation(sharp(item.output).ensureAlpha()).png().toFile(target);
  return { id: `TX-${String(transformations.length + 1).padStart(2, "0")}`, sourcePrimitive: id, output: target, note, approval: "RESEARCH_ONLY" };
}

const transformations = [];
transformations.push(await saveTransformation("ATOM-FADER-02", "fader-rail-yellow-duotone.png", (image) => image.greyscale().normalize().tint(palette.yellow), "Duotone rail for a high-contrast page seam."));
transformations.push(await saveTransformation("ATOM-BUTTON-01", "cue-button-yellow-overprint.png", (image) => image.greyscale().normalize().tint(palette.yellow), "Yellow conversion-state overprint preserving photographed depth."));
transformations.push(await saveTransformation("ATOM-BUTTON-01", "cue-button-disabled.png", (image) => image.modulate({ saturation: 0.1, brightness: 0.38 }), "Disabled state created by light reduction, not redrawing."));
transformations.push(await saveTransformation("ATOM-PLATTER-01", "platter-ring-magenta.png", (image) => image.modulate({ hue: 285, saturation: 1.35, brightness: 1.08 }), "Colour-shifted ring for an extreme photographic interruption."));
transformations.push(await saveTransformation("ATOM-ROTARY-01", "tone-rotary-photocopy.png", (image) => image.greyscale().normalize().threshold(138).tint(palette.yellow), "High-contrast photocopy treatment retaining the concentric source structure."));
transformations.push(await saveTransformation("ATOM-METER-01", "meter-column-high-contrast.png", (image) => image.normalize().linear(1.25, -24), "High-contrast meter column for small-scale signal legibility."));
transformations.push(await saveTransformation("ATOM-PANEL-01", "master-panel-monochrome.png", (image) => image.greyscale().normalize(), "Monochrome panel spine for structural use."));
transformations.push(await saveTransformation("ATOM-LED-01", "led-row-red-shift.png", (image) => image.modulate({ hue: 148, saturation: 1.5, brightness: 1.08 }), "Red-shifted operational rhythm for active navigation."));
transformations.push(await saveTransformation("ATOM-TEXTURE-01", "brushed-panel-blue-overprint.png", (image) => image.greyscale().normalize().tint(palette.blue), "Blue material field for typography and overprint."));
fs.writeFileSync(path.join(root, "transformation-register.json"), `${JSON.stringify(transformations, null, 2)}\n`);

async function experiment(number, slug, title, principle, composites, extraSvg = "") {
  const width = 1200;
  const height = 760;
  const base = svg(width, height, `
    <rect width="100%" height="100%" fill="${palette.black}"/>
    <path d="M 0 1 H 1200 M 0 759 H 1200" stroke="#44463f" stroke-width="2"/>
    <circle cx="28" cy="28" r="7" fill="#6e6e68"/><circle cx="1172" cy="28" r="7" fill="#6e6e68"/>
    <text class="k" x="42" y="61">EXPERIMENT ${String(number).padStart(2, "0")}</text>
    <text class="h" x="42" y="126">${esc(title)}</text>
    ${extraSvg}
    <text class="s" x="42" y="728">${esc(principle)}</text>
  `);
  const target = path.join(experimentRoot, `exp-${String(number).padStart(2, "0")}-${slug}.png`);
  await sharp(base).composite(composites).png().toFile(target);
  return { id: `EXP-${String(number).padStart(2, "0")}`, number, slug, title, principle, output: target, approval: "RESEARCH_ONLY" };
}

const experiments = [];

const railVertical = await sharp(path.join(transformationRoot, "fader-rail-yellow-duotone.png")).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).rotate(78, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(105, 560, { fit: "fill" }).png().toBuffer();
const faderCap = await sharp(byId["ATOM-FADER-01"].output).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(260, 260, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
experiments.push(await experiment(1, "chapter-seam", "CHAPTER SEAM", "Rail = progression · cap = current chapter · seam carries state", [
  { input: railVertical, left: 520, top: 165 },
  { input: faderCap, left: 445, top: 330 },
], `<text class="hh" x="690" y="320">00</text><text class="hh" x="690" y="415" fill="#44463f">01</text><text class="hh" x="690" y="510" fill="#292a26">02</text>`));

const cueBig = await fit(byId["ATOM-BUTTON-01"].output, 620, 430);
experiments.push(await experiment(2, "tactile-action", "TACTILE ACTION", "A photographed control performs the action; glow and depth carry affordance", [
  { input: cueBig, left: 520, top: 225 },
], `<text class="hh" x="56" y="318">CHECK</text><text class="hh" x="56" y="405">YOUR DATE</text><path d="M 58 449 H 470" stroke="${palette.yellow}" stroke-width="8"/>`));

const meter = await fit(path.join(transformationRoot, "meter-column-high-contrast.png"), 330, 520);
experiments.push(await experiment(3, "energy-meter", "ENERGY HAS A SCALE", "Meter = truthful progression and chapter intensity, never decorative bars", [
  { input: meter, left: 780, top: 170 },
], `<text class="m" x="70" y="255">ARRIVAL</text><text class="m" x="70" y="338">DINNER</text><text class="m" x="70" y="421">FIRST DANCE</text><text class="m" x="70" y="504">OPEN FLOOR</text><path d="M 52 220 H 700 M 52 303 H 700 M 52 386 H 700 M 52 469 H 700" stroke="#34352f" stroke-width="2"/>`));

const weddingPath = "design-research/source-library/04-weddings-documentary/Meghan & Brodie-55 (2).jpg";
const weddingCircle = await sharp(weddingPath).resize(560, 560, { fit: "cover", position: "attention" }).ensureAlpha().composite([{ input: Buffer.from(`<svg width="560" height="560" xmlns="http://www.w3.org/2000/svg"><circle cx="280" cy="280" r="270" fill="white"/></svg>`), blend: "dest-in" }]).png().toBuffer();
const ringBig = await fit(path.join(transformationRoot, "platter-ring-magenta.png"), 680, 500);
experiments.push(await experiment(4, "platter-mask", "THE ROOM INSIDE THE PLATTER", "Platter = photographic aperture and hard page interruption", [
  { input: weddingCircle, left: 555, top: 150 },
  { input: ringBig, left: 495, top: 172 },
], `<text class="hh" x="52" y="300">THE</text><text class="hh" x="52" y="390">ROOM</text><text class="hh" x="52" y="480">MOVES.</text>`));

const knob = await fit(byId["ATOM-ROTARY-01"].output, 520, 520);
experiments.push(await experiment(5, "selector", "RANGE WITHOUT A GENRE WALL", "Rotary = preference selector; the control changes meaning, not decoration", [
  { input: knob, left: 340, top: 160 },
], `<text class="m" x="75" y="270">WARM-UP</text><text class="m" x="83" y="530">THROWBACKS</text><text class="m" x="860" y="270">HOUSE</text><text class="m" x="866" y="530">FULL SEND</text><path d="M 275 290 L 330 320 M 275 505 L 330 475 M 865 290 L 820 320 M 865 505 L 820 475" stroke="${palette.yellow}" stroke-width="3"/>`));

const led = await fit(path.join(transformationRoot, "led-row-red-shift.png"), 980, 330);
experiments.push(await experiment(6, "navigation-rhythm", "NAVIGATION AS A BEAT", "Real illuminated controls create state rhythm; one active light names location", [
  { input: led, left: 110, top: 265 },
], `<text class="m" x="100" y="640">WEDDINGS</text><text class="m" x="370" y="640">SQUAMISH</text><text class="m" x="642" y="640">JOURNAL</text><text class="m" x="900" y="640">ABOUT</text>`));

const label = await fit(byId["ATOM-LABEL-01"].output, 620, 360);
experiments.push(await experiment(7, "type-overprint", "TYPE TAKES THE LABEL", "Printed equipment language becomes an overprint and hierarchy interruption", [
  { input: label, left: 560, top: 215 },
], `<text class="hh" x="52" y="335">LISTEN</text><text class="hh" x="52" y="430">FIRST.</text><path d="M 45 470 H 1050" stroke="${palette.blue}" stroke-width="28" opacity=".78"/>`));

const panel = await fit(path.join(transformationRoot, "master-panel-monochrome.png"), 410, 610);
experiments.push(await experiment(8, "panel-spine", "THE PANEL BECOMES THE GRID", "Channel strip = page spine; seams and screws replace generic card borders", [
  { input: panel, left: 505, top: 145 },
], `<text class="m" x="64" y="270">WHAT WE HANDLE</text><text class="b" x="64" y="320">CEREMONY</text><text class="b" x="64" y="365">COCKTAILS</text><text class="b" x="64" y="410">DINNER</text><text class="m" x="930" y="270">WHAT YOU FEEL</text><text class="b" x="930" y="320">FLOW</text><text class="b" x="930" y="365">MOMENTUM</text><text class="b" x="930" y="410">RELEASE</text>`));

const patrickPath = "public/images/about/patrick-dj-action.webp";
const patrick = await sharp(patrickPath).resize(520, 590, { fit: "cover", position: "top" }).modulate({ saturation: 0.84 }).png().toBuffer();
const cueYellow = await fit(path.join(transformationRoot, "cue-button-yellow-overprint.png"), 440, 280);
experiments.push(await experiment(9, "patrick-control", "HUMAN / MACHINE: PATRICK", "Patrick remains documentary; hardware crosses the image as active structure", [
  { input: patrick, left: 610, top: 145 },
  { input: railVertical, left: 500, top: 170 },
  { input: cueYellow, left: 430, top: 465 },
], `<text class="hh" x="42" y="300">READ</text><text class="hh" x="42" y="390">THE ROOM.</text><path d="M 40 425 H 500" stroke="${palette.red}" stroke-width="12"/>`));

const texture = await fit(path.join(transformationRoot, "brushed-panel-blue-overprint.png"), 1200, 760, { fit: "cover" });
const pad = await fit(byId["ATOM-PAD-01"].output, 520, 350);
experiments.push(await experiment(10, "wedding-collision", "HUMAN / MACHINE: RELEASE", "Documentary energy, control depth and overprint collide without pretending to be one photograph", [
  { input: texture, left: 0, top: 0, blend: "screen", opacity: 0.35 },
  { input: weddingCircle, left: 60, top: 150 },
  { input: pad, left: 680, top: 330 },
], `<text class="hh" x="610" y="260">WHEN IT</text><text class="hh" x="610" y="350">OPENS UP.</text>`));

fs.writeFileSync(path.join(root, "experiment-register.json"), `${JSON.stringify(experiments, null, 2)}\n`);

// Source-to-primitive decomposition board: source photos are intentionally small; extracted atoms dominate.
const decompW = 2400;
const decompH = 2500;
const decompComposite = [{ input: svg(decompW, decompH, `
  <text class="k" x="90" y="70">HSDJ / DECONSTRUCTED HARDWARE / SOURCE → PRIMITIVE</text>
  <text class="h" x="90" y="145">SAMPLE THE OBJECT. KEEP THE EVIDENCE.</text>
  <text class="b" x="90" y="200">The source photograph is provenance. The isolated atom becomes construction material.</text>
  <path d="M 510 300 V 2370" stroke="#363730" stroke-width="2"/><path d="M 0 2380 H 2400" stroke="#363730" stroke-width="2"/>
`, palette.black), left: 0, top: 0 }];

const decompositionIds = ["ATOM-FADER-01", "ATOM-FADER-02", "ATOM-BUTTON-01", "ATOM-ROTARY-01", "ATOM-PLATTER-01", "ATOM-METER-01", "ATOM-PANEL-01"];
for (let index = 0; index < decompositionIds.length; index += 1) {
  const item = byId[decompositionIds[index]];
  const y = 290 + index * 292;
  const source = await sharp(path.join("design-research/source-library/01-equipment", item.source)).resize(330, 220, { fit: "cover", position: "attention" }).png().toBuffer();
  const atom = await fit(item.output, 430, 245);
  const meta = svg(1260, 245, `<text class="x" x="0" y="35">${esc(item.id)} · ${esc(item.sourceId)}</text><text class="h" x="0" y="98">${esc(item.title)}</text><text class="s" x="0" y="145">PARTS · ${esc(item.parts.join(" · "))}</text><text class="s" x="0" y="184">BECOMES · ${esc(item.uses.join(" · "))}</text><path d="M 0 220 H 1200" stroke="#30312c" stroke-width="2"/>`);
  decompComposite.push({ input: source, left: 100, top: y });
  decompComposite.push({ input: atom, left: 590, top: y - 12 });
  decompComposite.push({ input: meta, left: 1075, top: y });
}
await sharp({ create: { width: decompW, height: decompH, channels: 4, background: palette.black } }).composite(decompComposite).png().toFile(path.join(boardRoot, "01-source-to-primitive-decomposition.png"));

// Transformation board.
const transComposite = [{ input: svg(2400, 2150, `<text class="k" x="90" y="70">HSDJ / TRANSFORMATION STUDIES</text><text class="h" x="90" y="145">SAME HARDWARE. DIFFERENT PRESSURE.</text><text class="b" x="90" y="200">Scale, threshold, colour and repetition may change. Source geometry remains legible.</text>`, palette.black), left: 0, top: 0 }];
for (let i = 0; i < transformations.length; i += 1) {
  const tx = transformations[i];
  const column = i % 3;
  const row = Math.floor(i / 3);
  const left = 90 + column * 770;
  const top = 300 + row * 580;
  const art = await fit(tx.output, 620, 390);
  const labelSvg = svg(670, 130, `<text class="x" x="0" y="25">${esc(tx.id)} · ${esc(tx.sourcePrimitive)}</text><text class="m" x="0" y="62">${esc(path.basename(tx.output).replaceAll("-", " ").replace(".png", ""))}</text><text class="s" x="0" y="98">${esc(tx.note).slice(0, 78)}</text>`);
  transComposite.push({ input: art, left, top });
  transComposite.push({ input: labelSvg, left, top: top + 405 });
}
await sharp({ create: { width: 2400, height: 2150, channels: 4, background: palette.black } }).composite(transComposite).png().toFile(path.join(boardRoot, "02-transformation-studies.png"));

// Architectural experiment board.
const experimentComposite = [{ input: svg(2560, 4230, `<text class="k" x="80" y="70">HSDJ / 10 ARCHITECTURAL EXPERIMENTS</text><text class="h" x="80" y="145">HARDWARE DOING WEBSITE WORK.</text><text class="b" x="80" y="200">These are boundary studies, not CH 00 and not production components.</text>`, palette.black), left: 0, top: 0 }];
for (let i = 0; i < experiments.length; i += 1) {
  const column = i % 2;
  const row = Math.floor(i / 2);
  const study = await fit(experiments[i].output, 1200, 760, { fit: "fill" });
  experimentComposite.push({ input: study, left: 70 + column * 1240, top: 290 + row * 780 });
}
await sharp({ create: { width: 2560, height: 4230, channels: 4, background: palette.black } }).composite(experimentComposite).png().toFile(path.join(boardRoot, "03-architectural-experiments.png"));

// Signature set and semantic jobs.
const signatures = [
  ["ATOM-FADER-02", "STRUCTURE", "Page seam · chapter progression"],
  ["ATOM-FADER-01", "STATE", "Current position · scroll marker"],
  ["ATOM-BUTTON-01", "ACTION", "Date check · selected navigation"],
  ["ATOM-PLATTER-01", "SCALE", "Photo aperture · page interruption"],
  ["ATOM-METER-01", "ENERGY", "Meaningful intensity · progression"],
  ["ATOM-PANEL-01", "ARCHITECTURE", "Page spine · content division"],
  ["ATOM-LABEL-01", "VOICE", "Overprint · annotation · state label"],
  ["ATOM-LED-01", "RHYTHM", "Navigation cadence · active state"],
];
const signatureComposite = [{ input: svg(2400, 2350, `<text class="k" x="90" y="70">HSDJ / SIGNATURE SET</text><text class="h" x="90" y="145">THE EIGHT MOST CAPABLE PRIMITIVES.</text><text class="b" x="90" y="200">A small family with different jobs—not a controller-themed costume.</text>`, palette.black), left: 0, top: 0 }];
for (let i = 0; i < signatures.length; i += 1) {
  const [id, job, use] = signatures[i];
  const column = i % 2;
  const row = Math.floor(i / 2);
  const left = 90 + column * 1140;
  const top = 310 + row * 485;
  const item = byId[id];
  const art = await fit(item.output, 420, 380);
  const info = svg(620, 380, `<text class="x" x="0" y="48">${esc(job)} · ${esc(id)}</text><text class="h" x="0" y="112">${esc(item.title)}</text><text class="b" x="0" y="166">${esc(use)}</text><text class="s" x="0" y="228">SOURCE ${esc(item.sourceId)}</text><text class="s" x="0" y="260">RESEARCH ONLY</text><path d="M 0 320 H 600" stroke="#383a34" stroke-width="2"/>`);
  signatureComposite.push({ input: art, left, top });
  signatureComposite.push({ input: info, left: left + 465, top });
}
await sharp({ create: { width: 2400, height: 2350, channels: 4, background: palette.black } }).composite(signatureComposite).png().toFile(path.join(boardRoot, "04-signature-primitives.png"));

// Anti-gimmick board.
const gate = svg(2400, 1800, `
  <text class="k" x="90" y="70">HSDJ / ANTI-GIMMICK GATE</text><text class="h" x="90" y="145">PHYSICAL DOES NOT MEAN CONTROLLER THEME.</text>
  <text class="b" x="90" y="200">Every prominent primitive needs a job and documentary honesty.</text>
  <path d="M 90 290 H 2310" stroke="#373932" stroke-width="2"/>
  <text class="x" x="110" y="355">AVOID</text>
  <text class="m" x="110" y="420">Knob + fader + platter + meter in every section</text><text class="s" x="110" y="458">Reads as a virtual controller skin, not authored editorial design.</text>
  <text class="m" x="110" y="540">Fake tape around generic UI</text><text class="s" x="110" y="578">Without physical source fibre, wrinkles and surface interaction, it is theatre.</text>
  <text class="m" x="110" y="660">Meter bars disconnected from information</text><text class="s" x="110" y="698">If intensity or progress is not real, the visual is a cheap music symbol.</text>
  <text class="m" x="110" y="780">Hardware photos inside rounded cards</text><text class="s" x="110" y="818">The object must shape hierarchy, interaction or geometry.</text>
  <text class="m" x="110" y="900">Illegible controller labels used as copy</text><text class="s" x="110" y="938">Functional fragments may interrupt type, but never obscure the selling message.</text>
  <path d="M 1210 320 V 1080" stroke="#373932" stroke-width="2"/>
  <text class="x" x="1300" y="355">USE WHEN</text>
  <text class="m" x="1300" y="420">The primitive changes state or position</text><text class="s" x="1300" y="458">Buttons act. Fader caps locate. Meters progress.</text>
  <text class="m" x="1300" y="540">Its material creates hierarchy</text><text class="s" x="1300" y="578">Seams divide. Platters mask. Labels interrupt.</text>
  <text class="m" x="1300" y="660">The source remains traceable</text><text class="s" x="1300" y="698">No invented Patrick gear, wedding data or historical evidence.</text>
  <text class="m" x="1300" y="780">The human image retains authority</text><text class="s" x="1300" y="818">Hardware frames the work; Patrick and the room carry the truth.</text>
  <text class="m" x="1300" y="900">Removing it would lose meaning</text><text class="s" x="1300" y="938">If nothing changes, delete the primitive.</text>
  <path d="M 90 1120 H 2310" stroke="#373932" stroke-width="2"/>
  <text class="x" x="110" y="1190">BLOCKED UNTIL ORIGINAL SOURCE EXISTS</text>
  <text class="h" x="110" y="1260">GAFFER TAPE · CASE HARDWARE · HANDWRITING</text>
  <text class="b" x="110" y="1320">Do not fill the gap with CSS polygons, generic graffiti fonts or invented wear.</text>
  <text class="x" x="110" y="1435">NEXT CH 00 RECOMMENDATION</text>
  <text class="m" x="110" y="1490">Begin with only three signature jobs:</text>
  <text class="b" x="110" y="1540">1 · Fader rail + cap as chapter progression</text><text class="b" x="110" y="1582">2 · CUE button as the date-check action</text><text class="b" x="110" y="1624">3 · Platter ring or panel seam as photographic architecture</text>
  <text class="x" x="110" y="1725">PRODUCTION LOCKED · PATRICK_CREATIVE_APPROVAL: PENDING</text>
`, palette.black);
await sharp(gate).png().toFile(path.join(boardRoot, "05-anti-gimmick-and-next-gate.png"));

console.log(`Built ${transformations.length} transformations, ${experiments.length} experiments, and 5 system boards.`);
