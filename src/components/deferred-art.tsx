"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className: string;
  desktopSrc: string;
  mobileSrc?: string;
};

function Artwork({ desktopSrc, mobileSrc }: Pick<Props, "desktopSrc" | "mobileSrc">) {
  return (
    <picture>
      {mobileSrc ? <source media="(max-width: 700px)" srcSet={mobileSrc} /> : null}
      {/* These are pre-compressed CSS-scale textures; activation timing matters more than a second optimizer pass. */}
      <img src={desktopSrc} alt="" loading="lazy" decoding="async" fetchPriority="low" />
    </picture>
  );
}

export function DeferredArt({ className, desktopSrc, mobileSrc }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className={className} aria-hidden="true">
      {visible ? <Artwork desktopSrc={desktopSrc} mobileSrc={mobileSrc} /> : null}
      <noscript><Artwork desktopSrc={desktopSrc} mobileSrc={mobileSrc} /></noscript>
    </div>
  );
}
