"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/homepage-set.module.css";

export function ReviewBackdropArt() {
  const frame = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    if (!frame.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px 0px" });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  const artwork = <Image src="/images/hsdj-redesign/wedding-story/review-couples-collage-v1.webp" alt="" fill sizes="(max-width: 700px) 92vw, 40vw" />;

  return (
    <div ref={frame} className={styles.remembersArt} aria-hidden="true">
      {nearby ? artwork : null}
      <noscript>{artwork}</noscript>
    </div>
  );
}
