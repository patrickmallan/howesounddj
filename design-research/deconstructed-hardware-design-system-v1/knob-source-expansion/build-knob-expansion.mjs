import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const systemRoot = "design-research/deconstructed-hardware-design-system-v1";
const root = path.join(systemRoot, "knob-source-expansion");
const sourceRoot = "design-research/source-library/09 - knobs";
const dirs = {
  contact: path.join(root, "contact-sheets"),
  crops: path.join(root, "source-crops"),
  primitives: path.join(root, "primitives"),
  transformations: path.join(root, "transformations"),
  experiments: path.join(root, "experiments"),
  boards: path.join(root, "boards"),
};
for (const directory of Object.values(dirs)) fs.mkdirSync(directory, { recursive: true });

const P = {
  ink: "#080907", panel: "#11130f", bone: "#f3efe5", grey: "#9c9c93",
  line: "#393b34", yellow: "#ffe126", blue: "#155cff", red: "#ff3b20",
  cyan: "#18f0da", magenta: "#f42593", green: "#46ef70", orange: "#ff8d15",
};
const esc = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const svg = (w, h, body, bg = "transparent") => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <defs>
    <radialGradient id="knob" cx="38%" cy="28%"><stop offset="0" stop-color="#5c5d58"/><stop offset=".28" stop-color="#292a27"/><stop offset=".72" stop-color="#11120f"/><stop offset="1" stop-color="#050604"/></radialGradient>
    <radialGradient id="metal" cx="32%" cy="24%"><stop offset="0" stop-color="#eeeeea"/><stop offset=".25" stop-color="#8b8c87"/><stop offset=".7" stop-color="#242522"/><stop offset="1" stop-color="#080907"/></radialGradient>
    <filter id="shadow"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <style>
    .eyebrow{font:800 15px Arial,sans-serif;letter-spacing:4px;fill:${P.yellow}}
    .hero{font:900 76px Arial,sans-serif;letter-spacing:-4px;fill:${P.bone}}
    .title{font:900 48px Arial,sans-serif;letter-spacing:-2px;fill:${P.bone}}
    .sub{font:700 22px Arial,sans-serif;letter-spacing:.5px;fill:${P.bone}}
    .body{font:400 20px Arial,sans-serif;fill:${P.grey}}
    .small{font:400 15px Arial,sans-serif;fill:${P.grey}}
    .micro{font:800 12px Arial,sans-serif;letter-spacing:2px;fill:${P.yellow}}
  </style>${body}</svg>`);

const sourceFiles = fs.readdirSync(sourceRoot).filter((f) => f.endsWith(".png")).sort();
const observations = [
  ["FADER BANK", "4 caps · 0–10 ticks · assign toggles", "ADJACENT / USEFUL"],
  ["CHANNEL STRIPS", "TRIM · HI/MID/LOW · dotted arcs · meters", "PRIMARY"],
  ["MASTER LEVEL", "open arc · -∞/+5 dB · L/R meter", "PRIMARY"],
  ["TRANSPORT PAIR", "lit rings · metal faces · ribbed field", "ADJACENT / USEFUL"],
  ["PAD BANK", "2×4 rhythm · coloured edge states", "ADJACENT / USEFUL"],
  ["PLATTER", "concentric depth · orbital labels · edge rhythm", "ADJACENT / USEFUL"],
  ["LOOP BUTTONS", "orange face · bezel · micro labels", "ADJACENT / USEFUL"],
  ["TEMPO FADER", "rail · ticks · centre zero · cap", "ADJACENT / USEFUL"],
  ["FULL MIXER STRIP", "paired EQ towers · colour rotaries · meter", "PRIMARY"],
  ["PAD MODES", "state labels · colour cadence · hard grid", "ADJACENT / USEFUL"],
  ["LEVEL PAIR", "MASTER/BOOTH · shared scale grammar", "PRIMARY"],
  ["METAL ROTARY", "radial machining · double bezel", "PRIMARY"],
  ["TRANSPORT DISC", "concave black face · green centre mark", "ADJACENT / USEFUL"],
  ["FADERS + METER", "symmetry · level column · hierarchy", "ADJACENT / USEFUL"],
];

const sourceRegister = [];
for (let i = 0; i < sourceFiles.length; i++) {
  const file = sourceFiles[i];
  const meta = await sharp(path.join(sourceRoot, file)).metadata();
  sourceRegister.push({
    id: `SRC-KNB-${String(i + 1).padStart(3, "0")}`,
    file,
    dimensions: `${meta.width}×${meta.height}`,
    classification: "THIRD-PARTY VISUAL RESEARCH / REFERENCE",
    origin: "Screenshot supplied by Patrick; described as obtained from Pioneer website",
    rights: "Permission unknown; not production-cleared; reference use only",
    subject: observations[i][0],
    characteristics: observations[i][1],
    knobReadiness: observations[i][2],
  });
}
fs.writeFileSync(path.join(root, "source-register.json"), `${JSON.stringify(sourceRegister, null, 2)}\n`);

async function fit(input, w, h, options = {}) {
  return sharp(input).resize(w, h, { fit: options.fit ?? "contain", position: options.position ?? "attention", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

// Research-only source crops. These preserve actual pixels and never enter original HSDJ primitives.
for (let i = 0; i < sourceRegister.length; i++) {
  const item = sourceRegister[i];
  await sharp(path.join(sourceRoot, item.file)).resize(900, 640, { fit: "contain", background: P.ink }).png().toFile(path.join(dirs.crops, `${item.id.toLowerCase()}-reference.png`));
}

function tickLines(cx, cy, r1, r2, start = -132, end = 132, count = 17, color = P.bone, width = 3) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const a = (start + (end - start) * i / (count - 1)) * Math.PI / 180;
    out += `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}" stroke="${color}" stroke-width="${i % 4 === 0 ? width + 2 : width}"/>`;
  }
  return out;
}

