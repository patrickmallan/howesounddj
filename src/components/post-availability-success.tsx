"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  POST_AVAILABILITY_COMPACT_CTA_LABEL,
  POST_AVAILABILITY_CTA_SUPPORT,
  POST_AVAILABILITY_EDIT_DATE_LABEL,
  POST_AVAILABILITY_FULL_PLANNING_SESSION,
  POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL,
  POST_AVAILABILITY_PRIMARY_CTA_LABEL,
  POST_AVAILABILITY_SR_STATUS,
  POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION,
  POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD,
  postAvailabilityConfirmedDateLabel,
} from "@/config/post-availability-copy";
import {
  formatMarriedAtVenue,
  getAvailabilitySuccessProofQuote,
  getReviewById,
  POST_AVAILABILITY_PROOF_COMPACT_ID,
  POST_AVAILABILITY_PROOF_FULL_ID,
} from "@/config/reviews";
import { bookConsultPrimaryButtonClassName } from "@/components/book-consult-tracked-link";
import {
  roleActionFooter,
  roleAttributionName,
  roleAttributionVenue,
  roleConfirmationBar,
  roleConfirmationDate,
  roleConfirmationEdit,
  roleContentGroups,
  roleCtaSupport,
  roleHeadline,
  roleHeadlineLine,
  roleProofGroup,
  roleSupportingNarrative,
  roleTestimonial,
  formatAvailabilityTestimonialQuotation,
} from "@/components/post-availability-success-styles";
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

const supportingNarrative = roleSupportingNarrative();

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
  const proofQuote = proof ? getAvailabilitySuccessProofQuote(proof) : "";

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

  const ctaLabel =
    variant === "compact" ? POST_AVAILABILITY_COMPACT_CTA_LABEL : POST_AVAILABILITY_PRIMARY_CTA_LABEL;
  const ctaClassName = variant === "compact" ? compactCtaClassName : fullCtaClassName;
  const headlineLine = roleHeadlineLine();

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
        <div className={roleContentGroups(variant)}>
          {/* GROUP 1 : Confirmation */}
          <div className={roleConfirmationBar(variant)} data-availability-role="confirmation">
            <p className={`min-w-0 ${roleConfirmationDate()}`}>
              {postAvailabilityConfirmedDateLabel(formattedDate)}
            </p>
            {onEditDate ? (
              <button
                type="button"
                onClick={handleEditDateClick}
                className={roleConfirmationEdit()}
                aria-label={`Edit wedding date, currently ${formattedDate}`}
              >
                {POST_AVAILABILITY_EDIT_DATE_LABEL}
              </button>
            ) : null}
          </div>

          {/* GROUP 2 : Headline */}
          <h3
            ref={headingRef}
            id={`post-availability-success-heading-${variant}`}
            tabIndex={-1}
            className={roleHeadline(variant)}
            data-availability-role="headline"
          >
            <span className={headlineLine}>{POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD}</span>
            <span className={headlineLine}>{POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION}</span>
          </h3>

          {variant === "full" ? (
            <p className={supportingNarrative} data-availability-role="supporting-narrative">
              {POST_AVAILABILITY_FULL_PLANNING_SESSION}
            </p>
          ) : null}

          {/* GROUP 3 : Proof */}
          {proof && proofQuote ? (
            <figure className={roleProofGroup()} data-availability-role="proof">
              <blockquote className={roleTestimonial()} data-availability-role="testimonial">
                {formatAvailabilityTestimonialQuotation(proofQuote)}
              </blockquote>
              <figcaption data-availability-role="attribution">
                <span className={roleAttributionName()}>{proof.attribution}</span>
                {proof.venue ? (
                  <span className={roleAttributionVenue()}>
                    {formatMarriedAtVenue(proof.venue)}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>

      {/* GROUP 4 : Action */}
      <footer className={roleActionFooter(variant)} aria-label="Next step" data-availability-role="action">
        <p className={roleCtaSupport()} data-availability-role="cta-support">
          {POST_AVAILABILITY_CTA_SUPPORT}
        </p>
        <div className={variant === "compact" ? "mt-3 w-full" : "mt-4 w-full"}>
          <a
            ref={ctaRef}
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
            data-availability-role="primary-cta"
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
              className="font-normal text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-white/70 hover:decoration-white/35"
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
      className={`flex flex-col rounded-[1.5rem] border border-amber-400/20 bg-amber-950/20 p-6 lg:p-8 ${className}`.trim()}
      role="region"
      aria-labelledby={`post-availability-success-heading-${variant}`}
    >
      {bodyContent}
    </motion.div>
  );
}
