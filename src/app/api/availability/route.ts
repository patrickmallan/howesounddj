import { after, NextResponse } from "next/server";
import { sendAvailabilityCheckNotification } from "@/lib/availability-notification";
import {
  checkPublicAvailability,
  validateRequestedAvailabilityDate,
} from "@/lib/check-public-availability";
import { PublicAvailabilityResult } from "@/lib/public-availability-contract";
import { readJsonObject, RequestBodyError } from "@/lib/api-request";
import { checkApiRateLimit, RATE_LIMIT_IDS } from "@/lib/api-rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function publicHttpStatus(result: PublicAvailabilityResult): number {
  if (result === PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED) {
    return 503;
  }
  return 200;
}

function serverTimingHeader(opsDurationMs: number, totalDurationMs: number): string {
  const serialize = totalDurationMs - opsDurationMs;
  return `ops;dur=${opsDurationMs.toFixed(1)}, serialize;dur=${serialize.toFixed(1)}, total;dur=${totalDurationMs.toFixed(1)}`;
}

export async function POST(request: Request) {
  const requestStarted = performance.now();

  const rateLimit = await checkApiRateLimit(request, RATE_LIMIT_IDS.availability);
  if (rateLimit !== "allowed") {
    return NextResponse.json(
      { success: false, message: rateLimit === "limited" ? "Too many checks. Please wait and try again." : "Availability checking is temporarily unavailable." },
      { status: rateLimit === "limited" ? 429 : 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await readJsonObject(request, 1024);
  } catch (error) {
    const status = error instanceof RequestBodyError ? error.status : 400;
    return NextResponse.json(
      {
        success: false,
        result: PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED,
        message:
          "We couldn't confirm availability automatically. Please contact us directly.",
        date: null,
      },
      {
        status,
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      },
    );
  }

  const date = typeof body.date === "string" ? body.date.trim() : "";
  if (validateRequestedAvailabilityDate(date)) {
    return NextResponse.json(
      { success: false, result: PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED, message: "Please enter a valid future date.", date: null },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } },
    );
  }

  const opsStarted = performance.now();
  const evaluated = await checkPublicAvailability(date);
  const opsDurationMs = performance.now() - opsStarted;

  console.info("[availability] governed_result", {
    requested_date: evaluated.requestedDate,
    result: evaluated.result,
    authority: evaluated.authority,
    source_endpoint: evaluated.sourceEndpoint,
    diagnostic_reason: evaluated.diagnosticReason ?? null,
    checked_at: evaluated.checkedAt,
    ops_duration_ms: Math.round(opsDurationMs),
  });

  // Operator notification runs after the response via next/server `after()` so
  // serverless runtimes keep the function alive until Resend completes.
  after(() =>
    sendAvailabilityCheckNotification(evaluated).catch((error: unknown) => {
      console.error("[availability] notification_async_failed", {
        message: error instanceof Error ? error.message : "unknown",
      });
    }),
  );

  const totalDurationMs = performance.now() - requestStarted;

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
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "Server-Timing": serverTimingHeader(opsDurationMs, totalDurationMs),
      },
    },
  );
}
