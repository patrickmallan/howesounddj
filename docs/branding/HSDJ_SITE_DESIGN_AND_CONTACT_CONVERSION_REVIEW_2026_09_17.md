# HSDJ website design and Contact conversion review

**Date:** 2026-09-17  
**Status:** Research and design direction; no production implementation approval implied.  
**Evidence:** Live local preview at 1440 × 1000 for Home, Weddings, Packages, Reviews, About, Contact, FAQ, and Venues; a second viewport one screen lower on each interior route; current Contact components and the approved Availability Success V3 copy contract. This is not a complete mobile/accessibility/performance audit.

## Executive decision

The homepage remains the visual anchor. The interior site is **not design-locked**. Its main fault is not that every page needs more DJ art; it is that the same large hero, collage, oversized condensed headline, blurb panel, and cassette-style CTA repeat regardless of the visitor's question. That makes the pages look related, but not authored for their individual jobs. We should keep the material language—real equipment, hard type, light, local photography—while changing the composition and information order by page.

The next production mission is Contact, but only after the photo-free, date-first desktop and mobile states receive the protocol's explicit creative approval. The user has now decided the intended path: **check date → available result → book a consult**. The consult must be the single dominant action after an available result, not a competing first action before the check. The message route remains available for a couple without a fixed date, a vendor, or an exception.

## Contact: what the current site does versus the desired decision

| Step | Current live experience | Required direction |
| --- | --- | --- |
| Arrival | “Reach out when you are ready” and a broad introduction. | Ask for the wedding date early; say plainly what the check does. |
| First action | A Book a Consult section and three adjacent actions precede the date form. | Date entry and check become the dominant first action. Consult is discoverable for people who genuinely want to speak first, not an equal competing tile. |
| Before date entry | “What happens next,” reassurance, bullet lists, and form guidance repeat the explanation. | Keep only information necessary to complete a check and understand that availability is not a confirmed booking. |
| Available result | Approved date confirmation, human headline, explanatory sentence, Stephen Henry quote, then action footer and Calendly button. | Retain the approved emotional message and attributed proof, but put the consult action immediately after the confirmation and one succinct reason to take it. Keep the proof below or beside the action. |
| Other outcomes | Manual review, unavailable, and inquiry states exist. | Preserve their factual distinction and working routes; do not promise a date is booked or make a manual result look confirmed. |

In the current live Contact DOM, the availability section begins about **3,390 pixels down** at a 390 × 844 mobile viewport and **2,841 pixels down** at 1440 × 1000 desktop. This is the clearest measurable sign that the page is asking visitors to read the sales explanation before performing the action Patrick now wants first.

### What should be preserved

- The V3 approved lines “This is the answer you were hoping for” and “Your wedding date is available” are more human than a generic congratulations. Do not discard them merely to make the card shorter.
- The session proposition—45 minutes to discuss the wedding, music, and fit—remains useful. Verify the live scheduler duration before emphasizing the number in a new visual.
- Stephen Henry's excerpt is strong proof because it speaks to Patrick as a person. Keep the quote and attribution exact, with the canonical source in `src/config/reviews.ts`.
- Keep the existing availability API, Calendly context/analytics, edit-date control, accessible status, and tertiary email fallback.

### What should change in the next approved design

- Remove the Patrick live-light-trails photo from the Contact research direction. The “retouched” local image still contains the prominent speaker and event background; it is not a clean cutout. The white-background action image exists, but reusing the homepage image on Contact would repeat the hero and distract from the form. Contact can work without a portrait; About can own the personal-photo job.
- Make the available-result **button visible with the result**, especially on a 390-pixel phone. In the current archived mobile capture it follows a long explanation and testimonial. The emotional response can remain, but the quote must not become a gate the visitor has to scroll past to schedule.
- Consider a shorter visible button label (“Book a Consult” or “Choose a Time”) while retaining the complete session explanation nearby. This is a *copy option for Patrick's review*, not an authorized replacement for the V3 contract.
- Reduce “no pressure,” “no commitment,” and “no hard sell” repetitions. Such language should not dominate a page where the visitor came to make a decision.

## Sitewide design diagnosis

### Shared problem: the interior pages have one opening, regardless of purpose

Weddings, Packages, Reviews, FAQ, Venues, and Contact all present the same dark mixer collage and large white/red condensed headline, followed by a DJ-art blurb panel. The homepage's scale works because it has a singular hero and Patrick image. On interior routes, the repeated scale takes most of the first screen before the visitor reaches the page's actual value. The large fixed header further reduces the usable viewport. This is a compositional issue, not a request for another coat of texture.

