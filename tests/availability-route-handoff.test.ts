import { beforeEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => ({
  afterTasks: [] as Array<() => unknown>,
  forward: vi.fn(async () => true),
  notify: vi.fn(async () => false),
}));

vi.mock("next/server", () => ({
  after: (task: () => unknown) => fixtures.afterTasks.push(task),
  NextResponse: { json: (body: unknown, init?: ResponseInit) => Response.json(body, init) },
}));
vi.mock("@/lib/api-rate-limit", () => ({
  RATE_LIMIT_IDS: { availability: "fixture" },
  checkApiRateLimit: vi.fn(async () => "allowed"),
}));
vi.mock("@/lib/check-public-availability", () => ({
  validateRequestedAvailabilityDate: vi.fn(() => null),
  checkPublicAvailability: vi.fn(async (date: string) => ({
    requestedDate: date,
    result: "AVAILABLE",
    publicMessage: "Your date currently appears available.",
    checkedAt: "2026-09-25T20:00:00.000Z",
    authority: "fixture Operations",
    sourceEndpoint: "https://operations.example.test/api/availability",
  })),
}));
vi.mock("@/lib/availability-journey-server", () => ({ forwardAvailabilityJourney: fixtures.forward }));
vi.mock("@/lib/availability-notification", () => ({ sendAvailabilityCheckNotification: fixtures.notify }));

import { POST } from "@/app/api/availability/route";

describe("availability response handoff", () => {
  beforeEach(() => {
    fixtures.afterTasks.length = 0;
    fixtures.forward.mockClear();
    fixtures.notify.mockClear();
  });

  it("answers the visitor before telemetry and strips unsafe campaign fields", async () => {
    const request = new Request("https://www.howesounddj.com/api/availability", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        date: "2028-06-15",
        acquisition: { entryPage: "/contact?email=private@example.test", source: "google", medium: "organic", campaign: "private@example.test", deviceCategory: "mobile" },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect((await response.json()).result).toBe("AVAILABLE");
    expect(fixtures.forward).not.toHaveBeenCalled();
    expect(fixtures.notify).not.toHaveBeenCalled();
    expect(fixtures.afterTasks).toHaveLength(1);

    await fixtures.afterTasks[0]();
    expect(fixtures.forward).toHaveBeenCalledWith(expect.objectContaining({
      kind: "journey",
      journey: expect.objectContaining({ entryPage: "/contact", source: "google", medium: "organic", campaign: null }),
    }));
  });
});
