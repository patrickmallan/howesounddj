/** Canonical production origin (no trailing slash). Keep in sync with `metadataBase` in `src/app/layout.tsx`. */
export const SITE_ORIGIN = "https://www.howesounddj.com";

/** Preferred public site name for WebSite schema, `og:site_name`, and primary brand surfaces. */
export const SITE_PUBLIC_NAME = "Howe Sound Wedding DJ";

/** Alternate public names in preference order (includes domain fallback). */
export const SITE_ALTERNATE_NAMES = ["Howe Sound DJ", "howesounddj.com"] as const;

/** Shorter brand for title templates and length-constrained surfaces. */
export const SITE_SHORT_NAME = "Howe Sound DJ";

/** Homepage `<title>` and primary social title for the canonical homepage. */
export const HOMEPAGE_TITLE =
  "Howe Sound Wedding DJ | Squamish, Whistler & Vancouver";
