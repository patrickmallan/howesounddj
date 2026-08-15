/** Vertical rhythm before full-width finale CTA panels (atmosphere-grain / gradient wells). Matches SectionReveal-heavy pages. */
export const CTA_FINALE_SECTION_TOP = "mt-12 lg:mt-16";

/** Standard vertical padding for major content sections below the page hero. Reduces uneven gaps between bordered bands. */
export const MAIN_SECTION_Y = "py-20 lg:py-24";

/** Canonical horizontal gutter for max-w-6xl content bands. */
export const PAGE_GUTTER_X = "px-6 lg:px-8";

/** Standard section vertical rhythm (homepage bands and scroll sections). */
export const SECTION_BAND_TOP = "pt-14 md:pt-20 lg:pt-24";
export const SECTION_BAND_BOTTOM = "pb-14 md:pb-20 lg:pb-24";
export const SECTION_BAND_Y = `${SECTION_BAND_TOP} ${SECTION_BAND_BOTTOM}`;

/**
 * Bordered full-width band entry (e.g. homepage #about).
 * Tighter top padding because the preceding section already contributes bottom padding.
 */
export const SECTION_BAND_BORDER_ENTRY = "pt-10 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24";

/** Reduced bottom padding when the next section is a bordered band (avoids stacked dead zones). */
export const SECTION_BAND_PRE_BORDER_BOTTOM = "pb-10 md:pb-14 lg:pb-16";

/** Eyebrow label → heading spacing (sitewide). */
export const EYEBROW_TO_HEADING = "mt-4";

/** Stacked media → narrative gap in two-column grids. */
export const MEDIA_COPY_GRID_GAP = "gap-8 md:gap-10 lg:gap-12";

/** Inline editorial media card padding around ImageSlot frames. */
export const MEDIA_CARD_PAD = "p-3 sm:p-4";

/** Constrained content shell used across primary pages. */
export const SECTION_SHELL = "mx-auto max-w-6xl";
