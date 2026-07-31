/**
 * V3.2 typography role system for post-availability success surfaces.
 * Hierarchy through disciplined roles — not arbitrary per-element styling.
 */

export type AvailabilitySuccessSurface = "compact" | "full";

const headlineSize: Record<AvailabilitySuccessSurface, string> = {
  compact: "text-lg",
  full: "text-xl sm:text-2xl",
};

/** ROLE A — Confirmation date */
export function roleConfirmationDate(): string {
  return `text-sm font-medium leading-snug text-white/90`;
}

/** ROLE A — Edit date action (subordinate; no gold accent) */
export function roleConfirmationEdit(): string {
  return [
    "inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center",
    "rounded-md px-2 py-1.5 text-sm font-normal text-white/65",
    "underline decoration-white/25 underline-offset-2",
    "transition hover:text-white/80 hover:decoration-white/40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  ].join(" ");
}

/** ROLE B — Primary narrative headline container */
export function roleHeadline(surface: AvailabilitySuccessSurface): string {
  return `${headlineSize[surface]} leading-snug text-white/95 outline-none`;
}

/** ROLE B — Headline line 1 */
export function roleHeadlineLead(): string {
  return "block font-medium";
}

/** ROLE B — Headline line 2 */
export function roleHeadlineConfirmation(): string {
  return "mt-0.5 block font-semibold text-balance";
}

/** ROLE C — Supporting narrative (bridge, CTA support, full planning sentence) */
export function roleSupportingNarrative(): string {
  return "text-sm font-normal leading-relaxed text-white/70";
}

/** ROLE D — Social proof context */
export function roleProofContext(): string {
  return "text-xs font-normal leading-relaxed text-white/70 sm:text-sm";
}

/** ROLE E — Testimonial quotation (single weight, no border card) */
export function roleTestimonial(): string {
  return "text-sm font-semibold leading-relaxed text-white/95";
}

/** ROLE F — Attribution name */
export function roleAttributionName(): string {
  return "block text-xs font-medium text-white/80";
}

/** ROLE F — Attribution venue */
export function roleAttributionVenue(): string {
  return "block text-xs font-normal text-white/70";
}

/** Group spacing between major content blocks */
export function roleContentGroups(surface: AvailabilitySuccessSurface): string {
  return surface === "compact" ? "flex flex-col gap-4" : "flex flex-col gap-5 sm:gap-6";
}

/** Within-group spacing for narrative */
export function roleNarrativeGroup(): string {
  return "space-y-2";
}

/** Within-group spacing for proof */
export function roleProofGroup(): string {
  return "space-y-2";
}

/** Confirmation bar container */
export function roleConfirmationBar(surface: AvailabilitySuccessSurface): string {
  return surface === "compact"
    ? "flex items-center justify-between gap-3 rounded-lg border border-amber-300/15 bg-amber-300/[0.06] px-3 py-2.5"
    : "flex items-center justify-between gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3";
}

/** Action footer — softened divider */
export function roleActionFooter(surface: AvailabilitySuccessSurface): string {
  const base =
    "shrink-0 border-t border-white/[0.06] bg-neutral-950/[0.98] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]";
  return surface === "compact" ? `${base} px-0` : `${base} sm:pt-5`;
}
