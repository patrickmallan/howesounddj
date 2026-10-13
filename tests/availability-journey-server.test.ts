import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";

describe("Operations journey forwarding", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  function configure() {
    vi.stubEnv("HSDJ_OPERATIONS_JOURNEY_API_URL", "https://operations.example.test/api/journey");
    vi.stubEnv("AVAILABILITY_JOURNEY_INGEST_SECRET", "fixture-secret");
  }

  it("returns false when Operations responds with a server error", async () => {
    configure();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => ({ ok: false, status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await forwardAvailabilityJourney({ kind: "event" })).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith("https://operations.example.test/api/journey", expect.objectContaining({
      method: "POST",
      signal: expect.any(AbortSignal),
    }));
  });

  it("retries a transient failure using the same idempotent event payload", async () => {
    configure();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    const payload = { kind: "event", event: { eventId: "stable-id" } };
    expect(await forwardAvailabilityJourney(payload)).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1].body).toBe(fetchMock.mock.calls[1][1].body);
  });

  it("does not retry an authorization failure", async () => {
    configure();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => ({ ok: false, status: 401 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await forwardAvailabilityJourney({ kind: "event" })).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("aborts an unresponsive endpoint within the bounded telemetry window", async () => {
    configure();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal?.addEventListener("abort", () => reject(options.signal?.reason), { once: true });
    }));
    vi.stubGlobal("fetch", fetchMock);
    const start = performance.now();
    expect(await forwardAvailabilityJourney({ kind: "event" })).toBe(false);
    const elapsed = performance.now() - start;
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(elapsed).toBeGreaterThanOrEqual(2_800);
    expect(elapsed).toBeLessThan(4_500);
  }, 6_000);
});
