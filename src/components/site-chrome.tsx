"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_PUBLIC_NAME } from "@/config/site-brand";
import CTADuo from "@/components/cta-duo";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { HeaderCheckAvailability } from "@/components/header-check-availability";
import { trackPostAvailabilityTrustClickFromHref } from "@/lib/post-availability-trust";
import narrowHeaderStyles from "./site-chrome-narrow.module.css";

function onTrustNavClick(href: string, after?: () => void) {
  return () => {
    after?.();
    trackPostAvailabilityTrustClickFromHref(href);
  };
}

/** Single leaf in the site nav (renders as `<Link>` in the header dropdown / mobile accordion / footer). */
type SiteNavLeaf = {
  href: string;
  label: string;
  /** Supporting line shown beneath the label inside desktop dropdowns and mobile accordions. */
  description?: string;
  /** Footer anchor text when it should differ from the dropdown label (crawlable, descriptive). */
  footerLabel?: string;
};

/** Top-level nav group (renders as a `<button>` trigger plus dropdown panel on desktop, accordion on mobile). */
type SiteNavGroup = {
  label: string;
  children: SiteNavLeaf[];
};

type SiteNavItem = SiteNavLeaf | SiteNavGroup;

function isGroup(item: SiteNavItem): item is SiteNavGroup {
  return "children" in item;
}

/**
 * Single source of truth for desktop nav, mobile drawer, and footer.
 * Top-level groups expose categories; the footer flattens this tree so every important route stays crawlable.
 * Home is reached through the wordmark only, intentionally absent here for premium pacing.
 */
