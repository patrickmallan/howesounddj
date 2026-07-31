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
  POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION,
  POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD,
  postAvailabilityConfirmedDateLabel,
} from "@/config/post-availability-copy";
import {
  CANONICAL_REVIEWS,
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
  REVIEW_THEME_TAGS,
  formatMarriedAtVenue,
  getAvailabilitySuccessProofQuote,
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

  it("uses Stephen Henry as the sole post-availability proof with governed venue", () => {
    expect(POST_AVAILABILITY_PROOF_FULL_ID).toBe("stephen-henry");
    expect(POST_AVAILABILITY_PROOF_COMPACT_ID).toBe("stephen-henry");
    const stephen = getReviewById("stephen-henry");
    expect(stephen?.reviewerName).toBe("Stephen Henry");
    expect(stephen?.venue).toBe("Sea to Sky Gondola");
    expect(stephen?.quote).toBe(
      "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
    );
  });
});

describe("post-availability copy authority (V3.1 preserved through V3.4)", () => {
  const copySurfaces = [
    POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD,
    POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION,
    POST_AVAILABILITY_FULL_PLANNING_SESSION,
    POST_AVAILABILITY_COMPACT_CTA_LABEL,
    POST_AVAILABILITY_PRIMARY_CTA_LABEL,
    POST_AVAILABILITY_CTA_SUPPORT,
    POST_AVAILABILITY_EDIT_DATE_LABEL,
    postAvailabilityConfirmedDateLabel("June 15, 2028"),
  ];

  it("uses the V3.1 two-line headline without mutual-fit bridge", () => {
    expect(POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD).toBe(
      "This is the answer you were hoping for.",
    );
    expect(POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION).toBe(
      "Your wedding date is available.",
    );
    expect(POST_AVAILABILITY_COPY_VARIANT).toBe("human_connection_v3");
    const copyFile = readSource("src/config/post-availability-copy.ts");
    expect(copyFile).not.toMatch(/POST_AVAILABILITY_SUCCESS_BRIDGE/);
    expect(copyFile).not.toMatch(/Let's see if we're a great fit for each other/);
  });

  it("does not retain removed proof-context copy in configuration", () => {
    const copyFile = readSource("src/config/post-availability-copy.ts");
    expect(copyFile).not.toMatch(/From a couple who worked with Patrick/);
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

describe("post-availability visual hierarchy (V3.2)", () => {
  it("uses role-based typography system instead of inline fragmentation", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    const styles = readSource("src/components/post-availability-success-styles.ts");
    expect(success).toMatch(/post-availability-success-styles/);
    expect(styles).toMatch(/roleHeadline/);
    expect(styles).toMatch(/roleSupportingNarrative/);
    expect(styles).toMatch(/roleTestimonial/);
    expect(success).toMatch(/data-availability-role="headline"/);
    expect(success).toMatch(/data-availability-role="testimonial"/);
    expect(success).toMatch(/data-availability-role="attribution"/);
    expect(success).toMatch(/data-availability-role="cta-support"/);
    expect(success).not.toMatch(/border-l-2 border-amber/);
    expect(success).not.toMatch(/text-amber-300\/90/);
  });

  it("keeps headline lines in one unified heading container", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    const styles = readSource("src/components/post-availability-success-styles.ts");
    expect(success).toMatch(/roleHeadlineLine/);
    expect(styles).toMatch(/font-semibold/);
    expect(success).not.toMatch(/roleHeadlineLead/);
    expect(success).not.toMatch(/roleHeadlineConfirmation/);
    expect(success).toMatch(/data-availability-role="headline"/);
  });

  it("renders married-at venue context from SSOT without hardcoding", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    const reviews = readSource("src/config/reviews.ts");
    expect(reviews).toMatch(/venue: "Sea to Sky Gondola"/);
    expect(success).toMatch(/formatMarriedAtVenue/);
    expect(success).not.toMatch(/Married at Sea to Sky Gondola/);
    expect(getReviewById("stephen-henry")?.venue).toBe("Sea to Sky Gondola");
    expect(formatMarriedAtVenue("Sea to Sky Gondola")).toBe("Married at Sea to Sky Gondola");
    const lauren = getReviewById("lauren-steeles");
    expect(lauren?.venue).toBeUndefined();
  });
});

describe("post-availability composition cohesion (V3.3)", () => {
  it("removes proof-context line from rendered success surfaces", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).not.toMatch(/POST_AVAILABILITY_PROOF_CONTEXT/);
    expect(success).not.toMatch(/proof-context/);
    expect(success).not.toMatch(/From a couple who worked with Patrick/);
    expect(success).toMatch(/<blockquote/);
    expect(success).toMatch(/<figcaption/);
  });

  it("removes visible action divider and left-aligns CTA support", () => {
    const styles = readSource("src/components/post-availability-success-styles.ts");
    const success = readSource("src/components/post-availability-success.tsx");
    expect(styles).not.toMatch(/border-t border-white/);
    expect(success).toMatch(/data-availability-role="cta-support"/);
    expect(success).not.toMatch(/text-center.*cta-support/);
    expect(success).not.toMatch(/justify-center.*cta-support/);
  });

  it("preserves proof structure quote then attribution with SSOT venue", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    const quoteIndex = success.indexOf("data-availability-role=\"testimonial\"");
    const attributionIndex = success.indexOf("data-availability-role=\"attribution\"");
    expect(quoteIndex).toBeGreaterThan(-1);
    expect(attributionIndex).toBeGreaterThan(quoteIndex);
    expect(getReviewById("stephen-henry")?.venue).toBe("Sea to Sky Gondola");
  });
});

