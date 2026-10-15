# AI visibility — Phase 4 editorial decision and review draft

**Status:** NARROW GUIDE-AND-FAQ PACKAGE APPROVED TO PROCEED on 2026-10-14; **not yet published**. Patrick has confirmed the service footprint: Squamish-first; Whistler/Pemberton weddings bookable; Vancouver residents marrying in Squamish are a priority audience. He approved the *approach* of naming/linking two publicly priced competitors with dates and caveats, chose to keep the existing Whistler redirect, and then asked to proceed with the proposed publication package. The local guide route and FAQ correction are prepared. The [different-day second query pass](PHASE_1_SECOND_PASS.md) and official-price rechecks are recorded; historical raw-response gaps remain disclosed. A clean deploy boundary, connected deployment capability, and publication-date update remain before release.

## Decision: a narrow research guide, not a rate card

**RECOMMENDATION:** Prepare one focused guide answering “What does a wedding DJ cost in the Sea-to-Sky?” and link it naturally from `/packages` and the relevant FAQ. The existing packages page is a service/quotation page; forcing all regional price-comparison detail into it would dilute the inquiry path. A separate guide has a distinct research job and should not repeat package marketing. It must not create an HSDJ price list or a claim that a few advertised packages represent a typical regional rate.

**Why now:** The first-pass ChatGPT Search price answers omitted HSDJ from answer text while service-fit answers recommended it; `/packages` gives quote factors but not a direct comparison framework; official public competitor pages supply comparable *examples* with crucial scope differences. These are reasons to improve usefulness, **not proof of a retrieval algorithm or future citation gain**. The page would be useful even if no AI system cites it.

**Public comparison stance — approach approved 2026-10-13; proposed package advanced 2026-10-14:** Give carefully dated, source-linked examples as examples, not a “market range.” Patrick accepted the tradeoff of two named, linked competitor prices and asked to proceed with this narrow package. Recheck the official offers immediately before release; if either cannot be verified, omit that example rather than substitute an unattributed figure.

## Proposed information architecture

- **Working URL:** `/guides/sea-to-sky-wedding-dj-cost` (local route prepared; not published). Existing `/guides` structure is already in the sitemap. Use Squamish-first language while acknowledging actual Whistler/Pemberton bookings; do not imply a wedding held in Vancouver is the same trip or quote.
- **Title:** `What Does a Sea-to-Sky Wedding DJ Cost? | Howe Sound DJ`
- **Meta description:** `Compare wedding DJ quotes in the Sea-to-Sky without confusing dinner-and-dance coverage with ceremony-to-last-song sound. See dated public examples and the details that change a quote.`
- **H1:** `What does a wedding DJ cost in the Sea-to-Sky?`
- **Suggested H2s:** `Start with what the quote covers`; `Published examples, with the fine print`; `Why two weddings can need different sound`; `What to ask before you compare quotes`; `How I build a quote`.
- **Links:** From `/packages`, one descriptive research link near the customized-quote explanation; optionally from a pricing FAQ entry. From the guide back to `/packages`, `/weddings`, and existing check-date/inquiry path. Do not interrupt the conversion flow with an extra form.
- **Schema:** Article/BreadcrumbList only if the implemented page warrants them and the visible author/date/breadcrumb facts match; no Offer, AggregateRating, pricing, or FAQ rich-result markup invented for this project.
- **Design/accessibility:** Use the existing guide template, H1 system, mobile spacing, contrast, and semantic text. Keep the cost answer in visible HTML text, not a picture or interactive-only widget. Price examples, sources, and dates must remain legible at mobile width. Do not add a new visual system.

## Review draft — proposed on-page copy

