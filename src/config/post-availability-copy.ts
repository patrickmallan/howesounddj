/**
 * Post-availability emotional conversion copy (visitor-facing SSOT).
 *
 * V2 headline evaluation (HSDJ-WEB-AVAILABILITY-SUCCESS-V2):
 *
 * | Criterion          | A: Patrick Available | B: Date Confirmed | C: Great Start    | D: Calendar Open (V1) |
 * |--------------------|----------------------|-------------------|-------------------|-----------------------|
 * | Clarity            | 5                    | 5                 | 4                 | 4                     |
 * | Energy             | 5                    | 3                 | 4                 | 3                     |
 * | Memorability       | 5                    | 3                 | 4                 | 4                     |
 * | Confidence         | 5                    | 5                 | 3                 | 3 (hedging "looks")   |
 * | Premium feel       | 5                    | 4                 | 3                 | 4                     |
 * | TOTAL              | 25                   | 20                | 18                | 18                    |
 *
 * Winner: Candidate A ("Patrick is available on your wedding date") — names Patrick,
 * confirms availability without hedging, and creates a personal bridge to the Sound Check.
 */

export const POST_AVAILABILITY_COPY_VARIANT = "patrick_available_v2" as const;

export const POST_AVAILABILITY_PRIMARY_CTA_LABEL =
  "Reserve My Complimentary Wedding Planning Session" as const;

export const POST_AVAILABILITY_RISK_REDUCER = "45 minutes · No pressure · Just clarity" as const;

export const POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL = "Prefer email first?" as const;

/** Prefix shown on the date chip after a successful availability check. */
export const POST_AVAILABILITY_DATE_CHIP_PREFIX = "Available" as const;

export const POST_AVAILABILITY_FULL_COPY = {
  reliefHeadline: "Patrick is available on your wedding date",
  excitementBridge:
    "With your date confirmed, you can move from checking calendars to actually planning your day.",
  nextStepHeading: "What happens next",
  soundCheckExplanation:
    "Reserve a complimentary 45-minute Sound Check with Patrick: a calm conversation about your venue, vision, music, and whether Howe Sound DJ is the right fit. No pressure to decide on the call.",
  proofTransition:
    "Couples who take this step often describe the same feeling Matthew shared after his wedding:",
  identityStatement:
    "Patrick works as a calm, caring part of the wedding team, from ceremony through the reception, not just behind the decks.",
  outcomeBullets: [
    "Ceremony, cocktail hour, and reception handled seamlessly.",
    "A packed dance floor with energy that stays high all night.",
  ] as const,
} as const;

export const POST_AVAILABILITY_COMPACT_COPY = {
  reliefHeadline: "Patrick is available on your date",
  excitementBridge: "Planning can start with one conversation.",
  proofTransition: "Lauren describes that experience in three words:",
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
