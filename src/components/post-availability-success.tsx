"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  POST_AVAILABILITY_COMPACT_CTA_LABEL,
  POST_AVAILABILITY_EDIT_DATE_LABEL,
  POST_AVAILABILITY_FULL_PLANNING_SESSION,
  POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL,
  POST_AVAILABILITY_PRIMARY_CTA_LABEL,
  POST_AVAILABILITY_PROOF_CONTEXT,
  POST_AVAILABILITY_RISK_REDUCER,
  POST_AVAILABILITY_SR_STATUS,
  POST_AVAILABILITY_SUCCESS_BRIDGE,
  POST_AVAILABILITY_SUCCESS_HEADLINE,
  postAvailabilityConfirmedDateLabel,
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
  onEditDate?: () => void;
  className?: string;
};

function splitReviewQuoteAtFirstSentence(quote: string): { lead: string; rest: string } {
  const idx = quote.indexOf(". ");
  if (idx === -1) return { lead: quote, rest: "" };
  return { lead: quote.slice(0, idx + 1), rest: quote.slice(idx + 2) };
}

function isElementInitiallyVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= viewportWidth
  );
}

const compactCtaClassName = [
  bookConsultPrimaryButtonClassName,
  CTA_PILL_FLEX_CENTER,
  "w-full whitespace-nowrap px-4 py-3 text-sm font-semibold sm:text-base",
].join(" ");

