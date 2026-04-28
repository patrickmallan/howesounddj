import { Resend } from "resend";
import { NextResponse } from "next/server";
import { checkContactRateLimit, getClientIp } from "@/lib/contact-rate-limit";
import {
  formatInquiryHtml,
  formatInquiryPlainText,
  formatInquirySubject,
  type InquiryPayload,
} from "@/lib/inquiry-email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { ContactApiResponse } from "@/types/contact-api";

export const runtime = "nodejs";

function trimValue(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function getMailConfig(): { to: string; from: string } | null {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!to || !from) return null;
  return { to, from };
}

function getTurnstileSecret(): string | undefined {
  return process.env.TURNSTILE_SECRET_KEY?.trim();
}

const AUTO_REPLY_CONTACT_URL = "https://www.howesounddj.com/contact";

function getAutoReplySubject(): string {
  return "Message received, I'll be in touch shortly";
}

function getAutoReplyPlainText(): string {
  return [
    "Hey, thanks for reaching out. I've got your message and will be in touch soon.",
    "",
    "In the meantime, you can Check My Date or Check Availability from the same page here:",
    "",
    AUTO_REPLY_CONTACT_URL,
    "",
    "Excited to hear more about your plans.",
    "",
    "Howe Sound DJ",
  ].join("\n");
}

function getAutoReplyHtml(): string {
  const url = AUTO_REPLY_CONTACT_URL;
  return `<html><body>
<p>Hey, thanks for reaching out. I've got your message and will be in touch soon.</p>
<p>In the meantime, you can Check My Date or Check Availability from the same page here:</p>
<p><a href="${url}">${url}</a></p>
<p>Excited to hear more about your plans.</p>
<p>Howe Sound DJ</p>
</body></html>`;
}

function resendEmailId(data: unknown): string | null {
  return data && typeof data === "object" && "id" in data
    ? String((data as { id: string }).id)
    : null;
}

/** Safe server logs for delivery debugging, never log secrets, tokens, or full PII. */
function logContact(stage: string, data?: Record<string, unknown>) {
  if (data && Object.keys(data).length > 0) {
    console.log(`[contact] ${stage}`, data);
  } else {
    console.log(`[contact] ${stage}`);
  }
}

export async function POST(request: Request) {
  logContact("request_received");
  const ip = getClientIp(request);
  const { ok: rateOk } = checkContactRateLimit(ip);
  if (!rateOk) {
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Too many attempts from this connection. Please wait a minute and try again.",
      },
      { status: 429 }
    );
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json<ContactApiResponse>(
      { success: false, message: "Something went wrong. Please refresh and try again." },
      { status: 400 }
    );
  }

  const company = trimValue(data.company);
  if (company) {
    return NextResponse.json<ContactApiResponse>({
      success: true,
      message: "Thanks. Patrick will follow up shortly.",
    });
  }

  const formType = trimValue(data.formType);
  /** Primary path: availability check → full inquiry (default when omitted). */
  const isSecondaryInquiry = formType === "secondary_inquiry";

  const name = trimValue(data.name);
  const partnerName = trimValue(data.partnerName);
  const email = trimValue(data.email);
  const phone = trimValue(data.phone);
  const weddingDate = trimValue(data.weddingDate);
  const venue = trimValue(data.venue);
  const guestCount = trimValue(data.guestCount);
  const servicesNeeded = trimValue(data.servicesNeeded);
  const message = trimValue(data.message);
  const turnstileToken = trimValue(data.turnstileToken);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please add your name.";
  if (!email) fieldErrors.email = "Please add your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Please check your email address.";
  if (!message) fieldErrors.message = "Please add a short message.";

  if (isSecondaryInquiry) {
    // Optional fields only; availability-led path still requires date + venue below.
  } else {
    if (!weddingDate) fieldErrors.weddingDate = "Please add your wedding date.";
    if (!venue) fieldErrors.venue = "Please add your venue or location.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json<ContactApiResponse>(
      { success: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const mail = getMailConfig();
  const resend = getResend();
  const turnstileSecret = getTurnstileSecret();

  logContact("config_check", {
    has_resend_client: Boolean(resend),
    has_mail_env: Boolean(mail),
    has_turnstile_secret: Boolean(turnstileSecret),
    form_type: formType || "availability_inquiry",
  });

  if (!mail || !resend) {
    logContact("reject_missing_mail_or_resend");
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message:
          "Delivery is not fully configured yet. Please try again later. You can still use Check My Date on howesounddj.com/contact.",
      },
      { status: 503 }
    );
  }

  if (!turnstileSecret) {
    logContact("reject_missing_turnstile_secret");
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Security check is not configured. Please try again later.",
      },
      { status: 503 }
    );
  }

  const turnstileOk = await verifyTurnstileToken(turnstileSecret, turnstileToken);
  if (!turnstileOk) {
    logContact("reject_turnstile_failed");
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Security check did not complete. Please refresh and try again.",
      },
      { status: 400 }
    );
  }
  logContact("turnstile_verified");

  const receivedAt = new Date().toISOString();
  const payload: InquiryPayload = {
    name,
    partnerName,
    email,
    phone,
    weddingDate: isSecondaryInquiry && !weddingDate ? "Not provided yet" : weddingDate,
    venue: isSecondaryInquiry && !venue ? "Not provided yet" : venue,
    guestCount,
    servicesNeeded,
    message,
    receivedAt,
    inquirySource: isSecondaryInquiry ? "secondary_question" : "availability_led",
  };

  logContact("resend_send_start", { inquiry_source: payload.inquirySource ?? "availability_led" });

  try {
    /** Resend v6 returns `{ data, error }`, it does not throw on API errors; must check `error`. */
    const sendResult = await resend.emails.send({
      from: mail.from,
      to: mail.to,
      replyTo: email,
      subject: formatInquirySubject(payload),
      text: formatInquiryPlainText(payload),
      html: formatInquiryHtml(payload),
    });

    if (sendResult.error) {
      console.error("[contact] resend_send_error", {
        name: sendResult.error.name,
        statusCode: sendResult.error.statusCode,
        message: sendResult.error.message,
      });
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "The message could not be sent. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    const emailId = resendEmailId(sendResult.data);
    logContact("resend_send_ok", { resend_email_id: emailId });

    logContact("client_auto_reply_send_start");
    try {
      const autoReplyResult = await resend.emails.send({
        from: mail.from,
        to: email,
        replyTo: mail.to,
        subject: getAutoReplySubject(),
        text: getAutoReplyPlainText(),
        html: getAutoReplyHtml(),
      });

      if (autoReplyResult.error) {
        console.error("[contact] client_auto_reply_send_error", {
          name: autoReplyResult.error.name,
          statusCode: autoReplyResult.error.statusCode,
          message: autoReplyResult.error.message,
        });
      } else {
        const autoReplyId = resendEmailId(autoReplyResult.data);
        logContact("client_auto_reply_send_ok", { resend_email_id: autoReplyId });
      }
    } catch (autoReplyErr) {
      console.error("[contact] client_auto_reply_send_error", {
        message: autoReplyErr instanceof Error ? autoReplyErr.message : "unknown",
      });
    }
  } catch (err) {
    console.error("[contact] resend_send_exception", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "The message could not be sent. Please try again in a moment.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json<ContactApiResponse>({
    success: true,
    message: "Thanks. Your message is on its way. Patrick will personally follow up when he can.",
  });
}
