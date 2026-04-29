export type InquiryPayload = {
  name: string;
  partnerName: string;
  email: string;
  phone: string;
  weddingDate: string;
  venue: string;
  guestCount: string;
  servicesNeeded: string;
  message: string;
  receivedAt: string;
  /** Distinguishes availability-led inquiries from the contact page secondary question path. */
  inquirySource?: "availability_led" | "secondary_question";
};

function orDash(v: string): string {
  return v.trim() ? v : "Not provided";
}

export function formatInquirySubject(payload: InquiryPayload): string {
  if (payload.inquirySource === "secondary_question") {
    return `[Howe Sound DJ] Contact question: ${payload.name}`;
  }
  return `[Howe Sound DJ] New inquiry: ${payload.name}`;
}

export function formatInquiryPlainText(payload: InquiryPayload): string {
  const header =
    payload.inquirySource === "secondary_question"
      ? "Contact page question (secondary path): Howe Sound DJ"
      : "New inquiry: Howe Sound DJ";
  const isSecondary = payload.inquirySource === "secondary_question";
  const partnerLineLabel = isSecondary ? "Partner / second contact" : "Partner";
  const coreLines = [
    header,
    `Received: ${payload.receivedAt}`,
    "",
    `Name: ${payload.name}`,
    `${partnerLineLabel}: ${orDash(payload.partnerName)}`,
    `Email: ${payload.email}`,
    `Phone: ${orDash(payload.phone)}`,
    `Wedding date: ${payload.weddingDate}`,
    `Venue / location: ${payload.venue}`,
  ];
  const tailLines = isSecondary
    ? ["", "Message:", payload.message]
    : [
        `Guest count: ${orDash(payload.guestCount)}`,
        `Services needed: ${orDash(payload.servicesNeeded)}`,
        "",
        "Message:",
        payload.message,
      ];
  return [...coreLines, ...tailLines].join("\n");
}

export function formatInquiryHtml(payload: InquiryPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#525252;font-size:13px;">${escapeHtml(
      label
    )}</td><td style="padding:6px 0;font-size:14px;color:#171717;">${escapeHtml(value)}</td></tr>`;

  const isSecondary = payload.inquirySource === "secondary_question";
  const partnerLabel = isSecondary ? "Partner / second contact" : "Partner";
  const detailRows = `${row("Name", payload.name)}${row(partnerLabel, orDash(payload.partnerName))}${row(
    "Email",
    payload.email
  )}${row("Phone", orDash(payload.phone))}${row("Wedding date", payload.weddingDate)}${row(
    "Venue / location",
    payload.venue
  )}${
    isSecondary
      ? ""
      : `${row("Guest count", orDash(payload.guestCount))}${row("Services needed", orDash(payload.servicesNeeded))}`
  }`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.5;color:#171717;background:#fafafa;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:24px;">
    <p style="margin:0 0 16px;font-size:15px;font-weight:600;">${
      payload.inquirySource === "secondary_question"
        ? "Contact page question (secondary path): Howe Sound DJ"
        : "New inquiry: Howe Sound DJ"
    }</p>
    <p style="margin:0 0 20px;font-size:13px;color:#737373;">Received: ${escapeHtml(payload.receivedAt)}</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${detailRows}</table>
    <p style="margin:0 0 8px;font-size:13px;color:#525252;">Message</p>
    <div style="font-size:14px;white-space:pre-wrap;border:1px solid #e5e5e5;border-radius:6px;padding:12px;background:#fafafa;">${escapeHtml(
      payload.message
    )}</div>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
