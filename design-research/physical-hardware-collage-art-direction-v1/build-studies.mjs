import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "design-research/physical-hardware-collage-art-direction-v1";
const out = path.join(root, "studies");
fs.mkdirSync(out, { recursive: true });

const S = {
  patrick: "public/images/about/patrick-dj-action.webp",
  booth: "design-research/source-library/04-weddings-documentary/Meghan & Brodie-55 (2).jpg",
  dance: "public/images/brand-editorial/hsdj-packed-dance-floor-editorial.webp",
  kiss: "public/images/home/home-hero.webp",
  eq: "design-research/source-library/01-equipment/pexels-anna-pou-8132448.jpg",
  platter: "design-research/source-library/01-equipment/pexels-jake-l-davies-42710276-15262989.jpg",
  faders: "design-research/source-library/01-equipment/pexels-tstudio-34805588-9871953.jpg",
  channel: "design-research/source-library/01-equipment/pexels-tstudio-34805588-14745818.jpg",
  cue: "design-research/source-library/01-equipment/pexels-tony-entz-6229418-30859665.jpg",
};

const esc = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const svg = (w, h, body, background = "transparent") => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="${background}"/>${body}</svg>`);

function tornMask(w, h, inset = 0) {
  const x = inset, y = inset, r = w - inset, b = h - inset;
  return svg(w, h, `<path fill="white" d="M ${x} ${y+26} L ${x+70} ${y+4} L ${x+150} ${y+18} L ${x+245} ${y} L ${r-150} ${y+14} L ${r-70} ${y+2} L ${r} ${y+34} L ${r-12} ${y+115} L ${r} ${y+205} L ${r-10} ${b-135} L ${r} ${b-44} L ${r-75} ${b-8} L ${r-180} ${b} L ${r-275} ${b-15} L ${x+190} ${b-2} L ${x+90} ${b-18} L ${x} ${b-5} L ${x+10} ${b-120} L ${x} ${b-225} L ${x+12} ${y+145} Z"/>`);
}

async function fragment(input, w, h, options = {}) {
  let image = sharp(input).resize(w, h, { fit: options.fit ?? "cover", position: options.position ?? "attention" });
  if (options.print) image = image.modulate({ saturation: options.saturation ?? 1.18, brightness: options.brightness ?? 0.94 }).linear(options.contrast ?? 1.08, options.offset ?? -8);
  let buffer = await image.ensureAlpha().png().toBuffer();
  let mask;
  if (options.circle) mask = svg(w,h,`<ellipse cx="${w/2}" cy="${h/2}" rx="${w*.49}" ry="${h*.48}" fill="white"/>`);
  else if (options.polygon) mask = svg(w,h,`<path d="${options.polygon}" fill="white"/>`);
  else mask = tornMask(w,h,options.inset ?? 0);
  buffer = await sharp(buffer).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  if (options.rotate) buffer = await sharp(buffer).rotate(options.rotate,{background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
  return buffer;
}

async function placed(input, left, top, extra = {}) {
  let normalized = input;
  let meta = await sharp(normalized).metadata();
  if (meta.width > 1440 || meta.height > 1000) {
    normalized = await sharp(normalized).resize(1440,1000,{fit:"inside"}).png().toBuffer();
    meta = await sharp(normalized).metadata();
  }
  return { input: normalized, left: Math.max(0, Math.min(left, 1440-meta.width)), top: Math.max(0, Math.min(top, 1000-meta.height)), ...extra };
}

function posterType(lines, footer, options = {}) {
  const fills = options.fills ?? ["#ffe126", "#f5f0e7", "#f42593"];
  const x = options.x ?? 40, y = options.y ?? 210, gap = options.gap ?? 145, size = options.size ?? 150;
  return svg(1440,1000,`<style>.display{font:900 ${size}px Arial Black,Arial,sans-serif;letter-spacing:-8px;paint-order:stroke fill;stroke:#070807;stroke-width:15px;stroke-linejoin:round}.micro{font:800 16px Arial,sans-serif;letter-spacing:5px;fill:#f5f0e7;paint-order:stroke fill;stroke:#070807;stroke-width:7px}</style><g transform="rotate(${options.rotation ?? -2} 720 500)">${lines.map((line,i)=>`<text class="display" x="${x}" y="${y+i*gap}" fill="${fills[i%fills.length]}">${esc(line)}</text>`).join("")}</g><text class="micro" x="46" y="958">${esc(footer)}</text><text class="micro" x="1170" y="958" fill="#ffe126">HSDJ / 2026</text>`);
}

function field(background="#080907") {
  return svg(1440,1000,`<path d="M0 80 L1440 0 L1440 115 L0 210 Z" fill="#ffe126"/><path d="M0 720 L1440 550 L1440 1000 L0 1000 Z" fill="#f42593" opacity=".38"/><path d="M70 0 L0 190 M180 0 L0 420 M1440 610 L1210 1000" stroke="#f5f0e7" stroke-width="8" opacity=".24"/>`,background);
}

