# HSO-WEB-P02 — Google Site Name Alignment

**Tranche ID:** `HSO-WEB-P02_GOOGLE_SITE_NAME_ALIGNMENT`  
**Generated (UTC):** 2026-07-18T15:39:21Z  
**Completion evidence status:** `IMPLEMENTED_AND_VALIDATED_LOCALLY`

## Summary

Aligned canonical site-identity signals to the approved public name **Howe Sound Wedding DJ** via centralized brand configuration, homepage-only `WebSite` JSON-LD, Organization name alignment, homepage title/social metadata, explicit `og:site_name`, and minimal visible brand updates in header, footer, and homepage brand anchor.

## HSO-WEB-P01 non-interference

HSO-WEB-P01 `/about` internal-link changes remain present in the workspace (`src/app/packages/page.tsx`, `src/app/contact/page.tsx`, `tests/about-internal-link-promotion.test.ts`). They were not modified, removed, or attributed to this tranche.

## Key implementation decisions

1. **Centralized brand config** — `src/config/site-brand.ts` owns `SITE_PUBLIC_NAME`, alternates, homepage title, and origin.
2. **WebSite JSON-LD on homepage only** — `websiteJsonLd()` emitted from `src/app/page.tsx`; Organization remains in root layout.
3. **Internal page titles preserved** — layout title template still uses shorter `SITE_SHORT_NAME` (`Howe Sound DJ`).
4. **og:site_name workaround** — Next.js 16 did not render `openGraph.siteName` into HTML; explicit `<meta property="og:site_name">` added in root layout `<head>`.
5. **No LocalBusiness** — none existed; none added.

## Manual external schema validation

External validator not run in this execution.

1. Deploy to production.
2. Open [validator.schema.org](https://validator.schema.org/).
3. Paste `https://www.howesounddj.com/` or the rendered homepage HTML.
4. Confirm one `WebSite` entity with `name: Howe Sound Wedding DJ` and valid `alternateName`.

## Operator next steps

1. Review diff.
2. Deploy via Vercel production workflow.
3. Follow Search Console steps in final report.
4. Allow recrawl time; do not expect immediate Google site-name adoption.
