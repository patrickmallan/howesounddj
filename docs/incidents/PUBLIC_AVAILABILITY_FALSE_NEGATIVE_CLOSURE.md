# Public Availability False-Negative Closure

**Tranche:** HSDJ-WEB-AVAIL-01  
**Status:** Remediated (pending production deploy verification)

## Incident

| Date | Public (legacy) | Operations API | Calendar |
|------|-----------------|----------------|----------|
| 2027-07-31 | available | UNAVAILABLE | Confirmed all-day wedding |
| 2027-08-07 | available | UNAVAILABLE | Confirmed all-day wedding |

## Root cause

The public Next.js site at `~/Desktop/howesounddj` (deployed to **Vercel** → `https://www.howesounddj.com`) used a **duplicate availability authority**:

1. Static `BOOKED_DATES` list (incident dates not listed)
2. Service-account Google Calendar query (`src/lib/google-calendar.ts`)

When Google returned `null` (disabled, misconfigured, or wrong credentials) and the date was absent from `BOOKED_DATES`, the merge logic returned **available**.

Operations (`ops.howesounddj.com`) already held the correct canonical evaluator (HSO-08A-R1).

## Correction

- Replaced website `/api/availability` with same-origin proxy to Operations API
- Removed legacy Google Calendar + `BOOKED_DATES` availability paths
- Visitor UI and operator email now share one `NormalizedPublicAvailability` object
- Fail-closed on all uncertainty

## Platform facts

| Item | Value |
|------|-------|
| Repository | `~/Desktop/howesounddj` |
| Framework | Next.js 16 |
| Host | Vercel |
| Canonical origin | `https://www.howesounddj.com` (apex redirects to www) |
| Form | `/contact` — `ContactAvailabilityForm` + header `CompactAvailabilityChecker` |

## Not Wix

Historical docs referenced Wix migration. **Live stack is first-party Next.js on Vercel.** Wix is not the active availability owner.
