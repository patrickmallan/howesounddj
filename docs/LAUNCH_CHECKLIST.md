# Launch checklist — Howe Sound DJ

Practical steps to deploy [howesounddj.com](https://www.howesounddj.com) on Vercel with a **first-party availability checker** on **`/contact`** (same-origin **`/api/availability`** → **HSDJ Operations** governed API; **no Google Calendar credentials on the website**), plus **Resend** email and **Turnstile**. Production URL: **https://www.howesounddj.com**.

---

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Copy **`env.example`** to **`.env.local`** when testing inquiry email and Turnstile locally (never commit secrets). Omit `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` if you do not want hits in production GA while testing.

## 3. Environment variables (app)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key — required for **Send inquiry** |
| `CONTACT_TO_EMAIL` | Inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | Verified sender on your domain (Resend) |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile **site** key (widget on inquiry form) |
| `TURNSTILE_SECRET_KEY` | Turnstile **secret** — server verifies each submission |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional **GA4** measurement ID (`G-XXXXXXXXXX`). If unset, analytics does not load. |
| `HSDJ_OPERATIONS_AVAILABILITY_API_URL` | Optional — full Operations availability URL (defaults to `https://ops.howesounddj.com/api/availability`). |

See **`env.example`** and **`docs/PUBLIC_WEBSITE_ENVIRONMENT_CONTRACT_V1.md`**. Calendar credentials live in **HSDJ Operations** only.

### Availability — operator checklist (manual)

1. On **`/contact`**, run **Check Availability** for a known booked fixture (e.g. `2027-07-31`) → **unavailable**.
2. Run for a known free fixture (e.g. `2027-07-28`) → **available**.
3. Confirm operator notification email matches the visitor result (authority: **HSDJ Operations Availability API**).
4. For calendar changes, use **HSDJ Operations** — not website env vars.

## 4. Vercel environment variables

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Add Resend, Turnstile, contact email, and optional Operations availability URL for **Production** (and Preview if you test real email there). Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` when you want GA4. **Do not** add Google Calendar credentials to this Vercel project.
3. Redeploy after changing vars so the runtime picks them up.

## 5. Deploy flow

1. Connect the repo to Vercel (or push to the connected branch).
2. Run **`npm run build`** locally before pushing if you want a quick sanity check.
3. Confirm the production deployment finishes without errors.
4. Assign the production domain (`www.howesounddj.com` / apex as you prefer) in Vercel → **Domains**.

## 6. Post-deploy: `/contact` availability & inquiry (required)

Run after every production deploy that touches **`/contact`**, **`/api/availability`**, **`/api/contact`**, or env vars.

| Check | How |
|-------|-----|
| **Page loads** | Open **`https://www.howesounddj.com/contact`** — no blank page. |
| **Date check** | POST **`/api/availability`** or use the contact form — booked fixtures (e.g. `2027-07-31`, `2027-08-07`) → unavailable; approved free fixture (e.g. `2027-07-28`) → available. |
| **Booked path** | Unavailable message + **Book a Consult** (Calendly). |
| **Calendly** | **Book a Consult** opens `https://calendly.com/patrick-howesounddj` in a new tab. |
| **Inquiry send** | With an available date, submit the form — success message; email arrives at `CONTACT_TO_EMAIL` with **Reply-To** = couple’s email. |
| **Turnstile** | If keys are set, widget renders; submit fails without completing the check. |
| **Mobile** | Same checks on a phone — date input, buttons, and form usable. |

**Operator setup (calendar):** Manage bookings calendar and credentials in **HSDJ Operations** (`ops.howesounddj.com`), not on the public website Vercel project.

## 7. Images and Open Graph

- **Page photography:** `public/images/` + `src/config/site-images.ts` — see **`public/images/README.md`** for slot priority and aspect ratios.
- **Social share (OG):** Default is `public/og-default.svg` (vector, safe everywhere). For richer previews:
  1. Export a **1200×630** JPG or PNG (sRGB, under ~500 KB if possible).
  2. Save as e.g. `public/images/social/og-share.jpg`.
  3. In **`src/app/layout.tsx`**, set **`openGraph.images`** and **`twitter.images`** to `/images/social/og-share.jpg` (and update `width` / `height` if not 1200×630).
  4. Redeploy; use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) if you need to refresh cached previews.

## 8. Wix redirect / cutover

- Map legacy Wix URLs to the new routes (see **`docs/WIX_MIGRATION.md`**).
- Configure **301 redirects** at the host/CDN layer before or as you point traffic to Vercel.
- After cutover, submit `sitemap.xml` in Google Search Console.

## 9. Google Search Console (search readiness)

1. Open [Google Search Console](https://search.google.com/search-console) and add a **property** for the **production** hostname you use in public (e.g. **`https://www.howesounddj.com`** as a **URL prefix** property, or a **Domain** property for `howesounddj.com` if you control DNS and want both www and apex).
2. **Verify** using the method Google suggests (DNS TXT, HTML file, or hosting provider). **Do not** verify only a temporary Vercel preview URL — use the production domain you intend to rank.
3. After the site is live, open **Sitemaps** and submit **`https://www.howesounddj.com/sitemap.xml`** (adjust host if your canonical is apex-only).
4. **Performance** and **Pages** reports lag by a few days; use them to see queries and landing pages (including `/vancouver-wedding-dj`) over time.

## 10. Google Analytics 4 (measurement)

1. In [Google Analytics](https://analytics.google.com/), create or use a **GA4** property and a **Web** data stream for **https://www.howesounddj.com**.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`) into Vercel as **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** and redeploy.
3. **Page views** should appear in **Realtime** when you browse the site.

**Custom events:** After a successful inquiry **Send**, **`contact_form_submit_success`** should appear in GA4 (see **`src/lib/analytics.ts`**).

### Quick validation checklist

| Check | How |
|-------|-----|
| Page views | GA4 **Realtime** — open a few pages on production; you should see yourself and `page_path` updating. |
| Vancouver page | **Realtime** or **Pages** — navigate to `/vancouver-wedding-dj` and confirm it appears. |
| Contact inquiry | Submit a test inquiry — **`contact_form_submit_success`** in Realtime → Events when GA is loaded. |

**Local dev:** Leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` unset in `.env.local` to avoid polluting production data, or use a separate GA4 test stream.

## 11. Rollback mindset

- Vercel keeps deployment history: you can **promote a previous deployment** if something breaks post-release.
- If only env vars are wrong, fix vars and redeploy — no need to revert code.
- Keep Wix DNS/hosting notes until you’ve verified production for 24–48 hours.

---

## Local quality checks (optional)

```bash
npm run lint
npm run build
```
