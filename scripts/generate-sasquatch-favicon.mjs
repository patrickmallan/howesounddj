import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public/favicons/Cool guy Sasquatch Favicon.png");
const app = path.join(root, "src/app");

const pngAt = (size) =>
  sharp(source).resize(size, size, { fit: "fill", kernel: "lanczos3" }).png().toBuffer();

// PNG-encoded ICO entries keep the small browser-tab versions crisp.
const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map(pngAt));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;

entries.forEach((png, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(sizes[index], entry);
  header.writeUInt8(sizes[index], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});

await writeFile(path.join(app, "favicon.ico"), Buffer.concat([header, ...entries]));
await writeFile(path.join(app, "icon.png"), await pngAt(180));

// Read back the files so this task also catches an incomplete write.
await Promise.all(["favicon.ico", "icon.png"].map((name) => readFile(path.join(app, name))));