> # What does a wedding DJ cost in the Sea-to-Sky?
>
> There isn't one honest sticker price for every wedding up here. A six-hour dinner-and-dance booking and a day that needs ceremony sound, speeches, music in a second space, and a late finish are different jobs. When you see a number, start with **what it covers**.
>
> ## Start with what the quote covers
>
> Ask where the DJ's time starts and ends. Is the ceremony included, or is it a separate sound setup? Will guests hear the vows clearly? Is there a microphone ready for speeches? Does the cocktail space need its own speaker? Does the person you meet do the work on the day? The answers matter more than comparing two headline prices.
>
> ## Published examples, with the fine print
>
> These are **other providers' publicly advertised examples, checked 14 October 2026**. They are not Howe Sound DJ prices, quotes, or a Sea-to-Sky average. Their pages show `$` amounts but do not clearly state a currency code beside the prices; confirm currency, tax, travel and the full scope with each provider before treating any figure as a final cost.
>
> - [Trax DJ Services](https://www.whistlerdjs.com/packages) advertises a **promotional $1,495** six-hour dinner-and-dance wedding package. Its eight-hour package including ceremony, cocktails, dinner and dance is shown at **$1,995**. Those two figures do not buy the same coverage; the sale end date was not stated on the page we checked.
> - [Coast Mountain DJs](https://www.coastmountaindjs.com/pricing/) advertises a **$1,990** six-hour wedding package and lists **ceremony sound separately at $500**. Cocktail music and extra DJ time are also listed separately. Check the full quote before comparing its six hours with another provider's ceremony-through-reception package.
>
> Those are selected posted offers, not a representative survey. I would rather show you what is behind a quote than pretend they add up to one tidy “going rate.”
>
> ## Why two weddings can need different sound
>
> A single room is one thing. A ceremony outside and a reception inside can mean a second sound setup, a different microphone plan, and time to move or test gear without making your guests wait. Length of coverage, load-in, venue access, travel, and the number of spaces all change the work. Your music choices matter too: ceremony cues, dinner atmosphere, the songs you love, and the ones your people will lose it to all deserve planning time.

> I'm based in Squamish and also book weddings in Whistler and Pemberton. If you're planning a Squamish wedding from Vancouver, we can make the music decisions from home; I'm already local to the celebration. The venue and travel details still belong in your individual quote.
>
> ## What to ask before you compare quotes
>
> Ask each DJ to spell out the hours, ceremony and speech microphones, separate sound zones, setup and teardown, lighting, travel, taxes, extra-hour rates, and who will actually DJ. Then compare the same day, not just the first number on two different pages.
>
> ## How I build a quote
>
> At Howe Sound Wedding DJ, I put together a written quote around **your** day rather than posting a one-size-fits-all wedding rate. Tell me the date, venue, ceremony and reception plan, and how long you want the music to run. I'll help work out the sound the day needs and make the coverage clear. [See how my wedding coverage works](/packages), or [check your date](/contact#availability) to start the conversation.

**Release caveats:** The live `/contact#availability` destination was checked 2026-10-14 and shows the date form under the `availability` anchor; do not submit a test date as part of this content review. Ceremony microphones, separate sound zones, lighting, travel, and staffing are described as **questions/quote factors**, not universal HSDJ inclusions. The copy avoids promising an HSDJ price and makes no market-average claim. Recheck both official competitor pages and currency at publication.

## Maintenance and measurement

- **Owner:** Patrick or a named HSDJ site editor (assign at approval). **Review:** within 90 days of publication and every 90 days while third-party figures remain; immediately if a linked provider changes/withdraws an offer. Put visible “Last checked” date by examples; record source checks in the ledger.
- **Acceptance:** The first two paragraphs answer the shopper's question without falsely precise regional averages; public examples are clearly third-party and scoped; mobile text is readable; HSDJ quotes remain private; link path to availability/consult works; no contradictory service-area claim; article date and structured data (if any) match visible content.
- **Measurement:** Re-run the frozen Phase 1 queries after publication at the brief's 14/30/60/90-day windows, observe GSC indexing/search queries and guide landing behavior, and use existing complete-date-check → consult → booked-outcome definitions. Do not call a citation, click, or scheduled consult a booking.

## Proposed FAQ correction, separate from the guide

Current live `Where do you DJ weddings?` copy reads as Squamish-only. Based on Patrick's 2026-10-13 clarification and the completed different-day query pass, the smallest public answer to review is:

> I'm based in Squamish, and that's where I focus my wedding work. I also book weddings in Whistler and Pemberton. If you live in Vancouver and are getting married in Squamish, we can plan the music and timing while you're at home. Travel and the sound setup depend on the venue and are clear in your quote.

This copy is not a universal travel or package commitment. It keeps the booking location distinct from a couple's home city. The existing Vancouver-planning page should remain the dedicated answer for that audience; no second page is proposed.

## Release gates

1. The third-party-example approach and narrow package are approved to proceed; confirm publication-day amounts, inclusions, currency limitations and links before using the figures.
2. The second-date query pass and October 14 source recheck are complete, but full-answer captures remain an evidence limitation. Recheck source offers again at release and update the draft article date to its actual publication date. Isolate this scope from unrelated working-tree changes before deploying.