const primitiveSpecs = [
  ["ATOM-KNOB-01", "knob-body-deep-black.png", "Deep black rotary body", ["cylindrical face", "bevel", "material depth"], ["focus anchor", "selector body"]],
  ["ATOM-KNOB-02", "indicator-line.png", "Position indicator", ["high-contrast line", "rotation", "endpoint"], ["direction", "current position"]],
  ["ATOM-KNOB-03", "open-radial-scale.png", "Open radial scale", ["arc", "17 ticks", "open bottom"], ["range", "bounded choice"]],
  ["ATOM-KNOB-04", "recessed-bezel.png", "Recessed bezel", ["outer lip", "inner shadow", "hard circle"], ["depth", "image aperture"]],
  ["ATOM-KNOB-05", "physical-shadow.png", "Physical shadow field", ["offset ellipse", "soft falloff"], ["overlap", "material separation"]],
  ["ATOM-KNOB-06", "neutral-rotary-composite.png", "Neutral HSDJ rotary", ["body", "bezel", "indicator", "scale"], ["real selector", "oversized interruption"]],
  ["ATOM-KNOB-07", "triple-eq-rhythm.png", "Triple EQ rhythm", ["three controls", "shared baseline", "vertical hierarchy"], ["section rhythm", "three-part narrative"]],
  ["ATOM-KNOB-08", "split-balance-scale.png", "Split balance scale", ["centre zero", "opposed halves", "hard index"], ["balance", "two-sided choice"]],
  ["ATOM-KNOB-09", "radial-type-carrier.png", "Radial type carrier", ["orbital baseline", "position labels", "open centre"], ["chapter labels", "circular annotation"]],
  ["ATOM-KNOB-10", "micro-tick-fragment.png", "Micro tick fragment", ["uneven lengths", "partial arc", "minute index"], ["margin annotation", "section punctuation"]],
];

