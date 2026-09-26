# Privacy notice — review draft, not for publication

Prepared 2026-09-25 from the new site's code paths. This is working copy for Patrick and a qualified privacy reviewer. Bracketed text is **not verified** and must be resolved before this becomes a public page. Do not present this draft as a legal compliance finding.

## Proposed visitor-facing copy

### Your information, and what happens to it

Howe Sound Wedding DJ uses the information you share to check a wedding date, reply to your questions and plan a celebration with you. Here is what happens when you use this site.

**Checking a date.** We use the date you choose to ask our availability system whether it is open. We also record the result, the time of the check and a random journey reference so the next step works properly. This step does not ask for your name or email address. A date-check notification is sent to our business inbox.

**Sending a message.** We use your name, email address and message to respond. You can also share a partner's name, phone number, wedding date, venue or location, guest count and what services you may need. We send your enquiry to our business inbox through our email provider and may send an acknowledgement to the address you provide. The form uses an anti-spam service before a message is sent.

**Booking a conversation.** If you choose to open the consultation calendar, you leave this site for Calendly. We pass the selected month and a random journey reference to help connect the date check with the consultation step. Calendly will ask for the details needed to schedule the conversation and handles that booking on its own service. [Confirm the exact Calendly account settings and link to its privacy information.]

**Understanding whether the site works.** When configured, we use Google Analytics to measure page visits and steps such as starting a date check, receiving an availability result and clicking a consultation link. Site analytics use an availability outcome and month-level date bucket, not the exact wedding date entered into the date checker. [Confirm whether optional analytics is active on the launch deployment, whether consent controls are required, and the settings actually in use.]

We use service providers for hosting and security, availability checks, email delivery, anti-spam verification, analytics when enabled, and consultation scheduling. These include [confirm the deployed provider list: Vercel, Howe Sound DJ Operations, Resend, Cloudflare Turnstile, Google Analytics and Calendly]. We do not use an enquiry to send unrelated marketing without [confirm the actual practice and any separate choice offered].

**How long we keep it.** Wedding enquiries, date-check records and consultation bookings remain in our business systems until we manually delete them; we do not currently apply a set deletion period to those records. [Confirm whether provider copies, email, backups, server/security logs and analytics follow different retention settings, and how deletion requests are carried through those systems.]

**Questions about your information.** You can ask how we used your information or request a correction through the [contact form](/contact). [Qualified reviewer to confirm how access, deletion and consent-withdrawal requests are handled, and any applicable exceptions.]

Last updated: [set on approval].

## Approval checklist

- Patrick confirms that every named data use and provider matches the deployed accounts and actual working practices.
- Patrick confirmed that enquiries, date-check records and consultation bookings remain until he manually deletes them, and selected the contact form for privacy requests. Verify provider copies, email, backups, logs and analytics retention before finalizing the statement.
- Confirm whether GA4 is enabled by default, how the applicable consent choice works, and whether the site must change before the draft can be published.
- Confirm the public privacy contact route and the process for access/correction/deletion requests.
- Confirm whether provider processing outside Canada needs to be described for the actual configurations.
- A qualified reviewer approves the final wording and placement, including a short notice next to the enquiry form. Only then implement and test the public page.

## Sources and limits

The technical inventory is in `docs/launch-readiness-progress.md`. This draft follows the principle that visitors should be told in understandable language what is collected, why and with whom it is shared, while leaving unverified business facts unresolved. For review, see the [BC privacy commissioner's PIPA policy guidance](https://www.oipc.bc.ca/documents/guidance-documents/2164) and the [Office of the Privacy Commissioner of Canada's business guide](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda-compliance-help/guide_org/). These references are guidance, not a determination of which law applies to a particular data flow.
