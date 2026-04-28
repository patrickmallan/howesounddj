"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

const navLinks = [
  { href: "/weddings", label: "Wedding DJ Services" },
  { href: "/packages", label: "Wedding DJ Packages" },
  { href: "/reviews", label: "Wedding DJ Reviews" },
  { href: "/about", label: "About Howe Sound DJ" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact HSDJ" },
] as const;

/** True when this nav item’s route is the current page or a nested segment (e.g. /contact/...), without false positives like /faq vs /faq-extra. */
function isActiveNavHref(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const mobileMenuDetailsRef = useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = useCallback(() => {
    const el = mobileMenuDetailsRef.current;
    if (el) el.open = false;
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="mr-4 min-w-[10rem] shrink-0 text-left transition hover:opacity-90 md:min-w-[12rem]"
          aria-label="Howe Sound DJ home"
        >
          <div className="text-lg font-semibold tracking-[0.2em] uppercase text-amber-300">Howe Sound DJ</div>
          <div className="text-xs text-white/60">Squamish Wedding DJ</div>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
          <details ref={mobileMenuDetailsRef} className="xl:hidden">
            <summary className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded-full border border-white/15 px-3 text-sm text-white/85 outline-none transition hover:border-white/25 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            {/*
              Panel uses fixed + full-width flex row so it stays within the viewport.
              absolute right-0 on a narrow <details> box made a wide (~18rem) panel extend past the left edge on phones.
            */}
            <div className="fixed inset-x-0 top-0 z-[60] flex justify-end px-4 pt-[max(4.75rem,calc(env(safe-area-inset-top,0px)+3.25rem))] pb-8 pointer-events-none">
              <nav
                className="pointer-events-auto mt-2 flex w-[min(calc(100vw-2rem),18rem)] max-w-[18rem] flex-col divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-neutral-950/95 shadow-xl shadow-black/40 backdrop-blur"
                aria-label="Mobile primary"
              >
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={
                    pathname === "/"
                      ? "block px-4 py-3 text-left text-sm text-amber-300 transition hover:bg-white/5 hover:text-amber-200"
                      : "block px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/5 hover:text-white"
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
                          ? "block px-4 py-3 text-left text-sm text-amber-300 transition hover:bg-white/5 hover:text-amber-200"
                          : "block px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/5 hover:text-white"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div
                  className="border-t border-white/10 p-3"
                  onClick={closeMobileMenu}
                  role="presentation"
                >
                  <CheckAvailabilityTrackedLink
                    surface="header"
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
                  />
                </div>
              </nav>
            </div>
          </details>
          <CheckAvailabilityTrackedLink
            surface="header"
            className="hidden min-h-[44px] items-center justify-center rounded-full bg-amber-300 px-4 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] xl:inline-flex xl:min-h-0 xl:px-5 xl:py-2.5"
          />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 text-sm text-white/45 lg:px-8">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-base font-semibold text-white/90">Howe Sound DJ</div>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-white/50">
              Personalized music and professional planning for Sea-to-Sky weddings, from ceremony through reception.
            </p>
          </div>
          <CheckAvailabilityTrackedLink
            surface="footer"
            className="shrink-0 self-start inline-flex items-center justify-center text-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/5 md:self-auto"
          />
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
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-white/40">© {year} Howe Sound DJ. Squamish Wedding DJ.</div>
          <div className="text-white/40">Serving Squamish, Whistler, Vancouver, and the Sea-to-Sky corridor.</div>
        </div>
      </div>
    </footer>
  );
}