const primitiveSvgs = {
  "ATOM-KNOB-01": svg(800,800,`<ellipse cx="420" cy="620" rx="240" ry="70" fill="#000" opacity=".7" filter="url(#shadow)"/><circle cx="400" cy="390" r="264" fill="#020302"/><circle cx="400" cy="375" r="245" fill="url(#knob)"/><circle cx="400" cy="375" r="203" fill="none" stroke="#454742" stroke-width="4" opacity=".5"/>`),
  "ATOM-KNOB-02": svg(800,800,`<line x1="400" y1="390" x2="400" y2="112" stroke="${P.bone}" stroke-width="34" stroke-linecap="round"/><circle cx="400" cy="390" r="16" fill="${P.yellow}"/>`),
  "ATOM-KNOB-03": svg(800,800,`<path d="M 173 568 A 290 290 0 1 1 627 568" fill="none" stroke="#55574f" stroke-width="4"/>${tickLines(400,390,285,330,-140,140,17,P.bone,3)}<circle cx="400" cy="390" r="190" fill="none" stroke="#1f211d" stroke-width="3"/>`),
  "ATOM-KNOB-04": svg(800,800,`<circle cx="400" cy="400" r="290" fill="#050604" stroke="#5a5c55" stroke-width="8"/><circle cx="400" cy="400" r="246" fill="#0d0f0c" stroke="#23251f" stroke-width="26"/><circle cx="400" cy="400" r="208" fill="none" stroke="#71736b" stroke-width="3"/>`),
  "ATOM-KNOB-05": svg(800,800,`<ellipse cx="430" cy="495" rx="250" ry="92" fill="#000" opacity=".92" filter="url(#shadow)"/><ellipse cx="400" cy="430" rx="210" ry="45" fill="#000" opacity=".5"/>`),
  "ATOM-KNOB-06": svg(800,800,`<ellipse cx="420" cy="640" rx="240" ry="66" fill="#000" opacity=".8" filter="url(#shadow)"/><circle cx="400" cy="390" r="280" fill="#050604" stroke="#5a5b55" stroke-width="8"/>${tickLines(400,390,280,324,-140,140,17,P.bone,3)}<circle cx="400" cy="390" r="230" fill="url(#knob)"/><line x1="400" y1="390" x2="330" y2="205" stroke="${P.yellow}" stroke-width="18" stroke-linecap="round"/>`),
  "ATOM-KNOB-07": svg(1400,520,`${[250,700,1150].map((cx,i)=>`<circle cx="${cx}" cy="250" r="150" fill="#050604" stroke="#54564f" stroke-width="5"/>${tickLines(cx,250,152,185,-140,140,13,P.bone,2)}<circle cx="${cx}" cy="250" r="115" fill="url(#knob)"/><line x1="${cx}" y1="250" x2="${cx + [-42,0,55][i]}" y2="150" stroke="${[P.magenta,P.yellow,P.cyan][i]}" stroke-width="12" stroke-linecap="round"/>`).join("")}<path d="M 60 470 H 1340" stroke="#363832" stroke-width="3"/>`),
  "ATOM-KNOB-08": svg(1000,580,`<path d="M 175 440 A 340 340 0 0 1 825 440" fill="none" stroke="#51534c" stroke-width="6"/>${tickLines(500,435,318,360,-148,-92,6,P.magenta,4)}${tickLines(500,435,318,360,-88,-32,6,P.cyan,4)}<line x1="500" y1="78" x2="500" y2="135" stroke="${P.yellow}" stroke-width="12"/><text class="micro" x="145" y="492">LEFT</text><text class="micro" x="790" y="492">RIGHT</text><text class="micro" x="472" y="55">0</text>`),
  "ATOM-KNOB-09": svg(1000,1000,`<path id="orbit" d="M 110 500 A 390 390 0 1 1 890 500" fill="none"/><text class="sub" letter-spacing="6"><textPath href="#orbit">ARRIVAL  ·  DINNER  ·  FIRST DANCE  ·  OPEN FLOOR  ·  LAST ONE  ·</textPath></text><circle cx="500" cy="500" r="292" fill="none" stroke="#34362f" stroke-width="3"/>${tickLines(500,500,310,345,-135,135,21,P.yellow,2)}`),
  "ATOM-KNOB-10": svg(1200,360,`${tickLines(600,430,355,430,-153,-27,19,P.bone,3)}<path d="M 80 310 H 1120" stroke="#2e302a" stroke-width="2"/><text class="micro" x="80" y="342">RANGE / POSITION / PRESSURE</text>`),
};

