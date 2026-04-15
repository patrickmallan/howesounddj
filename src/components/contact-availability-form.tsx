"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { ContactApiResponse } from "@/types/contact-api";

const CALENDLY_URL = "https://calendly.com/patrick-howesounddj";

type AvailabilityPhase =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "unavailable"; message: string }
  | { kind: "available"; message: string };

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactAvailabilityForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  /** Server prop first; then build-time `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (common on Vercel if only the public key was set). */
  const turnstileSiteKeyResolved = useMemo(() => {
    const fromServer = turnstileSiteKey.trim();
    if (fromServer) return fromServer;
    return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  }, [turnstileSiteKey]);

  const [weddingDate, setWeddingDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [availability, setAvailability] = useState<AvailabilityPhase>({ kind: "idle" });
  const [showInquiry, setShowInquiry] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

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
      const data = (await res.json()) as {
        success?: boolean;
        available?: boolean;
        message?: string;
      };
      if (!res.ok || data.success === false) {
        setAvailability({
          kind: "unavailable",
          message: data.message ?? "That date could not be checked. Try again in a moment.",
        });
        return;
      }
      if (data.available === false) {
        setAvailability({ kind: "unavailable", message: data.message ?? "That date is not available." });
        return;
      }
      setAvailability({ kind: "available", message: data.message ?? "That date looks open." });
      setShowInquiry(false);
    } catch {
      setAvailability({
        kind: "unavailable",
        message: "Something went wrong checking the date. Please try again.",
      });
    }
  }

  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    if (!turnstileSiteKeyResolved || !turnstileToken) {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, { reason: "turnstile_pending" });
      setFormMessage("Please complete the security check below.");
      setFormStatus("error");
      return;
    }
    trackEvent(ANALYTICS_EVENTS.contactFormSubmitAttempt);
    setFormStatus("submitting");
    setFormMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, { reason: "invalid_response" });
        setFormStatus("error");
        setFormMessage("Something went wrong. Please refresh and try again.");
        return;
      }
      if (!data.success) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, { reason: "validation_or_server" });
        setFormStatus("error");
        setFormMessage(data.message);
        resetTurnstile();
        return;
      }
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitSuccess);
      setFormStatus("success");
      setFormMessage(data.message);
    } catch {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, { reason: "network" });
      setFormStatus("error");
      setFormMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    }
  }

  const consultButtonClass =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/5";
  const consultButtonPrimaryOutline =
    "inline-flex items-center justify-center rounded-full border border-amber-300/50 bg-amber-300/10 px-6 py-3 text-center text-sm font-semibold text-amber-200 transition hover:border-amber-300 hover:bg-amber-300/15";

  return (
    <div className="space-y-8">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
      />

      <div className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-6 lg:p-8">
        <label className="block text-sm font-medium text-white/80" htmlFor="wedding-date">
          Wedding date
        </label>
        <p className="mt-1 text-sm text-white/45">Pick your day. We will check it against Patrick&apos;s calendar.</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <input
            id="wedding-date"
            name="weddingDate"
            type="date"
            value={weddingDate}
            onChange={(e) => {
              setWeddingDate(e.target.value);
              setDateError("");
              setAvailability({ kind: "idle" });
            }}
            className="w-full max-w-xs rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-amber-300/50 sm:w-auto"
          />
          <button
            type="button"
            onClick={checkAvailability}
            disabled={availability.kind === "checking"}
            className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={consultButtonPrimaryOutline}>
              Book a Consult
            </a>
            <button
              type="button"
              onClick={() => {
                setAvailability({ kind: "idle" });
                setWeddingDate("");
              }}
              className={consultButtonClass}
            >
              Try another date
            </button>
          </div>
        </div>
      )}

      {availability.kind === "available" && (
        <div className="rounded-[1.5rem] border border-amber-400/25 bg-amber-950/25 p-6 lg:p-8">
          <p className="text-lg leading-relaxed text-white/90">{availability.message}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => setShowInquiry(true)}
              className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
            >
              Continue with Inquiry
            </button>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={consultButtonClass}>
              Book a Consult
            </a>
          </div>
        </div>
      )}

      {availability.kind === "available" && showInquiry && (
        <form
          onSubmit={submitInquiry}
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
              your host env, redeploy, or use Book a Consult below.
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
            className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formStatus === "submitting" ? "Sending…" : "Send inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
