/**
 * Canonical published couple testimonials (SSOT).
 * Wording must match live `/reviews` sources; do not paraphrase in `quote`.
 */

export const REVIEW_THEME_TAGS = [
  "STRESS_FREE",
  "SEAMLESS",
  "COMMUNICATION",
  "FULL_EVENT",
  "DANCE_FLOOR",
  "ENERGY",
  "TEAM_MEMBER",
  "CARE",
  "PLANNING",
  "CRAFT",
  "LOCAL",
] as const;

export type ReviewThemeTag = (typeof REVIEW_THEME_TAGS)[number];

export type CanonicalReview = {
  id: string;
  reviewerName: string;
  quote: string;
  sourceSurfaces: readonly string[];
  themes: readonly ReviewThemeTag[];
  compactExcerpt: string;
  fullExcerpt: string;
  attribution: string;
  /** Governed venue label when authorized in review SSOT (e.g. Sea to Sky Gondola). */
  venue?: string;
  /**
   * Patrick-approved editorial excerpt for Availability Success surfaces only.
   * Canonical `quote` remains the full published testimonial.
   */
  availabilitySuccessExcerpt?: string;
  evidenceStatus: "published_site";
};

export const CANONICAL_REVIEWS: readonly CanonicalReview[] = [
  {
    id: "stephen-henry",
    reviewerName: "Stephen Henry",
    quote:
      "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
    sourceSurfaces: ["/reviews", "/"],
    themes: ["CARE", "CRAFT"],
    compactExcerpt: "A talented DJ and a truly caring person.",
    fullExcerpt:
      "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
    attribution: "Stephen Henry",
    venue: "Sea to Sky Gondola",
    availabilitySuccessExcerpt:
      "We would get married all over again just so we could hangout and work with Patrick. He's a talented DJ and a truly caring person.",
    evidenceStatus: "published_site",
  },
  {
    id: "molly-finn",
    reviewerName: "Molly Finn",
    quote:
      "Patrick kept the party going all night long. If you're thinking about booking him run, don't walk! You will not regret it.",
    sourceSurfaces: ["/reviews"],
    themes: ["ENERGY", "DANCE_FLOOR"],
    compactExcerpt: "Patrick kept the party going all night long.",
    fullExcerpt:
      "Patrick kept the party going all night long. If you're thinking about booking him run, don't walk! You will not regret it.",
    attribution: "Molly Finn",
    evidenceStatus: "published_site",
  },
  {
    id: "lauren-steeles",
    reviewerName: "Lauren Steeles",
    quote: "Seamless, stress-free, and seriously fun. Patrick's the go-to for a reason.",
    sourceSurfaces: ["/reviews"],
    themes: ["SEAMLESS", "STRESS_FREE"],
    compactExcerpt: "Seamless, stress-free, and seriously fun.",
    fullExcerpt: "Seamless, stress-free, and seriously fun. Patrick's the go-to for a reason.",
    attribution: "Lauren Steeles",
    evidenceStatus: "published_site",
  },
  {
    id: "cassandra-wilding",
    reviewerName: "Cassandra Wilding",
    quote:
      "Couldn't be happier with the service provided by Patrick. We hired Patrick for our recent wedding and it was one of the best decisions we made from the ceremony to cocktail hour to the dance everything was perfect! All our guests can't stop talking about how great of a dance party it was and the dance floor was packed at all times! I would recommend him over and over again!",
    sourceSurfaces: ["/reviews"],
    themes: ["FULL_EVENT", "DANCE_FLOOR", "ENERGY"],
    compactExcerpt: "The dance floor was packed at all times!",
    fullExcerpt:
      "Couldn't be happier with the service provided by Patrick. We hired Patrick for our recent wedding and it was one of the best decisions we made from the ceremony to cocktail hour to the dance everything was perfect! All our guests can't stop talking about how great of a dance party it was and the dance floor was packed at all times! I would recommend him over and over again!",
    attribution: "Cassandra Wilding",
    evidenceStatus: "published_site",
  },
  {
    id: "matthew-bundala",
    reviewerName: "Matthew Bundala",
    quote:
      "Patrick is incredible. His calm, professional, yet personable communication made our day stress-free.",
    sourceSurfaces: ["/reviews", "/", "/vancouver-wedding-dj"],
    themes: ["COMMUNICATION", "STRESS_FREE"],
    compactExcerpt:
      "His calm, professional, yet personable communication made our day stress-free.",
    fullExcerpt:
      "Patrick is incredible. His calm, professional, yet personable communication made our day stress-free.",
    attribution: "Matthew Bundala",
    evidenceStatus: "published_site",
  },
  {
    id: "vanessa-pocock",
    reviewerName: "Vanessa Pocock",
    quote: "Patrick kept the dance floor packed and the energy high all night long.",
    sourceSurfaces: ["/reviews", "/"],
    themes: ["DANCE_FLOOR", "ENERGY"],
    compactExcerpt: "Patrick kept the dance floor packed and the energy high all night long.",
    fullExcerpt: "Patrick kept the dance floor packed and the energy high all night long.",
    attribution: "Vanessa Pocock",
    evidenceStatus: "published_site",
  },
  {
    id: "natasha-beaudry",
    reviewerName: "Natasha Beaudry",
    quote:
      "We were thrilled to have Patrick from Squamish as he was able to easily attend pre-wedding meetings at our venue.",
    sourceSurfaces: ["/reviews"],
    themes: ["LOCAL", "PLANNING"],
    compactExcerpt: "He was able to easily attend pre-wedding meetings at our venue.",
    fullExcerpt:
      "We were thrilled to have Patrick from Squamish as he was able to easily attend pre-wedding meetings at our venue.",
    attribution: "Natasha Beaudry",
    evidenceStatus: "published_site",
  },
  {
    id: "matias-fontecilla",
    reviewerName: "Matias Fontecilla",
    quote: "We couldn't have asked for a better DJ! Highly recommend for any event.",
    sourceSurfaces: ["/reviews"],
    themes: ["CRAFT"],
    compactExcerpt: "We couldn't have asked for a better DJ!",
    fullExcerpt: "We couldn't have asked for a better DJ! Highly recommend for any event.",
    attribution: "Matias Fontecilla",
    evidenceStatus: "published_site",
  },
  {
    id: "danya-karras",
    reviewerName: "Danya Karras",
    quote:
      "Patrick was absolutely fantastic! He handled our ceremony, cocktail hour, and reception seamlessly.",
    sourceSurfaces: ["/reviews"],
    themes: ["FULL_EVENT", "SEAMLESS"],
    compactExcerpt: "He handled our ceremony, cocktail hour, and reception seamlessly.",
    fullExcerpt:
      "Patrick was absolutely fantastic! He handled our ceremony, cocktail hour, and reception seamlessly.",
    attribution: "Danya Karras",
    evidenceStatus: "published_site",
  },
  {
    id: "wedding-couple-anonymous",
    reviewerName: "Wedding couple",
    quote:
      "Patrick was more than just a DJ for our wedding; he was a vital part of our team, and he really went above and beyond to ensure everything ran smoothly. We highly recommend him.",
    sourceSurfaces: ["/reviews"],
    themes: ["TEAM_MEMBER", "SEAMLESS"],
    compactExcerpt: "He was a vital part of our team.",
    fullExcerpt:
      "Patrick was more than just a DJ for our wedding; he was a vital part of our team, and he really went above and beyond to ensure everything ran smoothly. We highly recommend him.",
    attribution: "Wedding couple",
    evidenceStatus: "published_site",
  },
  {
    id: "ellen-selby",
    reviewerName: "Ellen Selby",
    quote:
      "Patrick was great at our wedding. The song transitions were perfect, and there was never a lull in music throughout the entire night! The group was dancing, and everyone really enjoyed the music! Thanks Patrick for making our wedding unforgettable!",
    sourceSurfaces: ["/reviews"],
    themes: ["CRAFT", "DANCE_FLOOR", "ENERGY"],
    compactExcerpt: "The song transitions were perfect, and there was never a lull in music.",
    fullExcerpt:
      "Patrick was great at our wedding. The song transitions were perfect, and there was never a lull in music throughout the entire night! The group was dancing, and everyone really enjoyed the music! Thanks Patrick for making our wedding unforgettable!",
    attribution: "Ellen Selby",
    evidenceStatus: "published_site",
  },
  {
    id: "melissa-schweyer",
    reviewerName: "Melissa Schweyer",
    quote:
      "Patrick provided fantastic entertainment for us and our guests at our wedding this past August. From prep and planning to day-of execution, Patrick was friendly, professional and talented. The music was on point and our dance floor was the place to be during our reception. I highly recommend Patrick for any and all of your DJ needs!",
    sourceSurfaces: ["/reviews"],
    themes: ["PLANNING", "FULL_EVENT", "DANCE_FLOOR"],
    compactExcerpt: "From prep and planning to day-of execution, Patrick was friendly, professional and talented.",
    fullExcerpt:
      "Patrick provided fantastic entertainment for us and our guests at our wedding this past August. From prep and planning to day-of execution, Patrick was friendly, professional and talented. The music was on point and our dance floor was the place to be during our reception. I highly recommend Patrick for any and all of your DJ needs!",
    attribution: "Melissa Schweyer",
    evidenceStatus: "published_site",
  },
] as const;

