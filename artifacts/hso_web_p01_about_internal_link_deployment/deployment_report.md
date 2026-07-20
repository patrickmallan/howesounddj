# HSO-WEB-P01D — Production Deployment and Verification

**Tranche ID:** `HSO-WEB-P01D_ABOUT_INTERNAL_LINK_PRODUCTION_DEPLOYMENT_AND_VERIFICATION`  
**Generated (UTC):** 2026-07-18T16:35:30Z  
**Overall status:** `DEPLOYED_AND_VERIFIED`

## Deployment

| Field | Value |
|-------|-------|
| Command | `npx vercel --prod --yes` |
| Exit code | 0 |
| Deployment ID | `dpl_5qDXgDKXnUyvEjauFbUmDPdYcZJX` |
| Deployment URL | `https://howesounddj-mhg1k5i05-patrickmallans-projects.vercel.app` |
| Production alias | `https://www.howesounddj.com` |

## Source integrity

P01-authorized files reconcile to certified hashes. `src/app/page.tsx` differs from the P01 manifest unchanged hash because of the subsequent P02 site-name commit on `main`; this is not a P01 regression.

## Production link verification

| Route | Anchor | Destination | Result |
|-------|--------|-------------|--------|
| `/` | Full story on About | `/about` | PASS |
| `/packages` | Meet the person behind Howe Sound DJ | `/about` | PASS |
| `/contact` | Read about Patrick's approach | `/about` | PASS |

## Rollback

Prior production deployment: `dpl_3vZn4SW5Qd4Z7SUj5QYnyDEXZYwu`  
Rollback via Vercel dashboard promote or redeploy prior commit.

## Operator next step

Record completion in HSDJ SEO Intelligence using these artifacts. Begin observation window per `oplan-318379784edd5ad9`.
