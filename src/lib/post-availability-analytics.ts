import { POST_AVAILABILITY_COPY_VARIANT } from "@/config/post-availability-copy";
import {
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
} from "@/config/reviews";
import { weddingDateMonthBucket } from "@/lib/format-wedding-date";

export type AvailabilityResultAnalytics =
  | "available"
  | "unavailable"
  | "manual_confirmation_required"
  | "error";

export function durationBucketMs(ms: number): string {
  if (ms < 1000) return "under_1s";
  if (ms < 2000) return "1s_to_2s";
  if (ms < 3000) return "2s_to_3s";
  if (ms < 5000) return "3s_to_5s";
  return "over_5s";
}

export function postAvailabilityAnalyticsBase(
  surface: string,
  weddingDate: string,
  proofVariant: "full" | "compact",
): Record<string, string> {
  return {
    surface,
    funnel_context: "post_availability",
    copy_variant: POST_AVAILABILITY_COPY_VARIANT,
    proof_variant: proofVariant === "full" ? POST_AVAILABILITY_PROOF_FULL_ID : POST_AVAILABILITY_PROOF_COMPACT_ID,
    selected_date_month: weddingDateMonthBucket(weddingDate),
  };
}

export function availabilityCompletedParams(args: {
  surface: string;
  weddingDate: string;
  result: AvailabilityResultAnalytics;
  durationMs: number;
}): Record<string, string | number | boolean> {
  return {
    ...postAvailabilityAnalyticsBase(args.surface, args.weddingDate, "full"),
    result: args.result,
    duration_bucket: durationBucketMs(args.durationMs),
    duration_ms: Math.round(args.durationMs),
  };
}
