import { NextResponse } from "next/server";
import { sendAvailabilityCheckNotification } from "@/lib/availability-notification";
import { checkPublicAvailability } from "@/lib/check-public-availability";
import { PublicAvailabilityResult } from "@/lib/public-availability-contract";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function publicHttpStatus(result: PublicAvailabilityResult): number {
  if (result === PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED) {
    return 503;
  }
  return 200;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        result: PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED,
        message:
          "We couldn't confirm availability automatically. Please contact us directly.",
        date: null,
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      },
    );
  }

  const date =
    typeof body === "object" && body !== null && "date" in body
      ? String((body as { date: unknown }).date).trim().slice(0, 10)
      : "";

  const evaluated = await checkPublicAvailability(date);

  console.info("[availability] governed_result", {
    requested_date: evaluated.requestedDate,
    result: evaluated.result,
    authority: evaluated.authority,
    source_endpoint: evaluated.sourceEndpoint,
    diagnostic_reason: evaluated.diagnosticReason ?? null,
    checked_at: evaluated.checkedAt,
  });

  await sendAvailabilityCheckNotification(evaluated);

  return NextResponse.json(
    {
      success: evaluated.result !== PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED,
      result: evaluated.result,
      message: evaluated.publicMessage,
      date: evaluated.requestedDate,
      available: evaluated.result === PublicAvailabilityResult.AVAILABLE,
    },
    {
      status: publicHttpStatus(evaluated.result),
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    },
  );
}