const navTree: SiteNavItem[] = [
  {
    label: "Weddings",
    children: [
      {
        href: "/weddings",
        label: "Overview",
        description: "Wedding DJ services for the full celebration arc.",
        footerLabel: "Weddings",
      },
      {
        href: "/packages",
        label: "Packages",
        description: "Coverage, sound, planning, and reception options.",
      },
      {
        href: "/reviews",
        label: "Reviews",
        description: "What couples say after the night.",
      },
      {
        href: "/faq",
        label: "FAQ",
        description: "Clear answers before you inquire.",
      },
    ],
  },
  {
    label: "Squamish",
    children: [
      {
        href: "/venues",
        label: "Venues",
        description: "Squamish ceremony and reception spaces Patrick knows.",
      },
      {
        href: "/squamish-wedding-dj",
        label: "Squamish",
        description: "Local wedding DJ support for Squamish celebrations.",
        footerLabel: "Squamish Wedding DJ",
      },
      {
        href: "/vancouver-wedding-dj",
        label: "Planning from Vancouver",
        description: "For Vancouver couples holding their wedding in Squamish.",
        footerLabel: "Vancouver Couples Marrying in Squamish",
      },
    ],
  },
  {
    label: "Journal",
    children: [
      {
        href: "/guides",
        label: "Guides",
        description: "Practical planning advice for Squamish weddings.",
      },
      {
        href: "/stories",
        label: "Stories",
        description: "Editorial notes on dance floors, pacing, and atmosphere.",
      },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_PRIMARY_NAV_ID = "site-mobile-primary-nav";
const MOBILE_PRIMARY_DETAILS_ID = "site-mobile-primary-details";

const navPadByLabel: Record<string, string> = {
  Weddings: "/images/hsdj-redesign/controls/pads/cyan.png",
  Squamish: "/images/hsdj-redesign/controls/pads/red.png",
  Journal: "/images/hsdj-redesign/controls/pads/lime.png",
  About: "/images/hsdj-redesign/controls/pads/orange.png",
  Contact: "/images/hsdj-redesign/controls/pads/purple.png",
};

const navPadGlowByLabel: Record<string, string> = {
  Weddings: "#19dfff",
  Squamish: "#ff313f",
  Journal: "#b6ff22",
  About: "#ff8225",
  Contact: "#a36cff",
};

/** True when this href is the current page or a nested segment (e.g. /contact/...), without false positives like /faq vs /faq-extra. */
function isActiveNavHref(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

/** A group is "active" when any descendant route matches the current pathname. */
function isActiveItem(pathname: string, item: SiteNavItem): boolean {
  if (isGroup(item)) {
    return item.children.some((child) => isActiveNavHref(pathname, child.href));
  }
  return isActiveNavHref(pathname, item.href);
}

/** Flattens the nav tree into the leaf order used for footer link rendering. */
function flattenNavForFooter(items: SiteNavItem[]): SiteNavLeaf[] {
  const out: SiteNavLeaf[] = [];
  for (const item of items) {
    if (isGroup(item)) {
      for (const child of item.children) out.push(child);
    } else {
      out.push(item);
    }
  }
  return out;
}

type DesktopDropdownProps = {
  group: SiteNavGroup;
  pathname: string;
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  onToggle: () => void;
};

/** Desktop dropdown trigger + panel. Hover/focus opens, click toggles, Escape closes and restores focus to trigger. */
function DesktopDropdown({
  group,
  pathname,
  isOpen,
  onRequestOpen,
  onRequestClose,
  onToggle,
}: DesktopDropdownProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId();
  const active = isActiveItem(pathname, group);

  const hoverOpenTimer = useRef<number | null>(null);
  const hoverCloseTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (hoverOpenTimer.current !== null) {
      window.clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = null;
    }
    if (hoverCloseTimer.current !== null) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onPointerEnter = useCallback(() => {
    clearTimers();
    /** Tiny open delay avoids flicker when sweeping cursor past triggers. */
    hoverOpenTimer.current = window.setTimeout(onRequestOpen, 40);
  }, [clearTimers, onRequestOpen]);

  const onPointerLeave = useCallback(() => {
    clearTimers();
    /** Slightly longer close delay lets users traverse from trigger into panel without losing focus. */
    hoverCloseTimer.current = window.setTimeout(onRequestClose, 140);
  }, [clearTimers, onRequestClose]);

  const triggerColor = active
    ? "text-amber-300 hover:text-amber-200"
    : "text-white/80 hover:text-white";

  return (
    <div
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          onRequestClose();
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onFocus={onRequestOpen}
        className={`hsdj-nav-pad outline-none transition focus-visible:text-white ${triggerColor}`}
      >
        <Image src={navPadByLabel[group.label]} alt="" width={76} height={76} />
        <span className="hsdj-nav-pad__label">{group.label}</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`hsdj-nav-pad__deck-open ${isOpen ? "is-open" : ""}`}
        >
          <path className="hsdj-nav-pad__deck-triangle" d="M3 5h10L8 11z" />
          <path className="hsdj-nav-pad__deck-line" d="M2 13h12" />
        </svg>
      </button>
      <div
        id={panelId}
        role="menu"
        aria-label={group.label}
        className={`absolute left-0 top-full z-[80] mt-3 w-[19rem] rounded-xl border border-white/10 bg-neutral-950/95 p-2 shadow-xl shadow-black/40 backdrop-blur transition duration-150 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {group.children.map((child) => {
          const childActive = isActiveNavHref(pathname, child.href);
          return (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              aria-current={childActive ? "page" : undefined}
              onClick={onTrustNavClick(child.href, onRequestClose)}
              className={`block rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5 ${
                childActive ? "text-amber-300" : "text-white/90"
              }`}
            >
              <div className="text-sm font-medium leading-snug">{child.label}</div>
              {child.description ? (
                <div className="mt-0.5 text-xs leading-snug text-white/55">
                  {child.description}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type MobileAccordionProps = {
  group: SiteNavGroup;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
};

/** Mobile category cue. Its child channels render in one shared panel below the pad bank. */
function MobileAccordion({ group, pathname, isOpen, onToggle }: MobileAccordionProps) {
  const active = isActiveItem(pathname, group);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`${MOBILE_PRIMARY_NAV_ID}-channels`}
      onClick={onToggle}
      className={`hsdj-nav-pad hsdj-mobile-nav-cue ${active ? "is-active" : ""}`}
      style={{ "--pad-glow": navPadGlowByLabel[group.label] } as CSSProperties}
    >
      <span className="hsdj-nav-pad__label">
        {group.label}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`hsdj-nav-pad__deck-open ${isOpen ? "is-open" : ""}`}
        >
          <path className="hsdj-nav-pad__deck-triangle" d="M3 5h10L8 11z" />
          <path className="hsdj-nav-pad__deck-line" d="M2 13h12" />
        </svg>
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuTop, setMobileMenuTop] = useState<number | null>(null);
  const [openMobileMenuLabel, setOpenMobileMenuLabel] = useState<string | null>(null);
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLElement | null>(null);
  const previousPathRef = useRef(pathname);

  /** Native disclosures keep the menu usable before React hydrates. */
  const closeMobileMenu = useCallback(() => {
    const details = document.getElementById(MOBILE_PRIMARY_DETAILS_ID) as HTMLDetailsElement | null;
    if (details) {
      details.open = false;
      details.querySelectorAll<HTMLDetailsElement>('details[name="hsdj-mobile-nav"]').forEach((group) => { group.open = false; });
    }
    setMobileMenuOpen(false);
    setOpenMobileMenuLabel(null);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMobileMenuOpen((document.getElementById(MOBILE_PRIMARY_DETAILS_ID) as HTMLDetailsElement | null)?.open ?? false);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  /** Close on route changes, but preserve a menu opened before hydration. */
  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    const id = requestAnimationFrame(() => {
      closeMobileMenu();
      setOpenMenuLabel(null);
      setOpenMobileMenuLabel(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen || !headerRef.current) return;
    const header = headerRef.current;
    const updateTop = () => setMobileMenuTop(header.getBoundingClientRect().bottom);
    updateTop();
    const observer = new ResizeObserver(updateTop);
    observer.observe(header);
    window.addEventListener("resize", updateTop);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTop);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => {
      if (mq.matches) {
        closeMobileMenu();
      }
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, [closeMobileMenu]);

  /** Click outside the header closes any open desktop dropdown (focus-traversal still allowed inside the header). */
  useEffect(() => {
    if (openMenuLabel === null) return;
    const onMouseDown = (event: MouseEvent) => {
      if (!headerRef.current) return;
      if (event.target instanceof Node && headerRef.current.contains(event.target)) return;
      setOpenMenuLabel(null);
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [openMenuLabel]);

  const openMobileGroup = navTree.find(
    (item): item is SiteNavGroup => isGroup(item) && item.label === openMobileMenuLabel,
  );

  return (
    <header
      ref={headerRef}
      className="hsdj-site-header sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95"
    >
      <div className={`${narrowHeaderStyles.headerInner} relative z-[70] mx-auto flex max-w-[90rem] items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 lg:px-8`}>
        <Link
          href="/"
          className={`${narrowHeaderStyles.wordmark} hsdj-wordmark mr-2 shrink transition hover:opacity-90 sm:mr-4`}
        >
          <Image
            src="/images/logo/hsdj-business-card-sasquatch-event-dj-v1.png"
            alt="Howe Sound Event DJ, Sasquatch on a mountain"
            fill
            priority
            sizes="(max-width: 639px) 180px, 300px"
            className="hsdj-wordmark-art"
          />
        </Link>
        <div className="hsdj-header-controller flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          <nav
            className="hidden max-w-none items-center justify-end gap-2 text-[0.8125rem] leading-snug text-white/80 xl:flex"
            aria-label="Primary"
          >
            {navTree.map((item) => {
              if (isGroup(item)) {
                const isOpen = openMenuLabel === item.label;
                return (
                  <DesktopDropdown
                    key={item.label}
                    group={item}
                    pathname={pathname}
                    isOpen={isOpen}
                    onRequestOpen={() => setOpenMenuLabel(item.label)}
                    onRequestClose={() => {
                      setOpenMenuLabel((current) => (current === item.label ? null : current));
                    }}
                    onToggle={() => {
                      setOpenMenuLabel((current) => (current === item.label ? null : item.label));
                    }}
                  />
                );
              }
              const active = isActiveNavHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onTrustNavClick(item.href)}
                  onFocus={() => setOpenMenuLabel(null)}
                  onPointerEnter={() => setOpenMenuLabel(null)}
                  className={`hsdj-nav-pad ${active ? "is-active text-amber-300" : "text-white/80"}`}
                >
                  <Image src={navPadByLabel[item.label]} alt="" width={76} height={76} />
                  <span className="hsdj-nav-pad__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <details
            id={MOBILE_PRIMARY_DETAILS_ID}
            className="relative xl:hidden"
            onToggle={(event) => {
              const open = event.currentTarget.open;
              setMobileMenuOpen(open);
              if (open) setMobileMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? null);
            }}
          >
            <summary
              ref={mobileMenuButtonRef}
              role="button"
              className={`${narrowHeaderStyles.mobileSummary} hsdj-mobile-pad inline-grid min-h-[50px] min-w-[50px] cursor-pointer place-items-center border-0 bg-transparent p-0 text-[0.62rem] font-black uppercase text-white outline-none`}
              aria-controls={MOBILE_PRIMARY_NAV_ID}
              aria-haspopup="menu"
            >
              <Image src="/images/hsdj-redesign/controls/pads/blue.png" alt="" width={58} height={58} />
              <span>Menu</span>
            </summary>
            <div
              className="fixed inset-x-0 bottom-0 z-[80]"
              style={{ top: mobileMenuTop ?? "8rem" }}
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
                className="hsdj-mobile-menu absolute right-3 top-2 z-50 max-h-[min(calc(100%-1rem),36rem)] w-[min(calc(100vw-1.5rem),20rem)] max-w-[20rem] overflow-y-auto overflow-x-hidden border border-white/15 bg-neutral-950/95 shadow-xl shadow-black/40"
                aria-label="Mobile primary"
              >
                <div className="hsdj-mobile-cue-bank">
                  {navTree.map((item) => {
                    if (isGroup(item)) {
                      return (
                        <MobileAccordion
                          key={item.label}
                          group={item}
                          pathname={pathname}
                          isOpen={openMobileMenuLabel === item.label}
                          onToggle={() => setOpenMobileMenuLabel((current) => current === item.label ? null : item.label)}
                        />
                      );
                    }
                    const active = isActiveNavHref(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onTrustNavClick(item.href, closeMobileMenu)}
                        aria-current={active ? "page" : undefined}
                        className={`hsdj-nav-pad hsdj-mobile-nav-cue ${active ? "is-active" : ""}`}
                        style={{ "--pad-glow": navPadGlowByLabel[item.label] } as CSSProperties}
                      >
                        <span className="hsdj-nav-pad__label">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
                {openMobileGroup ? (
                  <div id={MOBILE_PRIMARY_NAV_ID + "-channels"} className="hsdj-mobile-channel-panel" aria-label={`${openMobileGroup.label} pages`}>
                    <span className="hsdj-mobile-channel-panel__label">{openMobileGroup.label} channels</span>
                    {openMobileGroup.children.map((child, index) => {
                      const childActive = isActiveNavHref(pathname, child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onTrustNavClick(child.href, closeMobileMenu)}
                          aria-current={childActive ? "page" : undefined}
                          className={`hsdj-mobile-channel-link ${childActive ? "is-active" : ""}`}
                        >
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{child.label}</strong>
                          {child.description ? <small>{child.description}</small> : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
                <div className="relative z-10 border-t border-white/10 p-3">
                  <CheckAvailabilityTrackedLink
                    surface="header"
                    href="/contact#availability"
                    onClick={closeMobileMenu}
                    className="hsdj-mobile-availability relative z-10 inline-flex min-h-[50px] w-full items-center justify-center bg-amber-300 px-4 text-sm font-black uppercase text-neutral-950 transition hover:translate-x-1"
                  />
                </div>
              </nav>
            </div>
          </details>
          <HeaderCheckAvailability onPanelOpen={() => setOpenMenuLabel(null)} />
        </div>
      </div>
    </header>
  );
}

export function SiteFinalDecisionZone() {
  return (
    <section
      className="border-t border-white/10 bg-neutral-950"
      aria-labelledby="site-final-decision-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="atmosphere-grain mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto max-w-2xl text-center">
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
            <div className="mx-auto mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="footer" checkSurface="footer" />
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/45">
                <Link
                  href="/packages"
                  onClick={onTrustNavClick("/packages")}
                  className="transition hover:text-white/65"
                >
                  Wedding DJ Packages
                </Link>
                <span className="text-white/20" aria-hidden>
                  ·
                </span>
                <Link
                  href="/reviews"
                  onClick={onTrustNavClick("/reviews")}
                  className="transition hover:text-white/65"
                >
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
  const footerLinks = flattenNavForFooter(navTree);
  const primaryRoutes = new Set(["/weddings", "/packages", "/reviews", "/venues", "/contact"]);
  const primaryLinks = footerLinks.filter((item) => primaryRoutes.has(item.href));
  const secondaryRoutes = new Set(["/faq", "/guides", "/stories", "/about"]);
  const secondaryLinks = footerLinks.filter((item) => secondaryRoutes.has(item.href));
  const footerLabels: Record<string, string> = {
    "/faq": "Common questions",
    "/guides": "Planning guides",
    "/stories": "Wedding stories",
    "/about": "About Patrick",
  };
  return (
    <footer className="hsdj-site-footer mt-auto">
      <div className="hsdj-site-footer__collage" aria-hidden="true">
        <Image src="/images/hsdj-redesign/footer/footer-dj-mixer-collage-v2-optimized.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="hsdj-site-footer__inner mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm lg:px-8">
        <div className="hsdj-site-footer__brand">
          <span className="hsdj-site-footer__eyebrow">Squamish, BC</span>
          <div className="hsdj-site-footer__name">Howe Sound<br />Wedding DJ</div>
          <p>Your music. Your people. One very good night.</p>
        </div>
        <nav className="hsdj-site-footer__signal-path" aria-label="Footer navigation">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onTrustNavClick(item.href)}
            >
              <span className="hsdj-site-footer__knob" aria-hidden="true">
                <Image src="/images/hsdj-redesign/controls/rotary/eq-black.png" alt="" width={110} height={110} />
                <span className="hsdj-site-footer__knob-zero">0</span>
                <span className="hsdj-site-footer__knob-min">-26</span>
                <span className="hsdj-site-footer__knob-infinity">∞</span>
                <span className="hsdj-site-footer__knob-max">+6</span>
              </span>
              <span className="hsdj-site-footer__link-label">{item.footerLabel ?? item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="hsdj-site-footer__secondary">
          <nav className="hsdj-site-footer__link-group" aria-label="More from Howe Sound DJ">
            <span>More from Howe Sound</span>
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={onTrustNavClick(item.href)}>
                {footerLabels[item.href]} <b aria-hidden="true">→</b>
              </Link>
            ))}
          </nav>
        </div>
        <div className="hsdj-site-footer__legal">
          © {year} {SITE_PUBLIC_NAME} · Squamish, BC · Weddings and selected events
        </div>
      </div>
    </footer>
  );
}