const primitiveRegister = [];
for (const spec of primitiveSpecs) {
  const [id,file,title,parts,uses] = spec;
  const output = path.join(dirs.primitives,file);
  await sharp(primitiveSvgs[id]).png().toFile(output);
  primitiveRegister.push({ id, title, output, parts, uses, lineage: "Original HSDJ reconstruction informed by SRC-KNB-002/003/009/011/012; no manufacturer marks or copied product layout", classification: "ORIGINAL HSDJ TRANSFORMATION / RESEARCH_ONLY", approval: "RESEARCH_ONLY" });
}
fs.writeFileSync(path.join(root,"primitive-register.json"),`${JSON.stringify(primitiveRegister,null,2)}\n`);

const transformationRegister = [];
const transformSpecs = [
  ["TX-KNB-01","scale-yellow-pressure.png",primitiveSvgs["ATOM-KNOB-03"],(x)=>x.tint(P.yellow),"Scale becomes a loud structural arc."],
  ["TX-KNB-02","body-photocopy.png",primitiveSvgs["ATOM-KNOB-01"],(x)=>x.greyscale().normalize().threshold(72).tint(P.bone),"Body becomes a hard photocopy mass."],
  ["TX-KNB-03","bezel-magenta.png",primitiveSvgs["ATOM-KNOB-04"],(x)=>x.tint(P.magenta),"Bezel becomes a photographic interruption."],
  ["TX-KNB-04","indicator-cyan.png",primitiveSvgs["ATOM-KNOB-02"],(x)=>x.tint(P.cyan),"Indicator becomes directional signal."],
  ["TX-KNB-05","ticks-red-threshold.png",primitiveSvgs["ATOM-KNOB-10"],(x)=>x.greyscale().threshold(90).tint(P.red),"Minute scale fragment becomes an aggressive margin event."],
  ["TX-KNB-06","triple-eq-high-colour.png",primitiveSvgs["ATOM-KNOB-07"],(x)=>x.modulate({saturation:1.35,brightness:1.08}),"EQ rhythm gains three distinct narrative states."],
];
for (const [id,file,input,fn,note] of transformSpecs){const output=path.join(dirs.transformations,file);await fn(sharp(input).ensureAlpha()).png().toFile(output);transformationRegister.push({id,output,note,classification:"ORIGINAL HSDJ TRANSFORMATION / RESEARCH_ONLY"});}
fs.writeFileSync(path.join(root,"transformation-register.json"),`${JSON.stringify(transformationRegister,null,2)}\n`);

async function makeExperiment(n, slug, title, verdict, body, composites=[]) {
  const base = svg(1400,860,`<path d="M 0 1 H 1400 M 0 859 H 1400" stroke="${P.line}" stroke-width="2"/><text class="eyebrow" x="48" y="58">KNOB EXPERIMENT ${String(n).padStart(2,"0")}</text><text class="title" x="48" y="120">${esc(title)}</text>${body}<text class="micro" x="48" y="825">${esc(verdict)}</text>`,P.ink);
  const output = path.join(dirs.experiments,`exp-knb-${String(n).padStart(2,"0")}-${slug}.png`);
  const footer = svg(1400,60,`<path d="M 0 1 H 1400" stroke="${P.line}" stroke-width="2"/><text class="micro" x="48" y="39">${esc(verdict)}</text>`,P.ink);
  await sharp(base).composite([...composites,{input:footer,left:0,top:800}]).png().toFile(output);
  return {id:`EXP-KNB-${String(n).padStart(2,"0")}`,title,verdict,output,approval:"RESEARCH_ONLY"};
}

