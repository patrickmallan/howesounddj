import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => ({ trackEvent: vi.fn() }));

vi.mock("@/lib/analytics", () => ({
  ANALYTICS_EVENTS: {
    availabilityCheckStart: "start",
    availabilityCheckStarted: "started",
    availabilityCheckResult: "result",
    availabilityCheckCompleted: "completed",
    availabilityCheckFailedOrManual: "failed",
  },
  availabilityCheckEventParams: vi.fn(() => ({})),
  trackEvent: fixtures.trackEvent,
}));
vi.mock("@/lib/post-availability-context", () => ({
  clearPostAvailabilityContext: vi.fn(),
  getPostAvailabilityContext: vi.fn(() => null),
  setPostAvailabilityContext: vi.fn(),
}));
vi.mock("@/lib/post-availability-analytics", () => ({ availabilityCompletedParams: vi.fn(() => ({})) }));
vi.mock("@/lib/availability-journey-client", () => ({
  acquisitionContext: vi.fn(() => ({ entryPage: "/contact" })),
  recordAvailabilityJourneyEvent: vi.fn(),
}));

import { runAvailabilityCheck } from "@/lib/availability-check-client";

function pendingFetch(_input: unknown, init?: RequestInit): Promise<Response> {
  return new Promise((_resolve, reject) => {
    init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  });
}

describe("availability request deadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn(pendingFetch));
    fixtures.trackEvent.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("offers the manual contact route after a stalled request", async () => {
    const result = runAvailabilityCheck("2030-06-01", "header_panel");
    await vi.advanceTimersByTimeAsync(12_000);
    await expect(result).resolves.toMatchObject({ status: "error", date: "2030-06-01" });
    expect(fixtures.trackEvent).toHaveBeenCalledWith("completed", expect.anything(), expect.anything());
  });

  it("does not announce a result when the caller cancels an obsolete date", async () => {
    const controller = new AbortController();
    const result = runAvailabilityCheck("2030-06-01", "header_panel", controller.signal);
    controller.abort();
    await expect(result).resolves.toBeNull();
    expect(fixtures.trackEvent).not.toHaveBeenCalledWith("completed", expect.anything(), expect.anything());
  });
});
