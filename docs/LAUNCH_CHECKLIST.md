# Launch checklist — Howe Sound DJ

Practical steps to deploy [howesounddj.com](https://www.howesounddj.com) on Vercel with Resend inquiry email and cut over from Wix. Production URL: **https://www.howesounddj.com**.

---

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the contact form to send mail locally, add the variables from `env.example` to `.env.local` (never commit secrets).

## 3. Required environment variables

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives inquiries (e.g. `patrick@howesounddj.com`) |
| `CONTACT_FROM_EMAIL` | Verified sender on your domain (e.g. `hello@howesounddj.com`) |

See **`env.example`** for placeholders. Missing any of these in production causes the API to return a **503** — the form will not claim success.

## 4. Resend: domain and sender

1. In [Resend](https://resend.com), verify the **howesounddj.com** domain (DNS records they provide).
2. Use `CONTACT_FROM_EMAIL` only from that verified domain. Unverified addresses are rejected; this is not a code bug.

## 5. Vercel environment variables

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` for **Production** (and Preview if you test previews with real email).
3. Redeploy after changing vars so the runtime picks them up.

## 6. Deploy flow

1. Connect the repo to Vercel (or push to the connected branch).
2. Run **`npm run build`** locally before pushing if you want a quick sanity check.
3. Confirm the production deployment finishes without errors.
4. Assign the production domain (`www.howesounddj.com` / apex as you prefer) in Vercel → **Domains**.

## 7. Post-deploy: contact form verification

Use this after every production deploy that touches `/api/contact` or env vars.

### Successful submit

1. Open **`/contact`** on **production** (not only localhost).
2. Fill all required fields with realistic test data; submit.
3. You should see the site’s success state (no generic error).

### Validation failure

1. Leave a required field empty or enter an invalid email.
2. Submit — you should see field-level errors and **no** success message.

### Confirm delivery

1. Check **patrick@howesounddj.com** (Gmail) for the inquiry within a few minutes.
2. Subject should clearly identify a Howe Sound DJ inquiry.

### Reply-To

1. In Gmail, open the test inquiry and hit **Reply**.
2. The reply should go to the couple’s email from the form, not to the Resend “from” address.

### If env vars are missing in production

- The API returns **503** with a calm message that delivery isn’t configured.
- The UI should **not** show a generic “success” for a delivered lead — treat 503 as “fix Vercel env and redeploy.”

---

## 8. Images and Open Graph

- Final photography: `public/images/` and `src/config/site-images.ts`.
- Default share image: `public/og-default.svg`. For best social previews, replace with a **1200×630** JPG/PNG and update `openGraph.images` in `src/app/layout.tsx` if the filename changes.

## 9. Wix redirect / cutover

- Map legacy Wix URLs to the new routes (see **`docs/WIX_MIGRATION.md`**).
- Configure **301 redirects** at the host/CDN layer before or as you point traffic to Vercel.
- After cutover, submit `sitemap.xml` in Google Search Console.

## 10. Rollback mindset

- Vercel keeps deployment history: you can **promote a previous deployment** if something breaks post-release.
- If only env vars are wrong, fix vars and redeploy — no need to revert code.
- Keep Wix DNS/hosting notes until you’ve verified production for 24–48 hours.

---

## Local quality checks (optional)

```bash
npm run lint
npm run build
```
