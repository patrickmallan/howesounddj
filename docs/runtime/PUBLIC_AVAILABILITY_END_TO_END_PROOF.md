# Public Availability End-to-End Proof

Run after deploy to `https://www.howesounddj.com`.

## Production API checks

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

## Browser

1. Open `https://www.howesounddj.com/contact`
2. Check dates 2027-07-31 and 2027-08-07 → unavailable copy
3. Network tab: POST `/api/availability` only — no `googleapis.com` or `calendar.google.com`
4. Operator email subject matches visitor result

## Mobile Safari

Repeat contact form check on iPhone: date fields usable, checking state, result readable, date change resets state.
