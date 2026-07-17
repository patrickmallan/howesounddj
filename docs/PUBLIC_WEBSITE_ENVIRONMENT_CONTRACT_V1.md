# Public Website Environment Contract v1

**Tranche:** HSDJ-WEB-AVAIL-01-R1  
**Repository:** `patrickmallan/howesounddj`  
**Runtime:** Vercel project `patrickmallans-projects/howesounddj` → `https://www.howesounddj.com`

## Authority model

- **Google Calendar:** owned exclusively by **HSDJ Operations** (`https://ops.howesounddj.com`). The public website must not hold Google Calendar credentials and must not query Google Calendar directly.
- **Public availability:** browser → `POST /api/availability` (same origin) → `checkPublicAvailability()` → `GET` HSDJ Operations `/api/availability?date=YYYY-MM-DD`.

## Variables (names only)

| Variable | Classification | Production | Preview | Development | Browser-visible | Server-only | Canonical owner | Rotation owner | Permitted on public website Vercel |
|----------|----------------|------------|---------|-------------|-----------------|-------------|-----------------|----------------|-------------------------------------|
| `HSDJ_OPERATIONS_AVAILABILITY_API_URL` | Availability upstream URL (full path) | Optional (default ops URL) | Optional | Optional | No | Yes | Website deploy config | HSDJ Operations + website release | Yes |
| `HSDJ_OPERATIONS_API_BASE_URL` | Availability upstream base (alternative to full URL) | Optional | Optional | Optional | No | Yes | Website deploy config | HSDJ Operations + website release | Yes |
| `RESEND_API_KEY` | Inquiry + availability operator email | Required for email | As needed | As needed | No | Yes | Website / operator | Operator (Resend) | Yes |
| `CONTACT_TO_EMAIL` | Operator inbox | Required for email | As needed | As needed | No | Yes | Operator | Operator | Yes |
| `CONTACT_FROM_EMAIL` | Verified Resend sender | Required for email | As needed | As needed | No | Yes | Operator | Operator | Yes |
| `TURNSTILE_SITE_KEY` | Turnstile site key (server + widget) | Required for inquiry | As needed | As needed | No* | Yes | Cloudflare / operator | Operator | Yes |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (client fallback) | Optional | Optional | Optional | Yes | No | Cloudflare / operator | Operator | Yes |
| `TURNSTILE_SECRET_KEY` | Turnstile verification | Required for inquiry | As needed | As needed | No | Yes | Cloudflare / operator | Operator | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID | Optional | Optional | Optional | Yes | No | Operator (GA4) | Operator | Yes |

\* Widget may read `NEXT_PUBLIC_TURNSTILE_SITE_KEY` when set; otherwise server `TURNSTILE_SITE_KEY` is passed at render time on `/contact`.

## Explicitly not permitted on the public website

| Variable (examples) | Classification | Notes |
|---------------------|----------------|-------|
| `GOOGLE_CALENDAR_ENABLED` | **OBSOLETE** (website) | Removed from website Vercel — calendar authority is Operations-only. |
| `GOOGLE_CALENDAR_ID` | **OBSOLETE** (website) | Same. |
| `GOOGLE_CLIENT_EMAIL` | **OBSOLETE** (website) | Same. |
| `GOOGLE_PRIVATE_KEY` | **OBSOLETE** (website) | Same. |
| `GOOGLE_PROJECT_ID` | **DOCUMENTATION_ONLY** (website) | Never required by website runtime; Operations may use GCP project references. |
| `GOOGLE_*` OAuth / refresh tokens | **FORBIDDEN** (website) | Must not be added to this Vercel project for availability. |

## Source references

| Concern | Module |
|---------|--------|
| Availability client | `src/lib/check-public-availability.ts` |
| Same-origin route | `src/app/api/availability/route.ts` |
| Operator notification | `src/lib/availability-notification.ts` |
| Contact / Turnstile | `src/app/api/contact/route.ts` |
| Analytics | `src/lib/analytics.ts`, `src/components/google-analytics.tsx` |

## Local files

- **`.env.local`:** operator machine only; gitignored. Must not contain website Google Calendar credentials after R1 cleanup.
- **`env.example`:** names and placeholders only; must match this contract.

## Related contracts

- `docs/PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md`
