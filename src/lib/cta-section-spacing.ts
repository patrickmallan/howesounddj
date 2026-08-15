/** Vertical rhythm before full-width finale CTA panels (atmosphere-grain / gradient wells). */
export const CTA_FINALE_SECTION_TOP = "mt-8 md:mt-12 lg:mt-16";

/** Standard vertical padding for major content sections below the page hero (inner pages). */
export const MAIN_SECTION_Y = "py-16 md:py-20 lg:py-24";

/** Canonical horizontal gutter for max-w-6xl content bands. */
export const PAGE_GUTTER_X = "px-6 lg:px-8";

/** Constrained content shell used across primary pages. */
export const SECTION_SHELL = "mx-auto max-w-6xl";

/**
 * Intra-section vertical rhythm — mobile tighter, tablet moderate, desktop spacious.
 * Use SECTION_TRANSITION_OUT / SECTION_TRANSITION_IN for inter-section gaps (single owner).
 */
export const SECTION_BAND_TOP = "pt-8 md:pt-14 lg:pt-24";
export const SECTION_BAND_BOTTOM = "pb-8 md:pb-14 lg:pb-24";
export const SECTION_BAND_Y = `${SECTION_BAND_TOP} ${SECTION_BAND_BOTTOM}`;

/** Bordered full-width band internal padding. */
export const SECTION_BAND_BORDER_TOP = "pt-8 md:pt-12 lg:pt-16";
export const SECTION_BAND_BORDER_BOTTOM = "pb-8 md:pb-12 lg:pb-24";
export const SECTION_BAND_BORDER_Y = `${SECTION_BAND_BORDER_TOP} ${SECTION_BAND_BORDER_BOTTOM}`;

/** @deprecated Prefer SECTION_BAND_BORDER_Y */
export const SECTION_BAND_BORDER_ENTRY = SECTION_BAND_BORDER_Y;

/**
 * Bordered band immediately after a transition-out section.
 * Border line provides separation — no stacked top padding.
 */
export const SECTION_BAND_BORDER_FOLLOW = `pt-0 ${SECTION_BAND_BORDER_BOTTOM}`;

/**
 * Outgoing section owns the inter-section gap (single-owner law).
 * Pair with SECTION_TRANSITION_IN on the successor.
 */
export const SECTION_TRANSITION_OUT = "pb-8 md:pb-12 lg:pb-20";

/** Successor section — no duplicate top padding when paired with SECTION_TRANSITION_OUT. */
export const SECTION_TRANSITION_IN = "pt-0";

/** @deprecated Use SECTION_TRANSITION_OUT */
export const SECTION_BAND_PRE_BORDER_BOTTOM = SECTION_TRANSITION_OUT;

/** Eyebrow label → heading spacing (sitewide). */
export const EYEBROW_TO_HEADING = "mt-4";

/** Stacked media → narrative gap in two-column grids. */
export const MEDIA_COPY_GRID_GAP = "gap-8 md:gap-10 lg:gap-12";

/** Inline editorial media card padding around ImageSlot frames. */
export const MEDIA_CARD_PAD = "p-3 sm:p-4";

/** Homepage hero — premium top, tighter bottom handoff to In Motion. */
export const HOMEPAGE_HERO_PADDING = "pt-20 pb-8 lg:py-28";

/** Homepage finale outer shell — border participates; no section-level top pad. */
export const HOMEPAGE_FINALE_SECTION = "border-t border-white/10 bg-neutral-950 pb-6 pt-0 md:pb-8";

/** Space from finale border to CTA well (after FAQ transition-out). */
export const HOMEPAGE_FINALE_INNER_TOP = "pt-8 md:pt-12 lg:pt-16";
