# Public Availability Integration Contract v1

**Tranche:** HSDJ-WEB-AVAIL-01  
**Authority:** `https://ops.howesounddj.com/api/availability` (HSDJ Operations)

## Topology

**Same-origin website proxy (canonical)**

```
Visitor browser
  → POST https://www.howesounddj.com/api/availability  { "date": "YYYY-MM-DD" }
  → Website server (Next.js route)
  → GET https://ops.howesounddj.com/api/availability?date=YYYY-MM-DD
  → Normalized result object
  → Visitor message + operator Resend notification (same object)
```

No browser cross-origin call. No Google Calendar credentials on the website.

## Website client

| Module | Role |
|--------|------|
| `src/lib/check-public-availability.ts` | `checkPublicAvailability(date)` — canonical server client |
| `src/lib/public-availability-contract.ts` | Result types and public copy |
| `src/app/api/availability/route.ts` | Same-origin proxy + notification |
| `src/lib/availability-check-client.ts` | Browser form client (POST to same-origin route only) |

## Fail-closed rules

`AVAILABLE` only when:

- Operations responds successfully (HTTP 200)
- `result === "AVAILABLE"`
- `date` in response equals requested date

All other conditions → `MANUAL_CONFIRMATION_REQUIRED`.

## Public copy (aligned with Operations)

| Result | Message |
|--------|---------|
| AVAILABLE | Your date currently appears available. Submit an inquiry to continue. |
| UNAVAILABLE | That date is currently unavailable. Please check another date or contact us. |
| MANUAL_CONFIRMATION_REQUIRED | We couldn't confirm availability automatically. Please contact us directly. |

## Environment

| Variable | Required | Notes |
|----------|----------|-------|
| `HSDJ_OPERATIONS_AVAILABILITY_API_URL` | Production | Defaults to `https://ops.howesounddj.com/api/availability` |
| `RESEND_API_KEY` | For operator email | Same as contact form |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | For operator email | Same as contact form |

**Removed from website:** `GOOGLE_*` calendar credentials, `BOOKED_DATES` manual list for availability.

## Caching

`Cache-Control: no-store` on website route and upstream client fetch.
