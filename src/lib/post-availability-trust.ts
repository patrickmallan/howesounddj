import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { isPostAvailabilityContextActive } from "@/lib/post-availability-context";

/** Trust surfaces tracked via `post_availability_trust_click`. */
export type TrustTarget =
  | "reviews"
  | "about"
  | "packages"
  | "venues"
  | "stories"
  | "guides"
  | "google_reviews";

const TRUST_HREF_TARGETS: ReadonlyArray<{ prefix: string; target: TrustTarget }> = [
  { prefix: "/reviews", target: "reviews" },
  { prefix: "/about", target: "about" },
  { prefix: "/packages", target: "packages" },
  { prefix: "/venues", target: "venues" },
  { prefix: "/stories", target: "stories" },
  { prefix: "/guides", target: "guides" },
];

export function trustTargetFromHref(href: string): TrustTarget | null {
  const path = href.split("#")[0]?.split("?")[0] ?? href;
  for (const { prefix, target } of TRUST_HREF_TARGETS) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return target;
  }
  return null;
}

function pageContext(): string {
  return typeof window !== "undefined" ? window.location.pathname : "";
}

/** Fires `post_availability_trust_click` only when post-availability session context is active. */
export function trackPostAvailabilityTrustClick(trustTarget: TrustTarget): void {
  if (!isPostAvailabilityContextActive()) return;
  trackEvent(ANALYTICS_EVENTS.postAvailabilityTrustClick, {
    trust_target: trustTarget,
    page_context: pageContext(),
    post_availability_context_active: true,
  });
}

/** Nav/footer helper: maps internal href to trust target and tracks when context is active. */
export function trackPostAvailabilityTrustClickFromHref(href: string): void {
  const target = trustTargetFromHref(href);
  if (!target) return;
  trackPostAvailabilityTrustClick(target);
}
