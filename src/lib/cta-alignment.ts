/**
 * Flex + text alignment for pill CTAs. Keeps labels centered when controls sit in flex rows
 * (inline-flex defaults to justify-start, which can look left-aligned next to Book a Consult).
 */
export const CTA_PILL_FLEX_CENTER = "inline-flex items-center justify-center text-center" as const;
