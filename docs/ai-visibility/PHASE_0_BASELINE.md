# AI visibility — Phase 0 preflight and frozen test plan

**Status:** Phase 0 complete for the available evidence; original anecdotal response not preserved. No AI-search tests, pricing research, website implementation, or publication have been performed under this brief yet.

**Frozen:** 2026-10-13, America/Vancouver (approximately 17:15 PDT). This record is a pre-change reference, not a claim about AI rankings. The controlling brief is [`docs/HSDJ AI Visibility.txt`](../HSDJ%20AI%20Visibility.txt).

## 1. Starting observation and limits

Patrick reported that a person in Ontario asked ChatGPT, “How much does a wedding DJ cost in the Sea to Sky?” and saw Coast Mountain DJs and Trax DJ Services mentioned, without Howe Sound DJ. We do not yet have the original response, its exact citations, timestamp, model/search mode, or session context. **Classification: UNVERIFIED anecdote.** Its absence is not proof of a sustained visibility problem, and competitor pricing is only a hypothesis about why those businesses appeared. If Patrick supplies the original response later, append it as evidence without changing the frozen query set below.

The Ontario geographic context cannot be reproduced merely by adding “Ontario” to a query. Phase 1 will record the actual tester location and interface context. It will not claim an Ontario-versus-BC comparison unless controlled tests from both locations are available.

## 2. Versions and existing intelligence

| Surface | Phase 0 observation | Evidence / limit |
| --- | --- | --- |
| Website source | `3b88b425b47c0c26d091f783f35fa27ea3d79027` | Local `git rev-parse HEAD`, 2026-10-13. The same short commit was verified as a Ready production deployment earlier on 2026-10-13; production version should be rechecked immediately before any later publication. |
| Live website | Homepage rendered at `https://www.howesounddj.com/` in a direct browser visit on 2026-10-13. `/whistler-wedding-dj` redirected to `/squamish-wedding-dj` in a direct browser visit. | Browser observation; see route policy below. This is not a full crawl or technical audit. |
| SEO Intelligence source | `798ba5ee4fe6c41a6130d3fb2bf7a997ac13e5ab` | Local `git rev-parse HEAD`. Existing project: `/Users/patrickmallan/Developer/HSDJ_SEO_Intelligence`. |
| Operations source | `dd4dd3ecd69b6b72aa01d8cf43aa825c78172083` | Local `git rev-parse HEAD`. Existing project: `/Users/patrickmallan/Developer/HSDJ_Operations`. |
| Search Console report | Generated 2026-10-13 16:31 UTC for 2026-09-13 through 2026-10-10: 37 clicks, 472 impressions. | SEO Intelligence `data/latest/seo_summary.json`. This is a site-wide report, not a baseline for the frozen AI query set. |
| GA4 report | Same 28-day window; `HISTORIC_ENGAGEMENT_CONTAMINATION`, `usable_for_behavioral_analysis: false`. | `data/latest/ga4_summary.json` and `business_intelligence_summary.json`. Do not use these historic engagement rates as a clean before/after comparator. The corrected key-event era begins 2026-10-13 17:20 UTC in `config/ga4_measurement_eras.json`. |
| Availability journeys | Generated 2026-10-13 17:11 UTC: 26 raw checks, 22 complete, 4 missing completion, 0 explicitly marked test checks, 3 scheduled consults; all three currently at `CONSULT_SCHEDULED`. | `data/latest/availability_journey_summary.json`. This is funnel context, not AI-search attribution. It cannot establish unique couples or bookings. |
| Generated site inventory | Last generated 2026-09-02 UTC; records 17 static paths and 13 active venue paths. | SEO Intelligence `config/site-inventory.generated.yaml`. It is dated; its 13 active venues match current source, but regenerate before Phase 2 audit or after route changes. Do not treat its timestamp as a live crawl. |

The website working tree already contains an unrelated modified test (`tests/about-internal-link-promotion.test.ts`), and the AI Visibility brief is untracked. Preserve them. This Phase 0 file is also local/unpublished until deliberately committed.

## 3. Verified page and route inventory

Source inventory comes from `src/app/sitemap.ts`, `src/config/venue-pages.ts`, `next.config.ts`, and route files. The sitemap source defines **17 static paths plus 13 active venue paths**. This is an implementation inventory, not proof that every URL is indexed or currently served successfully.

| Role | Existing paths |
| --- | --- |
| Core | `/`, `/weddings`, `/packages`, `/reviews`, `/faq`, `/about`, `/contact` |
| Regional | `/squamish-wedding-dj`, `/vancouver-wedding-dj` |
| Venues | `/venues` and 13 active `/venues/[slug]` routes |
| Guides | `/guides`, `/guides/how-to-choose-a-wedding-dj-in-squamish`, `/guides/how-to-keep-a-wedding-dance-floor-packed` |
| Stories | `/stories` and three story routes listed in `src/app/sitemap.ts` |

**Important positioning decision to investigate, not “fix” by assumption:** The source still contains a `/whistler-wedding-dj` page file and 20 venue entries, but `next.config.ts` deliberately redirects `/whistler-wedding-dj` and seven out-of-area venue URLs to `/squamish-wedding-dj`. `ACTIVE_VENUE_PAGES` filters those seven from the 13 active venue pages. The live Whistler URL redirected as configured. The brief names Whistler and Pemberton as markets, while the current navigation and redirects are Squamish-first. Confirm the intended service-area and content policy with Patrick before recommending Whistler-specific pages, claims, or reversal of redirects. Research into regional customer questions can proceed without changing that policy.

