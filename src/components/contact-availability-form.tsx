"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { bookConsultPrimaryButtonClassName } from "@/components/book-consult-tracked-link";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";
import { headlineVariantPayload } from "@/lib/experiment";
import type { ContactApiResponse } from "@/types/contact-api";

function clientPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

const FORM_ANALYTICS = {
  surface: "contact_form",
  form_type: "inquiry",
} as const;

type AvailabilityPhase =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "unavailable"; message: string }
  | { kind: "available"; message: string };

type FormStatus = "idle" | "submitting" | "success" | "error";

function digitsOnly(value: string, maxLen: number): string {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

/** Returns YYYY-MM-DD when all segments are complete and calendar-valid; otherwise "". */
function composedWeddingDate(yearStr: string, monthStr: string, dayStr: string): string {
  if (yearStr.length !== 4 || monthStr.length !== 2 || dayStr.length !== 2) return "";
  const yi = Number(yearStr);
  const mi = Number(monthStr);
  const di = Number(dayStr);
  if (yi < 2000 || yi > 2100) return "";
  if (mi < 1 || mi > 12) return "";
  if (di < 1 || di > 31) return "";
  const dt = new Date(yi, mi - 1, di);
  if (dt.getFullYear() !== yi || dt.getMonth() !== mi - 1 || dt.getDate() !== di) return "";
  return `${yearStr}-${monthStr}-${dayStr}`;
}

function isForwardInput(e: React.ChangeEvent<HTMLInputElement>): boolean {
  const ie = e.nativeEvent as InputEvent;
  if (!ie.inputType) return true;
  return (
    ie.inputType !== "deleteContentBackward" &&
    ie.inputType !== "deleteContentForward" &&
    ie.inputType !== "deleteByCut"
  );
}

export function ContactAvailabilityForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  /** Server prop first; then build-time `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (common on Vercel if only the public key was set). */
  const turnstileSiteKeyResolved = useMemo(() => {
    const fromServer = turnstileSiteKey.trim();
    if (fromServer) return fromServer;
    return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  }, [turnstileSiteKey]);

  const [yearStr, setYearStr] = useState("");
  const [monthStr, setMonthStr] = useState("");
  const [dayStr, setDayStr] = useState("");
  const weddingDate = useMemo(
    () => composedWeddingDate(yearStr, monthStr, dayStr),
    [yearStr, monthStr, dayStr]
  );
  const [dateError, setDateError] = useState("");
  const [availability, setAvailability] = useState<AvailabilityPhase>({ kind: "idle" });
  const [showInquiry, setShowInquiry] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const inquiryFormEngagementRef = useRef(false);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [venue, setVenue] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [servicesNeeded, setServicesNeeded] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");

  const resetTurnstile = useCallback(() => {
    const id = turnstileWidgetIdRef.current;
    if (typeof window !== "undefined" && window.turnstile?.reset) {
      window.turnstile.reset(id ?? undefined);
    }
    setTurnstileToken("");
  }, []);

  useLayoutEffect(() => {
    if (!showInquiry || !turnstileSiteKeyResolved || !turnstileReady || !turnstileContainerRef.current) return;
    const el = turnstileContainerRef.current;
    const api = window.turnstile;
    if (!api?.render) return;
    if (turnstileWidgetIdRef.current) return;
    const id = api.render(el, {
      sitekey: turnstileSiteKeyResolved,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    turnstileWidgetIdRef.current = id;
    return () => {
      if (id && window.turnstile?.remove) window.turnstile.remove(id);
      turnstileWidgetIdRef.current = null;
    };
  }, [showInquiry, turnstileSiteKeyResolved, turnstileReady]);

  async function checkAvailability() {
    if (!weddingDate) {
      setDateError("Choose a wedding date first.");
      return;
    }
    setDateError("");
    trackEvent(ANALYTICS_EVENTS.availabilityCheckStart, {
      surface: "contact_form",
      form_type: "availability",
      status: "start",
      page_path: clientPagePath(),
    });
    setAvailability({ kind: "checking" });
    setShowInquiry(false);
    setFormStatus("idle");
    setFieldErrors({});
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: weddingDate }),
      });

      let data: unknown;
      try {
        data = await res.json();
      } catch {
        trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
          surface: "contact_form",
          form_type: "availability",
          status: "error",
          page_path: clientPagePath(),
        });
        setAvailability({
          kind: "unavailable",
          message: "That date could not be checked. Try again in a moment.",
        });
        return;
      }

      if (typeof data !== "object" || data === null) {
        trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
          surface: "contact_form",
          form_type: "availability",
          status: "error",
          page_path: clientPagePath(),
        });
        setAvailability({
          kind: "unavailable",
          message: "That date could not be checked. Try again in a moment.",
        });
        return;
      }

      const body = data as { success?: boolean; available?: boolean; message?: string };

      if (!res.ok || body.success === false) {
        trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
          surface: "contact_form",
          form_type: "availability",
          status: "error",
          http_status: res.status,
          page_path: clientPagePath(),
        });
        setAvailability({
          kind: "unavailable",
          message: body.message ?? "That date could not be checked. Try again in a moment.",
        });
        return;
      }

      if (typeof body.available !== "boolean") {
        trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
          surface: "contact_form",
          form_type: "availability",
          status: "error",
          page_path: clientPagePath(),
        });
        setAvailability({
          kind: "unavailable",
          message: "That date could not be checked. Try again in a moment.",
        });
        return;
      }

      if (body.available === false) {
        trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
          surface: "contact_form",
          form_type: "availability",
          status: "success",
          result: "unavailable",
          page_path: clientPagePath(),
        });
        setAvailability({ kind: "unavailable", message: body.message ?? "That date is not available." });
        return;
      }

      trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
        surface: "contact_form",
        form_type: "availability",
        status: "success",
        result: "available",
        page_path: clientPagePath(),
      });
      setAvailability({ kind: "available", message: body.message ?? "That date looks open." });
      setShowInquiry(false);
    } catch {
      trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, {
        surface: "contact_form",
        form_type: "availability",
        status: "network_error",
        page_path: clientPagePath(),
      });
      setAvailability({
        kind: "unavailable",
        message: "Something went wrong checking the date. Please try again.",
      });
    }
  }

  function trackCalendlyClick() {
    trackEvent(ANALYTICS_EVENTS.calendlyClick, { surface: FORM_ANALYTICS.surface });
  }

  function handleInquiryFormFocusCapture(e: React.FocusEvent<HTMLFormElement>) {
    if (inquiryFormEngagementRef.current) return;
    const t = e.target;
    if (!(t instanceof HTMLInputElement) && !(t instanceof HTMLTextAreaElement)) return;
    if (t.id === "inquiry-company") return;
    inquiryFormEngagementRef.current = true;
    trackEvent(ANALYTICS_EVENTS.contactFormStart, {
      surface: "contact_form",
      form_type: "inquiry",
      status: "start",
      page_path: clientPagePath(),
      ...headlineVariantPayload(),
    });
  }

  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    trackEvent(ANALYTICS_EVENTS.contactFormSubmitAttempt, {
      ...FORM_ANALYTICS,
      status: "attempt",
      ...headlineVariantPayload(),
    });
    if (!turnstileSiteKeyResolved || !turnstileToken) {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
        ...FORM_ANALYTICS,
        status: "error",
        reason: "turnstile_pending",
        ...headlineVariantPayload(),
      });
      setFormMessage("Please complete the security check below.");
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    setFormMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "availability_inquiry",
          name,
          partnerName,
          email,
          phone,
          weddingDate,
          venue,
          guestCount,
          servicesNeeded,
          message,
          turnstileToken,
          company: honeypot,
        }),
      });
      let data: ContactApiResponse;
      try {
        data = (await res.json()) as ContactApiResponse;
      } catch {
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
          ...FORM_ANALYTICS,
          status: "error",
          reason: "invalid_response",
          ...headlineVariantPayload(),
        });
        setFormStatus("error");
        setFormMessage("Something went wrong. Please refresh and try again.");
        return;
      }
      if (!data.success) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
          ...FORM_ANALYTICS,
          status: "error",
          reason: "validation_or_server",
          ...headlineVariantPayload(),
        });
        setFormStatus("error");
        setFormMessage(data.message);
        resetTurnstile();
        return;
      }
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitSuccess, {
        ...FORM_ANALYTICS,
        status: "success",
        ...headlineVariantPayload(),
      });
      setFormStatus("success");
      setFormMessage(data.message);
    } catch {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
        ...FORM_ANALYTICS,
        status: "error",
        reason: "network",
        ...headlineVariantPayload(),
      });
      setFormStatus("error");
      setFormMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    }
  }

  const consultButtonClass =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/5";

  const dateInputClass =
    "rounded-xl border border-white/15 bg-neutral-950 px-3 py-3 text-center text-white outline-none focus:border-amber-300/50 tabular-nums";

  function clearDateFields() {
    setYearStr("");
    setMonthStr("");
    setDayStr("");
  }

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 4);
    setYearStr(v);
    setDateError("");
    setAvailability({ kind: "idle" });
    if (v.length !== 4 || !isForwardInput(e)) return;
    const yn = Number(v);
    if (yn >= 2000 && yn <= 2100) {
      requestAnimationFrame(() => monthRef.current?.focus());
    }
  }

  function handleMonthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setMonthStr(v);
    setDateError("");
    setAvailability({ kind: "idle" });
    if (v.length !== 2 || !isForwardInput(e)) return;
    const mn = Number(v);
    if (mn >= 1 && mn <= 12) {
      requestAnimationFrame(() => dayRef.current?.focus());
    }
  }

  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setDayStr(v);
    setDateError("");
    setAvailability({ kind: "idle" });
  }

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-white/55">
        <span className="text-white/45">Prefer to talk first?</span>{" "}
        <a
          href="#book-consult"
          className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
        >
          Book a Consult
        </a>
        <span className="text-white/45">, or check your date first below.</span>{" "}
        <span className="text-white/45">
          Prefer not to chat yet?{" "}
          <a
            href="#send-message"
            className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
          >
            Send a Message
          </a>
          .
        </span>
      </p>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
      />

      <div className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-6 lg:p-8">
        <label className="block text-sm font-medium text-white/80" htmlFor="wedding-date-year">
          Wedding date
        </label>
        <p className="mt-1 text-sm text-white/45">Pick your day. We will check it against Patrick&apos;s calendar.</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="flex max-w-md flex-wrap items-center gap-2 sm:gap-3">
            <input
              ref={yearRef}
              id="wedding-date-year"
              name="weddingDateYear"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY"
              aria-label="Year (YYYY)"
              value={yearStr}
              onChange={handleYearChange}
              maxLength={4}
              className={`${dateInputClass} w-[4.75rem] sm:w-[5.25rem]`}
            />
            <span className="text-white/35 select-none" aria-hidden>
              /
            </span>
            <input
              ref={monthRef}
              id="wedding-date-month"
              name="weddingDateMonth"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="MM"
              aria-label="Month (MM)"
              value={monthStr}
              onChange={handleMonthChange}
              maxLength={2}
              className={`${dateInputClass} w-[3.25rem]`}
            />
            <span className="text-white/35 select-none" aria-hidden>
              /
            </span>
            <input
              ref={dayRef}
              id="wedding-date-day"
              name="weddingDateDay"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="DD"
              aria-label="Day (DD)"
              value={dayStr}
              onChange={handleDayChange}
              maxLength={2}
              className={`${dateInputClass} w-[3.25rem]`}
            />
          </div>
          <button
            type="button"
            onClick={checkAvailability}
            disabled={availability.kind === "checking"}
            className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {availability.kind === "checking" ? "Checking…" : "Check Availability"}
          </button>
        </div>
        {dateError ? <p className="mt-3 text-sm text-rose-300/90">{dateError}</p> : null}
      </div>

      {availability.kind === "unavailable" && (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 lg:p-8">
          <p className="text-lg leading-relaxed text-white/85">{availability.message}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => {
                setAvailability({ kind: "idle" });
                clearDateFields();
              }}
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
            >
              Try Another Date
            </button>
            <a
              href="/contact#send-message"
              className={consultButtonClass}
            >
              Send a Message
            </a>
          </div>
        </div>
      )}

      {availability.kind === "available" && (
        <div className="rounded-[1.5rem] border border-amber-400/25 bg-amber-950/25 p-6 lg:p-8">
          <p className="text-lg leading-relaxed text-white/90">{availability.message}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={CONSULT_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={bookConsultPrimaryButtonClassName}
              onClick={trackCalendlyClick}
            >
              Book a Consult
            </a>
            <button
              type="button"
              onClick={() => setShowInquiry(true)}
              className={consultButtonClass}
            >
              Continue with Inquiry
            </button>
          </div>
        </div>
      )}

      {availability.kind === "available" && showInquiry && (
        <form
          onSubmit={submitInquiry}
          onFocusCapture={handleInquiryFormFocusCapture}
          className="relative space-y-5 rounded-[1.5rem] border border-white/10 bg-neutral-950/40 p-6 lg:p-8"
          noValidate
        >
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Your details</div>
          <p className="text-sm text-white/55">
            Wedding date on file: <span className="font-medium text-white/80">{weddingDate}</span>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/70" htmlFor="inquiry-name">
                Your name
              </label>
              <input
                id="inquiry-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
                autoComplete="name"
              />
              {fieldErrors.name ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.name}</p> : null}
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="inquiry-partner">
                Partner&apos;s name
              </label>
              <input
                id="inquiry-partner"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-email">
              Email
            </label>
            <input
              id="inquiry-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
              autoComplete="email"
            />
            {fieldErrors.email ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.email}</p> : null}
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-phone">
              Phone <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-venue">
              Venue or location
            </label>
            <input
              id="inquiry-venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
            />
            {fieldErrors.venue ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.venue}</p> : null}
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-guests">
              Guest count <span className="text-white/40">(approx.)</span>
            </label>
            <input
              id="inquiry-guests"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
            />
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-services">
              Services needed
            </label>
            <input
              id="inquiry-services"
              value={servicesNeeded}
              onChange={(e) => setServicesNeeded(e.target.value)}
              placeholder="e.g. ceremony + reception DJ"
              className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-300/50"
            />
          </div>

          <div>
            <label className="text-sm text-white/70" htmlFor="inquiry-message">
              Message
            </label>
            <textarea
              id="inquiry-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50"
            />
            {fieldErrors.message ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.message}</p> : null}
          </div>

          <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="inquiry-company">Company</label>
            <input
              id="inquiry-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {turnstileSiteKeyResolved ? (
            <div ref={turnstileContainerRef} className="min-h-[65px]" />
          ) : (
            <p className="text-sm text-amber-200/80">
              Turnstile (spam protection) is not configured for this deployment. Add{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white/90">TURNSTILE_SITE_KEY</code> or{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white/90">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> in
              your host env, redeploy, or book a consult from the consult section below.
            </p>
          )}

          {formStatus === "error" && formMessage ? (
            <p className="text-sm text-rose-300/90" role="alert">
              {formMessage}
            </p>
          ) : null}
          {formStatus === "success" ? (
            <p className="text-sm text-amber-200/95" role="status">
              {formMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={
              formStatus === "submitting" ||
              !turnstileSiteKeyResolved ||
              (turnstileSiteKeyResolved ? !turnstileToken : false)
            }
            className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formStatus === "submitting" ? "Sending…" : "Send inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
