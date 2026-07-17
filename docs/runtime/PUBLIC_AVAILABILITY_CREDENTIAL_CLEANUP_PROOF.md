# Public Availability Credential Cleanup Proof — HSDJ-WEB-AVAIL-01-R1

**Pre-cleanup repository commit:** `fc9c0d0`  
**Vercel team:** `patrickmallans-projects`  
**Vercel project:** `howesounddj` (`prj_tpdUuC3ojT7pT4vSeJqYc2qAbi5y`)  
**Production alias:** `https://www.howesounddj.com`

## Pre-removal deployment baseline

| Field | Value |
|-------|-------|
| Deployment ID | `dpl_FNxfhou5e2zVDNeG8iDb4rUbVSZD` |
| Deployment URL | `https://howesounddj-rivstz0cr-patrickmallans-projects.vercel.app` |
| Status | Ready (production) |
| Source commit (repo HEAD at tranche start) | `fc9c0d0` |

### Production availability (pre-removal)

| Date | Expected | Observed `result` |
|------|----------|-------------------|
| 2027-07-31 | UNAVAILABLE | UNAVAILABLE |
| 2027-08-07 | UNAVAILABLE | UNAVAILABLE |
| 2027-07-28 | AVAILABLE | AVAILABLE |

Website route response headers included `cache-control: no-store, max-age=0, must-revalidate`.

## Variables removed (public website Vercel only)

Removed from Production, Preview, and Development:

- `GOOGLE_CALENDAR_ENABLED`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## Variables retained on public website Vercel

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Static consumption proof

- No `process.env.GOOGLE*` references under `src/`.
- No `googleapis` dependency in `package.json`.
- Deleted modules remain absent: `src/lib/google-calendar.ts`, `src/data/booked-dates.ts`.

## Post-removal deployment

| Field | Value |
|-------|-------|
| Deployment ID | `dpl_DmZiUod4tLsBHQ75VRvcLEQN1nXB` |
| Deployment URL | `https://howesounddj-i9t5gowbo-patrickmallans-projects.vercel.app` |
| Production alias | `https://www.howesounddj.com` |
| Build result | Ready (Next.js 16.2.3 production build succeeded) |
| Vercel env | No `GOOGLE_*` calendar variables remain |

### Production availability (post-removal)

| Date | Expected | Observed `result` |
|------|----------|-------------------|
| 2027-07-31 | UNAVAILABLE | UNAVAILABLE |
| 2027-08-07 | UNAVAILABLE | UNAVAILABLE |
| 2027-07-28 | AVAILABLE | AVAILABLE |
| `not-a-date` (fail-closed) | MANUAL_CONFIRMATION_REQUIRED | MANUAL_CONFIRMATION_REQUIRED |

### Operator notification

Notification uses `sendAvailabilityCheckNotification` with `Authority: HSDJ Operations Availability API` in the email body (same governed result as the visitor). Inbox delivery is via production `RESEND_API_KEY` (not re-verified in this automated pass).

### Bundle proof

Production `.next/server` output contains no `GOOGLE_CALENDAR`, `GOOGLE_PRIVATE_KEY`, `google-calendar`, or `googleapis` references (stale `.next/dev` cache may retain pre-cutover artifacts locally only).
