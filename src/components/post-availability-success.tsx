"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  POST_AVAILABILITY_COMPACT_COPY,
  POST_AVAILABILITY_DATE_CHIP_PREFIX,
  POST_AVAILABILITY_FULL_COPY,
  POST_AVAILABILITY_PRIMARY_CTA_LABEL,
  POST_AVAILABILITY_RISK_REDUCER,
  POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL,
  POST_AVAILABILITY_SR_STATUS,
} from "@/config/post-availability-copy";
import {
  getReviewById,
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
} from "@/config/reviews";
import { bookConsultPrimaryButtonClassName } from "@/components/book-consult-tracked-link";
import { formatWeddingDateLong } from "@/lib/format-wedding-date";
import { ANALYTICS_EVENTS, consultClickEventParams, trackEvent } from "@/lib/analytics";
import { buildPostAvailabilityCalendlyUrl } from "@/lib/post-availability-calendly";
import { postAvailabilityAnalyticsBase } from "@/lib/post-availability-analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";

export type PostAvailabilitySuccessVariant = "full" | "compact";

type Props = {
  variant: PostAvailabilitySuccessVariant;
  weddingDate: string;
  surface: string;
  /** Governed API factual message for assistive technology. */
  canonicalStatusMessage: string;
  onInquiryFallback?: () => void;
  className?: string;
};

const ctaClassName = [
  bookConsultPrimaryButtonClassName,
  CTA_PILL_FLEX_CENTER,
  "w-full max-w-md leading-snug px-5 py-3.5 sm:py-3",
].join(" ");

