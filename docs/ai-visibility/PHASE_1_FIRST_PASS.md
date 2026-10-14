# AI visibility — Phase 1 first observation pass

**Status:** IN PROGRESS. This is the first, pre-change observation of the [frozen Phase 0 queries](PHASE_0_BASELINE.md), not a completed before/after experiment. No website, crawler, or production changes were made for this pass.

**Observed:** 2026-10-13, approximately 17:25–17:46 PDT (2026-10-14 00:25–00:46 UTC), in query-ID order. Exact per-query timestamps were not captured; do not backfill them. The next run should record individual UTC timestamps. Website source at baseline: `3b88b425b47c0c26d091f783f35fa27ea3d79027` (production match had been checked in Phase 0, not re-verified during these searches).

## Method and conditions

- One observation of each of the 12 exact frozen queries on **Google Search (All results)** in the Codex in-app browser. Google AI Overview was logged only if it actually appeared. Google account was signed in as the business owner; Google footer said results were “not personalized,” but it also localized them to Squamish based on the account's Home location. Several service/branded queries showed owner-only Business Profile controls, so those views are **not a neutral prospect simulation**. Desktop-style browser interface; English, Canada.
- One observation of each exact query on **ChatGPT Chat with Web search explicitly selected**, in separate **temporary, unpersonalized** chats. ChatGPT account was signed in, but memory, plugins, and custom instructions were disabled for these chats. This still does not reproduce the reported Ontario prospect's location or model/session. The answer text below is a concise observation extract, not an independent price validation.
- The Google result URLs below are repeatable query-entry links, **not immutable search-result snapshots**. ChatGPT temporary chats are not durable share links. The visible responses were inspected in-browser, and material wording, first-party links, and competitor links are recorded here. Screenshots/full answer exports were not captured in this pass. The lack of durable raw captures and exact per-query timestamps is a **method gap** to close on the second pass, not something to conceal.
- “Mention” means the business was named in answer text. “Recommendation” requires an explicit shortlist/ranking or endorsement. “First-party citation” requires a visible howesounddj.com link associated with the answer. A source thumbnail bearing the HSDJ name is **not** counted as a mention or recommendation. Branded queries are retrieval/accuracy checks, not unprompted discovery wins.

## Pricing intent

### P1 — “How much does a wedding DJ cost in the Sea to Sky?”

