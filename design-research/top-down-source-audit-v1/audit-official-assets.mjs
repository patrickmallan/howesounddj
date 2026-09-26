import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [htmlPath, outputDir] = process.argv.slice(2);
if (!htmlPath || !outputDir) throw new Error('Usage: node audit-official-assets.mjs <html> <output-dir>');

const html = await fs.readFile(htmlPath, 'utf8');
const urls = [...new Set(html.match(/https:\/\/[^"'<>\s]+?\.(?:png|jpe?g|webp)(?:\?[^"'<>\s]*)?/gi) ?? [])]
  .map((url) => url.replaceAll('&amp;', '&'))
  .filter((url) => /(?:alphatheta\.com|microcms-assets\.io)/.test(new URL(url).hostname));

await fs.mkdir(outputDir, { recursive: true });
const manifest = [];

for (const [index, url] of urls.entries()) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    const extension = metadata.format === 'jpeg' ? 'jpg' : metadata.format;
    const filename = `${String(index + 1).padStart(3, '0')}-${metadata.width}x${metadata.height}.${extension}`;
    await fs.writeFile(path.join(outputDir, filename), buffer);
    manifest.push({ index: index + 1, filename, width: metadata.width, height: metadata.height, url });
  } catch (error) {
    manifest.push({ index: index + 1, url, error: error.message });
  }
}

await fs.writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ discovered: urls.length, downloaded: manifest.filter((item) => !item.error).length, outputDir }));
