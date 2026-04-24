# HSDJ_CONTACT_FORM_CLIENT_AUTO_REPLY_V1 — Stage FINAL

## 1. Feature added

After a successful **internal lead notification** send via Resend, the contact API now sends a **second, client-facing auto-reply** to the submitter’s validated email address. The internal notification payload, recipients, and formatting are unchanged.

## 2. Exact auto-reply subject and body used

**Subject (operational / QA):**

`Got your message — I'll be in touch shortly`

**Plain text body:**

```
Hey, thanks for reaching out. I've got your message and will be in touch soon.

In the meantime, you can check availability and book a quick consult here:

https://www.howesounddj.com/contact

Excited to hear more about your plans.

Howe Sound DJ
```

**HTML:** Minimal `<html><body>` with the same copy; a single plain link to `https://www.howesounddj.com/contact` (no images, logos, tracking pixels, or promotional footer).

*Note:* Pack Stage 0 listed an alternate subject line (“Message received…”). Implementation follows **Stage 2 + manual QA**: subject is exactly as above.

## 3. Files touched

| File | Change |
|------|--------|
| `src/app/api/contact/route.ts` | Auto-reply helpers (`getAutoReplySubject`, `getAutoReplyPlainText`, `getAutoReplyHtml`), second `resend.emails.send` after internal success, logging, failure handling |
| `logs/HSDJ_CONTACT_FORM_CLIENT_AUTO_REPLY_V1_STAGE_FINAL.md` | This record |

## 4. Send-order behavior

1. Existing validations: honeypot, field validation, mail/Resend/Turnstile config, Turnstile verification (unchanged order).
2. **First:** Internal notification — `to: CONTACT_TO_EMAIL`, `from: CONTACT_FROM_EMAIL`, `replyTo: submitter email`, existing `formatInquiry*` subject/body/html.
3. **Only if that send succeeds (no Resend error):** **Second:** Auto-reply — `to: submitter email`, `from: CONTACT_FROM_EMAIL`, `replyTo: CONTACT_TO_EMAIL`, auto-reply subject/text/html.

## 5. Failure-handling behavior

| Scenario | Behavior |
|----------|----------|
| Internal notification fails (Resend error or exception) | Same as before: `502` / failure message to the client. **No auto-reply** attempted. |
| Internal succeeds, auto-reply fails (Resend error or exception) | `client_auto_reply_send_error` logged (no secrets, no full body, no Turnstile token). Response is still **success** with the existing success message — UX is not blocked by auto-reply failure. |

## 6. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 7. Manual QA checklist (after deploy)

1. Submit the contact form with a real recipient email.  
2. Confirm Howe Sound DJ receives the **internal notification** (unchanged).  
3. Confirm the submitter receives the **auto-reply**.  
4. Confirm auto-reply subject is exactly: `Got your message — I'll be in touch shortly`.  
5. Confirm body matches the approved copy in §2.  
6. Confirm the form still shows **success** when both sends succeed.  
7. Confirm the form still shows **success** if internal succeeds but auto-reply fails (simulate via Resend if needed).  
8. Confirm Resend logs show **both** sends when healthy.  

## 8. Non-regression confirmation

This pass did **not** weaken:

- **Internal lead notification** — same `resend.emails.send` call, fields, and `formatInquirySubject` / `formatInquiryPlainText` / `formatInquiryHtml`.  
- **Turnstile validation** — still required before any email send; auto-reply runs only after Turnstile passes and internal send succeeds.  
- **Contact form UX** — success and error responses unchanged for internal failure; success path unchanged for users when internal send succeeds.  
- **Rate limiting** — `checkContactRateLimit` unchanged at the start of the handler.  
- **Deliverability posture** — auto-reply is plain, minimal HTML, one link, no tracking pixel or heavy marketing template.  
- **Existing inquiry email formatting** — `inquiry-email` helpers untouched; internal email content unchanged.  

**Success condition:** Every valid contact submission still delivers the internal lead notification and, when internal send succeeds, also sends the approved client auto-reply to the email entered on the form.
