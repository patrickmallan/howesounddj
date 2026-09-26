import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "design-research/physical-visual-vocabulary-v1";
const boardRoot = path.join(root, "boards");
fs.mkdirSync(boardRoot, { recursive: true });
const fragments = JSON.parse(fs.readFileSync(path.join(root, "fragment-register.json"), "utf8"));

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const textSvg = (width, height, content, background = "transparent") => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${background}"/>
  <style>
    .eyebrow { font: 700 18px Arial, sans-serif; letter-spacing: 5px; fill: #ffe126; }
    .title { font: 900 54px Arial, sans-serif; letter-spacing: -2px; fill: #f4f0e8; }
    .body { font: 400 24px Arial, sans-serif; fill: #c5c1b8; }
    .cardtitle { font: 800 24px Arial, sans-serif; fill: #f4f0e8; }
    .meta { font: 700 16px Arial, sans-serif; letter-spacing: 2px; fill: #ffe126; }
    .small { font: 400 17px Arial, sans-serif; fill: #bbb7ae; }
    .tiny { font: 400 14px Arial, sans-serif; fill: #8f8c85; }
  </style>${content}</svg>`);

const top = textSvg(2400, 260, `
  <text class="eyebrow" x="88" y="64">HSDJ / PHYSICAL VISUAL VOCABULARY / V1</text>
  <text class="title" x="88" y="132">CONTROL SURFACES, NOT MUSIC CLIP ART.</text>
  <text class="body" x="88" y="187">A traceable working library of real buttons, rails, dials, light, labels and wear.</text>
  <text class="tiny" x="88" y="226">RESEARCH ONLY · ORIGINALS PRESERVED · RECTANGULAR CROPS ONLY · NO GENERATIVE FILL OR HARDWARE REDRAWING</text>
`);

const cardW = 714;
const cardH = 650;
const imageW = 666;
const imageH = 430;
const columns = 3;
const rows = 6;
const canvasW = 2400;
const canvasH = 260 + rows * cardH + 100;
const composites = [{ input: top, left: 0, top: 0 }];

for (let index = 0; index < fragments.length; index += 1) {
  const item = fragments[index];
  const column = index % columns;
  const row = Math.floor(index / columns);
  const left = 88 + column * 758;
  const y = 278 + row * cardH;
  const image = await sharp(item.output)
    .resize(imageW, imageH, { fit: "cover", position: "attention" })
    .modulate({ saturation: 1.05 })
    .toBuffer();
  const card = textSvg(cardW, cardH, `
    <rect x="1" y="1" width="${cardW - 2}" height="${cardH - 2}" rx="7" fill="#141512" stroke="#4a493e" stroke-width="2"/>
    <rect x="24" y="24" width="${imageW}" height="${imageH}" rx="3" fill="#050504"/>
    <text class="meta" x="24" y="492">${esc(item.category.toUpperCase())} · ${esc(item.id)}</text>
    <text class="cardtitle" x="24" y="532">${esc(item.title)}</text>
    <text class="small" x="24" y="570">${esc(item.strength).slice(0, 66)}</text>
    <text class="tiny" x="24" y="601">USE · ${esc(item.designUse).slice(0, 76)}</text>
    <text class="tiny" x="24" y="628">SOURCE ${esc(item.sourceId)} · RESEARCH ONLY</text>
  `);
  composites.push({ input: card, left, top: y });
  composites.push({ input: image, left: left + 24, top: y + 24 });
}

await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: "#090a08" } })
  .composite(composites)
  .png()
  .toFile(path.join(boardRoot, "HSDJ_PHYSICAL_VISUAL_VOCABULARY_V1-fragments.png"));

const system = textSvg(2400, 1900, `
  <rect width="2400" height="1900" fill="#090a08"/>
  <text class="eyebrow" x="96" y="76">HSDJ / PHYSICAL VISUAL VOCABULARY / V1</text>
  <text class="title" x="96" y="150">THE OPERATING SYSTEM</text>
  <text class="body" x="96" y="205">The visual voice comes from objects a working DJ actually touches.</text>

  <rect x="96" y="280" width="680" height="420" rx="8" fill="#171812" stroke="#716612"/>
  <text class="meta" x="132" y="335">01 · PRIMARY LANGUAGE</text>
  <text class="cardtitle" x="132" y="390">Buttons / faders / rotaries</text>
  <text class="body" x="132" y="438">Use for actions, navigation,</text><text class="body" x="132" y="475">section markers and rhythm.</text>
  <text class="small" x="132" y="548">Keep the cap, rail, bezel, shadow,</text><text class="small" x="132" y="580">printing and nearby surface together.</text>
  <text class="tiny" x="132" y="646">READY: strongest supplied source class</text>

  <rect x="860" y="280" width="680" height="420" rx="8" fill="#111824" stroke="#173d6b"/>
  <text class="meta" x="896" y="335">02 · ENERGY LANGUAGE</text>
  <text class="cardtitle" x="896" y="390">Meters / waveforms / LEDs</text>
  <text class="body" x="896" y="438">Use as signal, pace, transition</text><text class="body" x="896" y="475">and controlled visual noise.</text>
  <text class="small" x="896" y="548">Never pretend a waveform is Patrick’s set</text><text class="small" x="896" y="580">unless its origin is confirmed.</text>
  <text class="tiny" x="896" y="646">READY: research · provenance unresolved</text>

  <rect x="1624" y="280" width="680" height="420" rx="8" fill="#21120f" stroke="#823020"/>
  <text class="meta" x="1660" y="335">03 · SCALE LANGUAGE</text>
  <text class="cardtitle" x="1660" y="390">Jog wheels / macro hardware</text>
  <text class="body" x="1660" y="438">Use as large anchors, crops that</text><text class="body" x="1660" y="475">break the grid, and hard edges.</text>
  <text class="small" x="1660" y="548">Retain fingerprints, glare and imperfect</text><text class="small" x="1660" y="580">falloff when the source contains them.</text>
  <text class="tiny" x="1660" y="646">READY: high-value supplied fragments</text>

  <rect x="96" y="780" width="1060" height="425" rx="8" fill="#151514" stroke="#45433d"/>
  <text class="meta" x="136" y="840">04 · MATERIAL LANGUAGE</text>
  <text class="cardtitle" x="136" y="895">Labels / cables / brushed surfaces / wear</text>
  <text class="body" x="136" y="944">Use the evidence around a control—not just its silhouette.</text>
  <text class="small" x="136" y="1010">Printed legends, screw heads, connector strain relief, uneven light,</text>
  <text class="small" x="136" y="1043">dust and use-marks stop the system feeling like a software template.</text>
  <text class="tiny" x="136" y="1136">PARTIAL: XLR source provenance unknown; owned-equipment photography needed</text>

  <rect x="1244" y="780" width="1060" height="425" rx="8" fill="#19160c" stroke="#716612"/>
  <text class="meta" x="1284" y="840">05 · PHYSICAL ASSEMBLY</text>
  <text class="cardtitle" x="1284" y="895">Real tape / flight cases / marker / cable paths</text>
  <text class="body" x="1284" y="944">These must come from photographed physical objects.</text>
  <text class="small" x="1284" y="1010">No clean CSS tape. No decorative fake grime. No invented case history.</text>
  <text class="small" x="1284" y="1043">Photograph Patrick’s own materials under direct flash.</text>
  <text class="tiny" x="1284" y="1136">MISSING: no usable authentic source files in the current library</text>

  <rect x="96" y="1290" width="2208" height="485" rx="8" fill="#10110f" stroke="#4a493e"/>
  <text class="meta" x="136" y="1352">RULES OF USE</text>
  <text class="cardtitle" x="136" y="1410">1. A control must retain evidence of being a real object.</text>
  <text class="cardtitle" x="136" y="1462">2. Crop decisively; never redraw proprietary hardware as decoration.</text>
  <text class="cardtitle" x="136" y="1514">3. Let functional colour come from LEDs, caps, labels and direct light.</text>
  <text class="cardtitle" x="136" y="1566">4. Reserve waveform and meter language for motion, pacing and transitions.</text>
  <text class="cardtitle" x="136" y="1618">5. Never imply documentary truth that the source record cannot prove.</text>
  <text class="small" x="136" y="1688">Current readiness: composition research only. Production stays locked until Patrick reviews the vocabulary and individual source permissions.</text>
  <text class="meta" x="136" y="1732">PATRICK_CREATIVE_APPROVAL: PENDING</text>
`);

await sharp(system).png().toFile(path.join(boardRoot, "HSDJ_PHYSICAL_VISUAL_VOCABULARY_V1-system.png"));

const gaps = textSvg(2400, 1700, `
  <rect width="2400" height="1700" fill="#090a08"/>
  <text class="eyebrow" x="96" y="76">HSDJ / SOURCE GAPS / CAPTURE BRIEF</text>
  <text class="title" x="96" y="150">WHAT THE LIBRARY STILL CANNOT SAY</text>
  <text class="body" x="96" y="205">The missing layer is ownership: Patrick’s actual objects, handwriting and wear.</text>

  <rect x="96" y="290" width="680" height="520" rx="8" fill="#171812" stroke="#716612"/>
  <text class="meta" x="132" y="350">CAPTURE 01</text><text class="cardtitle" x="132" y="404">Real gaffer tape</text>
  <text class="body" x="132" y="458">Torn ends · wrinkles · marker</text><text class="body" x="132" y="494">notes · overlapping strips</text>
  <text class="small" x="132" y="568">Direct flash. Black, silver and one</text><text class="small" x="132" y="600">fluorescent colour. Photograph loose</text><text class="small" x="132" y="632">and attached to a real road case.</text>
  <text class="tiny" x="132" y="758">DO NOT generate or imitate this in CSS.</text>

  <rect x="860" y="290" width="680" height="520" rx="8" fill="#111824" stroke="#173d6b"/>
  <text class="meta" x="896" y="350">CAPTURE 02</text><text class="cardtitle" x="896" y="404">Cases and hardware</text>
  <text class="body" x="896" y="458">Latches · corners · handles</text><text class="body" x="896" y="494">foam · scratches · stickers</text>
  <text class="small" x="896" y="568">Use Patrick’s working cases. Capture</text><text class="small" x="896" y="600">straight-on label plates and severe</text><text class="small" x="896" y="632">macros of impact and wear.</text>
  <text class="tiny" x="896" y="758">This is identity evidence, not decoration.</text>

  <rect x="1624" y="290" width="680" height="520" rx="8" fill="#21120f" stroke="#823020"/>
  <text class="meta" x="1660" y="350">CAPTURE 03</text><text class="cardtitle" x="1660" y="404">Owned control surfaces</text>
  <text class="body" x="1660" y="458">Crossfader · channel meters</text><text class="body" x="1660" y="494">cue wear · cable connections</text>
  <text class="small" x="1660" y="568">Photograph the exact hardware Patrick</text><text class="small" x="1660" y="600">uses. Include hands only when real and</text><text class="small" x="1660" y="632">recognizable as working action.</text>
  <text class="tiny" x="1660" y="758">Replaces generic references over time.</text>

  <rect x="96" y="900" width="1060" height="520" rx="8" fill="#151514" stroke="#45433d"/>
  <text class="meta" x="136" y="960">CAPTURE 04</text><text class="cardtitle" x="136" y="1014">Handwriting and planning residue</text>
  <text class="body" x="136" y="1068">Real set notes · timeline marks · crossed-out changes</text>
  <text class="small" x="136" y="1138">Redact names, phone numbers, email addresses, private requests and dates</text>
  <text class="small" x="136" y="1171">before the material reaches a composition. Preserve pen pressure and mistakes.</text>
  <text class="tiny" x="136" y="1360">No fabricated client notes. No invented wedding story.</text>

  <rect x="1244" y="900" width="1060" height="520" rx="8" fill="#19160c" stroke="#716612"/>
  <text class="meta" x="1284" y="960">CAPTURE 05</text><text class="cardtitle" x="1284" y="1014">Surface and light library</text>
  <text class="body" x="1284" y="1068">Fingerprints · dust · flash bloom · coloured spill</text>
  <text class="small" x="1284" y="1138">Shoot black powder-coated metal, brushed aluminium, rubber pads,</text>
  <text class="small" x="1284" y="1171">cable jackets and printed legends as repeatable brand textures.</text>
  <text class="tiny" x="1284" y="1360">Original HSDJ material; ideal long-term production source.</text>

  <text class="meta" x="96" y="1520">NEXT GATE</text>
  <text class="body" x="96" y="1570">Review this vocabulary first. Then capture owned material. Only then return to CH 00 composition.</text>
  <text class="tiny" x="96" y="1620">No CH 01 · no production implementation · no public asset replacement</text>
`);
await sharp(gaps).png().toFile(path.join(boardRoot, "HSDJ_PHYSICAL_VISUAL_VOCABULARY_V1-capture-gaps.png"));

console.log("Built fragment, system, and capture-gap boards.");
