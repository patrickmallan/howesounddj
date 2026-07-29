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
  "A complimentary 45-minute Sound Check: a calm planning conversation about your wedding date, venue, vision, music, and whether Howe Sound DJ is the right fit." as const;

/** Post-availability context: first step after an open date. */
export const PUBLIC_SOUND_CHECK_POST_AVAILABILITY_COPY =
  "Your date looks open. The Sound Check is the first calm planning conversation: 45 minutes to talk through your venue, vision, music, and fit. No pressure to decide on the call." as const;
