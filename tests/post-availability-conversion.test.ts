import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  POST_AVAILABILITY_COMPACT_COPY,
  POST_AVAILABILITY_FULL_COPY,
  POST_AVAILABILITY_PRIMARY_CTA_LABEL,
  POST_AVAILABILITY_RISK_REDUCER,
} from "@/config/post-availability-copy";
import {
  CANONICAL_REVIEWS,
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
  REVIEW_THEME_TAGS,
  getReviewById,
} from "@/config/reviews";
import { formatWeddingDateLong, weddingDateMonthBucket } from "@/lib/format-wedding-date";
import { buildPostAvailabilityCalendlyUrl } from "@/lib/post-availability-calendly";
import { durationBucketMs } from "@/lib/post-availability-analytics";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function containsEmoji(text: string): boolean {
  return /\p{Extended_Pictographic}/u.test(text);
}

function containsEmDash(text: string): boolean {
  return text.includes("—") || text.includes("–");
}

describe("review SSOT", () => {
  it("has 12 unique canonical review IDs", () => {
    const ids = CANONICAL_REVIEWS.map((review) => review.id);
    expect(ids).toHaveLength(12);
    expect(new Set(ids).size).toBe(12);
  });

  it("uses valid theme tags only", () => {
    const allowed = new Set(REVIEW_THEME_TAGS);
    for (const review of CANONICAL_REVIEWS) {
      for (const theme of review.themes) {
        expect(allowed.has(theme)).toBe(true);
      }
    }
  });

  it("exposes default post-availability proof reviews", () => {
    expect(getReviewById(POST_AVAILABILITY_PROOF_FULL_ID)?.reviewerName).toBe("Matthew Bundala");
    expect(getReviewById(POST_AVAILABILITY_PROOF_COMPACT_ID)?.reviewerName).toBe("Lauren Steeles");
  });
});

describe("post-availability copy authority", () => {
  const copySurfaces = [
    POST_AVAILABILITY_FULL_COPY.reliefHeadline,
    POST_AVAILABILITY_FULL_COPY.excitementBridge,
    POST_AVAILABILITY_FULL_COPY.nextStepHeading,
    POST_AVAILABILITY_FULL_COPY.proofTransition,
    POST_AVAILABILITY_FULL_COPY.identityStatement,
    ...POST_AVAILABILITY_FULL_COPY.outcomeBullets,
    POST_AVAILABILITY_FULL_COPY.soundCheckExplanation,
    POST_AVAILABILITY_COMPACT_COPY.reliefHeadline,
    POST_AVAILABILITY_COMPACT_COPY.excitementBridge,
    POST_AVAILABILITY_COMPACT_COPY.proofTransition,
    POST_AVAILABILITY_PRIMARY_CTA_LABEL,
    POST_AVAILABILITY_RISK_REDUCER,
  ];

  it("uses V2 headline without hedging language", () => {
    expect(POST_AVAILABILITY_FULL_COPY.reliefHeadline).toMatch(/Patrick is available/);
    expect(POST_AVAILABILITY_FULL_COPY.reliefHeadline).not.toMatch(/looks open/i);
    expect(POST_AVAILABILITY_COMPACT_COPY.reliefHeadline).not.toMatch(/looks open/i);
  });

  it("contains no emoji characters", () => {
    for (const text of copySurfaces) {
      expect(containsEmoji(text)).toBe(false);
    }
  });

  it("contains no em dash characters", () => {
    for (const text of copySurfaces) {
      expect(containsEmDash(text)).toBe(false);
    }
  });

  it("uses the required primary CTA label", () => {
    expect(POST_AVAILABILITY_PRIMARY_CTA_LABEL).toBe(
      "Reserve My Complimentary Wedding Planning Session",
    );
  });
});

describe("shared post-availability success ownership", () => {
  it("contact form consumes PostAvailabilitySuccess", () => {
    const form = readSource("src/components/contact-availability-form.tsx");
    expect(form).toMatch(/PostAvailabilitySuccess/);
    expect(form).not.toMatch(/PostAvailabilityTrustLink/);
    expect(form).not.toMatch(/Continue with Inquiry/);
    expect(form).not.toMatch(/Full contact page/i);
  });

  it("compact checker consumes PostAvailabilitySuccess and removes escape CTAs", () => {
    const checker = readSource("src/components/compact-availability-checker.tsx");
    expect(checker).toMatch(/PostAvailabilitySuccess/);
    expect(checker).not.toMatch(/Full contact page/i);
    expect(checker).not.toMatch(/PostAvailabilityTrustLink/);
    expect(checker).not.toMatch(/AVAILABLE_NEXT/);
  });

  it("defines a single shared success component file", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/variant: PostAvailabilitySuccessVariant/);
    expect(success).toMatch(/POST_AVAILABILITY_PRIMARY_CTA_LABEL/);
    expect(success).not.toMatch(/Full contact page/i);
    expect(success).not.toMatch(/Reviews/);
  });

  it("sequences narrative before proof and centers the primary CTA", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/proofTransition/);
    expect(success).toMatch(/nextStepHeading/);
    expect(success).toMatch(/excitementBridge/);
    expect(success).toMatch(/CTA_PILL_FLEX_CENTER/);
    expect(success).toMatch(/flex flex-col items-center/);
    const proofIndex = success.indexOf("proofTransition");
    const headlineIndex = success.indexOf("reliefHeadline");
    expect(proofIndex).toBeGreaterThan(headlineIndex);
  });
});

describe("formatWeddingDateLong", () => {
  it("formats YYYY-MM-DD for display", () => {
    expect(formatWeddingDateLong("2028-06-15")).toMatch(/June/);
    expect(formatWeddingDateLong("2028-06-15")).toMatch(/2028/);
  });

  it("buckets month for analytics", () => {
    expect(weddingDateMonthBucket("2028-06-15")).toBe("2028-06");
  });
});

describe("post-availability calendly URL", () => {
  it("carries month and funnel metadata without PII", () => {
    const url = new URL(
      buildPostAvailabilityCalendlyUrl({
        weddingDate: "2028-06-15",
        surface: "contact_form",
      }),
    );
    expect(url.searchParams.get("month")).toBe("2028-06");
    expect(url.searchParams.get("utm_medium")).toBe("post_availability");
    expect(url.searchParams.get("utm_content")).toBe("contact_form");
  });
});

describe("duration buckets", () => {
  it("maps latency to product buckets", () => {
    expect(durationBucketMs(500)).toBe("under_1s");
    expect(durationBucketMs(2500)).toBe("2s_to_3s");
    expect(durationBucketMs(6000)).toBe("over_5s");
  });
});

describe("availability route latency authority", () => {
  it("does not await operator notification before returning response", () => {
    const route = readSource("src/app/api/availability/route.ts");
    expect(route).toMatch(/void sendAvailabilityCheckNotification/);
    expect(route).not.toMatch(/await sendAvailabilityCheckNotification/);
    expect(route).toMatch(/Server-Timing/);
  });
});

describe("availability modal geometry regression", () => {
  it("keeps compact checker wired without horizontal overflow classes", () => {
    const checker = readSource("src/components/compact-availability-checker.tsx");
    expect(checker).toMatch(/WeddingDateFields/);
    expect(checker).toMatch(/runAvailabilityCheck/);
    expect(checker).not.toMatch(/overflow-x-auto/);
  });
});
