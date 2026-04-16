"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion-tokens";

type SectionRevealProps = {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  role?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-label"?: string;
};

/**
 * Section-level reveal: subtle fade + short upward travel. Respects reduced motion.
 * Use for major blocks below the fold — not for hero first paint.
 */
export function SectionReveal({
  as = "div",
  children,
  className,
  delay = 0,
  id,
  role,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
}: SectionRevealProps) {
  const reduce = useReducedMotion();
  const motionProps = {
    className,
    id,
    role,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-48px" as const, amount: 0.12 },
    transition: {
      duration: reduce ? 0 : MOTION_DURATION.section,
      ease: MOTION_EASE,
      delay: reduce ? 0 : delay,
    },
  };

  if (as === "section") {
    return <motion.section {...motionProps}>{children}</motion.section>;
  }
  return <motion.div {...motionProps}>{children}</motion.div>;
}
