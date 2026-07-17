import { describe, expect, it, vi } from "vitest";
import {
  availabilityEmailSubject,
  checkPublicAvailability,
  validateRequestedAvailabilityDate,
} from "@/lib/check-public-availability";
import {
  PUBLIC_AVAILABILITY_COPY,
  PublicAvailabilityResult,
} from "@/lib/public-availability-contract";

function mockFetch(
  status: number,
  body: unknown,
  init?: { ok?: boolean },
): typeof fetch {
  return vi.fn(async () => ({
    ok: init?.ok ?? (status >= 200 && status < 300),
    status,
    json: async () => body,
  })) as unknown as typeof fetch;
}

describe("checkPublicAvailability", () => {
  it("maps valid AVAILABLE response", async () => {
    const result = await checkPublicAvailability("2028-06-15", {
      fetchImpl: mockFetch(200, {
        result: "AVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.AVAILABLE,
        date: "2028-06-15",
      }),
      apiUrl: "https://ops.howesounddj.com/api/availability",
    });
    expect(result.result).toBe(PublicAvailabilityResult.AVAILABLE);
    expect(result.publicMessage).toMatch(/appears available/i);
  });

  it("maps valid UNAVAILABLE response", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, {
        result: "UNAVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        date: "2027-07-31",
      }),
      apiUrl: "https://ops.howesounddj.com/api/availability",
    });
    expect(result.result).toBe(PublicAvailabilityResult.UNAVAILABLE);
  });

  it("maps valid MANUAL_CONFIRMATION_REQUIRED response", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(503, {
        result: "MANUAL_CONFIRMATION_REQUIRED",
        message: PUBLIC_AVAILABILITY_COPY.MANUAL_CONFIRMATION_REQUIRED,
        date: "2027-07-31",
      }),
      apiUrl: "https://ops.howesounddj.com/api/availability",
    });
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on non-200 except 503 manual path", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(500, { result: "AVAILABLE", date: "2027-07-31" }),
      apiUrl: "https://ops.howesounddj.com/api/availability",
    });
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on timeout", async () => {
    const fetchImpl = vi.fn(async () => {
      const error = new Error("aborted");
      error.name = "AbortError";
      throw error;
    }) as unknown as typeof fetch;
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl,
      apiUrl: "https://ops.howesounddj.com/api/availability",
      timeoutMs: 1,
    });
    expect(result.diagnosticReason).toBe("timeout");
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on network error", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    const result = await checkPublicAvailability("2027-07-31", { fetchImpl });
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on invalid JSON", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error("bad json");
      },
    })) as unknown as typeof fetch;
    const result = await checkPublicAvailability("2027-07-31", { fetchImpl });
    expect(result.diagnosticReason).toBe("invalid_json");
  });

  it("fails closed on unknown result", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, { result: "MAYBE", date: "2027-07-31" }),
    });
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on missing result", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, { date: "2027-07-31" }),
    });
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("fails closed on returned-date mismatch", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, {
        result: "UNAVAILABLE",
        date: "2027-08-07",
      }),
    });
    expect(result.diagnosticReason).toBe("date_mismatch");
  });

  it("rejects malformed requested date", async () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch;
    const result = await checkPublicAvailability("not-a-date", { fetchImpl });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(result.result).toBe(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED);
  });

  it("result contains no private event details", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, {
        result: "UNAVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        date: "2027-07-31",
      }),
    });
    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(/wedding|venue|nellie|calendarId/i);
  });
});

describe("validateRequestedAvailabilityDate", () => {
  it("rejects invalid calendar date", () => {
    expect(validateRequestedAvailabilityDate("2027-13-40")).toBe("invalid_calendar_date");
  });
});

describe("availabilityEmailSubject", () => {
  it("formats unavailable subject", () => {
    expect(
      availabilityEmailSubject({
        requestedDate: "2027-07-31",
        result: PublicAvailabilityResult.UNAVAILABLE,
        publicMessage: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        checkedAt: "2026-07-17T00:00:00.000Z",
        authority: "HSDJ Operations Availability API",
        sourceEndpoint: "https://ops.howesounddj.com/api/availability",
      }),
    ).toBe("[Howe Sound DJ] Availability checked: 2027-07-31 unavailable");
  });

  it("formats manual subject", () => {
    expect(
      availabilityEmailSubject({
        requestedDate: "2027-07-31",
        result: PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED,
        publicMessage: PUBLIC_AVAILABILITY_COPY.MANUAL_CONFIRMATION_REQUIRED,
        checkedAt: "2026-07-17T00:00:00.000Z",
        authority: "HSDJ Operations Availability API",
        sourceEndpoint: "https://ops.howesounddj.com/api/availability",
      }),
    ).toBe("[Howe Sound DJ] Availability check requires confirmation: 2027-07-31");
  });
});

describe("availability route integration contract", () => {
  it("calls Operations endpoint with encoded date", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        result: "UNAVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        date: "2027-08-07",
      }),
    })) as unknown as typeof fetch;

    await checkPublicAvailability("2027-08-07", {
      fetchImpl,
      apiUrl: "https://ops.howesounddj.com/api/availability",
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://ops.howesounddj.com/api/availability?date=2027-08-07",
      expect.objectContaining({
        cache: "no-store",
        headers: expect.objectContaining({ "Cache-Control": "no-store" }),
      }),
    );
  });
});

describe("incident regression", () => {
  it("2027-07-31 returns unavailable from governed API", async () => {
    const result = await checkPublicAvailability("2027-07-31", {
      fetchImpl: mockFetch(200, {
        result: "UNAVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        date: "2027-07-31",
      }),
    });
    expect(result.result).toBe(PublicAvailabilityResult.UNAVAILABLE);
  });

  it("2027-08-07 returns unavailable from governed API", async () => {
    const result = await checkPublicAvailability("2027-08-07", {
      fetchImpl: mockFetch(200, {
        result: "UNAVAILABLE",
        message: PUBLIC_AVAILABILITY_COPY.UNAVAILABLE,
        date: "2027-08-07",
      }),
    });
    expect(result.result).toBe(PublicAvailabilityResult.UNAVAILABLE);
  });
});
