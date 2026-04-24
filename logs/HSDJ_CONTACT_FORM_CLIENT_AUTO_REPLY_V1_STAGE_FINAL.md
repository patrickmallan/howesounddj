# HSDJ_CONTACT_FORM_CLIENT_AUTO_REPLY_V1 — Stage FINAL

## 1. Feature added

After a valid contact form submission passes Turnstile and the **internal lead notification** is sent successfully via Resend, the API sends a **second, client-facing auto-reply** to the submitter’s email with approved copy, a single link to `/contact`, and minimal HTML. If the internal send fails, **no** auto-reply is attempted. If the internal send succeeds but the auto-reply fails, the API still returns **success** to the client (lead is not lost).

## 2. Exact auto-reply subject and body used

**Subject (exact string):**

`Message received, I'll be in touch shortly`

**Plain text body (exact):**

```
Hey, thanks for reaching out. I've got your message and will be in touch soon.

In the meantime, you can check availability and book a quick consult here:

https://www.howesounddj.com/contact

Excited to hear more about your plans.

Howe Sound DJ
```

**HTML:** Same wording as plain text; one anchor to `https://www.howesounddj.com/contact`; no images, logos, tracking, or heavy styling.

## 3. Files touched

| File | Change |
|------|--------|
| `src/app/api/contact/route.ts` | Client auto-reply helpers (`getAutoReplySubject`, `getAutoReplyPlainText`, `getAutoReplyHtml`), second `resend.emails.send` after successful internal send, safe logging, error handling per pack. **Stage FINAL:** subject aligned to approved pack copy (`Message received, I'll be in touch shortly`). |
| `logs/HSDJ_CONTACT_FORM_CLIENT_AUTO_REPLY_V1_STAGE_FINAL.md` | This document. |

## 4. Send-order behavior

1. Rate limit → JSON parse → honeypot (`company`) short-circuit → field validation.
2. Mail + Resend + Turnstile secret checks → **Turnstile verification** (no emails before pass).
3. **Internal notification:** `resend.emails.send` to `CONTACT_TO_EMAIL`, `from: CONTACT_FROM_EMAIL`, `replyTo: submitter email`, subject/body from `formatInquirySubject` / `formatInquiryPlainText` / `formatInquiryHtml`.
4. **Only if** internal send returns no `error`: **client auto-reply** to submitter `email`, `from: CONTACT_FROM_EMAIL`, `replyTo: CONTACT_TO_EMAIL`, auto-reply subject/body helpers.

No duplicate internal sends; auto-reply runs at most once per successful submission path.

## 5. Failure-handling behavior

| Scenario | Behavior |
|----------|----------|
| Internal Resend error | Return `502`, `success: false` — **no auto-reply**. |
| Internal throw | Return `502`, `success: false` — **no auto-reply**. |
| Internal OK, auto-reply Resend error | Log `client_auto_reply_send_error` (safe fields only); **still return `200` success** to the form. |
| Internal OK, auto-reply throw | Same as above. |

## 6. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  
- `rg` confirms `Message received`, `client_auto_reply_*`, and dual `resend.emails.send` in `src/app/api/contact/route.ts`.

## 7. Manual QA checklist (after deploy)

1. Submit the contact form with a **real** recipient address.  
2. Confirm **Howe Sound DJ** receives the **internal** inquiry email (unchanged formatting and flow).  
3. Confirm the **submitter** receives the **auto-reply**.  
4. Confirm subject is **exactly:** `Message received, I'll be in touch shortly`  
5. Confirm body matches **§2** above (including the single `https://www.howesounddj.com/contact` link).  
6. Confirm the form still shows **success** when both sends succeed.  
7. Confirm the form still shows **success** if internal send succeeds but auto-reply fails (simulate if possible via Resend test constraints).  
8. In Resend dashboard/logs, confirm **two** outbound messages on success (internal + auto-reply).  
9. Confirm honeypot / invalid email / failed Turnstile **do not** trigger auto-reply (no extra Resend traffic for those paths).

## 8. Non-regression confirmation

This pass did **not** weaken:

- **Internal lead notification** — same recipient, `from`, `replyTo`, and `formatInquiry*` content; still the first send and still required for success.  
- **Turnstile validation** — unchanged; all sends remain after successful verification.  
- **Contact form UX** — same JSON success/error contract and user-facing messages.  
- **Rate limiting** — unchanged (`checkContactRateLimit` / `getClientIp`).  
- **Deliverability posture** — auto-reply is plain, minimal HTML, one link, no tracking pixels or promo footers.  
- **Existing inquiry email formatting** — `src/lib/inquiry-email.ts` unchanged; internal email still uses `formatInquirySubject` / `formatInquiryPlainText` / `formatInquiryHtml`.

## Success condition

Every **valid** contact form submission (non-honeypot, validated email, Turnstile passed, mail configured) still sends the **internal lead notification** and **also** sends the **approved client-facing auto-reply** to the address entered in the form, subject to Resend accepting the second message.
