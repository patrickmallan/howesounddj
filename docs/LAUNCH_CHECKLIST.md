# Launch checklist — Howe Sound DJ

Practical steps to deploy [howesounddj.com](https://www.howesounddj.com) on Vercel with a **first-party availability checker** on **`/contact`** (**Google Calendar** for a dedicated bookings calendar when enabled, with **`src/data/booked-dates.ts`** as fallback), plus **Resend** email and **Turnstile**. Production URL: **https://www.howesounddj.com**.

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
| `GOOGLE_CALENDAR_ENABLED` | Set `true` to read the dedicated bookings calendar (server-side). |
| `GOOGLE_CALENDAR_ID` | `5993064f1fe3cc1b61da058efb4240a8744a87beaba96045845cebbe688d549d@group.calendar.google.com` |
| `GOOGLE_CLIENT_EMAIL` | `howe-sound-dj-calendar@howe-sound-dj.iam.gserviceaccount.com` (must have access to that calendar). |
| `GOOGLE_PROJECT_ID` | `howe-sound-dj` (GCP project reference; optional for ops). |
| `GOOGLE_PRIVATE_KEY` | Service account PEM — **never commit**; use `\n` for newlines in Vercel/local. |

See **`env.example`**. **`src/data/booked-dates.ts`** — fallback if Google is off or fails; **merged** with Google when Google returns a definitive result (rollout safety).

### Google Calendar — operator checklist (manual)

1. Add env vars locally (copy **`env.example`** → **`.env.local`**, real secrets only on your machine).
2. Add the same vars in **Vercel → Environment Variables** for Production.
3. Add a **test event** on the dedicated bookings calendar for a known date.
4. On **`/contact`**, verify **Check Availability**: that date **unavailable**, a clear date **available**.
5. **Rotate** the service account key if it was ever exposed elsewhere: create a new key in GCP, update **`GOOGLE_PRIVATE_KEY`** in `.env.local` and Vercel, redeploy.
6. In **Google Cloud → IAM → Service Accounts → Keys**, **delete** the old key.

**Env template (placeholders only):**

```bash
GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CALENDAR_ID=5993064f1fe3cc1b61da058efb4240a8744a87beaba96045845cebbe688d549d@group.calendar.google.com
GOOGLE_CLIENT_EMAIL=howe-sound-dj-calendar@howe-sound-dj.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPASTE_NEW_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=howe-sound-dj
```

## 4. Vercel environment variables

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Add Resend, Turnstile, contact email, and (when ready) Google Calendar vars for **Production** (and Preview if you test real email there). Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` when you want GA4.
3. Redeploy after changing vars so the runtime picks them up.

## 5. Deploy flow

1. Connect the repo to Vercel (or push to the connected branch).
2. Run **`npm run build`** locally before pushing if you want a quick sanity check.
3. Confirm the production deployment finishes without errors.
4. Assign the production domain (`www.howesounddj.com` / apex as you prefer) in Vercel → **Domains**.

## 6. Post-deploy: `/contact` availability & inquiry (required)

Run after every production deploy that touches **`/contact`**, **`/api/availability`**, **`/api/contact`**, **`booked-dates`**, or env vars.

| Check | How |
|-------|-----|
| **Page loads** | Open **`https://www.howesounddj.com/contact`** — no blank page. |
| **Date check** | With Google on: add/remove an event on the **dedicated bookings** calendar and confirm open vs held. With Google off: use **`booked-dates.ts`** only. |
| **Booked path** | Date blocked in Google and/or listed in **`booked-dates.ts`** → unavailable message + **Book a Consult** (Calendly). |
| **Calendly** | **Book a Consult** opens `https://calendly.com/patrick-howesounddj` in a new tab. |
| **Inquiry send** | With an available date, submit the form — success message; email arrives at `CONTACT_TO_EMAIL` with **Reply-To** = couple’s email. |
| **Turnstile** | If keys are set, widget renders; submit fails without completing the check. |
| **Mobile** | Same checks on a phone — date input, buttons, and form usable. |

**Operator setup (Google):** Share the dedicated calendar with **`howe-sound-dj-calendar@howe-sound-dj.iam.gserviceaccount.com`**, enable the Calendar API on project **`howe-sound-dj`**, set env vars (see checklist above), redeploy.

**Operator note:** Keep **`booked-dates.ts`** in sync during rollout or as a backup list (YYYY-MM-DD).

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
