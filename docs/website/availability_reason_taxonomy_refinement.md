# Availability reason taxonomy refinement

## Objective

Make server-side diagnostic logs deterministically classify dates blocked only by `BOOKED_DATES` as **`BLOCKED_BY_MANUAL_DATE`** instead of **`UNKNOWN`**, while preserving visitor-visible availability behavior and public API responses.

## Files changed

| File | Change |
|------|--------|
| `src/lib/availability-reason.ts` | Added **`BLOCKED_BY_MANUAL_DATE`** to **`AvailabilityDiagnosticReason`**. |
| `src/app/api/availability/route.ts` | Refined **`logAvailabilityReason`** precedence; merge logic and JSON responses unchanged. |

## Reason precedence (log-only `availability_reason`)

Applied after successful date validation ( **`INVALID_DATE`** is emitted only in early validation branches).

| Order | Reason | When |
|------:|--------|------|
| — | `INVALID_DATE` | Request body invalid / empty date / failed `isValidCalendarDate` (existing early logs). |
| 1 | `CALENDAR_QUERY_ERROR` | `google_booked_flag === null` and Google diagnostics report API failure. |
| 2 | `BLOCKED_BY_ALL_DAY_EVENT` | Google reports busy with all-day classification. |
| 3 | `BLOCKED_BY_OVERLAP` | Google reports busy with timed overlap classification. |
| 4 | `BLOCKED_BY_MANUAL_DATE` | `manual_booked === true` and Google is not treating the day as busy (`google_booked_flag === false` or `null`), and **not** already classified as `CALENDAR_QUERY_ERROR`. |
| 5 | `AVAILABLE_NO_EVENTS` | Final merged outcome is **available** (`final_booked === false`). |
| 6 | `UNKNOWN` | Fallback only (e.g. unexpected `google_internal_reason` while Google reports busy). |

## Before vs after

| Scenario | Before | After |
|----------|--------|--------|
| Manual list blocks, Google empty / disabled / free | Often **`UNKNOWN`** | **`BLOCKED_BY_MANUAL_DATE`** |
| Google overlap or all-day blocks (even if manual also lists date) | **`BLOCKED_BY_*`** | Unchanged |
| Google Calendar API error (`CALENDAR_QUERY_ERROR`) | **`CALENDAR_QUERY_ERROR`** | Unchanged (still precedes manual-only label when applicable) |
| Final slot available | **`AVAILABLE_NO_EVENTS`** | Unchanged |

## Validation commands executed

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Public behavior confirmation

- **`mergeBooked` / availability merge** — unchanged.
- **HTTP response bodies** (`success`, `available`, `message`) — unchanged.
- **Diagnostic log field names and structure** (`[availability] diagnostic` payload) — unchanged except **`availability_reason`** values now follow the table above.
- **Frontend, Calendar query module, analytics** — not modified in this change set.
