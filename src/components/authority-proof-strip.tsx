import Link from "next/link";
import {
  AUTHORITY_PROOF_STRIP_REVIEW_IDS,
  getReviewById,
} from "@/config/reviews";

/**
 * Verbatim excerpts from canonical reviews (`src/config/reviews.ts`).
 */
export const AUTHORITY_PROOF_QUOTES = AUTHORITY_PROOF_STRIP_REVIEW_IDS.map((id) => {
  const review = getReviewById(id);
  if (!review) {
    throw new Error(`Missing authority proof review: ${id}`);
  }
  return {
    name: review.reviewerName,
    quote: review.quote,
  };
});

type Props = {
  /** Visible heading; defaults to short proof label. */
  heading?: string;
  className?: string;
};

/**
 * Compact proof strip for authority pages. Uses only existing site testimonial copy.
 */
export function AuthorityProofStrip({ heading = "What couples describe", className = "" }: Props) {
  return (
    <section
      className={`border-y border-white/10 bg-white/[0.03] ${className}`.trim()}
      aria-labelledby="authority-proof-strip-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Proof</div>
          <h2 id="authority-proof-strip-heading" className="mt-4 text-2xl font-semibold sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/50">
            Language below is from real couple feedback on the{" "}
            <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              reviews page
            </Link>
            .
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-6 md:grid-cols-3">
          {AUTHORITY_PROOF_QUOTES.map((item) => (
            <li key={item.name}>
              <figure className="premium-surface h-full rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-5">
                <blockquote className="text-sm leading-7 text-white/80">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 border-t border-white/10 pt-3 text-xs font-medium uppercase tracking-wide text-amber-300/90">
                  {item.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
