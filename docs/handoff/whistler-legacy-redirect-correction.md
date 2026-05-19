# Whistler legacy redirect correction — handoff

**Tranche:** Correct `/whistler-dj-services` legacy mapping  
**Date:** 2026-05-19  
**Repo:** `howesounddj`

---

## File inspected

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js permanent redirects (`redirects()` export) |
| `vercel.json` | Not present — redirects are not configured elsewhere |

---

## Redirect rule found

In `next.config.ts` under `async redirects()`:

| Source | Old destination | New destination | Permanent |
|--------|-----------------|-----------------|-----------|
| `/whistler-dj-services` | `/weddings` | `/whistler-wedding-dj` | yes (308) |
| `/whistler-dj-services/` | `/weddings` | `/whistler-wedding-dj` | yes (308) |

---

## Conflict check

| Path | Status |
|------|--------|
| `/whistler-dj-services` | Redirects directly to `/whistler-wedding-dj` (single hop) |
| `/whistler-wedding-dj` | Live page — no redirect rule |
| `/weddings` | Live page — unrelated to this legacy URL |

**Related legacy rule (unchanged this tranche):**

| Source | Destination |
|--------|-------------|
| `/whistler-wedding-dj-services` | `/weddings` |
| `/whistler-wedding-dj-services/` | `/weddings` |

No redirect chain is introduced: `/whistler-dj-services` → `/whistler-wedding-dj` in one step.

---

## Validation results

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit   # pass
npx eslint .       # pass
npm run build      # pass
```

### Local redirect verification

```bash
npm run start
curl -I http://localhost:3000/whistler-dj-services
```

**Result (2026-05-19):**

```
HTTP/1.1 308 Permanent Redirect
location: /whistler-wedding-dj
```

Trailing-slash URL (`/whistler-dj-services/`) hits Next.js trailing-slash normalization first (`→ /whistler-dj-services`), then the legacy rule (`→ /whistler-wedding-dj`). That two-hop pattern predates this change and matches other legacy rules in `next.config.ts`. The canonical legacy URL without a trailing slash is a single permanent redirect.

---

## Production verification (after deploy)

```bash
curl -I https://www.howesounddj.com/whistler-dj-services
```

**Expected:**

```
HTTP/1.1 308 Permanent Redirect
location: https://www.howesounddj.com/whistler-wedding-dj
```

(or `location: /whistler-wedding-dj`)

Also verify trailing slash:

```bash
curl -I https://www.howesounddj.com/whistler-dj-services/
```

---

## Acceptance criteria

- [x] `/whistler-dj-services` no longer redirects to `/weddings`
- [x] `/whistler-dj-services` redirects directly to `/whistler-wedding-dj`
- [x] No redirect chain
- [x] Build, lint, and types pass
- [x] Only redirect configuration changed