const fullCtaClassName = [
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
  onEditDate,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const proofViewTracked = useRef(false);
  const successViewTracked = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const formattedDate = formatWeddingDateLong(weddingDate);
  const proofId =
    variant === "full" ? POST_AVAILABILITY_PROOF_FULL_ID : POST_AVAILABILITY_PROOF_COMPACT_ID;
  const proof = getReviewById(proofId);
  const calendlyUrl = buildPostAvailabilityCalendlyUrl({ weddingDate, surface });
  const proofQuote = proof?.quote ?? "";
  const quoteParts = proofQuote ? splitReviewQuoteAtFirstSentence(proofQuote) : null;

  useLayoutEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useLayoutEffect(() => {
    if (successViewTracked.current) return;
    successViewTracked.current = true;
    const ctaVisible =
      variant === "compact" && ctaRef.current
        ? isElementInitiallyVisible(ctaRef.current)
        : undefined;
    trackEvent(
      ANALYTICS_EVENTS.postAvailabilitySuccessView,
      postAvailabilityAnalyticsBase(surface, weddingDate, variant, {
        ctaInitiallyVisible: ctaVisible,
      }),
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

  function handleEditDateClick() {
    trackEvent(
      ANALYTICS_EVENTS.changeDateClick,
      postAvailabilityAnalyticsBase(surface, weddingDate, variant),
    );
    onEditDate?.();
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
      };

  const confirmedBarClass =
    variant === "compact"
      ? "flex items-center justify-between gap-3 rounded-lg border border-amber-300/20 bg-amber-300/10 px-3 py-2.5"
      : "flex items-center justify-between gap-3 rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3";

  const headlineClass =
    variant === "compact"
      ? "text-lg font-semibold leading-snug text-balance text-white/95"
      : "text-xl font-semibold leading-snug text-balance text-white/95 sm:text-2xl";

  const bridgeClass =
    variant === "compact"
      ? "text-sm leading-relaxed text-white/75"
      : "text-sm leading-relaxed text-white/75 sm:text-base";

  const footerClass =
    variant === "compact"
      ? "shrink-0 border-t border-white/10 bg-neutral-950/[0.98] px-0 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      : "shrink-0 border-t border-white/10 pt-6 sm:pt-7";

  const ctaLabel =
    variant === "compact" ? POST_AVAILABILITY_COMPACT_CTA_LABEL : POST_AVAILABILITY_PRIMARY_CTA_LABEL;
  const ctaClassName = variant === "compact" ? compactCtaClassName : fullCtaClassName;

  const bodyContent = (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {POST_AVAILABILITY_SR_STATUS.available(formattedDate)} {canonicalStatusMessage}
      </div>

      <div
        className={
          variant === "compact"
            ? "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
            : "flex flex-col"
        }
      >
        <div className={variant === "compact" ? "space-y-3" : "space-y-4 sm:space-y-5"}>
          <div className={confirmedBarClass}>
            <p className="min-w-0 text-sm font-medium text-white/95">
              {postAvailabilityConfirmedDateLabel(formattedDate)}
            </p>
            {onEditDate ? (
              <button
                type="button"
                onClick={handleEditDateClick}
                className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-amber-200/90 underline decoration-amber-300/30 underline-offset-2 transition hover:text-amber-100 hover:decoration-amber-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                aria-label={`Edit wedding date, currently ${formattedDate}`}
              >
                {POST_AVAILABILITY_EDIT_DATE_LABEL}
              </button>
            ) : null}
          </div>

          <header className={variant === "compact" ? "space-y-2" : "space-y-3"}>
            <h3
              ref={headingRef}
              id={`post-availability-success-heading-${variant}`}
              tabIndex={-1}
              className={`${headlineClass} outline-none`}
            >
              {POST_AVAILABILITY_SUCCESS_HEADLINE}
            </h3>
            <p className={bridgeClass}>{POST_AVAILABILITY_SUCCESS_BRIDGE}</p>
            {variant === "full" ? (
              <p className={`${bridgeClass} text-white/70`}>{POST_AVAILABILITY_FULL_PLANNING_SESSION}</p>
            ) : null}
          </header>

          {proof && proofQuote ? (
            <figure className={variant === "compact" ? "space-y-2" : "space-y-3"}>
              <p
                className={
                  variant === "compact"
                    ? "text-xs leading-relaxed text-white/60"
                    : "text-sm leading-relaxed text-white/65"
                }
              >
                {POST_AVAILABILITY_PROOF_CONTEXT}
              </p>
              <blockquote
                className={
                  variant === "compact"
                    ? "border-l-2 border-amber-300/30 pl-3 text-sm leading-relaxed text-white/90"
                    : "border-l-2 border-amber-300/35 pl-4 text-base leading-relaxed text-white/90 sm:text-[1.05rem]"
                }
              >
                {quoteParts ? (
                  <>
                    &ldquo;
                    <span className="font-semibold text-white/95">{quoteParts.lead}</span>
                    {quoteParts.rest ? (
                      <>
                        {" "}
                        <span className="text-white/75">{quoteParts.rest}</span>
                      </>
                    ) : null}
                    &rdquo;
                  </>
                ) : (
                  <>&ldquo;{proofQuote}&rdquo;</>
                )}
              </blockquote>
              <figcaption
                className={
                  variant === "compact"
                    ? "text-xs font-medium text-amber-300/90"
                    : "text-sm font-medium text-amber-300/90"
                }
              >
                {proof.attribution}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>

      <footer className={footerClass} aria-label="Next step">
        <p
          className={
            variant === "compact"
              ? "text-center text-xs leading-relaxed text-white/50"
              : "text-center text-sm leading-relaxed text-white/50"
          }
        >
          {POST_AVAILABILITY_RISK_REDUCER}
        </p>
        <div className={variant === "compact" ? "mt-3 flex w-full justify-center" : "mt-4 flex w-full justify-center"}>
          <a
            ref={ctaRef}
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
            onClick={handleConsultClick}
          >
            {ctaLabel}
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
      </footer>
    </>
  );

  if (variant === "compact") {
    return (
      <motion.div
        {...motionProps}
        className={`flex min-h-0 flex-1 flex-col ${className}`.trim()}
        role="region"
        aria-labelledby={`post-availability-success-heading-${variant}`}
      >
        {bodyContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...motionProps}
      className={`flex flex-col rounded-[1.5rem] border border-amber-400/25 bg-amber-950/25 p-6 lg:p-8 ${className}`.trim()}
      role="region"
      aria-labelledby={`post-availability-success-heading-${variant}`}
    >
      {bodyContent}
    </motion.div>
  );
}