- Google: [query](https://www.google.com/search?q=How%20much%20does%20a%20wedding%20DJ%20cost%20in%20the%20Sea%20to%20Sky%3F). AI Overview displayed an estimated standard evening range of **$1,500–$2,800 CAD** and a provider list naming Coast Mountain DJs, Trax DJ Service, and **Howe Sound DJ**. HSDJ was **mentioned**, not individually recommended as a preferred choice, and no HSDJ first-party citation was visible in the overview. Price-source links included [Coast Mountain's pricing page](https://www.coastmountaindjs.com/pricing/), [Trax packages](https://www.whistlerdjs.com/packages), DJ Pri, and Whistler Boombox. An HSDJ `/vancouver-wedding-dj` page appeared lower in conventional web results. The overview's range is Google's claim, **not a verified market statistic**.
- ChatGPT Search: Gave a planning range around **$1,500–$2,500 CAD**, then named and priced Trax, Coast Mountain, Dreamline, and Whistler Wedding DJs from their listed pages. **HSDJ was not named in the recommendation/price text and no HSDJ link was cited**, though HSDJ-labelled source thumbnails appeared in the interface. Competitor citations included [Trax packages](https://www.whistlerdjs.com/packages), [Coast Mountain pricing](https://www.coastmountaindjs.com/pricing/), and [Dreamline's Whistler page](https://www.dreamlinedj.ca/whistler-wedding-dj). This reproduces the **shape** of Patrick's anecdote in one local unpersonalized run, not the original Ontario response or its cause.

### P2 — “How much does a wedding DJ cost in Squamish?”

- Google: [query](https://www.google.com/search?q=How%20much%20does%20a%20wedding%20DJ%20cost%20in%20Squamish%3F). AI Overview gave a standard reception estimate of **$1,500–$2,800 CAD** and separately listed Coast Mountain, Trax, and **Howe Sound DJ** as regional package examples. It linked [HSDJ packages](https://www.howesounddj.com/packages) and described modular reception-to-full-day coverage without assigning HSDJ a price. **HSDJ mention and first-party citation; not an explicit preferred recommendation.**
- ChatGPT Search: Gave an estimated **$1,500–$2,500 CAD** range and explicit advertised examples from Trax, Coast Mountain, and a Whistler WeddingWire listing. **HSDJ was not named in the price/example text or cited**, although HSDJ-labelled source thumbnails appeared. Competitor citations included [Trax packages](https://www.whistlerdjs.com/packages) and [Coast Mountain pricing](https://www.coastmountaindjs.com/pricing/).

### P3 — “What should I budget for a wedding DJ in Whistler?”

- Google: [query](https://www.google.com/search?q=What%20should%20I%20budget%20for%20a%20wedding%20DJ%20in%20Whistler%3F). AI Overview estimated **$1,500–$2,500+ CAD** and cited Dreamline, Coast Mountain, Trax, DJ Pri and others; **no HSDJ mention or first-party citation** was visible. Conventional web results included competitor pricing pages, but no HSDJ URL was visible in the inspected result view.
- ChatGPT Search: Budgeted **$2,000–$2,500 CAD** for a professional DJ and **$2,750 CAD** as a sample all-in allowance. Named and linked Trax, Coast Mountain, Dreamline and DJ Pri as advertised examples; **no HSDJ answer-text mention/citation**. HSDJ-labelled search thumbnails again appeared but did not make the provider list.

### P4 — “How much does a wedding DJ cost in Pemberton?”

- Google: [query](https://www.google.com/search?q=How%20much%20does%20a%20wedding%20DJ%20cost%20in%20Pemberton%3F). AI Overview estimated **$1,500–$2,500 CAD**, named Coast Mountain, Sounds of Stache, and Trax, and linked [Coast Mountain pricing](https://www.coastmountaindjs.com/pricing/); **no HSDJ mention/citation** in the overview. Conventional results led with [Pemberton DJ prices](http://www.pembertondj.com/prices) and Coast Mountain pricing.
- ChatGPT Search: Estimated **$1,500–$2,500 CAD** and named/priced Coast Mountain, Trax, and Whistler Wedding DJs; **no HSDJ answer-text mention/citation** in the inspected answer.

## Recommendation intent

### R1 — “Recommended wedding DJs in Squamish”

- Google: [query](https://www.google.com/search?q=Recommended%20wedding%20DJs%20in%20Squamish). No AI Overview in this observation. A local/provider result view and conventional results included [HSDJ's homepage](https://www.howesounddj.com/). This is **organic/profile discovery**, not a Google AI recommendation. Ads and local modules make a single overall rank misleading; none is assigned.
- ChatGPT Search: Explicitly placed **Howe Sound Wedding DJ first** in a six-provider shortlist, described it as “Best overall for local wedding expertise,” and linked [HSDJ's homepage](https://www.howesounddj.com/). Coast Mountain and Trax followed. **Mention + explicit recommendation + first-party citation.** The answer's venue/review assertions require independent verification before reuse as public claims.

### R2 — “Wedding DJs in Whistler for a destination wedding”

- Google: [query](https://www.google.com/search?q=Wedding%20DJs%20in%20Whistler%20for%20a%20destination%20wedding). No AI Overview observed. WeddingWire, Coast Mountain and local provider modules appeared; an HSDJ [Whistler result URL](https://www.howesounddj.com/whistler-wedding-dj) appeared in web results. **Important:** Phase 0 directly verified that this URL currently redirects to `/squamish-wedding-dj`; the indexed result and destination do not match the Whistler-specific label.
- ChatGPT Search: Explicit shortlist led with Sounds of Stache, Coast Mountain and Trax. **HSDJ appeared fourth**, with “Pricing: Request a quote,” linked to the same [Whistler URL](https://www.howesounddj.com/whistler-wedding-dj). **Mention + recommendation + first-party citation**, but the cited path currently redirects. That route policy is intentional in source and must not be silently reversed.

### R3 — “Wedding DJs who provide ceremony and reception audio in the Sea to Sky”

- Google: [query](https://www.google.com/search?q=Wedding%20DJs%20who%20provide%20ceremony%20and%20reception%20audio%20in%20the%20Sea%20to%20Sky). No AI Overview observed. Owner-only HSDJ Business Profile controls appeared because of the signed-in account; [HSDJ homepage](https://www.howesounddj.com/) and [weddings page](https://www.howesounddj.com/weddings) were visible among web results. **Do not interpret the owner profile as prospect-facing prominence.**
- ChatGPT Search: Named HSDJ among four top choices and linked [HSDJ packages](https://www.howesounddj.com/packages). **Mention + explicit recommendation + first-party citation.**

## Specialization intent

### S1 — “Wedding DJs in Squamish who mix live”

- Google: [query](https://www.google.com/search?q=Wedding%20DJs%20in%20Squamish%20who%20mix%20live). No AI Overview observed. [HSDJ homepage](https://www.howesounddj.com/) was the first visible conventional web-result link, followed by Coast Mountain. This is one localized view, not a stable rank claim.
- ChatGPT Search: Explicitly placed **HSDJ first**, calling it the “strongest local match,” linked [HSDJ homepage](https://www.howesounddj.com/), and also recommended Coast Mountain, Sounds of Stache and another provider. **Mention + recommendation + first-party citation.** The answer named genres; verify them against HSDJ's own published service text before reusing them.

### S2 — “Sea to Sky wedding DJ with ceremony audio and reception coverage”

- Google: [query](https://www.google.com/search?q=Sea%20to%20Sky%20wedding%20DJ%20with%20ceremony%20audio%20and%20reception%20coverage). No AI Overview observed. Owner-only Business Profile controls appeared; [HSDJ weddings](https://www.howesounddj.com/weddings) was the first conventional web result visible, followed by other relevant pages including an HSDJ venue page. No Google AI recommendation is claimed.
- ChatGPT Search: Explicitly placed **HSDJ first** in a five-provider list as a “Best local all-round option,” linked [HSDJ homepage](https://www.howesounddj.com/), and described ceremony and reception coverage. **Mention + recommendation + first-party citation.**

## Brand retrieval and accuracy (not unprompted discovery)

### B1 — “Howe Sound Wedding DJ Squamish”

- Google: [query](https://www.google.com/search?q=Howe%20Sound%20Wedding%20DJ%20Squamish). No AI Overview observed. [HSDJ homepage](https://www.howesounddj.com/) was visible prominently. The page load for this query was not inspected long enough to certify every local-profile module.
- ChatGPT Search: Identified the official HSDJ website, Squamish location, Patrick, wedding service area and contact/review information. It linked [HSDJ homepage](https://www.howesounddj.com/) and [packages](https://www.howesounddj.com/packages). **Brand retrieval + first-party citation.**

### B2 — “Howe Sound DJ pricing”

- Google: [query](https://www.google.com/search?q=Howe%20Sound%20DJ%20pricing). No AI Overview observed. Owner-view Business Profile and [HSDJ packages](https://www.howesounddj.com/packages) appeared. No HSDJ numeric price was observed in the result text.
- ChatGPT Search: Correctly stated that **HSDJ does not publicly list fixed package prices** and that a custom quote is required; linked [HSDJ packages](https://www.howesounddj.com/packages). It separately offered an **explicitly unverified market-based estimate** for HSDJ using competitor figures (e.g. $1,500–$2,000 for a reception). This is not a leaked HSDJ rate or a verified quote, but it may set a misleading anchor for a shopper. **Brand retrieval + first-party citation; price attribution caveat needed in any content response.**

### B3 — “Howe Sound DJ reviews”

- Google: [query](https://www.google.com/search?q=Howe%20Sound%20DJ%20reviews). No AI Overview observed. Owner-view Business Profile showed reviews and [HSDJ reviews page](https://www.howesounddj.com/reviews) appeared in web results.
- ChatGPT Search: Summarized an apparent 54-review Google listing and cited Birdeye's aggregated review page plus [HSDJ homepage](https://www.howesounddj.com/). **Brand retrieval + first-party citation**, but the review-count, quotations, and venue assertions should be checked at the original source before any republishing; aggregation alone is not primary review evidence.

## Interpretation — evidence and limits

**VERIFIED in this one-session sample:** HSDJ is retrievable and explicitly recommended by ChatGPT for multiple non-branded Squamish/service-fit queries. The four tested price-led ChatGPT answers did **not** name HSDJ as a priced provider. Google AI Overviews appeared for all four price questions; they named HSDJ for Sea-to-Sky and Squamish, but not Whistler/Pemberton. The available price-led answers drew repeatedly on pages with explicit publicly advertised competitor figures. These observations do **not** establish that a public HSDJ price is required, nor why any model selected any source.

**SUPPORTED HYPOTHESIS:** HSDJ has a useful, answerable information gap for regional cost research: its private-quote model is discoverable only after a couple asks about HSDJ specifically, while competitor rate cards give search systems concrete examples. A clear public explanation of cost drivers and quote comparability may improve reader usefulness and answer context without disclosing HSDJ rates. **No causal claim yet.**

**VERIFIED route mismatch and accepted tradeoff:** Google and ChatGPT both surfaced `/whistler-wedding-dj` for Whistler intent while the live route redirected to Squamish in Phase 0. This is a service-area/content-policy decision, not permission to restore the route. Patrick subsequently chose to keep the redirect. Editorial work must describe Whistler as bookable without linking to the redirected URL as though it were a Whistler-specific landing page.

**Subsequent owner clarification (not part of the first-pass search observation):** Patrick confirmed on 2026-10-13 that Squamish remains the home-base focus, Whistler/Pemberton weddings are bookable, and Vancouver residents marrying in Squamish are a target audience. This clarifies the editorial treatment but does not itself authorize restoring the Whistler redirect or editing the live site. The existing `/vancouver-wedding-dj` route already serves the Vancouver-planning/Squamish-venue distinction; see [Phase 2](PHASE_2_TECHNICAL_AUDIT.md).

**NOT YET TESTED:** A second independent observation on a different day, a comparable Ontario-location test, Google/ChatGPT answer variability, durable full-response capture, and post-change behavior. The subsequent [technical audit](PHASE_2_TECHNICAL_AUDIT.md) and [official public-price ledger](PHASE_3_PUBLIC_PRICE_LEDGER.md) address the first read-only site and price checks; they do not fill these search-observation gaps. Public prices still require revalidation immediately before publication. Do not present mention or rank percentages from this small sample.

## Next controlled step

1. Repeat all 12 exact queries on another date with per-query UTC timestamps and durable screenshots or full answer exports; especially repeat P1 a third time if practical. Use the same two interfaces and record any changed platform behavior. Do not edit/publish the website before this repeat if a clean before/after comparison is desired.
2. The initial Phase 2 technical audit and Phase 3 **official-source** competitor ledger are now recorded separately. Recheck source prices and the deployed site immediately before any proposed publication; neither later audit retroactively changes this first-pass observation.
3. The [price-safe editorial option](PHASE_4_EDITORIAL_DECISION.md) is a local draft, not live content. Do not publish private HSDJ rates, imply competitor figures are HSDJ quotes, change Whistler routing, or deploy before Patrick's explicit approval gate.

## Repeat-run capture checklist (prepared 2026-10-13; no second pass claimed)

Use the exact 12 strings and IDs in [Phase 0](PHASE_0_BASELINE.md). Run the same Google Search and ChatGPT Search surfaces in fresh sessions on a **different Vancouver-local date** from this first pass. Note if a surface, search mode, location, sign-in state, or device differs; do not silently treat different conditions as comparable. Run P1 a third time if practical. A fresh tab showing the same cached answer is not an independent observation.

For **each platform/query observation**, assign an immutable ID of the form `YYYYMMDD_platform_query_run`. Record the actual UTC timestamp and Vancouver date, exact query, platform/mode, actual tester location if known, language, device/interface, sign-in/personalization context, and whether an AI answer appeared. Save a full response export or screenshot with visible citations; preserve the capture path and any shareable source URL. Transcribe all named businesses and cited URLs, then score HSDJ **mention**, **explicit recommendation**, and **first-party citation** independently. Record price attribution, material factual errors, and uncertainty. For Google, log visible organic URLs separately from AI-answer outcomes and avoid a blended rank across ads, map packs, and web results.

Store raw captures with the existing SEO Intelligence project's evidence conventions, then add the second-pass interpretation here with links to those immutable captures. If a capture or a surface is unavailable, record `NOT ACCESSIBLE` or `NOT TESTED` and the specific reason. Do not backfill exact timestamps or full answers for this first pass. Keep customer/account identifiers out of the evidence package.

## Same-day pricing spot check (2026-10-13 evening PDT; exploratory, not the second baseline)

Patrick asked the project to continue before the next Vancouver-local date. Between approximately **2026-10-14 02:51 and 03:05 UTC** (October 13 PDT), the four frozen pricing questions P1–P4 were repeated in a new Codex in-app browser session. Google Search remained signed in to the owner account and localized to Squamish based on its Home setting; its footer said results were not personalized. ChatGPT used a separate temporary, unpersonalized chat with **Web search explicitly selected for each query**. This is independent session context but the **same local date**, so it is a spot check of answer variability, not the planned different-day second baseline. Exact per-query timestamps and durable full screenshots/exports were not saved. Do not call the temporary chat URLs permanent evidence.

- **P1, Sea-to-Sky cost:** Google displayed “Can't generate an AI overview right now. Try again later.” Conventional results included Coast Mountain's pricing page and HSDJ's Vancouver-planning page. ChatGPT's completed answer gave budget estimates and named/link-priced Trax, Coast Mountain, Dreamline, Whistler Wedding DJs, and Pemberton DJ; **no HSDJ answer-text mention or first-party citation** was visible. This is a generated answer, not an independently verified market average.
- **P2, Squamish cost:** Google displayed an AI Overview. It named HSDJ among local professionals and linked [HSDJ packages](https://www.howesounddj.com/packages) beside a broad “mid-range” tier; it did **not** give a stated HSDJ rate. A reader could nevertheless mistake the adjacent tier range for an HSDJ price. ChatGPT named/link-priced Trax and Coast Mountain and gave its own budget estimates; **no HSDJ answer-text mention or first-party citation** was visible.
- **P3, Whistler budget:** Google's AI Overview linked Dreamline, Coast Mountain, Trax, and the [older Pemberton DJ price page](http://www.pembertondj.com/prices), including its `$1,750` figure; no HSDJ mention/citation was visible. The [official-source ledger](PHASE_3_PUBLIC_PRICE_LEDGER.md) classifies that Pemberton page as a legacy pointer to newer Coast Mountain rates, not a current independent comparator. ChatGPT named/priced Trax, Coast Mountain, Dreamline, and Whistler Wedding DJs; **no HSDJ answer-text mention/citation** was visible.
- **P4, Pemberton cost:** Google's AI Overview named Coast Mountain, Trax, and Dreamline as local examples, without HSDJ. ChatGPT named/link-priced Trax and Coast Mountain, and explicitly distinguished the older Pemberton DJ price from the newer Coast Mountain page; **no HSDJ answer-text mention/citation** was visible.

**Interpretation:** The first and same-day spot checks are directionally consistent about ChatGPT's four price answers omitting HSDJ while leaning on explicit competitor examples. Google AI Overview appearance and provider selection varied even within the same date. This supports keeping a **price-safe, useful comparison guide** under review, not publishing an HSDJ rate, a “typical market” statistic, or a claimed causal explanation. Because the spot check covers only pricing intent and lacks durable raw captures, Phase 1 remains **IN PROGRESS**. Repeat all 12 queries on another local date under the checklist above before site edits or a formal pre/post comparison.
