import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const root = path.dirname(new URL(import.meta.url).pathname);
const sourceRoot = path.join(root, "..", "source-library", "01-equipment");
const out = path.join(root, "assets");
await mkdir(out, { recursive: true });

async function isolate({ name, source, crop, pathData }) {
  const sourcePath = path.join(sourceRoot, source);
  const cropped = await sharp(sourcePath).extract(crop).ensureAlpha().png().toBuffer();
  const mask = Buffer.from(`<svg width="${crop.width}" height="${crop.height}" viewBox="0 0 ${crop.width} ${crop.height}"><defs><filter id="f"><feGaussianBlur stdDeviation="2.2"/></filter></defs><path d="${pathData}" fill="white" filter="url(#f)"/></svg>`);
  await sharp(cropped)
    .composite([{ input: mask, blend: "dest-in" }])
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, `${name}.png`));
}

await isolate({
  name: "macro-filter-knob",
  source: "pexels-tony-entz-6229418-30859665.jpg",
  crop: { left: 2440, top: 1460, width: 1500, height: 1760 },
  pathData: "M230 510 C245 195 510 62 782 54 C1110 44 1328 222 1336 532 L1280 1420 C1248 1604 1065 1705 775 1715 C455 1718 250 1600 210 1422 Z",
});

await isolate({
  name: "macro-cue-button",
  source: "pexels-jake-l-davies-42710276-15262989.jpg",
  crop: { left: 1040, top: 3280, width: 1110, height: 830 },
  pathData: "M252 291 L664 143 Q713 127 747 164 L850 334 Q875 374 833 402 L397 554 Q354 568 329 531 L229 354 Q207 312 252 291 Z",
});

await isolate({
  name: "macro-green-pad",
  source: "pexels-lynde-2123295-4693261.jpg",
  crop: { left: 3000, top: 590, width: 1320, height: 980 },
  pathData: "M142 215 Q164 142 238 125 L1055 190 Q1148 205 1170 280 L1062 765 Q1042 853 948 866 L176 780 Q88 760 78 678 Z",
});

await isolate({
  name: "macro-fader-cap",
  source: "pexels-scott-platt-529822-6134554.jpg",
  crop: { left: 3260, top: 1790, width: 1030, height: 1320 },
  pathData: "M248 285 Q271 235 337 222 L690 226 Q742 232 760 284 L770 1060 Q773 1125 721 1152 L244 1154 Q185 1124 190 1062 Z",
});

console.log("V2 proof extracted from four native 4K–7K photographs.");
