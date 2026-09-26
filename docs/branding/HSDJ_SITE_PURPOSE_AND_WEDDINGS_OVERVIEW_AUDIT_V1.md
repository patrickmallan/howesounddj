# HSDJ Site Purpose and Weddings Overview Audit V1

**Status:** Strategy and design research; no production mutation authorized  
**Date:** 2026-09-19  
**Owner:** Patrick Mallan  
**Mission:** Decide what the Weddings Overview page is for, identify duplicated site purposes, and define a smaller, stronger information architecture before redesigning `/weddings`.

## Executive decision

The current Weddings Overview is not functioning as an overview. It is a second homepage assembled from a hero, large image, three benefits, three coverage cards, a planning process, an FAQ preview, and repeated conversion hardware.

Its new job should be:

> Show a couple what they are actually hiring when they book Howe Sound Wedding DJ, using Patrick's real decisions and working knowledge rather than generic service claims.

It should not explain Patrick's biography, repeat package comparisons, summarize reviews, preview the FAQ, or repeat the Contact conversion flow.

## The conversion journey

The likely high-intent journey is simple:

1. Home: Is this DJ different and worth considering?
2. Weddings: What am I actually hiring him to do?
3. Packages: What is included and what does it cost?
4. Reviews: Do real couples back this up?
5. Contact: Is my date available, and can I book a consult?

FAQ, venue pages, and guides support specific questions or searches. They should not interrupt the main path or repeat it.

## Sitewide CTA decision

The paired Book a Consult / Check Your Date mini stereo currently appears in eighteen page templates. It is frequently used at both the top and bottom of an interior page, while the footer already carries the same conversion route.

**Recommendation:**

- Remove the paired mini stereo from the opening of every interior page.
- Remove repeated page-end copies where the global footer follows immediately.
- Keep the single compact Check Date control in the global header as a persistent utility.
- Keep one primary conversion mechanism in the global footer.
- Use a page-specific link only where the content naturally hands off: Weddings → See Packages; Packages → Check Your Date; Reviews → Check Your Date.

This preserves access to conversion without making every page begin and end with the same object.

## Current Weddings page: keep, move, or cut

### Keep and rewrite

- The musical-range distinction: wedding is the event format, not the genre.
- Whole-day responsibility: ceremony cues, microphones, dinner, speeches, and dancing.
- Patrick's real dance-floor judgment.
- A short bridge to Packages.

### Move to its proper page

- Package coverage and detailed inclusions → Packages.
- Planning steps → Packages or FAQ, only if concrete.
- Objection answers → FAQ.
- Squamish power, weather, venue, and vendor knowledge → Squamish or venue pages.
- Biographical credibility → About.
- Couple proof → Reviews, with one strong excerpt allowed on Weddings.

### Cut

- The current faux quotation about a room “slowly letting go together.”
- The generic full-width crowd image if it has no information or evidence attached.
- Three equal benefit cards.
- Three more equal service cards.
- The FAQ preview.
- The generic “your story, your energy, your people” passage.
- Both repeated mini-stereo CTA groups.

## Proposed Weddings page

### 1. Opening position

**Working headline:** You do not need to build the whole playlist.

**Working support:** Tell me the songs you love, the ones you cannot stand, and the tracks already tied to the ceremony. I will build the rest and mix it live.

This answers a real misunderstanding Patrick hears from couples and establishes the service immediately.

### 2. What you are hiring

Present one continuous annotated wedding-day composition rather than a grid:

- Ceremony: exact song versions, cue timing, officiant and vow microphones.
- Speeches: coordinator ready, photographer ready, speaker ready, wireless microphone checked.
- Dinner: upbeat records that support conversation without putting the room to sleep.
- Dance floor: requests, crowd reaction, volume, and tonal balance determine the next move.

The physical ancestor should be a real run sheet crossed with a mixer signal path: gaffer-tape labels, cue marks, documentary photographs, and one continuous line connecting the moments. No numbered cards.

### 3. Why Patrick is difficult to replace

Use three real observations in different editorial forms, not equal tiles:

- **Five hours of Spotify is not too much.** Most songs are mixed for roughly part of their runtime, so a long playlist is useful direction rather than an instruction to play every track front to back.
- **Dinner music should not put everybody to sleep.** Patrick uses upbeat classics and gradually changes volume and intensity as the formal part of the night finishes.
- **The curveball is often the record that opens the floor.** A left-field rock song can make heads turn and pull people in when a predictable choice will not.

These are grounded in Patrick's source answers. Exact publishable copy still requires a voice edit.

### 4. Handoff

End with one direct bridge:

> Want to see what is included? See Packages.

The global footer handles date checking and consultation. The page does not need another stereo.

## Site-purpose architecture

### Core commercial pages

- `/` — Brand position and first impression.
- `/weddings` — What the wedding DJ service actually does and why Patrick's judgment matters.
- `/packages` — Coverage, inclusions, price posture, options, and comparison.
- `/reviews` — Uninterrupted customer proof.
- `/about` — Patrick's background, personality, taste, and credibility.
- `/contact` — Date check, available result, consult booking, and message fallback.

### Support pages with a distinct purpose

- `/faq` — Literal answers to real objections; no introductory sales essay.
- `/venues` and verified venue pages — Setting-specific power, access, weather, sound-zone, and setup knowledge.
- `/guides/...` — First-hand, useful answers to searchable planning questions.

### Pages requiring consolidation or evidence

- `/squamish-wedding-dj` overlaps the same commercial query and promise as `/weddings`. Keep only if it becomes a genuinely local logistics page; otherwise consolidate after reviewing Search Console performance and inbound links.
- `/vancouver-wedding-dj` should become a useful guide for Vancouver couples planning a Squamish wedding, or be consolidated. It should not imitate a location service page.
- `/whistler-wedding-dj` conflicts with the stated Squamish service boundary and is absent from the sitemap. Remove, redirect, or substantiate the service area before indexing it.
- `/stories` and its entries should contain real documented events or become guides/opinion pieces. Generic atmosphere pieces should be merged or removed.
- Venue detail pages should remain indexable only when each contains verified, useful, setting-specific information.

## SEO conclusion

More pages are not automatically better for search. Google recommends people-first content with original information and first-hand expertise. It also identifies substantially similar regional pages that funnel users to the same destination as a possible doorway pattern. Similar or duplicate pages can split signals and create a confusing user experience.

The site currently exposes roughly thirty sitemap URLs, including thirteen venue details, and a Whistler route outside the sitemap. Eighteen page templates import the same paired CTA component. Across page source, the words or phrases “atmosphere,” “flow,” and “energy” appear dozens of times. That quantity is not SEO value by itself.

Do not redirect or remove an indexed URL until Search Console impressions, clicks, queries, backlinks, and current rankings are checked. The correct sequence is: establish distinct purposes, compare actual search performance, then consolidate with permanent redirects and consistent canonical/internal links where appropriate.

## Approval boundary

This audit authorizes no production changes. The next bounded design mission is one desktop and one mobile composition for the rebuilt Weddings Overview, plus final page copy. The frozen anti-template protocol requires Patrick's exact creative approval before implementation.

