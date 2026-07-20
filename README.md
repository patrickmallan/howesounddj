# Howe Sound DJ — site

Next.js app for [howesounddj.com](https://www.howesounddj.com) — wedding DJ positioning, packages, and **first-party availability** on **`/contact`**: date check via same-origin **`/api/availability`** (server proxy to **[HSDJ Operations](https://ops.howesounddj.com/api/availability)** — no Google Calendar credentials on this site), inquiry email via **Resend**, **Cloudflare Turnstile**, and optional **Book a Sound Check** via [Calendly](https://calendly.com/patrick-howesounddj/sound-check).

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
| **Availability** | Optional `HSDJ_OPERATIONS_AVAILABILITY_API_URL` — defaults to Operations production API. Google Calendar credentials belong only in **HSDJ Operations**, not this repo. |

See **`docs/LAUNCH_CHECKLIST.md`**, **`docs/PUBLIC_WEBSITE_ENVIRONMENT_CONTRACT_V1.md`**, and **`docs/PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md`** for Vercel, post-deploy checks, and Search Console.

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
