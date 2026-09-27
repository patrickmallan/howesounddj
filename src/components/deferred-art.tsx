"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  className: string;
  desktopSrc: string;
  mobileSrc?: string;
  sizes?: string;
};

function Artwork({ desktopSrc, mobileSrc, sizes }: Pick<Props, "desktopSrc" | "mobileSrc" | "sizes">) {
  if (sizes) {
    // IntersectionObserver is the loading gate. Once mounted near the viewport,
    // fetch immediately rather than adding a second native-lazy threshold.
    return <Image src={desktopSrc} alt="" fill sizes={sizes} loading="eager" fetchPriority="low" />;
  }

  return (
    <picture>
      {mobileSrc ? <source media="(max-width: 700px)" srcSet={mobileSrc} /> : null}
      {/* These are pre-compressed CSS-scale textures; activation timing matters more than a second optimizer pass. */}
      <img src={desktopSrc} alt="" loading="lazy" decoding="async" fetchPriority="low" />
    </picture>
  );
}

export function DeferredArt({ className, desktopSrc, mobileSrc, sizes }: Props) {
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
      {visible ? <Artwork desktopSrc={desktopSrc} mobileSrc={mobileSrc} sizes={sizes} /> : null}
      <noscript><Artwork desktopSrc={desktopSrc} mobileSrc={mobileSrc} sizes={sizes} /></noscript>
    </div>
  );
}
