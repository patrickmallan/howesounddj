/** Balanced outer rhythm for finale CTA panels (atmosphere-grain / gradient wells). */
export const CTA_FINALE_SECTION_Y = "py-16 md:py-20 lg:py-24";

/** Standard vertical padding for major content sections below the page hero (inner pages). */
export const MAIN_SECTION_Y = "py-16 md:py-20 lg:py-24";

/** Canonical horizontal gutter for max-w-6xl content bands. */
export const PAGE_GUTTER_X = "px-6 lg:px-8";

/** Constrained content shell used across primary pages. */
export const SECTION_SHELL = "mx-auto max-w-6xl";

/**
 * Intra-section vertical rhythm: mobile tighter, tablet moderate, desktop spacious.
 * Entry and exit values stay equal so content remains visually centred.
 */
export const SECTION_BAND_TOP = "pt-12 md:pt-14 lg:pt-16";
export const SECTION_BAND_BOTTOM = "pb-12 md:pb-14 lg:pb-16";
export const SECTION_BAND_Y = `${SECTION_BAND_TOP} ${SECTION_BAND_BOTTOM}`;

/** Bordered full-width band internal padding. */
export const SECTION_BAND_BORDER_TOP = SECTION_BAND_TOP;
export const SECTION_BAND_BORDER_BOTTOM = SECTION_BAND_BOTTOM;
export const SECTION_BAND_BORDER_Y = `${SECTION_BAND_BORDER_TOP} ${SECTION_BAND_BORDER_BOTTOM}`;

/** @deprecated Prefer SECTION_BAND_BORDER_Y */
export const SECTION_BAND_BORDER_ENTRY = SECTION_BAND_BORDER_Y;

/**
 * Bordered band immediately after another section. Each side of the divider
 * receives the same inset so headings never sit against the rule.
 */
export const SECTION_BAND_BORDER_FOLLOW = SECTION_BAND_Y;

/**
 * Adjacent sections each own their internal inset. Matching values keep
 * content visually centred within every band instead of moving all whitespace
 * to one side of a divider.
 */
export const SECTION_TRANSITION_OUT = SECTION_BAND_BOTTOM;

/** Matching entry inset for a successor section. */
export const SECTION_TRANSITION_IN = SECTION_BAND_TOP;

/** @deprecated Use SECTION_TRANSITION_OUT */
export const SECTION_BAND_PRE_BORDER_BOTTOM = SECTION_TRANSITION_OUT;

/** Eyebrow label → heading spacing (sitewide). */
export const EYEBROW_TO_HEADING = "mt-4";

/** Stacked media → narrative gap in two-column grids. */
export const MEDIA_COPY_GRID_GAP = "gap-8 md:gap-10 lg:gap-12";

/** Inline editorial media card padding around ImageSlot frames. */
export const MEDIA_CARD_PAD = "p-3 sm:p-4";

/** Homepage hero: balanced whitespace above and below the two-column composition. */
export const HOMEPAGE_HERO_PADDING = "py-16 md:py-20 lg:py-24";

/** Homepage finale outer shell: the CTA well sits centrally in a balanced band. */
export const HOMEPAGE_FINALE_SECTION = `border-t border-white/10 bg-neutral-950 ${SECTION_BAND_Y}`;
