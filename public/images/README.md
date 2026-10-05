# Images : operator guide (Howe Sound DJ)

Everything lives under **`public/images/`** in four folders. Next.js serves them at **`/images/...`** (no `public` in the URL).

## Folder layout

| Folder | Purpose |
|--------|---------|
| **`home/`** | Homepage hero, proof strip |
| **`weddings/`** | Weddings page support + crowd band; same support asset reused on Vancouver hero |
| **`about/`** | Patrick portraits (color + black and white) |
| **`social/`** | Open Graph / share image (1200×630 raster) : **optional until launch** |

## Connect a page image after you drop it in

1. Save the file in the right folder (see table below).
2. Open **`src/config/site-images.ts`**.
3. Set **`SITE_IMAGES.<slot>`** to the **same path** as in **`SITE_IMAGE_FILES`** (or your own path if you renamed the file).
4. Adjust **`SITE_IMAGE_ALT`** if the photo’s subject changed.

Example: `public/images/home/home-hero.webp` → `homeHero: "/images/home/home-hero.webp"`.

## Slot → folder → suggested file

| Slot (`SITE_IMAGES`) | Folder | Suggested file | Role |
|----------------------|--------|----------------|------|
| `homeHero` | `home/` | `home-hero.webp` | Beside main headline |
| `homeProof` | `home/` | `home-proof.webp` | Wide proof band |
| `weddingsSupport` | `weddings/` | `weddings-support.webp` | Weddings hero band + Vancouver sidebar (cropped in layout) |
| `weddingsCrowd` | `weddings/` | `weddings-crowd.webp` | Second proof band on Weddings (below highlights) |
| `homeAboutPreview` | `about/` | `patrick-portrait.webp` | Home “Meet” strip (color) |
| `aboutPortrait` | `about/` | `patrick-portrait-bw.webp` | About page lead (B&W in current setup) |

Paths are duplicated in **`SITE_IMAGE_FILES`** in `site-images.ts`.

**Formats:** Prefer **WebP** or **JPEG**. If you change extension, update **`SITE_IMAGES`** to match.

## Aspect ratios

| Slots | Ratio | Notes |
|-------|--------|--------|
| `homeHero`, `homeAboutPreview`, `aboutPortrait` | **4:5** | Portrait frames |
| `homeProof`, `weddingsSupport`, `weddingsCrowd` | **16:9** | Landscape bands |

## Priority order (conversion / polish)

1. **Home hero**: first trust signal next to the headline.
2. **Home proof**: strongest post-fold proof.
3. **Weddings support**: Weddings + Vancouver.
4. **Patrick portraits**: `homeAboutPreview` + `aboutPortrait`.
5. **`weddingsCrowd`**: extra weddings-page proof.
6. **Social share (OG)**: site-wide link previews (`/og-cake-party-v2.jpg` from `public/og-cake-party-v2.jpg`); not a `SITE_IMAGES` slot.

## Shot list → slot

| Shot | Save as / slot |
|------|----------------|
| Shot 01 | `home/home-hero.webp` → `homeHero` |
| Shot 02 | `home/home-proof.webp` → `homeProof` |
| Shot 03 | `weddings/weddings-support.webp` → `weddingsSupport` |
| Shot 04 | `weddings/weddings-crowd.webp` → `weddingsCrowd` |
| Shot 05 | `about/patrick-portrait.webp` → `homeAboutPreview` |
| Shot 06 | `about/patrick-portrait-bw.webp` → `aboutPortrait` |
| Shot 07 | `og-cake-party-v2.jpg` (`public/`) → see **Social share (Open Graph)** below |

## Alt text

Edit **`SITE_IMAGE_ALT`** in `site-images.ts` when the picture’s content changes. Describe what is in frame; do not claim a specific wedding unless the photo is actually that event.

## Social share (Open Graph)

**Current behavior:** The site uses **`/og-cake-party-v2.jpg`** (`public/og-cake-party-v2.jpg`, 1200×630), a wide adaptation of the homepage's imagined pink wedding-cake party artwork. It retains the entire cake and the laughing guest hanging from its bottom tier. It is wired into Open Graph and Twitter metadata across the site. **`SITE_SOCIAL_IMAGE_FILES.ogShare`** in **`src/config/site-images.ts`** matches that path. Earlier share-image versions remain in the repository but are not used by current metadata.

**When you replace the share image:**

1. Export **1200×630** (or same aspect), **sRGB**, JPG or PNG, ideally under ~500 KB for snappy loads.
2. Save under a new versioned name and update **`openGraph.images`**, **`twitter.images`**, and **`SITE_SOCIAL_IMAGE_FILES.ogShare`** together. A fresh URL helps sharing services refresh their cached preview.
3. Set **`width` / `height`** in **`layout.tsx`** to match the file if dimensions change.
4. Redeploy. Refresh cached previews with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) if needed.

The image is imagined artwork, not documentary photography of a specific couple or venue. Keep that distinction in social-image descriptions.

More detail: **`docs/LAUNCH_CHECKLIST.md`** §8.