async function studyA() {
  const platter = await fragment(S.platter,760,760,{position:"center",print:true,rotate:-9});
  const eq = await fragment(S.eq,430,940,{position:"center",print:true,polygon:"M30 0 L430 24 L398 940 L0 900 Z"});
  const patrick = await fragment(S.patrick,650,920,{position:"top",print:true,polygon:"M45 0 L620 18 L650 850 L540 920 L0 885 L22 160 Z"});
  const faders = await fragment(S.faders,1120,330,{position:"center",print:true,rotate:-7});
  const cue = await fragment(S.cue,380,390,{position:"center",print:true,rotate:5});
  const type = posterType(["READ","THE ROOM."],"HOWE SOUND WEDDING DJ · SQUAMISH, BC",{x:32,y:240,gap:152,size:150,fills:["#ffe126","#f5f0e7"]});
  await sharp(field()).composite([await placed(platter,0,0),await placed(eq,1050,35),await placed(patrick,500,45),{input:type,left:0,top:0},await placed(faders,0,690),await placed(cue,1070,620)]).png().toFile(path.join(out,"A-hardware-invasion.png"));
}

async function studyB() {
  const booth = await sharp(S.booth).resize(1440,1000,{fit:"cover",position:"attention"}).modulate({saturation:.88,brightness:.7}).linear(1.08,-10).png().toBuffer();
  const eq = await fragment(S.eq,760,840,{position:"center",print:true,polygon:"M0 18 L730 0 L760 780 L650 840 L20 790 Z",rotate:-8});
  const faders = await fragment(S.faders,1240,420,{position:"center",print:true,polygon:"M30 35 L1210 0 L1240 375 L1120 420 L0 390 Z",rotate:4});
  const platter = await fragment(S.platter,650,650,{position:"center",print:true,circle:true});
  const channel = await fragment(S.channel,360,900,{position:"center",print:true,polygon:"M40 0 L360 30 L318 900 L0 870 Z",rotate:5});
  const type = posterType(["MIXED","LIVE."],"THE ROOM IS PART OF THE SET",{x:42,y:430,gap:180,size:188,fills:["#f5f0e7","#ffe126"]});
  const wash = svg(1440,1000,`<rect width="1440" height="1000" fill="#080907" opacity=".22"/><path d="M0 0 H180 L0 380 Z M1440 0 H1250 L1440 300 Z" fill="#ffe126" opacity=".9"/>`);
  await sharp(booth).composite([{input:wash,left:0,top:0},await placed(eq,0,0),await placed(channel,1080,0),await placed(faders,40,560),{input:type,left:0,top:0},await placed(platter,790,390)]).png().toFile(path.join(out,"B-mixer-collage.png"));
}

async function studyC() {
  const dance = await sharp(S.dance).resize(1440,1000,{fit:"cover",position:"attention"}).modulate({saturation:1.08,brightness:.72}).linear(1.14,-15).png().toBuffer();
  const channel = await fragment(S.channel,460,980,{position:"center",print:true,polygon:"M0 0 L430 30 L460 940 L370 980 L18 920 Z",rotate:-7});
  const patrick = await fragment(S.patrick,520,610,{position:"top",print:true,polygon:"M50 0 L500 15 L520 570 L420 610 L0 575 L20 90 Z",rotate:3});
  const kiss = await fragment(S.kiss,600,520,{position:"attention",print:true,polygon:"M20 30 L580 0 L600 480 L510 520 L0 485 Z",rotate:-3});
  const platter = await fragment(S.platter,780,780,{position:"center",print:true,circle:true,rotate:6});
  const type = posterType(["SQUAMISH","AFTER","DARK."],"HOWE SOUND WEDDING DJ",{x:30,y:225,gap:142,size:140,fills:["#f5f0e7","#f42593","#ffe126"]});
  const print = svg(1440,1000,`<path d="M0 0 H1440 V78 L0 170 Z" fill="#ffe126" opacity=".92"/><path d="M0 840 L520 720 L600 1000 H0 Z" fill="#f42593" opacity=".72"/><path d="M1260 0 L1440 0 L1440 330 Z" fill="#18f0da" opacity=".7"/>`);
  await sharp(dance).composite([{input:print,left:0,top:0},await placed(channel,0,0),await placed(kiss,80,470),await placed(patrick,530,0),{input:type,left:0,top:0},await placed(platter,660,220)]).png().toFile(path.join(out,"C-music-poster-x-machine.png"));
}

await studyA();
await studyB();
await studyC();
console.log("Built 3 source-pixel physical hardware collage studies at 1440×1000.");
