# HSDJ_CONTACT_EMAIL_DELIVERY_FIX_V1 — Stage FINAL

## 1. Root cause found

**Resend Node SDK v6** (`resend` ^6.10.0) returns **`{ data, error, headers }`** from `emails.send()` and **does not throw** on typical API failures (invalid `from`, unverified domain, quota, etc.). The previous `/api/contact` handler only used **`try/catch`** around `await resend.emails.send(...)`, so when Resend returned **`error`** with **`data: null`**, the route **skipped the catch**, assumed success, and returned **`success: true`** to the client **without delivering mail**.

That matches “form succeeds but no email” behavior.

## 2. Environment variables verified (operator checklist)

These must be set in **Vercel** (or `.env.local` locally). Values are **not** committed in the repo.

| Variable | Role |
|----------|------|
| `RESEND_API_KEY` | Resend API key — required to instantiate the client |
| `CONTACT_TO_EMAIL` | Recipient inbox (e.g. operator Gmail or `patrick@howesounddj.com`) |
| `CONTACT_FROM_EMAIL` | **Verified** sender in Resend (domain verified, or Resend test rules) |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification (unchanged) |

**Operational notes (not code):**

- **`onboarding@resend.dev`** can only send to **the account owner’s email** — use a **verified domain** `CONTACT_FROM_EMAIL` for real production delivery to any inbox.
- **`CONTACT_FROM_EMAIL`** must match what Resend allows for the API key.

`env.example` comments were tightened to reflect this.

## 3. API route behavior confirmed

After this pass, the route:

1. Parses JSON body and validates fields (unchanged).
2. Requires Resend + mail env + Turnstile secret (unchanged).
3. Verifies Turnstile (unchanged).
4. Calls **`resend.emails.send(...)`** and assigns **`sendResult`**.
5. If **`sendResult.error`** is set → **`console.error`** with Resend error metadata → **502** + **`success: false`** (no success response).
6. If **`sendResult.data`** (success) → logs Resend **`id`** when present → **200** + success message.
7. **`try/catch`** remains for unexpected throws (network/runtime).

Success is returned **only** after Resend reports success **or** after an unexpected exception path returns 502.

## 4. Resend response verified

Implementation checks the **structured** SDK response:

- **Failure:** `sendResult.error` with `name`, `statusCode`, `message` (logged, no API keys).
- **Success:** `sendResult.data` typically includes **`id`** (logged as `resend_email_id`).

## 5. Delivery result

- **Code:** Submissions that previously showed success while Resend returned an error will now correctly **fail the API** and surface the generic send failure message to the user.
- **Inbox delivery** for correctly configured Resend + verified sender depends on **Vercel env** and **Resend dashboard** — verify in **Resend → Logs** after deploy.

## 6. Logs summary

Server logs (Vercel Functions / `next start`):

| Log | Meaning |
|-----|---------|
| `[contact] request_received` | POST hit the route |
| `[contact] config_check` | Booleans: Resend client, mail env, Turnstile secret; `form_type` |
| `[contact] reject_*` | Early exit (rate limit, honeypot, config, Turnstile) |
| `[contact] turnstile_verified` | Token passed verification |
| `[contact] resend_send_start` | About to call Resend |
| `[contact] resend_send_ok` | Resend accepted; includes `resend_email_id` when returned |
| `[contact] resend_send_error` | Resend returned `error` (structured) |
| `[contact] resend_send_exception` | Thrown error path |

No tokens, API keys, or full message bodies are logged.

## Validation

- `npm run lint` — pass  
- `npm run build` — pass  

## Non-regression confirmation

- **Turnstile** validation unchanged; failures still return **400** with the same user-facing copy.
- **Form UX** unchanged (no client edits in this pack).
- **No secrets** in logs.
- **No double-send** — single `emails.send` per successful path.
- **Honeypot / rate limit** unchanged.

**Explicit:** Check Availability and inquiry **client** flows are unchanged; only **server-side** Resend handling and logging were fixed.

## Success condition

Every **true** successful submission corresponds to **`sendResult.error === null`** and Resend accepting the message; **failed** Resend API responses **no longer** return **`success: true`**. Operators should confirm live delivery with **Vercel env**, **verified `CONTACT_FROM_EMAIL`**, and **Resend activity logs**.
