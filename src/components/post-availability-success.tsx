"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  POST_AVAILABILITY_COMPACT_COPY,
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

  return (
    <motion.div
      {...motionProps}
      className={`${cardClass} ${className}`.trim()}
      role="region"
      aria-labelledby={`post-availability-success-heading-${variant}`}
    >
      <p className="sr-only">{POST_AVAILABILITY_SR_STATUS.available(formattedDate)}</p>
      <p className="sr-only">{canonicalStatusMessage}</p>

      <div
        className={
          variant === "compact"
            ? "inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200/95"
            : "inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-amber-200/95"
        }
      >
        {formattedDate}
      </div>

      <h3
        id={`post-availability-success-heading-${variant}`}
        className={
          variant === "compact"
            ? "mt-3 text-base font-semibold leading-snug text-white/95"
            : "mt-5 text-xl font-semibold leading-snug text-white/95 sm:text-2xl"
        }
      >
        {variant === "full"
          ? POST_AVAILABILITY_FULL_COPY.reliefHeadline
          : POST_AVAILABILITY_COMPACT_COPY.reliefHeadline}
      </h3>

      {proof && proofQuote ? (
        <figure className={variant === "compact" ? "mt-3" : "mt-6"}>
          <blockquote
            className={
              variant === "compact"
                ? "text-sm leading-relaxed text-white/85"
                : "text-base leading-relaxed text-white/85"
            }
          >
            &ldquo;{proofQuote}&rdquo;
          </blockquote>
          <figcaption
            className={
              variant === "compact"
                ? "mt-2 text-xs font-medium uppercase tracking-wide text-amber-300/90"
                : "mt-4 border-t border-white/10 pt-3 text-xs font-medium uppercase tracking-wide text-amber-300/90"
            }
          >
            {proof.attribution}
          </figcaption>
        </figure>
      ) : null}

      {variant === "full" ? (
        <>
          <p className="mt-6 text-sm leading-relaxed text-white/75">
            {POST_AVAILABILITY_FULL_COPY.identityStatement}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
            {POST_AVAILABILITY_FULL_COPY.outcomeBullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-white/65">
            {POST_AVAILABILITY_FULL_COPY.soundCheckExplanation}
          </p>
        </>
      ) : null}

      <p
        className={
          variant === "compact" ? "mt-3 text-xs leading-relaxed text-white/50" : "mt-6 text-sm leading-relaxed text-white/50"
        }
      >
        {POST_AVAILABILITY_RISK_REDUCER}
      </p>

      <div className={variant === "compact" ? "mt-4" : "mt-8"}>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${bookConsultPrimaryButtonClassName} ${variant === "compact" ? "w-full py-2.5 text-sm" : "w-full sm:w-auto"}`}
          onClick={handleConsultClick}
        >
          {POST_AVAILABILITY_PRIMARY_CTA_LABEL}
        </a>
      </div>

      {variant === "full" && onInquiryFallback ? (
        <p className="mt-4 text-center text-sm text-white/45 sm:text-left">
          <button
            type="button"
            onClick={handleInquiryFallbackClick}
            className="font-medium text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-amber-200/90 hover:decoration-amber-300/35"
          >
            {POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL}
          </button>
        </p>
      ) : null}
    </motion.div>
  );
}
