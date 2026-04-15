/**
 * Production image paths — files live under `public/images/` in purpose-based folders
 * (`home/`, `weddings/`, `about/`, `social/`). See `SITE_IMAGE_FILES` for the exact targets.
 *
 * For each slot, set the value to the **public URL path** (e.g. `homeHero: "/images/home/home-hero.webp"`)
 * once the file exists, or keep `null` until then. Prefer matching `SITE_IMAGE_FILES` so paths stay predictable.
 *
 * **Launch priority (highest conversion impact first):**
 * 1. `homeHero` — first impression beside the homepage headline (4:5).
 * 2. `homeProof` — wide proof strip; strongest “this is real” moment after the fold (16:9).
 * 3. `weddingsSupport` — Vancouver wedding page + other layouts (16:9 or crop for 4:5); not the main `/weddings` hero band.
 * 4. `homeAboutPreview` / `aboutPortrait` — Patrick’s face; color on home, B&W on About when both exist.
 * 5. `weddingsCrowd` — single wide proof image on `/weddings` (16:9).
 *
 * Slot purposes:
 * - **homeHero** — Reception / dance floor / venue atmosphere (not generic DJ stock).
 * - **homeProof** — Sea-to-Sky or mountain wedding fit, or full-room energy (16:9).
 * - **homeAboutPreview** — Patrick on the home “Meet” strip (portrait or at work).
 * - **aboutPortrait** — About page lead (can match `homeAboutPreview`).
 * - **weddingsSupport** — Vancouver page / sidebars: ceremony, reception, or corridor context (wide).
 * - **weddingsCrowd** — Weddings page proof strip: candid crowd / celebration energy (wide).
 *
 * @see `public/images/README.md` — folder layout, shot list, and OG handoff.
 *
 * **`weddingsSupport` file:** `public/images/weddings/weddings-support.webp` — bump `WEDDINGS_SUPPORT_CACHE` if you
 * replace it in place and caches show a stale image.
 */
const WEDDINGS_SUPPORT_CACHE = "2";

export const SITE_IMAGES = {
  homeHero: "/images/home/home-hero.webp",
  homeProof: "/images/home/home-proof.webp",
  homeAboutPreview: "/images/about/patrick-portrait.webp",
  aboutPortrait: "/images/about/patrick-portrait-bw.webp",
  weddingsSupport: `/images/weddings/weddings-support.webp?v=${WEDDINGS_SUPPORT_CACHE}`,
  weddingsCrowd: "/images/weddings/weddings-crowd.webp",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;

/**
 * Suggested **public URL paths** (operators only — not shown on the public site).
 * Drop files into the matching folder under `public/images/`, then copy these strings into `SITE_IMAGES`.
 * WebP/JPEG are both fine; keep extensions consistent with what you export.
 */
export const SITE_IMAGE_FILES: Record<SiteImageKey, string> = {
  homeHero: "/images/home/home-hero.webp",
  homeProof: "/images/home/home-proof.webp",
  homeAboutPreview: "/images/about/patrick-portrait.webp",
  aboutPortrait: "/images/about/patrick-portrait-bw.webp",
  weddingsSupport: `/images/weddings/weddings-support.webp?v=${WEDDINGS_SUPPORT_CACHE}`,
  weddingsCrowd: "/images/weddings/weddings-crowd.webp",
};

/**
 * Recommended social / meta assets (not page slots). Add the file, then point
 * `openGraph.images` and `twitter.images` in `src/app/layout.tsx` here — the site ships with
 * `/og-default.svg` until you swap.
 */
/** Target URL once `public/images/social/og-share.jpg` exists — wire into `src/app/layout.tsx` (+ Vancouver `metadata.twitter.images` if you keep an override). */
export const SITE_SOCIAL_IMAGE_FILES = {
  ogShare: "/images/social/og-share.jpg",
} as const;

/**
 * Alt text for `<Image />` when `src` is set. Describe what is actually in the photo when you swap assets —
 * avoid implying a specific couple or venue unless the image truly shows that.
 */
export const SITE_IMAGE_ALT: Record<SiteImageKey, string> = {
  homeHero:
    "Wedding couple sharing a dramatic dance-floor kiss while guests celebrate around them",
  homeProof:
    "Wedding guests lifting the groom above the dance floor during the reception",
  homeAboutPreview:
    "Portrait of Patrick Mallan smiling against a dark backdrop",
  aboutPortrait:
    "Black and white portrait of Patrick Mallan standing against a brick wall",
  weddingsSupport:
    "Wedding guests celebrating with hands in the air beneath string lights",
  weddingsCrowd:
    "Wedding guests walking together in a candid outdoor group moment",
};
