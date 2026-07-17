# HSDJ-WEB-AVAIL-01-R1 — Obsolete Website Google Credential Removal

## Objective

Remove obsolete Google Calendar environment variables from the **public website** Vercel project after availability cutover to HSDJ Operations (`docs/PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md`).

## Operator summary

1. Website code already uses Operations-only availability (no direct Google Calendar).
2. R1 removed legacy `GOOGLE_*` calendar variables from Vercel project `howesounddj`.
3. HSDJ Operations retains all Google Calendar credentials — **no changes** in `HSDJ_Operations`.

## Artifacts

| Document | Purpose |
|----------|---------|
| `docs/PUBLIC_WEBSITE_ENVIRONMENT_CONTRACT_V1.md` | Canonical env contract |
| `docs/runtime/PUBLIC_AVAILABILITY_CREDENTIAL_CLEANUP_PROOF.md` | Pre/post proof table |
| `docs/PUBLIC_AVAILABILITY_INTEGRATION_CONTRACT_V1.md` | Integration topology (updated R1 note) |

## Validation commands (public website)

```bash
npm run security:secrets
npm run typecheck
npm run lint
npm test
npm run build
```

Production smoke (no secrets in output):

```bash
curl -sS -X POST "https://www.howesounddj.com/api/availability" \
  -H "Content-Type: application/json" -d '{"date":"2027-07-31"}'
```

## Supersedes

Stale Google Calendar setup sections in `README.md` and `docs/LAUNCH_CHECKLIST.md` (updated in R1 milestone commit).
