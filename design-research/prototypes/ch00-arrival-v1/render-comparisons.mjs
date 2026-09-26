import path from "node:path";
import sharp from "sharp";

const directory = "design-research/prototypes/ch00-arrival-v1";
const labels = [
  "A  SPEAKER STACK / SIGNAL CUT",
  "B  AFTERIMAGE / BOOTH FLASH",
  "C  LOAD-IN DOCKET",
  "D  RUNOUT / LOOP",
];

const labelSvg = (primary, secondary = "", width = 680) => Buffer.from(`
  <svg width="${width}" height="52" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="21" fill="#f2d13d" font-family="Arial" font-weight="700" font-size="16">${primary}</text>
    <text x="0" y="43" fill="#efeadc" font-family="Arial" font-size="13">${secondary}</text>
  </svg>
`);

const desktopFiles = [
  "species-a-speaker-stack-desktop.png",
  "species-b-afterimage-desktop.png",
  "species-c-load-in-docket-desktop.png",
  "species-d-runout-desktop.png",
];
const desktopComposite = [];
for (let index = 0; index < desktopFiles.length; index += 1) {
  const image = await sharp(path.join(directory, desktopFiles[index]))
    .resize(680, 472, { fit: "fill" })
    .toBuffer();
  const left = index % 2 ? 730 : 30;
  const top = index < 2 ? 74 : 588;
  desktopComposite.push({ input: image, left, top });
  desktopComposite.push({ input: labelSvg(labels[index]), left, top: top - 44 });
}
await sharp({ create: { width: 1440, height: 1090, channels: 3, background: "#0a0a09" } })
  .composite(desktopComposite)
  .png()
  .toFile(path.join(directory, "ch00-desktop-comparison.png"));

const mobileFiles = [
  "species-a-speaker-stack-mobile.png",
  "species-b-afterimage-mobile.png",
  "species-c-load-in-docket-mobile.png",
  "species-d-runout-mobile.png",
];
const mobileComposite = [];
for (let index = 0; index < mobileFiles.length; index += 1) {
  const image = await sharp(path.join(directory, mobileFiles[index]))
    .resize(300, 649, { fit: "fill" })
    .toBuffer();
  const left = 30 + index * 352;
  mobileComposite.push({ input: image, left, top: 90 });
  const [primary, secondary] = labels[index].split(" / ");
  mobileComposite.push({ input: labelSvg(primary, secondary, 300), left, top: 28 });
}
await sharp({ create: { width: 1438, height: 785, channels: 3, background: "#0a0a09" } })
  .composite(mobileComposite)
  .png()
  .toFile(path.join(directory, "ch00-mobile-comparison.png"));

console.log("comparison sheets created");