const neutral=await fit(primitiveSvgs["ATOM-KNOB-06"],650,650);
const scale=await fit(primitiveSvgs["ATOM-KNOB-03"],780,780);
const indicator=await fit(primitiveSvgs["ATOM-KNOB-02"],460,460);
const triple=await fit(primitiveSvgs["ATOM-KNOB-07"],1170,435);
const radial=await fit(primitiveSvgs["ATOM-KNOB-09"],720,720);
const micro=await fit(primitiveSvgs["ATOM-KNOB-10"],1350,405);
const swarmKnob=await fit(primitiveSvgs["ATOM-KNOB-06"],360,240);
const rail=await fit(path.join(systemRoot,"transformations/fader-rail-yellow-duotone.png"),110,690);
const platter=await fit(path.join(systemRoot,"transformations/platter-ring-magenta.png"),780,620);
const patrick=await sharp("public/images/about/patrick-dj-action.webp").resize(700,760,{fit:"cover",position:"top"}).modulate({saturation:.8}).png().toBuffer();
const wedding=await sharp("design-research/source-library/04-weddings-documentary/Meghan & Brodie-55 (2).jpg").resize(760,760,{fit:"cover",position:"attention"}).modulate({saturation:.9}).png().toBuffer();
const experiments=[];
experiments.push(await makeExperiment(1,"photo-interrupt","THE SCALE CUTS THE FRAME","STRONG — scale defines the crop; it is not decoration",`<text class="hero" x="56" y="355">READ</text><text class="hero" x="56" y="438">THE ROOM.</text><path d="M 55 470 H 540" stroke="${P.red}" stroke-width="18"/>`,[{input:patrick,left:700,top:100},{input:scale,left:610,top:55,blend:"screen"}]));
experiments.push(await makeExperiment(2,"directional-index","THE INDICATOR BECOMES DIRECTION","STRONG — a knob detail becomes navigation and sequence",`<text class="hero" x="575" y="350">YOUR NIGHT</text><text class="hero" x="575" y="440">HAS A PULSE.</text><text class="body" x="580" y="500">Position becomes the chapter. Movement becomes the cue.</text>`,[{input:indicator,left:60,top:170}]));
experiments.push(await makeExperiment(3,"eq-rhythm","THREE MOVES. ONE NIGHT.","STRONG — rotary repetition structures content without cards",`<text class="micro" x="150" y="710">ARRIVE</text><text class="micro" x="620" y="710">BUILD</text><text class="micro" x="1090" y="710">RELEASE</text>`,[{input:triple,left:115,top:205}]));
experiments.push(await makeExperiment(4,"type-on-arc","TYPE RIDES THE SCALE","PROMISING — typography becomes physical position",`<text class="hero" x="54" y="405">FROM FIRST</text><text class="hero" x="54" y="490">SONG TO LAST.</text>`,[{input:radial,left:650,top:80}]));
experiments.push(await makeExperiment(5,"offscreen-knob","THE CONTROL EXCEEDS THE PAGE","STRONGEST — scale and body become architecture at extreme size",`<text class="hero" x="60" y="330">HOW FAR</text><text class="hero" x="60" y="415">DO WE TAKE IT?</text><text class="body" x="65" y="475">Not a controller. A pressure system.</text>`,[{input:neutral,left:815,top:180}]));
experiments.push(await makeExperiment(6,"real-selector","SET THE DIRECTION","CONDITIONAL — legitimate only when the choice changes the brief",`<text class="micro" x="90" y="690">WARM-UP</text><text class="micro" x="430" y="690">SINGALONG</text><text class="micro" x="900" y="690">CLUB ENERGY</text><text class="micro" x="1210" y="690">FULL SEND</text>`,[{input:neutral,left:375,top:120}]));
experiments.push(await makeExperiment(7,"rail-rotary","LINEAR / ROTARY COLLISION","STRONG — fader locates chapter; rotary scale frames intensity",`<text class="hero" x="180" y="345">BUILD</text><text class="hero" x="180" y="430">THE PRESSURE.</text>`,[{input:rail,left:50,top:125},{input:scale,left:620,top:40,blend:"screen"}]));
experiments.push(await makeExperiment(8,"platter-scale-photo","THE ROOM / THE SCALE","PROMISING — platter carries image; rotary ticks supply controlled friction",`<text class="hero" x="60" y="300">THE FLOOR</text><text class="hero" x="60" y="385">TELLS YOU.</text>`,[{input:wedding,left:640,top:100},{input:platter,left:610,top:130,blend:"screen"},{input:micro,left:25,top:440,blend:"screen"}]));
experiments.push(await makeExperiment(9,"rotary-swarm","TOO MANY CONTROLS","INTENTIONAL OVER-PUSH — reject the rotary wallpaper effect",`<text class="hero" x="55" y="740">CONTROL EVERYWHERE.</text>`,Array.from({length:12},(_,i)=>({input:swarmKnob,left:(i%4)*345,top:120+Math.floor(i/4)*210,blend:i%2?"screen":"over",opacity:.72}))));
experiments.push(await makeExperiment(10,"scale-collision","EVERY SCALE AT ONCE","INTENTIONAL OVER-PUSH — hierarchy collapses into controller theatre",`<text class="hero" x="50" y="420">LOUD IS NOT</text><text class="hero" x="50" y="505">THE SAME AS CLEAR.</text>`,[
  {input:scale,left:0,top:0,blend:"screen"},{input:scale,left:600,top:20,blend:"screen"},{input:radial,left:680,top:130,blend:"screen"},{input:triple,left:80,top:370,blend:"screen"},{input:rail,left:1260,top:90}
]));
fs.writeFileSync(path.join(root,"experiment-register.json"),`${JSON.stringify(experiments,null,2)}\n`);

