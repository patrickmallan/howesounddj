import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";

describe("Operations journey forwarding", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  function configure() {
    vi.stubEnv("HSDJ_OPERATIONS_JOURNEY_API_URL", "https://operations.example.test/api/journey");
    vi.stubEnv("AVAILABILITY_JOURNEY_INGEST_SECRET", "fixture-secret");
  }

  it("returns false when Operations responds with a server error", async () => {
    configure();
    const fetchMock = vi.fn(async () => ({ ok: false, status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await forwardAvailabilityJourney({ kind: "event" })).toBe(false);
    expect(fetchMock).toHaveBeenCalledWith("https://operations.example.test/api/journey", expect.objectContaining({
      method: "POST",
      signal: expect.any(AbortSignal),
    }));
  });

  it("aborts an unresponsive endpoint within the bounded telemetry window", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal?.addEventListener("abort", () => reject(options.signal?.reason), { once: true });
    })));
    const start = performance.now();
    expect(await forwardAvailabilityJourney({ kind: "event" })).toBe(false);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(650);
    expect(elapsed).toBeLessThan(1500);
  });
});