**System rule for the redesign:** Keep the brand's equipment-art vocabulary but give each high-intent route a different editorial structure. Reduce headline scale on interior pages; use art where it clarifies a piece of evidence or an action, not as a universal backdrop. Test the first meaningful action at desktop and mobile, with the fixed header visible.

### Page decisions, in order

1. **Contact — conversion path.** Highest priority. Date first; available result immediately offers consult; no duplicate reassurance maze. New pre-check and post-check static studies are required at desktop and mobile before implementation.
2. **Packages — commercial clarity.** The page opens with a general promise, then a three-tier grid in which “Celebration” is a non-wedding offering on a wedding-packages page. Visitors need to know what wedding coverage includes, what varies, and how a quote is obtained. Separate or clearly contextualize non-wedding work. Verify every inclusion and avoid invented pricing or guarantees. Give comparison a usable form rather than another oversized statement.
3. **Weddings — distinctive service explanation.** The live page states that the music is a live set built around the couple's taste, but its introductory cross-links and broad claims delay the tangible “how.” Build from Patrick's answers: couple-selected ceremony/entrance/first-dance songs, a playlist as a guide rather than a rigid running order, how requests are judged, what he checks before a speech, and how dinner sets up dancing. Preserve the couple's choice when describing guest response.
4. **Reviews — evidence first.** The named quotes are the best interior proof and should appear faster. Remove the meta introduction about the website and let real, attributed couples do the work. Vary quote length and layout rather than making every review the same tile. Check any excerpt against its source.
5. **About — person and practice.** The existing portrait gives this route a distinct human source. The extremely long opening headline competes with it. Reduce it to a direct introduction, then show how Patrick actually works: mic handoffs, outdoor power/weather, reading requests and room sound, and breadth beyond the standard wedding playlist. Do not add a second generic founder photo merely to fill space.
6. **FAQ — objections answered, not brand restated.** The first screen and next section restate broad claims before the actual questions. Prioritize exact decisions couples ask about: music control, must-plays/no-plays, requests, outdoor sound/power, speech microphones, timing, and what happens after date check. Answers should be short enough to scan and specific enough to avoid needing another paragraph of reassurance.
7. **Venues and location pages — local utility.** The Venues introduction says what the pages are *not* (“SEO shells”) and explains internal linking rather than helping a couple choose a setting. Lead with named venue differences and planning implications, using verified facts only. Venue pages and Squamish/Vancouver/Whistler landing routes need a separate factual and visual pass; the top-level Venues view alone is not evidence that each guide is accurate or distinctive.

## Design standard for each subsequent page mission

Before designing a section, write its one-sentence visitor question and the decision it should advance. Keep it only if it answers that question with information, evidence, or a clear action. For each page, require:

- One dominant decision per viewport. Secondary routes remain available but visually subordinate.
- A page-specific opening composition; the homepage is the tone-setter, not a layout file to copy.
- Real Patrick language and verifiable evidence. Remove generic “planning, pacing, flow, fit, clarity” summaries when a concrete example can do the work.
- Readable headline scale and line breaks at 390, 768, 1280, and 1440 pixels. Nothing should tuck behind the fixed header or decorative meter.
- Photography with a clear editorial job and provenance; no rejected portrait variant in a new place by default.
- Art direction from actual DJ objects and behavior without fake controls, fabricated event artifacts, or equipment claims.
- A meaningful route toward date check or consult, but not repeated CTA modules in every section.

## Proposed sequence and approval boundary

1. Review a **photo-free Contact composition** with four states: pre-check and available-result, each at desktop and mobile. Test whether the consult action appears promptly without losing the approved message or proof.
2. Obtain Patrick's explicit creative approval for the exact Contact composition and copy/viewport scope, as required by `HSDJ_ANTI_TEMPLATE_DESIGN_EXECUTION_PROTOCOL_V1.md`. Then implement and test available/manual/unavailable flows, calendar link, analytics, keyboard and screen-reader behavior, and responsive layouts.
3. Run one shared interior typography/header/readability pass, preserving homepage-specific scale.
4. Redesign Packages and Weddings as distinct commercial and service-explanation pages; then Reviews, About, FAQ, and Venues. Review location and article routes after their primary parent pages are settled.

**Not decided here:** Whether Patrick wants any image on Contact after seeing the photo-free composition; whether the approved V3 button wording itself should change; any production copy/layout replacement; or factual claims on uninspected venue detail pages.