// Board 01 — all sources. The licensed boundary is repeated at board level.
const contactComps=[{input:svg(2600,2600,`<text class="eyebrow" x="80" y="65">KNOB SOURCE EXPANSION / 09 - KNOBS</text><text class="title" x="80" y="135">EVERY FILE INSPECTED. NONE CLEARED FOR PRODUCTION.</text><text class="body" x="80" y="185">Pioneer-site screenshots supplied by Patrick · third-party visual research / reference only</text>`,P.ink),left:0,top:0}];
for(let i=0;i<sourceRegister.length;i++){
  const col=i%3,row=Math.floor(i/3),x=80+col*840,y=275+row*445;
  const art=await fit(path.join(sourceRoot,sourceRegister[i].file),720,285);
  const info=svg(720,120,`<text class="micro" x="0" y="18">${sourceRegister[i].id} · ${sourceRegister[i].knobReadiness}</text><text class="sub" x="0" y="54">${esc(sourceRegister[i].subject)}</text><text class="small" x="0" y="84">${esc(sourceRegister[i].characteristics)}</text><text class="small" x="0" y="108">${sourceRegister[i].dimensions} · REFERENCE ONLY</text>`);
  contactComps.push({input:art,left:x,top:y},{input:info,left:x,top:y+292});
}
await sharp({create:{width:2600,height:2600,channels:4,background:P.ink}}).composite(contactComps).png().toFile(path.join(dirs.contact,"01-all-knob-sources-inspected.png"));

