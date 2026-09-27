"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CompactAvailabilityChecker } from "@/components/compact-availability-checker";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";
import { headlineVariantPayload } from "@/lib/experiment";

const triggerClass =
  `${CTA_PILL_FLEX_CENTER} hsdj-header-cue motion-interactive min-h-[54px] min-w-[54px] shrink-0 items-center justify-center text-center text-[0.62rem] font-black uppercase leading-[0.9] text-white transition hover:scale-[1.04] sm:min-h-[62px] sm:min-w-[62px]`;

const backdropClass =
  "fixed inset-0 z-[90] cursor-default border-0 bg-black/65 p-0 backdrop-blur-md xl:bg-black/55 xl:backdrop-blur-sm";

const panelBaseClass =
  "hsdj-availability-panel fixed z-[95] flex max-h-[min(calc(100dvh-5.5rem),34rem)] w-[min(calc(100vw-1.5rem),26rem)] flex-col overflow-hidden overscroll-contain rounded-2xl border border-white/10 bg-neutral-950/[0.98] p-5 pb-6 shadow-2xl shadow-black/55 backdrop-blur-sm transition duration-150 xl:max-h-[min(calc(100dvh-6rem),36rem)] xl:w-[min(calc(100vw-2rem),28rem)]";

const panelMobileClass =
  "left-1/2 top-[max(4.75rem,calc(env(safe-area-inset-top,0px)+3.75rem))] -translate-x-1/2";

type DesktopPanelPosition = {
  top: number;
  right: number;
};

type Props = {
  /** Close any open desktop nav dropdown when the panel opens. */
  onPanelOpen?: () => void;
};

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/** Header Check Availability opens a compact floating panel on all breakpoints. */
export function HeaderCheckAvailability({ onPanelOpen }: Props) {
  const pathname = usePathname() ?? "";
  const panelId = useId();
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelRequested, setPanelRequested] = useState(false);
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [desktopPanelPosition, setDesktopPanelPosition] = useState<DesktopPanelPosition | null>(
    null
  );
  const portalReady = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

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

  useLayoutEffect(() => {
    if (!open) return;

    const updateDesktopPanelPosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
      if (!isDesktop) {
        setDesktopPanelPosition(null);
        return;
      }

      const rect = trigger.getBoundingClientRect();
      setDesktopPanelPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    };

    updateDesktopPanelPosition();
    window.addEventListener("resize", updateDesktopPanelPosition);
    window.addEventListener("scroll", updateDesktopPanelPosition, true);
    return () => {
      window.removeEventListener("resize", updateDesktopPanelPosition);
      window.removeEventListener("scroll", updateDesktopPanelPosition, true);
    };
  }, [open]);

  const activeDesktopPanelPosition = open ? desktopPanelPosition : null;

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 1279px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      close();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  const overlay =
    open && portalReady
      ? createPortal(
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className={backdropClass}
              onClick={close}
            />
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Check wedding date availability"
              className={`${panelBaseClass} ${activeDesktopPanelPosition ? "" : panelMobileClass}`}
              style={
                activeDesktopPanelPosition
                  ? { top: activeDesktopPanelPosition.top, right: activeDesktopPanelPosition.right }
                  : undefined
              }
            >
              <button
                type="button"
                onClick={close}
                className="hsdj-availability-close absolute right-3 top-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                aria-label="Close availability check"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="flex min-h-0 flex-1 flex-col pr-8">
                <CompactAvailabilityChecker key={pathname} idPrefix="header-panel" />
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <div className="hsdj-header-cue-shell relative shrink-0">
      <a
        ref={triggerRef}
        href="/contact#availability"
        className={triggerClass}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={(event) => {
          // Before hydration this is still a useful route to the date checker.
          // After hydration, ordinary activation opens the faster inline panel.
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          togglePanel();
        }}
      >
        <Image
          src="/images/hsdj-redesign/controls/buttons/cue-round.png"
          alt=""
          width={76}
          height={76}
          className="hsdj-header-cue__hardware"
        />
        <span className="hsdj-header-cue__label">Check<br />date</span>
      </a>
      {overlay}
    </div>
  );
}
