# AI visibility — Phase 5 local implementation specification

**Status:** LOCAL REVIEW DRAFT IMPLEMENTED, **NOT APPROVED FOR PUBLICATION**. Prepared 2026-10-13. The independent different-day [Phase 1 observation](PHASE_1_FIRST_PASS.md) is still required before any publication. The October 13 same-day pricing spot check was exploratory, not the second baseline. No production deployment, crawler policy, Search Console setting, redirect, or HSDJ rate was changed.

## Decision architecture

1. **Squamish-first footprint:** Patrick confirmed on 2026-10-13 that HSDJ is based in and focused on Squamish, while Whistler/Pemberton weddings are bookable. Correct the existing FAQ's Squamish-only implication. Avoid promising travel/inclusions not in an individual quote.
2. **Vancouver is a planning-origin audience:** `src/app/vancouver-wedding-dj/page.tsx` already targets Vancouver residents marrying in Squamish. Keep one canonical page for that job. It should explain why hiring a Squamish-based DJ is useful to a Vancouver couple; it should not claim HSDJ seeks weddings *held* in Vancouver. GSC baseline is 221 Web impressions, one click and 12 Google generative-AI feature impressions in 2026-07-12 to 2026-10-11. Those are distinct metrics, not proof of inquiry demand.
3. **Whistler/Pemberton:** Patrick explicitly chose to keep the current Whistler-to-Squamish redirect despite the Whistler-result/destination mismatch. Do not change it in this implementation. No distinct Pemberton route is established; do not add a thin location page. A broad `areaServed` schema change is not a substitute for clear visible copy.
4. **Regional cost research:** The [Phase 4 guide draft](PHASE_4_EDITORIAL_DECISION.md) is the only proposed new page, with a distinct comparison job and no HSDJ prices. Patrick approved the approach of two named, linked third-party public-price examples; they still need publication-day source checks, exact-copy approval and a maintenance owner.

## Local reviewable implementation and remaining gates

| Area | Candidate path | Change to prepare locally | Gate |
| --- | --- | --- | --- |
| Service-area answer | `src/app/faq/page.tsx` | Replace the `Where do you DJ weddings?` answer with Squamish-first, Whistler/Pemberton-bookable wording; retain individualized travel terms. Review matching FAQ JSON-LD generated from visible text. | Patrick reviews exact wording. |
| Vancouver audience | `src/app/vancouver-wedding-dj/page.tsx` and, only if needed, `src/app/vancouver-wedding-dj/vancouver-route.css` | Audit extractable on-page answer, headline and CTA clarity before proposing a narrowly targeted text improvement. Existing route, metadata, and links already serve the concept; **no duplicate route**. | Demonstrate a real reader-usefulness improvement, not a keyword-count change. |
| Cost guide | Existing `src/app/guides/` conventions, route file and sitemap only after approval | Build the source-linked, date-stamped guide from Phase 4 with visible HTML text, correct canonical/metadata and internal links from packages/FAQ. | Final prices, scope, currency caveats, exact-copy review and publication sign-off. |
| Venue crawl lag | Venue/story routes and internal links only if read-only comparator inspection finds a concrete issue | Fix the smallest confirmed discoverability or content defect; otherwise monitor. | Evidence of cause; do not bulk-request indexing. |

Local work now includes the FAQ service-area answer, a source-linked cost guide using the existing editorial template, and internal links from FAQ/packages/guides plus a sitemap entry. Installed Next.js page, metadata, CSS, and sitemap guides were read before editing. Typecheck, 154 unit tests, production build, lint on changed code, and 35 targeted browser tests (including 320/390/768/1440 px containment for the guide and guides hub) pass. This is **not** a release. The unrelated modified `tests/about-internal-link-promotion.test.ts` remains untouched. The exact public copy, third-party prices, links, article date, and sitemap inclusion all stay behind Patrick's publication approval.

## Acceptance and verification

- The second search/AI baseline is preserved with exact query, per-run time, locale, interface, results/citations, and durable capture; no post-edit observation is mislabeled pre-change.
- Public service copy passes the simple reading test: *Squamish is home base; Whistler/Pemberton may be booked; Vancouver residents planning a Squamish wedding can work with a DJ already local to the venue.* No page implies HSDJ has a Vancouver base.
- Existing availability check and consult paths remain intact. Do not introduce a new form or event name for this visibility project. Keep completed date checks, consults and bookings separate in HSDJ_SEO_Intelligence/Operations.
- Any guide has first-party, visible text; public third-party figures are directly linked, clearly dated and scoped, not represented as HSDJ quotes or a market average. No HSDJ confidential price or unsupported schema is exposed.
- Locally review diff, typecheck/build, links, canonical/metadata, semantic headings, mobile rendering, and FAQ visible text versus generated structured data. After *approved* publication, check live route/redirect/robots/sitemap and key user journeys, then measure at 14/30/60/90 days as the brief defines.

## Rollback and approval

Keep changes as a reviewable local diff/commit so an individual content route or FAQ statement can be reverted without touching the booking flow. The current package does **not** authorize production deployment, public guide publication, redirect restoration, crawler-policy changes, or confidential-rate disclosure. Patrick's explicit approval is required for the final public copy and exact scope.
