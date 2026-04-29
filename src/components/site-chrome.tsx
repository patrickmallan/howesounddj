"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CTADuo from "@/components/cta-duo";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

const navLinks = [
  { href: "/weddings", label: "Wedding DJ Services" },
  { href: "/packages", label: "Wedding DJ Packages" },
  { href: "/reviews", label: "Wedding DJ Reviews" },
  { href: "/about", label: "About Howe Sound DJ" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact HSDJ" },
] as const;

const MOBILE_PRIMARY_NAV_ID = "site-mobile-primary-nav";

/** True when this nav item’s route is the current page or a nested segment (e.g. /contact/...), without false positives like /faq vs /faq-extra. */
function isActiveNavHref(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const mobileLinkBase =
    "relative z-10 block px-4 py-3 text-left text-sm transition hover:bg-white/5";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="relative z-[70] mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-2 min-w-0 shrink text-left transition hover:opacity-90 sm:mr-4 md:min-w-[12rem]"
          aria-label="Howe Sound DJ home"
        >
          <div className="text-base font-semibold tracking-[0.12em] uppercase text-amber-300 sm:text-lg sm:tracking-[0.2em]">
            Howe Sound DJ
          </div>
          <div className="text-[0.65rem] text-white/60 sm:text-xs">Squamish Wedding DJ</div>
        </Link>
        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          <nav
            className="hidden max-w-none flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-white/80 xl:flex xl:gap-x-6"
            aria-label="Primary"
          >
            {navLinks.map((item) => {
              const active = isActiveNavHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-amber-300 transition hover:text-amber-200"
                      : "text-white/80 transition hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded-full border border-white/15 px-2.5 text-sm text-white/85 outline-none transition hover:border-white/25 sm:px-3 xl:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuOpen ? MOBILE_PRIMARY_NAV_ID : undefined}
            aria-haspopup="menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <CheckAvailabilityTrackedLink
            surface="header"
            className="min-h-[44px] shrink-0 items-center justify-center rounded-full bg-amber-300 px-2.5 text-center text-xs font-semibold leading-tight text-neutral-950 transition hover:scale-[1.02] sm:min-h-0 sm:px-4 sm:py-2.5 sm:text-sm xl:px-5"
          />
        </div>
      </div>

      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-[60] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            className="absolute inset-0 z-40 cursor-default border-0 bg-black/50 p-0"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
          <nav
            id={MOBILE_PRIMARY_NAV_ID}
            className="absolute right-4 top-[max(4.75rem,calc(env(safe-area-inset-top,0px)+3.25rem))] z-50 mt-2 flex max-h-[min(calc(100dvh-5rem),32rem)] w-[min(calc(100vw-2rem),18rem)] max-w-[18rem] flex-col divide-y divide-white/10 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-neutral-950/95 shadow-xl shadow-black/40 backdrop-blur"
            aria-label="Mobile primary"
          >
            <Link
              href="/"
              onClick={closeMobileMenu}
              aria-current={pathname === "/" ? "page" : undefined}
              className={
                pathname === "/"
                  ? `${mobileLinkBase} text-amber-300 hover:text-amber-200`
                  : `${mobileLinkBase} text-white/85 hover:text-white`
              }
            >
              Home
            </Link>
            {navLinks.map((item) => {
              const active = isActiveNavHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? `${mobileLinkBase} text-amber-300 hover:text-amber-200`
                      : `${mobileLinkBase} text-white/85 hover:text-white`
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="relative z-10 border-t border-white/10 p-3">
              <CheckAvailabilityTrackedLink
                surface="header"
                onClick={closeMobileMenu}
                className="relative z-10 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFinalDecisionZone() {
  return (
    <section
      className="border-t border-white/10 bg-neutral-950"
      aria-labelledby="site-final-decision-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/95 sm:text-xs sm:tracking-[0.2em]">
              Ready when you are
            </p>
            <h2
              id="site-final-decision-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Let&apos;s talk about your wedding.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg sm:leading-8">
              Share your date, venue, and what you want the night to feel like. I&apos;ll help you understand
              availability, timing, and the best next step.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="footer" checkSurface="footer" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
                <Link href="/packages" className="transition hover:text-white/65">
                  Wedding DJ Packages
                </Link>
                <span className="text-white/20" aria-hidden>
                  ·
                </span>
                <Link href="/reviews" className="transition hover:text-white/65">
                  Wedding DJ Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/45 lg:px-8">
        <div className="border-b border-white/10 pb-6">
          <div className="text-base font-semibold text-white/90">Howe Sound DJ</div>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-white/50">
            Personalized music and professional planning for Sea-to-Sky weddings, from ceremony through reception.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white/70">
              {item.label}
            </Link>
          ))}
          <Link href="/venues" className="transition hover:text-white/70">
            Venues
          </Link>
        </div>
        <p className="text-sm text-white/40">
          <Link href="/vancouver-wedding-dj" className="transition hover:text-white/65">
            Vancouver couples · Sea-to-Sky and Squamish weddings
          </Link>
        </p>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-white/40">© {year} Howe Sound DJ. Squamish Wedding DJ.</div>
          <div className="text-white/40">Serving Squamish, Whistler, Vancouver, and the Sea-to-Sky corridor.</div>
        </div>
      </div>
    </footer>
  );
}
