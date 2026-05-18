"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CTADuo from "@/components/cta-duo";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { HeaderCheckAvailability } from "@/components/header-check-availability";
import { trackPostAvailabilityTrustClickFromHref } from "@/lib/post-availability-trust";

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
    label: "Sea-to-Sky",
    children: [
      {
        href: "/venues",
        label: "Venues",
        description: "Ceremony and reception spaces across the corridor.",
      },
      {
        href: "/squamish-wedding-dj",
        label: "Squamish",
        description: "Local wedding DJ support for Squamish celebrations.",
        footerLabel: "Squamish Wedding DJ",
      },
      {
        href: "/whistler-wedding-dj",
        label: "Whistler",
        description: "Destination-wedding pacing for mountain celebrations.",
        footerLabel: "Whistler Wedding DJ",
      },
      {
        href: "/vancouver-wedding-dj",
        label: "Vancouver",
        description: "Polished wedding sound for city and corridor events.",
        footerLabel: "Vancouver Wedding DJ",
      },
    ],
  },
  {
    label: "Journal",
    children: [
      {
        href: "/guides",
        label: "Guides",
        description: "Practical planning advice for Sea-to-Sky weddings.",
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
        className={`inline-flex items-center gap-1 outline-none transition focus-visible:text-white ${triggerColor}`}
      >
        <span>{group.label}</span>
        <svg
          aria-hidden="true"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
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
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

/** Mobile drawer accordion section. Inside the existing right-side panel, no second-level overlay. */
function MobileAccordion({ group, pathname, expanded, onToggle, onNavigate }: MobileAccordionProps) {
  const panelId = useId();
  const active = isActiveItem(pathname, group);

  const triggerColor = active ? "text-amber-300" : "text-white/85";

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={`relative z-10 flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-white/5 ${triggerColor}`}
      >
        <span>{group.label}</span>
        <svg
          aria-hidden="true"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      {expanded ? (
        <div id={panelId} className="bg-white/[0.02]">
          {group.children.map((child) => {
            const childActive = isActiveNavHref(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onTrustNavClick(child.href, onNavigate)}
                aria-current={childActive ? "page" : undefined}
                className={`relative z-10 block px-7 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                  childActive ? "text-amber-300 hover:text-amber-200" : "text-white/80 hover:text-white"
                }`}
              >
                <div className="leading-snug">{child.label}</div>
                {child.description ? (
                  <div className="mt-0.5 text-xs leading-snug text-white/45">
                    {child.description}
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  /** Closes the drawer and collapses any expanded accordion section in one batched update. */
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileExpandedGroup(null);
  }, []);

  /** Close every menu when the route changes, regardless of which surface triggered the navigation. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setMobileExpandedGroup(null);
      setOpenMenuLabel(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => {
      if (mq.matches) {
        setMobileMenuOpen(false);
        setMobileExpandedGroup(null);
      }
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

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

  const mobileLinkBase =
    "relative z-10 block px-4 py-3 text-left text-sm transition hover:bg-white/5";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur"
    >
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
            className="hidden max-w-none flex-wrap items-center justify-end gap-x-4 gap-y-1.5 text-[0.8125rem] leading-snug text-white/80 xl:flex xl:gap-x-5 xl:text-sm"
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
          <HeaderCheckAvailability onPanelOpen={() => setOpenMenuLabel(null)} />
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
            {navTree.map((item) => {
              if (isGroup(item)) {
                const expanded = mobileExpandedGroup === item.label;
                return (
                  <MobileAccordion
                    key={item.label}
                    group={item}
                    pathname={pathname}
                    expanded={expanded}
                    onToggle={() =>
                      setMobileExpandedGroup((current) => (current === item.label ? null : item.label))
                    }
                    onNavigate={closeMobileMenu}
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
                href="/contact#availability"
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
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onTrustNavClick(item.href)}
              className="transition hover:text-white/70"
            >
              {item.footerLabel ?? item.label}
            </Link>
          ))}
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
