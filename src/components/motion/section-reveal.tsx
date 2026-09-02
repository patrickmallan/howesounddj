import type { ReactNode } from "react";

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
 * Use for major blocks below the fold, not for hero first paint.
 */
export function SectionReveal({
  as = "div",
  children,
  className,
  id,
  role,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
}: SectionRevealProps) {
  const revealClassName = ["below-fold-content", className].filter(Boolean).join(" ");
  const sectionProps = {
    className: revealClassName,
    id,
    role,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
  };

  if (as === "section") {
    return <section {...sectionProps}>{children}</section>;
  }
  return <div {...sectionProps}>{children}</div>;
}
