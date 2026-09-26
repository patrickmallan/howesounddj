import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [assetDir, outputPath, manifestName = 'manifest.json'] = process.argv.slice(2);
if (!assetDir || !outputPath) throw new Error('Usage: node make-contact-sheet.mjs <asset-dir> <output>');

const manifest = JSON.parse(await fs.readFile(path.join(assetDir, manifestName), 'utf8'))
  .map((item) => ({ ...item, filename: item.filename ?? item.file }))
  .filter((item) => item.filename);
const columns = 5;
const cellWidth = 420;
const cellHeight = 320;
const imageWidth = 390;
const imageHeight = 258;
const rows = Math.ceil(manifest.length / columns);
const composites = [];

for (const [position, item] of manifest.entries()) {
  const x = (position % columns) * cellWidth + 15;
  const y = Math.floor(position / columns) * cellHeight + 12;
  const thumb = await sharp(path.join(assetDir, item.filename))
    .resize(imageWidth, imageHeight, { fit: 'contain', background: '#171717' })
    .png()
    .toBuffer();
  composites.push({ input: thumb, left: x, top: y });
  const label = Buffer.from(`<svg width="${imageWidth}" height="38" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#050505"/><text x="4" y="24" fill="#fff" font-family="Arial" font-size="18" font-weight="700">${item.filename}</text></svg>`);
  composites.push({ input: label, left: x, top: y + imageHeight + 4 });
}

await sharp({ create: { width: columns * cellWidth, height: rows * cellHeight, channels: 3, background: '#050505' } })
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile(outputPath);

console.log(outputPath);
