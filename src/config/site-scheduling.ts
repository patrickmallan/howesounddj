/** Canonical public scheduling configuration for Howe Sound DJ acquisition. */

export const SCHEDULING_PROVIDER = "CALENDLY" as const;

/**
 * Sound Check — sole public Calendly acquisition event for prospective couples.
 * Semantic alias: public acquisition consultation.
 *
 * Naming contract (HSDJ-WEB-SCHEDULING-01E):
 * - Public CTA label: Book a Consult (`PUBLIC_SOUND_CHECK_CTA_LABEL`)
 * - Calendly event name: Sound Check (`label`)
 * - Internal intent: SOUND_CHECK (`purpose`)
 */
export const PUBLIC_SOUND_CHECK_SCHEDULING = {
  provider: SCHEDULING_PROVIDER,
  purpose: "SOUND_CHECK" as const,
  label: "Sound Check",
  durationMinutes: 45,
  url: "https://calendly.com/patrick-howesounddj/sound-check",
} as const;

/** Visitor-facing label for buttons linking to the Sound Check Calendly event. */
export const PUBLIC_SOUND_CHECK_CTA_LABEL = "Book a Consult" as const;

/** Supporting context when "Sound Check" needs clarification for first-time visitors. */
export const PUBLIC_SOUND_CHECK_SUPPORTING_COPY =
  "A complimentary wedding DJ consultation — a 45-minute conversation about your wedding, your vision, and whether Howe Sound DJ is the right fit." as const;