export const POST_AVAILABILITY_PROOF_FULL_ID = "stephen-henry" as const;
export const POST_AVAILABILITY_PROOF_COMPACT_ID = "stephen-henry" as const;

export function getReviewById(id: string): CanonicalReview | undefined {
  return CANONICAL_REVIEWS.find((review) => review.id === id);
}

/** Proof quotation for Availability Success — excerpt when governed, else canonical quote. */
export function getAvailabilitySuccessProofQuote(review: CanonicalReview): string {
  return review.availabilitySuccessExcerpt ?? review.quote;
}

/** Visitor-facing venue context for post-availability attribution. */
export function formatMarriedAtVenue(venue: string): string {
  return `Married at ${venue}`;
}

export function getFeaturedReviewsForSurface(
  surface: string,
): readonly CanonicalReview[] {
  return CANONICAL_REVIEWS.filter((review) => review.sourceSurfaces.includes(surface));
}

/** Homepage and proof-strip featured set (order preserved). */
export const HOMEPAGE_FEATURED_REVIEW_IDS = [
  "vanessa-pocock",
  "matthew-bundala",
  "stephen-henry",
] as const;

export const AUTHORITY_PROOF_STRIP_REVIEW_IDS = [
  "vanessa-pocock",
  "matthew-bundala",
  "cassandra-wilding",
] as const;
