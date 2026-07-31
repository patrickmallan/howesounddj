import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  POST_AVAILABILITY_COMPACT_CTA_LABEL,
  POST_AVAILABILITY_COPY_VARIANT,
  POST_AVAILABILITY_CTA_SUPPORT,
  POST_AVAILABILITY_EDIT_DATE_LABEL,
  POST_AVAILABILITY_FULL_PLANNING_SESSION,
  POST_AVAILABILITY_PRIMARY_CTA_LABEL,
  POST_AVAILABILITY_PROOF_CONTEXT,
  POST_AVAILABILITY_SUCCESS_BRIDGE,
  POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION,
  POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD,
  postAvailabilityConfirmedDateLabel,
} from "@/config/post-availability-copy";
import {
  CANONICAL_REVIEWS,
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
  REVIEW_THEME_TAGS,
  getReviewById,
} from "@/config/reviews";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { formatWeddingDateLong, weddingDateMonthBucket } from "@/lib/format-wedding-date";
import { buildPostAvailabilityCalendlyUrl } from "@/lib/post-availability-calendly";
import {
  POST_AVAILABILITY_CONTAINER_VARIANT,
  POST_AVAILABILITY_SUCCESS_VARIANT,
  durationBucketMs,
  postAvailabilityAnalyticsBase,
} from "@/lib/post-availability-analytics";

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

  it("uses Stephen Henry as the sole post-availability proof", () => {
    expect(POST_AVAILABILITY_PROOF_FULL_ID).toBe("stephen-henry");
    expect(POST_AVAILABILITY_PROOF_COMPACT_ID).toBe("stephen-henry");
    const stephen = getReviewById("stephen-henry");
    expect(stephen?.reviewerName).toBe("Stephen Henry");
    expect(stephen?.quote).toBe(
      "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
    );
  });
});

describe("post-availability copy authority (V3.1)", () => {
  const copySurfaces = [
    POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD,
    POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION,
    POST_AVAILABILITY_SUCCESS_BRIDGE,
    POST_AVAILABILITY_FULL_PLANNING_SESSION,
    POST_AVAILABILITY_PROOF_CONTEXT,
    POST_AVAILABILITY_COMPACT_CTA_LABEL,
    POST_AVAILABILITY_PRIMARY_CTA_LABEL,
    POST_AVAILABILITY_CTA_SUPPORT,
    POST_AVAILABILITY_EDIT_DATE_LABEL,
    postAvailabilityConfirmedDateLabel("June 15, 2028"),
  ];

  it("uses the V3.1 two-line headline and bridge", () => {
    expect(POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD).toBe(
      "This is the answer you were hoping for.",
    );
    expect(POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION).toBe(
      "Your wedding date is available.",
    );
    expect(POST_AVAILABILITY_SUCCESS_BRIDGE).toBe(
      "Let's see if we're a great fit for each other.",
    );
    expect(POST_AVAILABILITY_COPY_VARIANT).toBe("human_connection_v3");
  });

  it("does not use superseded V3 headline or risk reducer", () => {
    const copyFile = readSource("src/config/post-availability-copy.ts");
    expect(copyFile).not.toMatch(/Wonderful news/);
    expect(copyFile).not.toMatch(/45 minutes · No pressure · Just clarity/);
    expect(copyFile).not.toMatch(/Meet Patrick/);
    expect(copyFile).not.toMatch(/Patrick is available/);
  });

  it("uses compact CTA Choose a Time and CTA support copy", () => {
    expect(POST_AVAILABILITY_COMPACT_CTA_LABEL).toBe("Choose a Time");
    expect(POST_AVAILABILITY_CTA_SUPPORT).toBe(
      "Your next best step is to book a chat with Patrick.",
    );
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

  it("uses the required full primary CTA label", () => {
    expect(POST_AVAILABILITY_PRIMARY_CTA_LABEL).toBe(
      "Reserve My Complimentary Wedding Planning Session",
    );
  });
});

describe("shared post-availability success ownership (V3)", () => {
  it("contact form replaces the availability form on success", () => {
    const form = readSource("src/components/contact-availability-form.tsx");
    expect(form).toMatch(/availability\.kind === "available"/);
    expect(form).toMatch(/PostAvailabilitySuccess/);
    expect(form).toMatch(/onEditDate=\{handleEditDate\}/);
    expect(form).not.toMatch(/PostAvailabilityTrustLink/);
  });

  it("compact checker performs state replacement on available", () => {
    const checker = readSource("src/components/compact-availability-checker.tsx");
    expect(checker).toMatch(/if \(phase\.kind === "available"/);
    expect(checker).toMatch(/return \(\s*\n\s*<PostAvailabilitySuccess/);
    const availableBranch = checker.indexOf('if (phase.kind === "available"');
    const formIntro = checker.indexOf("Check your wedding date");
    expect(availableBranch).toBeGreaterThan(-1);
    expect(availableBranch).toBeLessThan(formIntro);
    expect(checker).toMatch(/onEditDate=\{handleEditDate\}/);
  });

  it("implements sticky footer, Stephen proof, and accessibility structure", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD/);
    expect(success).toMatch(/POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION/);
    expect(success).toMatch(/POST_AVAILABILITY_PROOF_CONTEXT/);
    expect(success).toMatch(/POST_AVAILABILITY_COMPACT_CTA_LABEL/);
    expect(success).toMatch(/POST_AVAILABILITY_CTA_SUPPORT/);
    expect(success).toMatch(/<figure/);
    expect(success).toMatch(/<blockquote/);
    expect(success).toMatch(/<figcaption/);
    expect(success).toMatch(/aria-live="polite"/);
    expect(success).toMatch(/headingRef/);
    expect(success).toMatch(/tabIndex=\{-1\}/);
    expect(success).toMatch(/shrink-0 border-t/);
    expect(success).not.toMatch(/splitReviewQuoteAtFirstSentence/);
    expect(success).not.toMatch(/Wonderful news/);
    expect(success).not.toMatch(/Sea to Sky Gondola/i);
    expect(success).not.toMatch(/matthew-bundala|lauren-steeles/);
  });

  it("header panel uses flex column overflow-hidden for sticky footer", () => {
    const header = readSource("src/components/header-check-availability.tsx");
    expect(header).toMatch(/overflow-hidden/);
    expect(header).toMatch(/flex-col/);
  });

  it("renders venue from review SSOT only when governed metadata exists", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/proof\.venue/);
    const stephen = getReviewById("stephen-henry");
    expect(stephen?.venue).toBeUndefined();
  });
});

describe("post-availability analytics (V3)", () => {
  it("includes variant properties and change_date_click event", () => {
    expect(ANALYTICS_EVENTS.changeDateClick).toBe("change_date_click");
    const base = postAvailabilityAnalyticsBase("header_panel", "2028-06-15", "compact", {
      ctaInitiallyVisible: true,
    });
    expect(base.success_variant).toBe(POST_AVAILABILITY_SUCCESS_VARIANT);
    expect(base.container_variant).toBe(POST_AVAILABILITY_CONTAINER_VARIANT);
    expect(base.copy_variant).toBe("human_connection_v3");
    expect(base.cta_initially_visible).toBe(true);
    expect(base.proof_variant).toBe("stephen-henry");
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