export function PostAvailabilitySuccess({
  variant,
  weddingDate,
  surface,
  canonicalStatusMessage,
  onInquiryFallback,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const proofViewTracked = useRef(false);
  const formattedDate = formatWeddingDateLong(weddingDate);
  const proofId =
    variant === "full" ? POST_AVAILABILITY_PROOF_FULL_ID : POST_AVAILABILITY_PROOF_COMPACT_ID;
  const proof = getReviewById(proofId);
  const calendlyUrl = buildPostAvailabilityCalendlyUrl({ weddingDate, surface });
  const copy = variant === "full" ? POST_AVAILABILITY_FULL_COPY : POST_AVAILABILITY_COMPACT_COPY;

  useEffect(() => {
    trackEvent(
      ANALYTICS_EVENTS.postAvailabilitySuccessView,
      postAvailabilityAnalyticsBase(surface, weddingDate, variant),
    );
  }, [surface, weddingDate, variant]);

  useEffect(() => {
    if (!proof || proofViewTracked.current) return;
    proofViewTracked.current = true;
    trackEvent(
      ANALYTICS_EVENTS.postAvailabilityProofView,
      postAvailabilityAnalyticsBase(surface, weddingDate, variant),
    );
  }, [proof, surface, weddingDate, variant]);

  function handleConsultClick() {
    trackEvent(
      ANALYTICS_EVENTS.bookConsultClick,
      consultClickEventParams({
        surface,
        intent: "post_availability_calendly",
        funnel_context: "post_availability",
      }),
    );
    trackEvent(
      ANALYTICS_EVENTS.calendlyClick,
      consultClickEventParams({
        surface,
        intent: "post_availability_calendly",
        funnel_context: "post_availability",
      }),
    );
  }

  function handleInquiryFallbackClick() {
    trackEvent(ANALYTICS_EVENTS.inquiryFallbackClick, {
      ...postAvailabilityAnalyticsBase(surface, weddingDate, variant),
      surface,
    });
    onInquiryFallback?.();
  }

  const cardClass =
    variant === "compact"
      ? "rounded-xl border border-amber-400/20 bg-amber-950/30 p-4"
      : "rounded-[1.5rem] border border-amber-400/25 bg-amber-950/25 p-6 lg:p-8";

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  const proofQuote =
    variant === "full" ? proof?.quote : proof?.compactExcerpt ?? proof?.quote;

  const dateChipClass =
    variant === "compact"
      ? "inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200/95"
      : "inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-amber-200/95";

  const headlineClass =
    variant === "compact"
      ? "text-base font-semibold leading-snug text-balance text-white/95"
      : "text-xl font-semibold leading-snug text-balance text-white/95 sm:text-2xl";

  const bridgeClass =
    variant === "compact"
      ? "text-sm leading-relaxed text-white/75"
      : "text-sm leading-relaxed text-white/75 sm:text-base";

  const proofPanelClass =
    variant === "compact"
      ? "mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-3.5"
      : "mt-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5";

  return (
    <motion.div
      {...motionProps}
      className={`${cardClass} ${className}`.trim()}
      role="region"
      aria-labelledby={`post-availability-success-heading-${variant}`}
    >
      <p className="sr-only">{POST_AVAILABILITY_SR_STATUS.available(formattedDate)}</p>
      <p className="sr-only">{canonicalStatusMessage}</p>

      {/* Act 1 — Relief + Excitement */}
      <header className={variant === "compact" ? "space-y-2.5" : "space-y-3 sm:space-y-4"}>
        <div className="flex justify-center sm:justify-start">
          <div className={dateChipClass}>
            <span className="text-amber-300/90">{POST_AVAILABILITY_DATE_CHIP_PREFIX}</span>
            <span className="text-white/30" aria-hidden>
              ·
            </span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3
          id={`post-availability-success-heading-${variant}`}
          className={`${headlineClass} text-center sm:text-left`}
        >
          {copy.reliefHeadline}
        </h3>

        <p className={`${bridgeClass} text-center sm:text-left`}>{copy.excitementBridge}</p>
      </header>

      {/* Act 2 — Confidence (full only) */}
      {variant === "full" ? (
        <section
          className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-7"
          aria-labelledby={`post-availability-next-step-${variant}`}
        >
          <p
            id={`post-availability-next-step-${variant}`}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/85"
          >
            {POST_AVAILABILITY_FULL_COPY.nextStepHeading}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            {POST_AVAILABILITY_FULL_COPY.soundCheckExplanation}
          </p>
        </section>
      ) : null}

      {/* Act 3 — Trust */}
      {proof && proofQuote ? (
        <section
          className={variant === "compact" ? "mt-3" : "mt-6 sm:mt-8"}
          aria-labelledby={`post-availability-proof-${variant}`}
        >
          <p
            id={`post-availability-proof-${variant}`}
            className={
              variant === "compact"
                ? "text-xs leading-relaxed text-white/60"
                : "text-sm leading-relaxed text-white/65"
            }
          >
            {copy.proofTransition}
          </p>

          <figure className={proofPanelClass}>
            <blockquote
              className={
                variant === "compact"
                  ? "text-sm font-medium leading-relaxed text-white/90"
                  : "text-base font-medium leading-relaxed text-white/90 sm:text-[1.05rem]"
              }
            >
              &ldquo;{proofQuote}&rdquo;
            </blockquote>
            <figcaption
              className={
                variant === "compact"
                  ? "mt-2 text-xs font-medium uppercase tracking-wide text-amber-300/90"
                  : "mt-3 text-xs font-medium uppercase tracking-wide text-amber-300/90"
              }
            >
              {proof.attribution}
            </figcaption>
          </figure>

          {variant === "full" ? (
            <>
              <p className="mt-5 text-sm leading-relaxed text-white/75">
                {POST_AVAILABILITY_FULL_COPY.identityStatement}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/70">
                {POST_AVAILABILITY_FULL_COPY.outcomeBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80"
                      aria-hidden
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}

      {/* Act 4 — Action */}
      <section
        className={
          variant === "compact"
            ? "mt-4 flex flex-col items-center"
            : "mt-8 flex flex-col items-center border-t border-white/10 pt-6 sm:mt-9 sm:pt-7"
        }
        aria-label="Reserve your planning session"
      >
        <p
          className={
            variant === "compact"
              ? "text-center text-xs leading-relaxed text-white/50"
              : "text-center text-sm leading-relaxed text-white/50"
          }
        >
          {POST_AVAILABILITY_RISK_REDUCER}
        </p>

        <div className="mt-4 flex w-full justify-center">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
            onClick={handleConsultClick}
          >
            {POST_AVAILABILITY_PRIMARY_CTA_LABEL}
          </a>
        </div>

        {variant === "full" && onInquiryFallback ? (
          <p className="mt-4 text-center text-sm text-white/45">
            <button
              type="button"
              onClick={handleInquiryFallbackClick}
              className="font-medium text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-amber-200/90 hover:decoration-amber-300/35"
            >
              {POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL}
            </button>
          </p>
        ) : null}
      </section>
    </motion.div>
  );
}
