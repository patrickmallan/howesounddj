"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { acquisitionContext, recordAvailabilityJourneyEvent } from "@/lib/availability-journey-client";
import { getPostAvailabilityContext } from "@/lib/post-availability-context";
export function AvailabilityJourneyTracker() {
  const pathname = usePathname();
  useEffect(() => {
    acquisitionContext();
    const context = getPostAvailabilityContext();
    if (context?.journeyId) recordAvailabilityJourneyEvent({ journeyId: context.journeyId, eventType: "PAGE_VIEWED", pagePath: pathname });
  }, [pathname]);
  return null;
}
