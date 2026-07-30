# HSDJ Availability Success V3 — Copy Contract

**Status:** `APPROVED_FOR_IMPLEMENTATION`  
**Patrick approval date:** `2026-07-30`  
**Concept:** Human Connection  
**Variant ID:** `human_connection_v3`  
**Qualitative user validation:** `POST_IMPLEMENTATION_VALIDATION_PENDING`  
**Stephen SSOT:** `src/config/reviews.ts` → `stephen-henry`

Patrick approved this contract on 2026-07-30. Post-implementation qualitative sessions remain useful validation but are not a prerequisite to the bounded implementation.

---

## Compact / Header Panel

| Element | Governed copy | Template |
|---------|---------------|----------|
| **Confirmed bar** | `{formattedDate} is available` | `Thursday, June 15, 2028 is available` |
| **Headline** | Wonderful news. Your wedding date is available. | Fixed |
| **Bridge** | Let's see if we're a great fit for each other. | Fixed |
| **Proof context** | From a couple who worked with Patrick | Fixed |
| **Stephen quote** | We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person. | **SSOT verbatim** |
| **Attribution** | Stephen Henry | Fixed |
| **Risk reducer** | 45 minutes · No pressure · Just clarity | Fixed |
| **CTA label** | Meet Patrick | Fixed |
| **Edit action** | Edit date | Fixed |

### Removed from compact (prohibited in implementation)

- Complimentary wedding planning session (duplicate of risk reducer)
- Long bridge with venue/vision/music list (contact only)
- Sound Check terminology in compact success narrative
- Lauren/Matthew proof in success state
- Inquiry / Prefer email CTA in header panel
- Venue line on Stephen attribution
- "My wife and I" or "hang out" (two words) in quote

---

## Contact Full Surface

| Element | Governed copy |
|---------|---------------|
| **Confirmed bar** | Same as compact |
| **Headline** | Wonderful news. Your wedding date is available. |
| **Bridge** | Let's see if we're a great fit for each other. |
| **Planning session sentence** | Reserve a complimentary 45-minute planning session to talk about your wedding, your music, and whether Howe Sound DJ is the right fit. |
| **Proof context** | From a couple who worked with Patrick |
| **Stephen quote** | SSOT verbatim (same as compact) |
| **Attribution** | Stephen Henry |
| **Risk reducer** | 45 minutes · No pressure · Just clarity |
| **CTA label** | Reserve My Complimentary Wedding Planning Session |
| **Edit action** | Edit date |
| **Email fallback** | Prefer email first? (tertiary; existing behavior) |

---

## Screen Reader (unchanged authority)

**Available status (sr-only / aria-live polite):**  
`Availability check complete. {formattedDate} currently appears available.`

Plus governed API `canonicalStatusMessage` from `PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md`.

---

## Copy Alternatives Evaluated and Rejected

| Element | Alternative | Rejection reason |
|---------|-------------|------------------|
| Headline | Patrick would love to hear what you're planning. | Superseded by Patrick 2026-07-30 authorization |
| Bridge | A complimentary Sound Check is the calm next step. | Removed from compact; Sound Check not used in success narrative |
| Headline | Great news. Your date is available. | Celebrates date not couple; less emotional warmth |
| CTA | Start Planning With Patrick | Less clear Calendly = meet Patrick |
| Proof context | Here's what couples say | Generic; weaker than "couple who worked with Patrick" |

---

## Prohibited Alternates (implementation)

- "Your date looks open" / hedging availability language
- Fabricated or paraphrased Stephen quote inside quotation marks
- Countdown, urgency, scarcity, confetti copy
- Multiple competing primary CTAs in compact panel

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Final authority | Patrick | 2026-07-30 | Authorized implementation |

---

*End of V3 Copy Contract*
