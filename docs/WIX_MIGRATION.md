# Wix → Next.js route mapping

Use this when configuring **301 redirects** after cutover from the previous Wix site to the Next.js app on **https://www.howesounddj.com**. Paths reflect the structure observed on the live Wix site during the rebuild (not every legacy slug is guaranteed; confirm high-traffic URLs in Wix SEO / URL tools before go-live).

| Intent | New route |
|--------|-----------|
| Home / landing | `/` |
| About | `/about` |
| Packages / pricing | `/packages` |
| Reviews / testimonials | `/reviews` |
| FAQ | `/faq` |
| Contact / inquiry | `/contact` |
| Wedding DJ service positioning | `/weddings` |

## Cutover sequence (recommended)

Do these in order to reduce downtime and bad redirects:

1. **Deploy** the new site to Vercel and confirm the latest production deployment is healthy.
2. **Verify production routes** — spot-check `/`, `/contact`, `/packages`, `/weddings`, `/faq`, `/reviews`, `/about`.
3. **Verify `/contact`** — date check, booked vs available paths, inquiry email, Calendly link, mobile layout (see **`docs/LAUNCH_CHECKLIST.md`** §6).
4. **Verify metadata / OG** — share a URL in a private message or [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) if you use social previews; confirm `layout.tsx` / page metadata and `og-default` (or replacement asset).
5. **Map redirects** — list legacy Wix URLs that still get traffic; add **301** rules to the new paths above (host/CDN or Wix domain forwarding, depending on where DNS points).
6. **Update DNS / domain** — point `howesounddj.com` / `www` to Vercel per Vercel’s docs; wait for DNS propagation; confirm HTTPS.
7. **Retest key pages** — home, contact, packages, mobile layout.

Detailed env, contact QA, and rollback: **`docs/LAUNCH_CHECKLIST.md`**.

**Notes**

- Wix sometimes uses hash URLs or auto-generated paths; map remaining high-traffic legacy URLs individually once you have analytics or Wix URL manager export.
- Preserve query strings only if you rely on them; otherwise redirect clean paths to the routes above.
- After launch, submit the new `sitemap.xml` in Search Console.

## Launch checklist (content & assets)

- [ ] Add final photography to `public/images/` and set paths in `src/config/site-images.ts`.
- [ ] Optionally replace `public/og-default.svg` with a **1200×630** JPG or PNG for broadest social preview support; update `layout.tsx` `openGraph.images` if the filename changes.
- [ ] `/contact`: availability + inquiry + Resend (`docs/LAUNCH_CHECKLIST.md` §6); **`booked-dates.ts`** for your real calendar.
- [ ] Configure **301 redirects** from legacy Wix URLs at the host / CDN.
- [ ] Deploy on Vercel, assign production domain, verify HTTPS.
