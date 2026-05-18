"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CompactAvailabilityChecker } from "@/components/compact-availability-checker";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";
import { headlineVariantPayload } from "@/lib/experiment";

const triggerClass =
  `${CTA_PILL_FLEX_CENTER} motion-interactive min-h-[44px] shrink-0 items-center justify-center rounded-full bg-amber-300 px-2.5 text-center text-xs font-semibold leading-tight text-neutral-950 transition hover:scale-[1.02] sm:min-h-0 sm:px-4 sm:py-2.5 sm:text-sm xl:px-5`;

type Props = {
  /** Close any open desktop nav dropdown when the panel opens. */
  onPanelOpen?: () => void;
};

/** Desktop (xl+): floating availability panel. Below xl: link to `/contact#availability`. */
export function HeaderCheckAvailability({ onPanelOpen }: Props) {
  const pathname = usePathname() ?? "";
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelRequested, setPanelRequested] = useState(false);
  const [openForPath, setOpenForPath] = useState<string | null>(null);

  const open = panelRequested && openForPath === pathname;

  const close = useCallback(() => {
    setPanelRequested(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const openPanel = useCallback(() => {
    onPanelOpen?.();
    setOpenForPath(pathname);
    trackEvent(ANALYTICS_EVENTS.checkAvailabilityClick, {
      surface: "header_cta",
      destination: "header_panel",
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...headlineVariantPayload(),
    });
    setPanelRequested(true);
  }, [onPanelOpen, pathname]);

  const togglePanel = useCallback(() => {
    if (open) {
      close();
      return;
    }
    openPanel();
  }, [open, close, openPanel]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      close();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, close]);

  return (
    <>
      <CheckAvailabilityTrackedLink
        surface="header"
        href="/contact#availability"
        className={`${triggerClass} xl:hidden`}
      />

      <div className="relative hidden xl:block">
        <button
          ref={triggerRef}
          type="button"
          className={triggerClass}
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="dialog"
          onClick={togglePanel}
        >
          Check Availability
        </button>

        {open ? (
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="Check wedding date availability"
            className="absolute right-0 top-full z-[85] mt-2 w-[min(100vw-2rem,22rem)] origin-top-right rounded-2xl border border-white/10 bg-neutral-950/95 p-5 shadow-xl shadow-black/50 backdrop-blur transition duration-150"
          >
            <CompactAvailabilityChecker key={pathname} idPrefix="header-panel" />
          </div>
        ) : null}
      </div>
    </>
  );
}
