"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion-tokens";

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.02 },
  },
});

const itemVariants = (reduce: boolean | null) => ({
  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduce ? 0 : MOTION_DURATION.section * 0.85,
      ease: MOTION_EASE,
    },
  },
});

/** Grid or list wrapper: staggers direct `StaggerItem` children on first view. */
export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const stagger = reduce ? 0 : 0.055;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px 80px 0px", amount: 0.01 }}
      variants={containerVariants(stagger)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={itemVariants(reduce)}>
      {children}
    </motion.div>
  );
}
