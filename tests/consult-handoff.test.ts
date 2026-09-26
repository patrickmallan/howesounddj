import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => ({
  afterTasks: [] as Array<() => unknown>,
  forward: vi.fn(async () => true),
}));

vi.mock("next/server", () => ({
  after: (task: () => unknown) => fixtures.afterTasks.push(task),
  NextResponse: { redirect: (url: URL) => Response.redirect(url.toString()) },
}));
vi.mock("@/lib/availability-journey-server", () => ({ forwardAvailabilityJourney: fixtures.forward }));

import { GET } from "@/app/go/consult/route";

describe("consult handoff", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL_ENV", "production");
    fixtures.afterTasks.length = 0;
    fixtures.forward.mockClear();
  });

  afterEach(() => vi.unstubAllEnvs());

  it("returns the booking redirect before Operations telemetry runs", async () => {
    const journeyId = "bf7d9412-81d1-42c3-9bb8-852d918a8ec0";
    const response = await GET(new Request(`https://www.howesounddj.com/go/consult?jid=${journeyId}&surface=contact_success&month=2028-07`));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toContain("utm_term=hsdj_journey_");
    expect(response.headers.get("location")).toContain("month=2028-07");
    expect(fixtures.forward).not.toHaveBeenCalled();
    expect(fixtures.afterTasks).toHaveLength(1);
    await fixtures.afterTasks[0]();
    expect(fixtures.forward).toHaveBeenCalledWith(expect.objectContaining({
      kind: "event",
      event: expect.objectContaining({ journeyId, eventType: "CONSULT_CLICKED", surface: "contact_success" }),
    }));
  });

  it("does not forward a malformed public journey ID", async () => {
    const response = await GET(new Request("https://www.howesounddj.com/go/consult?jid=spam&surface=unsafe%20input"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).not.toContain("utm_term");
    expect(response.headers.get("location")).toContain("utm_content=post_availability");
    expect(fixtures.afterTasks).toHaveLength(0);
  });

  it("holds every consultation click inside a protected preview", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const response = await GET(new Request("https://preview.example.test/go/consult?jid=bf7d9412-81d1-42c3-9bb8-852d918a8ec0"));
    expect(response.headers.get("location")).toBe("https://preview.example.test/preview/scheduling");
    expect(fixtures.afterTasks).toHaveLength(0);
    expect(fixtures.forward).not.toHaveBeenCalled();
  });
});
