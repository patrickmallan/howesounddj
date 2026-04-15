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

export async function POST(request: Request) {
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
      message: "Thanks. We will be in touch shortly.",
    });
  }

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
  if (!weddingDate) fieldErrors.weddingDate = "Please add your wedding date.";
  if (!venue) fieldErrors.venue = "Please add your venue or location.";
  if (!message) fieldErrors.message = "Please add a short message.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json<ContactApiResponse>(
      { success: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const mail = getMailConfig();
  const resend = getResend();
  const turnstileSecret = getTurnstileSecret();

  if (!mail || !resend) {
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Delivery is not fully configured yet. Please try again later or use Book a Consult.",
      },
      { status: 503 }
    );
  }

  if (!turnstileSecret) {
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
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Security check did not complete. Please refresh and try again.",
      },
      { status: 400 }
    );
  }

  const receivedAt = new Date().toISOString();
  const payload: InquiryPayload = {
    name,
    partnerName,
    email,
    phone,
    weddingDate,
    venue,
    guestCount,
    servicesNeeded,
    message,
    receivedAt,
  };

  try {
    await resend.emails.send({
      from: mail.from,
      to: mail.to,
      replyTo: email,
      subject: formatInquirySubject(payload),
      text: formatInquiryPlainText(payload),
      html: formatInquiryHtml(payload),
    });
  } catch {
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
    message: "Thanks. Your message is on its way. Patrick will follow up when he can.",
  });
}
