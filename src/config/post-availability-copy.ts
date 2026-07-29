/**
 * Post-availability emotional conversion copy (visitor-facing SSOT).
 *
 * Copy candidate scoring (Brand DNA + Emotional Conversion Engine V1):
 *
 * | Criterion                  | A: Calendar Open | B: Stress-Free Step | C: Team Fit      |
 * |----------------------------|------------------|---------------------|------------------|
 * | Distinctiveness            | 5                | 4                   | 4                |
 * | Customer-evidence fidelity | 5                | 5                   | 4                |
 * | Emotional clarity          | 5                | 5                   | 4                |
 * | Premium restraint          | 5                | 5                   | 5                |
 * | Category clarity           | 5                | 4                   | 4                |
 * | Mobile brevity             | 4                | 4                   | 5                |
 * | Conversion focus           | 5                | 4                   | 4                |
 * | TOTAL                      | 34               | 31                  | 30               |
 *
 * Winner: Candidate A ("Calendar Open") — clearest date confirmation, human voice,
 * strongest path into Sound Check without generic "Great news" framing.
 */

export const POST_AVAILABILITY_COPY_VARIANT = "calendar_open_v1" as const;

export const POST_AVAILABILITY_PRIMARY_CTA_LABEL =
  "Reserve My Complimentary Wedding Planning Session" as const;

export const POST_AVAILABILITY_RISK_REDUCER = "45 minutes · No pressure · Just clarity" as const;

export const POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL = "Prefer email first?" as const;

export const POST_AVAILABILITY_FULL_COPY = {
  reliefHeadline: "Your wedding date looks open on Patrick's calendar",
  identityStatement:
    "Patrick is more than a DJ. Couples describe him as a calm, caring part of the wedding team who helps everything run smoothly from planning through the reception.",
  outcomeBullets: [
    "Ceremony, cocktail hour, and reception handled seamlessly.",
    "A packed dance floor and energy that stays high all night.",
  ] as const,
  soundCheckExplanation:
    "The Sound Check is a complimentary 45-minute planning conversation about your date, venue, vision, music, and whether Howe Sound DJ is the right fit. Calm, personable, and no pressure to decide on the call.",
} as const;

export const POST_AVAILABILITY_COMPACT_COPY = {
  reliefHeadline: "Your date looks open",
} as const;

export const POST_AVAILABILITY_LOADING = {
  buttonLabel: "Checking Patrick's calendar…",
  statusMessage: "Checking Patrick's calendar for your wedding date.",
} as const;

export const POST_AVAILABILITY_UNAVAILABLE_COPY = {
  headline: "That date is not open right now",
  body: "It happens with popular Sea-to-Sky weekends. Try another date, or send a message if your plans are flexible.",
  tryAnotherDateLabel: "Try Another Date",
  sendMessageLabel: "Send a Message",
} as const;

export const POST_AVAILABILITY_MANUAL_COPY = {
  headline: "We need to confirm this date personally",
  body: "The calendar could not be verified automatically. Send a quick message and Patrick will confirm availability for you.",
  contactLabel: "Contact us directly",
  tryAnotherDateLabel: "Try Another Date",
} as const;

/** Screen-reader factual status templates (not primary visual copy). */
export const POST_AVAILABILITY_SR_STATUS = {
  available: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} currently appears available.`,
  unavailable: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} is currently unavailable.`,
  manual: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} could not be confirmed automatically.`,
} as const;
