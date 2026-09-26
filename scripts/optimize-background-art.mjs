import sharp from "sharp";
import { stat } from "node:fs/promises";

// Keep the source artwork intact. These derivatives are for CSS backgrounds,
// where full-resolution originals compete with the above-the-fold hero image.
const sources = [
  ["public/images/hsdj-redesign/wedding-story/night-section-art-mobile-v1.webp", 62],
  ["public/images/hsdj-redesign/afterparty/wedding-night-collage.webp", 64],
  ["public/images/hsdj-redesign/hero/home-headline-complete.webp", 74],
  ["public/images/hsdj-redesign/footer/footer-dj-mixer-collage-v2.webp", 62],
  ["public/images/hsdj-redesign/deck-surfaces/djm-a9-topdown.jpg", 62],
  ["public/images/hsdj-redesign/reviews/wedding-night-controller-wrap-v2.webp", 62, 1600],
  ["public/images/hsdj-redesign/cassette/cassette-chassis-skin-v1.webp", 62, 1600],
  ["public/images/hsdj-redesign/cassette/cassette-bay-skin-v1.webp", 62, 1600],
  ["public/images/hsdj-redesign/cassette/speaker-skin-v1.webp", 62],
  ["public/images/hsdj-redesign/afterparty/dancefloor-wave-collage.webp", 62],
  ["public/images/hsdj-redesign/wedding-story/night-section-art-v1.webp", 62],
];

for (const [source, quality, width] of sources) {
  const target = source.replace(/\.(?:webp|jpg)$/, "-optimized.webp");
  const image = sharp(source);
  if (width) image.resize({ width });
  await image.webp({ quality, effort: 6 }).toFile(target);
  const [before, after] = await Promise.all([stat(source), stat(target)]);
  console.log(`${source}: ${before.size} → ${after.size} bytes (${Math.round(100 * after.size / before.size)}%)`);
}

const headline = "public/images/hsdj-redesign/hero/home-headline-complete.webp";
const mobileHeadline = headline.replace(".webp", "-mobile-optimized.webp");
await sharp(headline).resize({ width: 750 }).webp({ quality: 68, effort: 6 }).toFile(mobileHeadline);
const [headlineSource, headlineMobile] = await Promise.all([stat(headline), stat(mobileHeadline)]);
console.log(`${mobileHeadline}: ${headlineSource.size} → ${headlineMobile.size} bytes (${Math.round(100 * headlineMobile.size / headlineSource.size)}%)`);

const contactArt = "public/images/hsdj-redesign/contact/mixer-wedding-floor-art-v1.webp";
const mobileContactArt = contactArt.replace(".webp", "-mobile-optimized.webp");
await sharp(contactArt).resize({ width: 1200 }).webp({ quality: 52, effort: 6 }).toFile(mobileContactArt);
const [contactSource, contactMobile] = await Promise.all([stat(contactArt), stat(mobileContactArt)]);
console.log(`${mobileContactArt}: ${contactSource.size} → ${contactMobile.size} bytes (${Math.round(100 * contactMobile.size / contactSource.size)}%)`);