// Board 02 — source to atom: references stay small; original reconstructions dominate.
const decomp=[{input:svg(2600,2480,`<text class="eyebrow" x="80" y="65">KNOB SOURCE → ORIGINAL HSDJ ATOMS</text><text class="title" x="80" y="135">DECONSTRUCT THE BEHAVIOUR. REMOVE THE BRAND.</text><text class="body" x="80" y="185">Source fragments are evidence; the large forms are new research reconstructions.</text><path d="M 520 250 V 2350" stroke="${P.line}" stroke-width="2"/>`,P.ink),left:0,top:0}];
const primarySourceIdx=[1,2,8,10,11];
for(let r=0;r<5;r++){
  const y=285+r*405; const src=sourceRegister[primarySourceIdx[r]]; const art=await fit(path.join(sourceRoot,src.file),360,260); const a=primitiveRegister[r*2],b=primitiveRegister[r*2+1];
  decomp.push({input:art,left:90,top:y},{input:await fit(a.output,520,300),left:580,top:y-15},{input:await fit(b.output,520,300),left:1130,top:y-15},{input:svg(850,250,`<text class="micro" x="0" y="30">${src.id} · THIRD-PARTY REFERENCE</text><text class="sub" x="0" y="74">${esc(a.title)} + ${esc(b.title)}</text><text class="small" x="0" y="112">ORIGINAL HSDJ RECONSTRUCTION / RESEARCH ONLY</text><text class="small" x="0" y="148">JOBS · ${esc([...a.uses,...b.uses].join(" · "))}</text><path d="M 0 210 H 800" stroke="${P.line}" stroke-width="2"/>`),left:1700,top:y});
}
await sharp({create:{width:2600,height:2480,channels:4,background:P.ink}}).composite(decomp).png().toFile(path.join(dirs.boards,"06-knob-source-to-atom-decomposition.png"));

// Board 03 — primitive language.
const primBoard=[{input:svg(2600,2350,`<text class="eyebrow" x="80" y="65">KNOB LANGUAGE / ORIGINAL HSDJ RECONSTRUCTIONS</text><text class="title" x="80" y="135">BODY. INDICATOR. SCALE. DEPTH. RHYTHM.</text><text class="body" x="80" y="185">Ten separable primitives; each must carry information, structure or friction.</text>`,P.ink),left:0,top:0}];
for(let i=0;i<primitiveRegister.length;i++){
 const col=i%2,row=Math.floor(i/2),x=80+col*1260,y=270+row*395; const item=primitiveRegister[i];
 primBoard.push({input:await fit(item.output,510,300),left:x,top:y},{input:svg(660,260,`<text class="micro" x="0" y="35">${item.id}</text><text class="sub" x="0" y="78">${esc(item.title)}</text><text class="small" x="0" y="118">PARTS · ${esc(item.parts.join(" · "))}</text><text class="small" x="0" y="154">JOBS · ${esc(item.uses.join(" · "))}</text><text class="small" x="0" y="196">ORIGINAL / RESEARCH ONLY</text><path d="M 0 230 H 620" stroke="${P.line}" stroke-width="2"/>`),left:x+545,top:y+20});
}
await sharp({create:{width:2600,height:2350,channels:4,background:P.ink}}).composite(primBoard).png().toFile(path.join(dirs.boards,"07-original-knob-primitive-language.png"));

// Board 04 — ten architectural experiments.
const expBoard=[{input:svg(2920,4580,`<text class="eyebrow" x="80" y="65">10 KNOB-FOCUSED ARCHITECTURAL EXPERIMENTS</text><text class="title" x="80" y="135">ROTARY LANGUAGE DOING WEBSITE WORK.</text><text class="body" x="80" y="185">Boundary studies only · includes two deliberate failures · not CH 00</text>`,P.ink),left:0,top:0}];
for(let i=0;i<experiments.length;i++){const col=i%2,row=Math.floor(i/2);expBoard.push({input:await fit(experiments[i].output,1400,860,{fit:"fill"}),left:40+col*1440,top:260+row*870});}
await sharp({create:{width:2920,height:4580,channels:4,background:P.ink}}).composite(expBoard).png().toFile(path.join(dirs.boards,"08-knob-architectural-experiments.png"));

