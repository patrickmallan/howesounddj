import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const external = vi.hoisted(() => ({
  rateLimit: vi.fn(),
  checkAvailability: vi.fn(),
  notify: vi.fn(),
  forward: vi.fn(),
  verifyTurnstile: vi.fn(),
}));

vi.mock("next/server", () => ({
  after: vi.fn(),
  NextResponse: { json: (body: unknown, init?: ResponseInit) => Response.json(body, init) },
}));
vi.mock("@/lib/api-rate-limit", () => ({
  RATE_LIMIT_IDS: { availability: "availability", contact: "contact" },
  checkApiRateLimit: external.rateLimit,
}));
vi.mock("@/lib/check-public-availability", () => ({
  checkPublicAvailability: external.checkAvailability,
  validateRequestedAvailabilityDate: vi.fn(),
}));
vi.mock("@/lib/availability-notification", () => ({ sendAvailabilityCheckNotification: external.notify }));
vi.mock("@/lib/availability-journey-server", () => ({ forwardAvailabilityJourney: external.forward }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken: external.verifyTurnstile }));

import { POST as checkDate } from "@/app/api/availability/route";
import { POST as contact } from "@/app/api/contact/route";
import { POST as journeyEvent } from "@/app/api/availability-journey/event/route";

describe("protected preview isolation", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.clearAllMocks();
  });

  afterEach(() => vi.unstubAllEnvs());

  it.each([
    ["availability", checkDate],
    ["contact", contact],
    ["journey event", journeyEvent],
  ])("blocks %s before reading input or reaching providers", async (_name, handler) => {
    const response = await handler(new Request("https://preview.example.test/api/test", { method: "POST" }));
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(external.rateLimit).not.toHaveBeenCalled();
    expect(external.checkAvailability).not.toHaveBeenCalled();
    expect(external.notify).not.toHaveBeenCalled();
    expect(external.forward).not.toHaveBeenCalled();
    expect(external.verifyTurnstile).not.toHaveBeenCalled();
  });

  it("also blocks provider calls when the isolated project is accidentally targeted as production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("HSDJ_ISOLATED_PREVIEW", "1");
    const response = await checkDate(new Request("https://preview.example.test/api/availability", { method: "POST" }));
    expect(response.status).toBe(503);
    expect(external.checkAvailability).not.toHaveBeenCalled();
  });
});
