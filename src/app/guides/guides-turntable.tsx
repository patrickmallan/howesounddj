"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function GuidesTurntable() {
  const turntable = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = turntable.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      element?.setAttribute("data-motion-active", "");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-motion-active", entry.isIntersecting);
    }, { rootMargin: "300px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={turntable}
      className="guides-deck-turntable"
      role="img"
      aria-label="A black vinyl record labelled Gala, Freed from Desire, spinning on a professional turntable"
    >
      <Image
        className="guides-deck-turntable-base"
        src="/images/hsdj-redesign/new-editorial/guides-turntable-deck-v1.webp"
        alt=""
        fill
        fetchPriority="low"
        sizes="(max-width: 900px) 90vw, 44vw"
      />
      <div className="guides-deck-record">
        <Image
          src="/images/hsdj-redesign/new-editorial/guides-vinyl-record-v1.webp"
          alt=""
          fill
          fetchPriority="low"
          sizes="(max-width: 900px) 65vw, 32vw"
        />
        <span className="guides-deck-record-label"><strong>GALA</strong><small>FREED FROM DESIRE<br />33⅓ RPM · 12″</small></span>
      </div>
    </div>
  );
}
