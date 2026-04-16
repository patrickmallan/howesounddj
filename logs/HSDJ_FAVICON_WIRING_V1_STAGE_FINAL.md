# HSDJ_FAVICON_WIRING_V1 — Stage FINAL

**Pack ID:** HSDJ_FAVICON_WIRING_V1  
**Commit (at verification):** `390fef8e2259491e89684e3edb8508c465d82377`

## 1. Favicon issue description (IH fallback)

Browsers and caches often keep a **generic or stale favicon** (e.g. a default **“IH”** placeholder from hosting/tooling) when the app relies only on **implicit** discovery. Explicit **`metadata.icons`** ties the document head to **`/favicon.ico`** and **`/icon.png`** so the correct assets are emitted consistently and are easier to reason about after deploys.

## 2. Files present (favicon.ico, icon.png)

| Asset | Location |
|-------|----------|
| `favicon.ico` | `src/app/favicon.ico` (served at `/favicon.ico`) |
| `icon.png` | `src/app/icon.png` (served at `/icon.png`; Next build lists `/icon.png` as a static route) |

Assets were **not** redesigned in this pass; only wiring changed.

## 3. Metadata wiring implementation

In `src/app/layout.tsx`, inside the existing `export const metadata: Metadata = { ... }` object, an **`icons`** block was added:

```ts
icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/icon.png",
},
```

Paths are **root-absolute** (`/…`) as required. No second `metadata` export; **`metadataBase`**, **title**, **description**, **openGraph**, **twitter**, and **robots** are unchanged.

## 4. File modified

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Added `icons` to `metadata` |

## 5. Validation steps and results

| Step | Result |
|------|--------|
| `rg -n "icons:" src/app/layout.tsx` | `icons:` present |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 6. Cache behavior notes

- **Hard refresh** (e.g. Cmd+Shift+R) or **Incognito** helps confirm the new link tags without old favicon cache.
- **Safari / iOS** may cache aggressively; **apple** icon in metadata targets home-screen / Apple contexts using `/icon.png`.
- After deploy, if an old icon persists locally, try incognito or clear site data for the domain.

## 7. Non-regression confirmation

This pass did **not** impact:

- **SEO metadata** — `title`, `description`, `metadataBase`, `robots` unchanged.
- **Open Graph tags** — `openGraph` block unchanged.
- **Twitter card metadata** — `twitter` block unchanged.
- **Page rendering** — `RootLayout` JSX unchanged; only `metadata` gained `icons`.
- **Routing or layout structure** — no file moves; `favicon.ico` and `icon.png` remain under `src/app/`.

---

**Success:** Favicon behavior is **explicitly declared** via `metadata.icons` using `/favicon.ico` and `/icon.png`, reducing reliance on implicit detection and aligning tab/home-screen behavior across clients after caches refresh.
