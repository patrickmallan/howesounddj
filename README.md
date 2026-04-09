# Howe Sound DJ — site

Next.js app for [howesounddj.com](https://www.howesounddj.com) — wedding DJ positioning, packages, and inquiry contact form (email via **Resend**).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment (inquiry email)

Copy **`env.example`** to **`.env.local`** and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Without them, `/api/contact` will not send mail (see launch doc).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (includes TypeScript check) |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Launch & cutover

- **`docs/LAUNCH_CHECKLIST.md`** — Vercel, Resend, env vars, contact-form verification, OG/images, rollback.
- **`docs/WIX_MIGRATION.md`** — Legacy URL → new route mapping and Wix cutover notes.

## Stack

Next.js, React, Tailwind CSS, Resend (contact API).