// Board 05 — decisions and integration.
const decisions=svg(2600,2050,`
 <text class="eyebrow" x="80" y="65">KNOB EXPANSION / DECISION GATE</text><text class="title" x="80" y="135">THE KNOB IS A POSITION SYSTEM, NOT A MOTIF.</text>
 <text class="body" x="80" y="185">It earns space only when it represents choice, range, intensity, position, balance or adjustment.</text><path d="M 80 245 H 2520" stroke="${P.line}" stroke-width="2"/>
 <text class="micro" x="100" y="310">STRONGEST</text><text class="title" x="100" y="385">05 · THE CONTROL EXCEEDS THE PAGE</text><text class="body" x="100" y="430">One giant off-screen body and scale can become authored architecture.</text>
 <text class="sub" x="100" y="510">01 · Scale cuts documentary photography</text><text class="sub" x="100" y="560">03 · Triple EQ rhythm replaces cards</text><text class="sub" x="100" y="610">07 · Linear fader / rotary collision</text>
 <path d="M 1300 275 V 950" stroke="${P.line}" stroke-width="2"/><text class="micro" x="1380" y="310">CONDITIONAL</text><text class="sub" x="1380" y="385">06 · Real music-direction selector</text><text class="body" x="1380" y="430">Passes only when changing the control changes the brief.</text><text class="sub" x="1380" y="520">04 · Type on arc</text><text class="body" x="1380" y="565">Use once; keep every word reconstructable.</text><text class="sub" x="1380" y="655">08 · Platter + rotary ticks + photo</text><text class="body" x="1380" y="700">One circle owns the image; the second supplies tension.</text>
 <path d="M 80 1000 H 2520" stroke="${P.line}" stroke-width="2"/><text class="micro" x="100" y="1070">REJECT / LEARN</text><text class="title" x="100" y="1140">09 · ROTARY SWARM</text><text class="body" x="100" y="1185">Too many controls become wallpaper and erase meaning.</text><text class="title" x="100" y="1285">10 · SCALE COLLISION</text><text class="body" x="100" y="1330">Volume without hierarchy reads as controller theatre.</text>
 <text class="micro" x="1380" y="1070">INTEGRATE WITH EXISTING SYSTEM</text><text class="sub" x="1380" y="1140">FADER RAIL = linear progression</text><text class="sub" x="1380" y="1190">ROTARY SCALE = bounded intensity</text><text class="sub" x="1380" y="1240">PLATTER = photographic aperture</text><text class="sub" x="1380" y="1290">METER = truthful level or progress</text><text class="sub" x="1380" y="1340">BUTTON = action or active state</text><text class="body" x="1380" y="1410">Tape remains blocked until Patrick supplies authentic physical source.</text>
 <path d="M 80 1510 H 2520" stroke="${P.line}" stroke-width="2"/><text class="micro" x="100" y="1580">SUPERSEDED IN PART</text><text class="body" x="100" y="1635">ATOM-ROTARY-01 · ATOM-ROTARY-02 · EXP-05</text><text class="body" x="100" y="1680">Their rotary premise survives; the new anatomy, semantics and scale discipline replace their weaker generic treatment.</text>
 <text class="micro" x="100" y="1800">NEXT CH 00 — AFTER APPROVAL</text><text class="sub" x="100" y="1855">Use one extreme rotary move, one fader progression, one tactile action.</text><text class="body" x="100" y="1900">Patrick’s hand-in-the-air image remains the human anchor. Production stays locked.</text><text class="micro" x="100" y="1990">PATRICK_CREATIVE_APPROVAL: PENDING · PRODUCTION MUTATION: NONE</text>
`,P.ink);
await sharp(decisions).png().toFile(path.join(dirs.boards,"09-knob-integration-and-boundary-gate.png"));

console.log(`Inspected ${sourceRegister.length} sources; built ${primitiveRegister.length} primitives, ${transformationRegister.length} transformations, ${experiments.length} experiments, and 4 boards plus contact sheet.`);
