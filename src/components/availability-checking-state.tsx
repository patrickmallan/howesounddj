"use client";

import { POST_AVAILABILITY_LOADING } from "@/config/post-availability-copy";

type Props = {
  className?: string;
};

export function AvailabilityCheckingState({ className = "" }: Props) {
  return (
    <div
      className={`rounded-[1.5rem] border border-amber-400/20 bg-amber-950/20 p-6 lg:p-8 ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="text-sm font-medium text-white/90">{POST_AVAILABILITY_LOADING.statusMessage}</p>
      <div
        className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10"
        aria-hidden="true"
      >
        <div className="availability-check-pulse h-full w-1/3 rounded-full bg-amber-300/70" />
      </div>
    </div>
  );
}

export function availabilityCheckingButtonLabel(): string {
  return POST_AVAILABILITY_LOADING.buttonLabel;
}
