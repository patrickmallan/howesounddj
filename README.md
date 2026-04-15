# Howe Sound DJ — site

Next.js app for [howesounddj.com](https://www.howesounddj.com) — wedding DJ positioning, packages, and **first-party availability** on **`/contact`**: date check via **`/api/availability`** (primary: **Google Calendar** dedicated bookings calendar; fallback / merge: **`src/data/booked-dates.ts`**), inquiry email via **Resend**, **Cloudflare Turnstile**, and optional **Book a Consult** via [Calendly](https://calendly.com/patrick-howesounddj).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy **`env.example`** to **`.env.local`** for local testing (never commit `.env.local` or real keys).

| Concern | Notes |
|--------|--------|
| **Resend** | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — required for `/api/contact` to send mail. |
| **Turnstile** | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — required for the inquiry form to verify and send. |
| **GA4** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional. If unset, no analytics scripts load. |
| **Google Calendar** | Server-only — see **`env.example`** and the rollout section below. **`src/data/booked-dates.ts`** still applies when Google is off, fails, or alongside Google (merge protection during rollout). |

See **`docs/LAUNCH_CHECKLIST.md`** for Vercel, post-deploy checks, and Search Console.

### Google Calendar — remaining manual steps

1. **Local:** Copy **`env.example`** → **`.env.local`** and set real values (no secrets in git).
2. **Vercel:** Add the same variables under **Project → Settings → Environment Variables** for Production (and Preview if needed).
3. **Calendar:** Add a **test event** on the dedicated bookings calendar for a specific day you can type into `/contact`.
4. **Verify:** On **`/contact`**, run **Check Availability** for a day with the test event (unavailable) and a clear day (available).
5. **Rotate key:** If the service account private key was ever exposed, create a **new** key in Google Cloud, update **`GOOGLE_PRIVATE_KEY`** locally and in Vercel, redeploy.
6. **Delete old key:** In **IAM → Service Accounts → Keys**, **delete** the old exposed key so it can no longer authenticate.

**Dedicated integration (non-secret IDs — runtime still reads from env only):**

| | |
|--|--|
| **Project** | `howe-sound-dj` (`GOOGLE_PROJECT_ID`) |
| **Calendar ID** | `5993064f1fe3cc1b61da058efb4240a8744a87beaba96045845cebbe688d549d@group.calendar.google.com` |
| **Service account** | `howe-sound-dj-calendar@howe-sound-dj.iam.gserviceaccount.com` |

**Copy-paste template (placeholders only — paste a real key from GCP, not from chat):**

```bash
GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CALENDAR_ID=5993064f1fe3cc1b61da058efb4240a8744a87beaba96045845cebbe688d549d@group.calendar.google.com
GOOGLE_CLIENT_EMAIL=howe-sound-dj-calendar@howe-sound-dj.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPASTE_NEW_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=howe-sound-dj
```

## Analytics (GA4)

When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, the app loads **gtag.js** and sends **page views** on navigation. Custom events from the inquiry form:

| Event | When |
|-------|------|
| `contact_form_submit_attempt` | After validation passes and the request is about to send. |
| `contact_form_submit_success` | After the API returns success and the inquiry is accepted. |
| `contact_form_submit_error` | Failed send, validation, network, or Turnstile not ready (see parameters). |

In **Google Analytics 4** → **Admin** → **Events**, mark `contact_form_submit_success` as a **conversion** if you want it in standard reports.

To see **Vancouver landing** traffic: **Reports** → **Engagement** → **Pages and screens** and filter by path **`/vancouver-wedding-dj`**.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (includes TypeScript check) |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Launch & cutover

- **`docs/LAUNCH_CHECKLIST.md`** — Vercel, Resend, Turnstile, GA4, Google Calendar, `/contact` QA, OG/images, rollback.
- **`docs/WIX_MIGRATION.md`** — Legacy URL → new route mapping and Wix cutover notes.

## Stack

Next.js, React, Tailwind CSS, Resend (contact API), Cloudflare Turnstile, Google Calendar API (optional), optional GA4.