describe("post-availability final editorial closure (V3.4)", () => {
  const STEPHEN_EXCERPT =
    "We would get married all over again just so we could hangout and work with Patrick. He's a talented DJ and a truly caring person.";
  const STEPHEN_CANONICAL =
    "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.";

  it("preserves Stephen canonical full quote unchanged in SSOT", () => {
    const stephen = getReviewById("stephen-henry");
    expect(stephen?.quote).toBe(STEPHEN_CANONICAL);
    expect(stephen?.quote).toContain("Patrick again");
  });

  it("governs Patrick-approved Availability Success excerpt separately", () => {
    const stephen = getReviewById("stephen-henry");
    expect(stephen?.availabilitySuccessExcerpt).toBe(STEPHEN_EXCERPT);
    expect(stephen?.availabilitySuccessExcerpt).not.toContain("Patrick again");
  });

  it("selects excerpt for Availability Success without hardcoding in component", () => {
    const stephen = getReviewById("stephen-henry")!;
    expect(getAvailabilitySuccessProofQuote(stephen)).toBe(STEPHEN_EXCERPT);
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/getAvailabilitySuccessProofQuote/);
    expect(success).not.toMatch(/Patrick again/);
    expect(success).not.toContain(STEPHEN_EXCERPT);
  });

  it("falls back to canonical quote when no excerpt is governed", () => {
    const vanessa = getReviewById("vanessa-pocock")!;
    expect(vanessa.availabilitySuccessExcerpt).toBeUndefined();
    expect(getAvailabilitySuccessProofQuote(vanessa)).toBe(vanessa.quote);
  });

  it("removes mutual-fit bridge from success surfaces", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    const copy = readSource("src/config/post-availability-copy.ts");
    expect(success).not.toMatch(/POST_AVAILABILITY_SUCCESS_BRIDGE/);
    expect(success).not.toMatch(/Let's see if we're a great fit for each other/);
    expect(copy).not.toMatch(/POST_AVAILABILITY_SUCCESS_BRIDGE/);
    expect(copy).not.toMatch(/Let's see if we're a great fit for each other/);
  });

  it("renders italic testimonial with married-at venue attribution", () => {
    const styles = readSource("src/components/post-availability-success-styles.ts");
    const success = readSource("src/components/post-availability-success.tsx");
    expect(styles).toMatch(/roleTestimonial/);
    expect(styles).toMatch(/italic/);
    expect(success).toMatch(/<figure/);
    expect(success).toMatch(/<blockquote/);
    expect(success).toMatch(/<figcaption/);
    expect(success).toMatch(/formatMarriedAtVenue\(proof\.venue\)/);
  });

  it("preserves CTA support, CTA label, and sticky footer regression", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/POST_AVAILABILITY_CTA_SUPPORT/);
    expect(success).toMatch(/POST_AVAILABILITY_COMPACT_CTA_LABEL/);
    expect(success).toMatch(/roleActionFooter/);
    expect(success).toMatch(/buildPostAvailabilityCalendlyUrl/);
    expect(POST_AVAILABILITY_CTA_SUPPORT).toBe(
      "Your next best step is to book a chat with Patrick.",
    );
    expect(POST_AVAILABILITY_COMPACT_CTA_LABEL).toBe("Choose a Time");
  });

  it("preserves full-surface planning session and email fallback", () => {
    const success = readSource("src/components/post-availability-success.tsx");
    expect(success).toMatch(/POST_AVAILABILITY_FULL_PLANNING_SESSION/);
    expect(success).toMatch(/POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL/);
    expect(success).toMatch(/variant === "full"/);
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
    expect(success).not.toMatch(/POST_AVAILABILITY_PROOF_CONTEXT/);
    expect(success).not.toMatch(/POST_AVAILABILITY_SUCCESS_BRIDGE/);
    expect(success).not.toMatch(/Let's see if we're a great fit for each other/);
    expect(success).toMatch(/POST_AVAILABILITY_COMPACT_CTA_LABEL/);
    expect(success).toMatch(/POST_AVAILABILITY_CTA_SUPPORT/);
    expect(success).toMatch(/<figure/);
    expect(success).toMatch(/<blockquote/);
    expect(success).toMatch(/<figcaption/);
    expect(success).toMatch(/aria-live="polite"/);
    expect(success).toMatch(/headingRef/);
    expect(success).toMatch(/tabIndex=\{-1\}/);
    expect(success).toMatch(/roleActionFooter/);
    expect(success).not.toMatch(/splitReviewQuoteAtFirstSentence/);
    expect(success).not.toMatch(/Wonderful news/);
    expect(success).not.toMatch(/matthew-bundala|lauren-steeles/);
  });

  it("header panel uses flex column overflow-hidden for sticky footer", () => {
    const header = readSource("src/components/header-check-availability.tsx");
    expect(header).toMatch(/overflow-hidden/);
    expect(header).toMatch(/flex-col/);
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
