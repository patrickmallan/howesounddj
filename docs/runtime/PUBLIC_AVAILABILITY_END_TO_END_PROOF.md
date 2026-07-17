# Public Availability End-to-End Proof

**Verdict:** `PASS_PUBLIC_AVAILABILITY_INCIDENT_FULLY_SEALED`  
**Deployment commit:** `748408a`  
**Production origin:** `https://www.howesounddj.com`  
**Sealed at (UTC):** `2026-07-17T03:42:48Z` (post-deploy curl verification)

## Production API checks — VERIFIED

```bash
curl -sS -X POST "https://www.howesounddj.com/api/availability" \
  -H "Content-Type: application/json" \
  -d '{"date":"2027-07-31"}'

curl -sS -X POST "https://www.howesounddj.com/api/availability" \
  -H "Content-Type: application/json" \
  -d '{"date":"2027-08-07"}'

curl -sS -X POST "https://www.howesounddj.com/api/availability" \
  -H "Content-Type: application/json" \
  -d '{"date":"2028-06-15"}'
```

Expected `result`: `UNAVAILABLE`, `UNAVAILABLE`, `AVAILABLE`.

**Live results (post-deploy):**

| Date | result |
|------|--------|
| 2027-07-31 | UNAVAILABLE |
| 2027-08-07 | UNAVAILABLE |
| 2028-06-15 | AVAILABLE |

Response headers: `Cache-Control: no-store, max-age=0, must-revalidate`

## Browser

1. Open `https://www.howesounddj.com/contact`
2. Check dates 2027-07-31 and 2027-08-07 → unavailable copy
3. Network tab: POST `/api/availability` only — no `googleapis.com` or `calendar.google.com`
4. Operator email subject matches visitor result

## Mobile Safari

Repeat contact form check on iPhone: date fields usable, checking state, result readable, date change resets state.
