/**
 * Production image paths (files live under /public).
 * Keep `null` until real photography or brand assets are exported into the repo.
 * Example: `homeHero: "/images/home-hero.webp"`
 */
export const SITE_IMAGES = {
  homeHero: null as string | null,
  homeAboutPreview: null as string | null,
  aboutPortrait: null as string | null,
  weddingsSupport: null as string | null,
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;

/** Alt text for `<Image />` when `src` is set — swap copy if the photo subject changes. */
export const SITE_IMAGE_ALT: Record<SiteImageKey, string> = {
  homeHero:
    "Wedding celebration — music and atmosphere by Howe Sound DJ, Sea-to-Sky weddings",
  homeAboutPreview:
    "Patrick of Howe Sound DJ — Squamish wedding DJ",
  aboutPortrait:
    "Patrick — Howe Sound DJ, Squamish wedding DJ",
  weddingsSupport:
    "Wedding ceremony or reception — Sea-to-Sky wedding DJ services",
};
