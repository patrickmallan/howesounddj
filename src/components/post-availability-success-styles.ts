/**
 * V3.2/V3.3/V3.4 typography role system for post-availability success surfaces.
 * V3.4: italic testimonial excerpt, proof breathing room, bridge removed.
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

/** ROLE B — Primary narrative headline (unified unit, both lines semibold) */
export function roleHeadline(surface: AvailabilitySuccessSurface): string {
  return `${headlineSize[surface]} font-semibold leading-snug text-white/95 outline-none`;
}

/** ROLE B — Headline line (no internal margin or weight variation) */
export function roleHeadlineLine(): string {
  return "block text-balance";
}

/** ROLE C — Supporting narrative (CTA support, full planning sentence) */
export function roleSupportingNarrative(): string {
  return "text-sm font-normal leading-relaxed text-white/70";
}

/** ROLE E — Testimonial quotation (italic editorial excerpt) */
export function roleTestimonial(): string {
  return "text-sm font-medium italic leading-relaxed text-white/90";
}

/** ROLE F — Attribution name */
export function roleAttributionName(): string {
  return "block text-xs font-medium text-white/80";
}

/** ROLE F — Attribution venue */
export function roleAttributionVenue(): string {
  return "block text-xs font-normal text-white/70";
}

/** Scroll body: groups 1–3 (confirmation, narrative, proof) */
export function roleContentGroups(surface: AvailabilitySuccessSurface): string {
  return surface === "compact" ? "flex flex-col gap-4" : "flex flex-col gap-5 sm:gap-6";
}

/** Within-group spacing for narrative */
export function roleNarrativeGroup(): string {
  return "space-y-2";
}

/** Within-group spacing for proof (quote + attribution) */
export function roleProofGroup(): string {
  return "space-y-2 pt-2";
}

/** Confirmation bar container */
export function roleConfirmationBar(surface: AvailabilitySuccessSurface): string {
  return surface === "compact"
    ? "flex items-center justify-between gap-3 rounded-lg border border-amber-300/15 bg-amber-300/[0.06] px-3 py-2.5"
    : "flex items-center justify-between gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3";
}

/** Action footer — no visible divider; whitespace separates from proof */
export function roleActionFooter(surface: AvailabilitySuccessSurface): string {
  const base =
    "shrink-0 bg-neutral-950/[0.98] pt-5 pb-[max(1rem,env(safe-area-inset-bottom))]";
  return surface === "compact" ? `${base} px-0` : `${base} sm:pt-6`;
}
