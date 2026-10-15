# Phase 1 raw capture — ChatGPT P1, independent third observation

**Observation ID:** `20261014_chatgpt_P1_03`  
**Captured:** 2026-10-14 21:45 UTC (14:45 PDT), after “Response complete.”  
**Query:** `How much does a wedding DJ cost in the Sea-to-Sky?`  
**Surface:** ChatGPT Chat in desktop Chrome, temporary chat, **Unpersonalized** (memory, plugins and custom instructions ignored), with **Web search explicitly selected** for the message. The message appeared as `@Web search How much does a wedding DJ cost in the Sea-to-Sky?`. This is a new session on the same Vancouver-local date as the second pass, not a third different-day baseline.  
**Capture method:** full completed answer read from the live page's accessibility tree and read-only DOM `innerText`; direct answer links inspected separately. The temporary-chat URL is not durable and is intentionally not used as the evidence link. This file preserves the displayed text and linked targets, not the model's hidden sources or a screenshot.

## Completed answer text

> Wedding DJ costs in the Sea-to-Sky (2026)
>
> Based on published pricing from wedding DJs serving Squamish, Whistler, and Pemberton, you can expect to pay around $1,500–$2,500 CAD for a professional wedding DJ, with more elaborate packages costing upwards of $3,500.
>
> Budget / basic reception — $1,200–$1,600 — Approximately 4–6 hours, basic sound and lighting  
> Typical professional package — $1,700–$2,300 — Approximately 6 hours, microphones, dance lighting and planning  
> Full wedding-day coverage — $2,000–$3,000 — Ceremony, cocktails, reception and dancing  
> Premium / bespoke — $3,500–$6,500+ — Higher-touch service, multiple sound areas and expanded production
>
> These are approximate market ranges, not fixed industry rates. They're supported by local published packages, including Trax, Coast Mountain DJs, Dreamline DJ and DJ Pri.
>
> Actual DJ prices advertised in the Sea-to-Sky
>
> DJ company | Published pricing (CAD)  
> Trax DJ Services | $1,495 for 6 hours; $1,995 with ceremony coverage  
> Coast Mountain DJs | $1,990 for 6 hours; ceremony +$500  
> Dreamline DJ | Starting at $1,799; average $2,200  
> Whistler Wedding DJs | Starting at $1,650; popular package $2,000  
> DJ Pri | Starting at $3,500; full-day signature package from $6,500
>
> Sources: vendor websites and WeddingWire listings accessed October 2026.
>
> What increases the price?
>
> Additional costs commonly include:
>
> - Ceremony audio: $400–$600 for speakers, microphones and music cues.
> - Extra DJ hours: $200–$350 per hour.
> - Uplighting: approximately $250–$400.
> - Photo booth: approximately $595 or more.
> - Travel: Additional charges may apply if a DJ travels from Vancouver, especially for Whistler or Pemberton events.
>
> What should you budget?
>
> For a standard Sea-to-Sky wedding of roughly 80–120 guests, I'd recommend budgeting $2,000–$2,500 CAD before applicable taxes for a professional DJ with reception music, lighting, microphones and potentially ceremony sound.
>
> That should give you a solid range for comparing quotes without paying premium-production prices.
>
> Are you asking because you're hiring a DJ for your wedding, or because you're a DJ trying to set your wedding package pricing in the Sea-to-Sky? I can tailor the pricing breakdown quite differently depending on which one.

The interface also displayed expandable source controls labelled “Trax DJ +3,” “Trax DJ +4,” and “Trax DJ +2”; those expanders were not opened, so their additional targets are not claimed here.

## Direct links visible in the answer

- Trax DJ Services — <https://www.whistlerdjs.com/packages>
- Coast Mountain DJs — <https://www.coastmountaindjs.com/pricing/>
- Dreamline DJ — <https://www.dreamlinedj.ca/whistler-wedding-dj>
- DJ Pri — <https://iamdjpri.co/wedding-pricing-details>

“Whistler Wedding DJs” appeared as an unlinked UI source control rather than a direct anchor in the inspected answer. No HSDJ answer-text mention or first-party `howesounddj.com` link was visible.

## Scoring and limits

**HSDJ answer mention:** no. **Explicit HSDJ recommendation:** no. **HSDJ first-party citation:** no. ChatGPT presented its chosen price tiers and all examples as CAD even though the two selected official provider price lines were not independently labelled with a currency code in the earlier source audit; do not reuse that currency assertion as an official-package fact. The published-example table and broad ranges are ChatGPT output, **not** an independently verified market survey. This capture supports the observed price-intent omission; it does not prove why ChatGPT chose these sources or that a new HSDJ guide will change future answers.
