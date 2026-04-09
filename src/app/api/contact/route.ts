import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  formatInquiryHtml,
  formatInquiryPlainText,
  formatInquirySubject,
  type InquiryPayload,
} from "@/lib/inquiry-email";
import type { ContactApiResponse } from "@/types/contact-api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimValue(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function getRequiredEnv(): { apiKey: string; to: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) {
    return null;
  }
  return { apiKey, to, from };
}

export async function POST(request: Request): Promise<NextResponse<ContactApiResponse>> {
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Something went wrong reading your message. Please try again." },
        { status: 400 }
      );
    }

    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
    }

    const data = raw as Record<string, unknown>;

    const name = trimValue(data.name);
    const partnerName = trimValue(data.partnerName);
    const email = trimValue(data.email);
    const phone = trimValue(data.phone);
    const weddingDate = trimValue(data.weddingDate);
    const venue = trimValue(data.venue);
    const guestCount = trimValue(data.guestCount);
    const servicesNeeded = trimValue(data.servicesNeeded);
    const message = trimValue(data.message);

    const fieldErrors: Record<string, string> = {};

    if (!name) {
      fieldErrors.name = "Please add your name.";
    }
    if (!email) {
      fieldErrors.email = "Please add an email address.";
    } else if (!EMAIL_RE.test(email)) {
      fieldErrors.email = "Please double-check the email format.";
    }
    if (!weddingDate) {
      fieldErrors.weddingDate = "Please share your wedding date or season.";
    }
    if (!venue) {
      fieldErrors.venue = "Please add a venue or general location.";
    }
    if (!message) {
      fieldErrors.message = "Please share a bit about your wedding or vision.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "A few details need attention before we can send this through.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const env = getRequiredEnv();
    if (!env) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Inquiry delivery is not configured on the server right now. Please try again later or reach out directly.",
        },
        { status: 503 }
      );
    }

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
      receivedAt: new Date().toISOString(),
    };

    const resend = new Resend(env.apiKey);

    const sendResult = await resend.emails.send({
      from: env.from,
      to: env.to,
      replyTo: email,
      subject: formatInquirySubject(payload),
      text: formatInquiryPlainText(payload),
      html: formatInquiryHtml(payload),
    });

    if (sendResult.error || !sendResult.data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "We could not deliver your note right now. Please try again in a moment, or reach out directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your note was sent — Patrick will follow up with availability and next steps.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our side. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