The live `/packages` page describes wedding coverage and personalized written quotes; a dedicated wedding-DJ cost/pricing guide was **not found in the current route inventory**. This is an inventory observation, not yet an information-gap finding. Phase 2 must inspect existing page text and live indexability before proposing a new URL.

`src/app/robots.ts` and `src/app/sitemap.ts` exist. Their content is reserved for the Phase 2 deployed-site audit; this Phase 0 inventory does not certify crawler access or sitemap health.

## 4. Named competitor identity check

Both named businesses have a directly accessible self-identified official website, verified 2026-10-13:

* **Coast Mountain DJs:** [coastmountaindjs.com](https://www.coastmountaindjs.com/) identifies the business and says it operates in Pemberton, Whistler, and Squamish. Its site has a Pricing navigation item. We have **not** verified current prices or package comparability in Phase 0.
* **Trax DJ Services / Trax mobile DJs:** [whistlerdjs.com](https://www.whistlerdjs.com/) identifies “Trax DJ Services,” “trax mobile DJs,” and service in Whistler, Squamish, and Pemberton. It has a Packages navigation item. We have **not** verified current prices or package comparability in Phase 0.

These official pages verify identity and relevance only. The alleged appearance in the original ChatGPT response remains unverified without that response. Do not infer that their public prices caused any AI answer.

## 5. Frozen Phase 1 query set

Use the exact strings below as the **core** test set. Additional exploratory queries may be logged separately, never substituted into before/after comparisons. Preserve punctuation and capitalization where practical. The first string intentionally matches Patrick's reported wording; variants may be exploratory.

| ID | Intent | Exact query |
| --- | --- | --- |
| P1 | Pricing | How much does a wedding DJ cost in the Sea to Sky? |
| P2 | Pricing | How much does a wedding DJ cost in Squamish? |
| P3 | Pricing | What should I budget for a wedding DJ in Whistler? |
| P4 | Pricing | How much does a wedding DJ cost in Pemberton? |
| R1 | Recommendation | Recommended wedding DJs in Squamish |
| R2 | Recommendation | Wedding DJs in Whistler for a destination wedding |
| R3 | Recommendation | Wedding DJs who provide ceremony and reception audio in the Sea to Sky |
| S1 | Specialization | Wedding DJs in Squamish who mix live |
| S2 | Specialization | Sea to Sky wedding DJ with ceremony audio and reception coverage |
| B1 | Brand | Howe Sound Wedding DJ Squamish |
| B2 | Brand | Howe Sound DJ pricing |
| B3 | Brand | Howe Sound DJ reviews |

S1 and S2 reflect claims visible in HSDJ's current homepage and packages page, but Phase 2 must still verify the exact service language before using them as public differentiators. Do not treat brand prompts as discovery wins: they measure retrieval and accuracy when HSDJ is named.

## 6. Frozen observation protocol

**Surfaces:** Standard Google Search results; Google AI Overviews only when actually displayed; ChatGPT with Search explicitly enabled, if accessible. Record any other platform as exploratory unless a repeatable method is defined first. Use ordinary manual interactions or a platform-supported API; no bulk scraping or terms-bypassing automation.

**Runs:** For each core query on each accessible primary surface, collect two independent observations on different dates or in fresh sessions. For P1, collect a third observation if practical because it is the triggering question. The plan is a sampling target, not permission to fabricate missing runs or to call two screenshots from one response independent. If time, access, or product behavior prevents a run, mark it NOT ACCESSIBLE or NOT TESTED with the reason. Do not create misleading percentages from tiny samples.

**Record per run:** UTC timestamp and Vancouver local date; exact query; platform and search mode; language, actual geographic context if known, device/interface, logged-in/personalization state where visible; response text or screenshot; first-party and third-party cited URLs; all businesses mentioned; whether HSDJ was mentioned, explicitly recommended, or cited; whether price was given and to whom it was attributed; factual errors; and observer notes. For standard Google results, record the visible organic URLs and position only in that particular result view, separately from AI mention/recommendation/citation fields. A response mentioning HSDJ but citing only a competitor is a mention, **not** an HSDJ citation. An answer describing HSDJ only because the prompt contains its name is a brand retrieval check, **not** unprompted recommendation.

**Storage:** Keep raw observations with immutable IDs (`date_platform_query_run`) and a separate concise interpretation. Link evidence URLs directly. Do not store private user queries, account identifiers, or unrelated browsing data. Reuse the existing SEO Intelligence project's report conventions rather than create a second analytics system. The first interpretation must say which platforms were actually tested and which were not.

**Comparison:** Freeze this plan and the website version before Phase 1. After any approved publication, rerun the same core strings under comparable conditions. Platform changes, location, personalization, retrieval variability, and small samples are limitations; temporal change alone is not proof of causation.

## 7. Deliverable routing and next actions

The canonical analytical home is the existing HSDJ_SEO_Intelligence project; website changes, if later approved, belong in the website repository. This local Phase 0 record is the handoff because the governing brief lives in the website repository. Avoid duplicating source ledgers or dashboards across both projects. Subsequent deliverables should link back here or supersede it explicitly.

1. **Phase 1:** Execute and archive the frozen search/AI baseline, then interpret with uncertainty. Do not edit the website during the baseline.
2. **Phase 2:** Refresh site inventory, audit the deployed technical state and content, and reconcile the Squamish-first routing with intended service geography.
3. **Phase 3:** Verify current competitor prices and package terms from primary sources before drafting any market-level claim.
4. **Owner input, useful but not blocking Phase 1:** Provide the original ChatGPT response/screenshot if available. Confirm whether current Squamish-first redirects intentionally supersede Whistler/Pemberton service-page ambitions before content strategy is chosen.

No approval to publish, change crawler policy, disclose HSDJ prices, or modify production has been inferred from starting Phase 0.
