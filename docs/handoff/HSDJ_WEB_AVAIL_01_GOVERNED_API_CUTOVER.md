# HSDJ-WEB-AVAIL-01 — Governed API Cutover Handoff

## Summary

Cut over public Check Availability to HSDJ Operations governed API via same-origin proxy.

## Operator actions

1. Set `HSDJ_OPERATIONS_AVAILABILITY_API_URL=https://ops.howesounddj.com/api/availability` in Vercel (optional — default matches)
2. Remove obsolete `GOOGLE_CALENDAR_*` env vars from website Vercel project if no longer needed
3. Deploy sealed commit
4. Run production proof commands in `docs/runtime/PUBLIC_AVAILABILITY_END_TO_END_PROOF.md`

## Files created

- `src/lib/public-availability-contract.ts`
- `src/lib/check-public-availability.ts`
- `src/lib/availability-notification.ts`
- `tests/public-availability.test.ts`
- `vitest.config.ts`
- `scripts/security-secrets-scan.mjs`
- `docs/PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md`
- `docs/incidents/PUBLIC_AVAILABILITY_FALSE_NEGATIVE_CLOSURE.md`
- `docs/runtime/PUBLIC_AVAILABILITY_END_TO_END_PROOF.md`

## Files modified

- `src/app/api/availability/route.ts`
- `src/lib/availability-check-client.ts`
- `src/components/contact-availability-form.tsx`
- `src/components/compact-availability-checker.tsx`
- `src/lib/analytics.ts`
- `env.example`
- `package.json`

## Files deleted

- `src/lib/google-calendar.ts`
- `src/data/booked-dates.ts`
- `src/lib/availability-reason.ts`

## HSDJ Operations

No changes required for this tranche (CORS not needed with same-origin proxy).
