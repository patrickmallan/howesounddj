# HSDJ_HOMEPAGE_HEADLINE_TEST_V1 — Stage FINAL

## 1. Experiment goal

Measure which homepage H1 (A/B/C) best supports **conversion intent** by tying **`homepage_headline_view`** exposure to downstream **`check_availability_click`** and inquiry funnel events (`contact_form_start`, submit attempt/success/error), using **`headline_variant`** on those events when a stored assignment exists.

## 2. Variants implemented

| ID | Copy |
|----|------|
| **A (control)** | Squamish wedding DJ for the Sea to Sky, packed dance floors every time. |
| **B** | Squamish wedding DJ for the Sea to Sky, high energy dance floors. |
| **C** | Squamish wedding DJ for the Sea to Sky, the right music at the right moment. |

**Tagline** (always below H1, same for all variants): **Your Celebration. Our Passion.**

## 3. Selection method (localStorage persistence)

- **Key:** `hsdj_home_variant` (`HOMEPAGE_VARIANT_STORAGE_KEY` in `src/lib/experiment.ts`).
- **Logic:** `getHomepageVariant()` returns stored `A`/`B`/`C` if present; otherwise assigns **equal random** A/B/C and persists.
- **Client-only:** `typeof window` guard; SSR defaults to **A** for HTML and initial render.
- **Analytics read:** `getStoredHeadlineVariant()` / `headlineVariantPayload()` **do not** assign a variant—used on `/contact` / CTAs so only users who received the homepage experiment carry `headline_variant` on downstream events.

## 4. Analytics events added

- **`homepage_headline_view`** (`ANALYTICS_EVENTS.homepageHeadlineView`)  
  - `variant`: `A` \| `B` \| `C`  
  - `page_path`  
  - Fires **after** variant is resolved in `useLayoutEffect`, **once per document load** (deduped with `sessionStorage` key `hsdj_headline_view_${performance.timeOrigin}` to avoid React Strict Mode double-fire in development).

## 5. Events enriched with variant context

`headline_variant` is merged via `headlineVariantPayload()` where a stored value exists:

- **`check_availability_click`** (`src/components/check-availability-tracked-link.tsx`)
- **`contact_form_start`**
- **`contact_form_submit_attempt`**
- **`contact_form_submit_success`**
- **`contact_form_submit_error`** (all reasons)

**Not** added to `availability_check_*` or `calendly_click` (out of scope for this pack’s listed events).

## 6. Files touched

| File | Change |
|------|--------|
| `src/lib/experiment.ts` | **New** — variant storage + helpers |
| `src/lib/analytics.ts` | `homepageHeadlineView` registry entry |
| `src/components/homepage-hero-headline.tsx` | **New** — client H1 + tagline, opacity until resolved, view event |
| `src/app/page.tsx` | `HEADLINE_VARIANTS`, hero uses `HomepageHeroHeadline` |
| `src/components/check-availability-tracked-link.tsx` | `headline_variant` on CTA click |
| `src/components/contact-availability-form.tsx` | `headline_variant` on listed form events |

## 7. Validation results

- `npm run lint` — **PASS**
- `npm run build` — **PASS**

## 8. Non-regression confirmation

- **Conversion funnel unchanged** — Same `/contact` + `#availability` flows; availability and submit logic untouched.
- **SEO structure unchanged** — `metadata`, `canonical`, and OG exports in `page.tsx` unchanged; crawlers see **variant A** in the initial static HTML (client component initial state is `A`).
- **No duplicate analytics events** — `homepage_headline_view` deduped per load; existing `trackEvent` guards unchanged; no duplicate `headline_variant` keys on the same event name.
- **No layout instability introduced** — Fixed `min-h` on headline wrapper; H1 + tagline fade in together after resolve to avoid flashing a wrong variant before localStorage is read.

---

**Manual QA:** Load `/`, confirm variant persists on refresh; new incognito session can assign a new variant; CTA and form submit should not throw; GA4 (with measurement ID) should receive `homepage_headline_view` and downstream events with `headline_variant` when applicable.
