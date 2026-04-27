# HSDJ_CONTACT_NAV_AND_VISIBLE_EMAIL_V1 — Stage FINAL

## 1. Issue addressed

Vendors and non-wedding-specific inquiries had **no dedicated nav path** to the contact experience, and **no on-page direct email** alongside the inquiry funnel—everything leaned on **Check Availability** and forms. The site needed a labeled **Contact HSDJ** route in chrome plus a **mailto** for general/vendor outreach without competing with the primary wedding flow.

## 2. Navigation changes

**Single source:** `navLinks` in `src/components/site-chrome.tsx` drives desktop nav, mobile drawer links, and footer link rows.

| Item | Detail |
|------|--------|
| Label | **Contact HSDJ** |
| Href | `/contact` |
| Order | After **FAQ**, before the header **Check Availability** button (desktop); mobile menu lists **Home** then all `navLinks`, so **Contact HSDJ** appears after FAQ with existing **`onClick={closeMobileMenu}`** on each link |
| Active state | Existing `isActiveNavHref(pathname, "/contact")` highlights `/contact` (and nested paths) |
| Footer | **Contact HSDJ** is included automatically with other `navLinks` for consistency—no separate duplicate pattern |

There was **no** prior `/contact` nav entry to rename; one clear label avoids duplicate “Contact” vs “Contact HSDJ” confusion.

## 3. Contact page email placement

**Section:** `#send-message` — **Send a message** / general questions area.

**Copy:** “For vendor, planner, or non-date-specific inquiries, you can also email:” followed by a **`mailto:patrick@howesounddj.com`** link whose visible text is the full address **`patrick@howesounddj.com`**, styled like other amber accent links on the page.

**Hierarchy preserved:**

1. Hero + **Check Availability** (primary)  
2. **Book a Consult**  
3. Availability form → Book consult block  
4. **Send a Message** intro → **direct email** line → secondary inquiry form  

Forms and CTA components were **not** modified.

## 4. Files touched

| File | Change |
|------|--------|
| `src/components/site-chrome.tsx` | Appended `{ href: "/contact", label: "Contact HSDJ" }` to `navLinks` |
| `src/app/contact/page.tsx` | Added vendor/general email paragraph with `mailto` above `ContactSecondaryInquiryForm` |

## 5. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |
| `rg` for `Contact HSDJ`, `patrick@howesounddj.com`, `mailto:patrick@howesounddj.com` | Matches in `site-chrome.tsx` and `contact/page.tsx` |

Git HEAD at verification: `45b4f8fdce37a8a060ba2dc30bc42f6e7b38e8f4` (may change after local commits).

## 6. Manual QA checklist

1. **Desktop header:** Nav shows **Contact HSDJ** after FAQ; **Check Availability** remains the primary pill to the right.  
2. **Contact HSDJ** navigates to `/contact`.  
3. **Mobile menu:** **Contact HSDJ** appears after FAQ; tap closes menu (same pattern as other links).  
4. **`/contact`:** Vendor email copy and **`patrick@howesounddj.com`** link visible in **Send a message** block; mail client opens from mailto.  
5. **Hierarchy:** Check Availability + Book a Consult unchanged in prominence; forms untouched.  
6. **Footer:** Single **Contact HSDJ** among footer links—no extra conflicting Contact links.

## 7. Non-regression confirmation

- **Check Availability** remains primary CTA in header and on the contact page.  
- **Book a Consult** unchanged where already wired.  
- Contact **API**, Turnstile, and email **infrastructure** not altered.  
- Mobile menu **auto-close** on route change + link click preserved.  
- No visually dominant email treatment—one supporting paragraph in the secondary inquiry zone.

## Success condition

Users can find **Contact HSDJ** in desktop and mobile navigation and in the footer link row; vendors and general inquiries can reach **patrick@howesounddj.com** directly on `/contact` without weakening the main wedding inquiry funnel.
