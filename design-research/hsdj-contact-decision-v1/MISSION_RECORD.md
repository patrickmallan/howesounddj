# Contact decision path — pre-code composition mission V1

> You are not being asked to generate a website according to learned web-design conventions. Those conventions are the primary failure mode of this mission.
>
> Do not retrieve the statistically likely solution to “wedding DJ website,” “creative agency website,” “music website,” “premium service website,” or “anti-AI website.”
>
> Begin from physical objects, real Howe Sound DJ artifacts, documentary photography, sound-system behavior, typography, and the emotional progression of an actual wedding night.
>
> Every composition must identify the conventional web pattern it most resembles and then deliberately move further away from that pattern without compromising comprehension, accessibility, or conversion.
>
> Novelty is not permission for decoration. Every unusual element must communicate real information, create hierarchy, expose real evidence, express a genuine HSDJ artifact, or improve the emotional progression of the page.
>
> When choosing between a polished solution and an authored solution, prefer the authored solution. When choosing between a generic best practice and a usable unconventional composition, prefer the unconventional composition.
>
> Do not make the page look as though AI was instructed to make a website look non-AI. Specificity—not maximum weirdness—is the escape route.

**Status:** Stage A static research. Neither species is approved for implementation.  
**Date:** 2026-09-17  
**Production mutation:** None  
**Source:** Patrick's answers in `docs/branding/Q's For HSDJ.txt`; especially Q1, Q5, Q9  
**Viewport focus:** Contact opening and first decision, 1440 × 1000 desktop / 390 × 844 mobile. Later sections and interaction states remain separate accreditation work.

## Mission

The visitor should be able to answer, within five seconds, “Can I check my date, speak with Patrick, or ask a question without having everything planned?”

The page must not treat a visitor's uncertainty as a sales objection to be overcome with repeated “no pressure” statements. It should give clear routes and let the person choose.

### Required information and actions

- Howe Sound Wedding DJ identity and Sea-to-Sky service context remain available through global navigation.
- Check date links to the existing live availability flow, which may return available, unavailable, or manual review.
- Book a Consult links to the configured public Sound Check event. The current code says 45 minutes; confirm against external scheduling before making this a visual promise.
- Send a Message remains accessible for partial details, vendor inquiries, or someone not ready to check a date.
- Date entry and result states may not be turned into decorative hardware.
- A preliminary open date must not be presented as a confirmed booking.

## Source assets and provenance

- `public/images/hsdj-redesign/wedding-story/patrick-live-light-trails.webp` — Patrick working behind equipment in an event environment. Candidate for a small documentary crop only. Source ownership, event identification, and reuse permission must be confirmed before publication.
- `public/images/hsdj-redesign/deck-surfaces/djm-a9-topdown.jpg` — equipment reference only. Do not pass it off as Patrick's own mixer. Its input-selection logic may inform hierarchy; it is not a licence to build fake controls.
- No verified HSDJ sound-check sheet, handwritten set list, booking note, or flight-case label was found in the source inventory. Do not fabricate one to give the page “texture.”

## Existing behavior to preserve

- `src/config/site-scheduling.ts` specifies the Sound Check link and 45-minute duration.
- `src/components/contact-page-cta-trio.tsx` exposes the three existing routes.
- `src/components/contact-availability-form.tsx` supports date entry plus available, manual-review, and unavailable outcomes, with a further inquiry path.
- `src/components/contact-secondary-inquiry-form.tsx` provides the separate message route.
- Contact form submission, spam protection, analytics, and server outcomes are outside Stage A but must remain functional if a design is eventually approved.

## Species A — Date first, conversation in the margin

**Studies:** `species-a-desktop.svg`, `species-a-mobile.svg`.

**Visitor decision:** “I have a date; can I check it?” The consult is visible but not presented as a competing equal-size tile.

**Emotional job:** Remove uncertainty fast. A quiet opening establishes that a real person is available after the date check, but does not make Patrick's portrait into another site hero.

**Physical ancestry record**

```text
Physical ancestor: DJM-A9 source-selection area, specifically choosing an input before working with it.
HSDJ source artifact, if available: Repository equipment reference only; not documented as Patrick-owned.
Business meaning: The visitor selects a legitimate starting route.
Transferred behavior: One primary active path; other paths stay discoverable.
Transferred visual property: A narrow label rail and decisive separation, not a rendered mixer.
Properties deliberately not transferred: Knobs, dials, fake channels, sound labels, LED decoration.
Why this could only belong to HSDJ: The alternative path leads to Patrick's actual Sound Check; the supporting image is Patrick working, subject to provenance.
```

**Composition map:** At 1440 × 1000, global chrome is reserved at top. The large date question occupies the left-center. The actual form/action has room under it. A narrow Patrick photograph is offset to the right, followed by a smaller consult invitation. The message route sits low and plain. No overlay may cross a form field or button. At 390 × 844, date question and input precede a short documentary crop, consult action, and message route; not three stacked equal cards.

**Type behavior:** One large, short question; normal-size explanatory line; unambiguous button labels. No extreme condensed typography for form instructions. Draft lines in the study are spatial placeholders, not approved copy.

**Reading path:** 0–5 seconds: Have a date → date entry → Check availability. Deeper scan: Patrick photo → Book a consult → Send a message.

**Intentional contradiction:** Machine-derived decisiveness with an extremely plain, human question.

**Closest conventional ancestor / training-set gravity:** A contact hero with a lead form. Risk: decorative portrait plus generic form stack. Escape: avoid a centered headline, testimonial, reassuring bullets, and equal CTA cards; expose the real date check immediately and make the human path a visible but subordinate margin. **Verdict: ADVANCE to Patrick's taste review, with provenance and form-state caveats.**

**Anti-Design Auditor:** The portrait could become generic “friendly founder beside a form” photography. Keep its crop small and off-axis; if Patrick's photo feels like a sales headshot, remove it rather than make it larger. **ADVANCE WITH CONDITION.**

**Conversion Guardian:** Service context via header, first action visible, date and consult distinct, message escape route present. On mobile, date fields must remain legible and tappable; the research image is not a functional form. Error/success states need their own accredited treatment. **ADVANCE WITH CONDITION.**

**Sacrifice:** The consult is not the largest action at first glance. This is intentional for visitors arriving with a wedding date, but must be tested against actual high-intent behavior.

## Species B — Conversation first, date on a separate line

**Studies:** `species-b-desktop.svg`, `species-b-mobile.svg`.

**Visitor decision:** “I want to speak with the DJ before sharing a complete brief.” The consult leads. Date checking is still clear, but it comes as a distinct route beneath rather than an equal twin panel.

**Emotional job:** Patrick appears as a real working person, not a luxury-service founder. The page asks for a conversation without demanding a wedding plan.

**Physical ancestry record**

```text
Physical ancestor: A printed event handbill with one human performer and one decisive next action.
HSDJ source artifact, if available: Patrick working photograph; no verified historical handbill in the repository.
Business meaning: A conversation with the person who will do the work.
Transferred behavior: Performer identification and a clear response/action line.
Transferred visual property: Cropped documentary image adjacent to terse type, with a smaller date strip beneath.
Properties deliberately not transferred: Decorative ticket numbers, fake venue details, artificial paper damage, poster-style slogan.
Why this could only belong to HSDJ: The performer is Patrick and the route is his real consultation, not a generic wedding inquiry.
```

**Composition map:** At 1440 × 1000, Patrick's image is an irregular but contained crop left of a large plain invitation; the consult action has first focus. A full-width date-check line appears below the opening, not in a second equal card. Message stays in an unobtrusive text line. At 390 × 844, the image is a shallow crop, followed by the consult action and then the date route. Do not turn these into three equal rounded cards.

**Type behavior:** The line “Tell me what you know so far” is conversational but could be too broad; use as a draft placeholder. The action labels remain plain. Avoid the huge all-caps homepage type scale.

**Reading path:** 0–5 seconds: Patrick working → Book a consult. Deeper scan: check date → message option.

**Intentional contradiction:** Performance image paired with a quiet, unsold invitation.

**Closest conventional ancestor / training-set gravity:** A split-image hero. Risk: the conventional 50/50 founder portrait plus CTA. Escape proposed: asymmetrical crop, no centered card, no benefit triplet, date check as a separate second line. **Verdict: REWORK before Patrick taste review** because the split-hero ancestry is still too visible.

**Anti-Design Auditor:** The human source is stronger than decorative mixer art, but the composition could be transferred to any photographer or celebrant website. It needs a more HSDJ-specific information behavior, not more grain. **REWORK.**

**Conversion Guardian:** Consult is clear, but users who came to check a date must not have to hunt. On mobile, the image cannot consume the first screen and bury both actions. **REWORK.**

**Sacrifice:** The date checker gets less prominence to make room for personal fit. The trade-off is not justified until conversion behavior or Patrick's taste strongly favours this entrance.

## Stages B–D decision

Species A has the stronger conversion logic for the current Contact page. Species B is useful as a foil but remains too close to a conventional split hero. Do not average them. Do not take the photograph from B and enlarge it in A as a compromise.

Before advancing A, verify image provenance, external scheduling details, and the primary intent of Contact visitors if analytics exist. Then refine the selected species' copy and state behavior in situ.

## Patrick taste gate

Patrick should judge:

1. Is date-first the right opening for Contact, or should the page lead with speaking to him?
2. Does the small working photograph feel like him, or like a generic founder portrait?
3. Does the plain question feel too spare, or is the restraint welcome after the homepage?
4. Is the message route findable without becoming a third competing CTA?
5. Would Patrick use “Tell me what you know so far” in a real exchange? If not, replace it with his own words.

The studies are research-only. A response about preferred direction is creative guidance; production implementation still requires the exact mission/viewport approval marker below.

```text
PATRICK_CREATIVE_APPROVAL: PENDING
DESKTOP_COMPOSITION: PENDING
MOBILE_COMPOSITION: PENDING
COPY: PENDING
PRODUCTION_MUTATION: NONE
```

