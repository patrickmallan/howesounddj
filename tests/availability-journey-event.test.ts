import { describe, expect, it } from "vitest";
import { parseClientJourneyEvent } from "@/lib/availability-journey-event";

const validEvent = {
  journeyId: "b379e188-e980-4faf-b568-a4b650288505",
  eventId: "dcf5ff1b-cb52-49d8-85c8-d7fbb6e4438d",
  eventType: "PAGE_VIEWED",
  occurredAt: new Date().toISOString(),
  pagePath: "/contact",
  surface: "contact_form",
};

describe("public journey events", () => {
  it("accepts a bounded first-party event", () => {
    expect(parseClientJourneyEvent(validEvent)).toEqual(validEvent);
  });

  it.each([
    { ...validEvent, eventType: "CALENDLY_OPENED" },
    { ...validEvent, journeyId: "not-a-uuid" },
    { ...validEvent, pagePath: "/contact?email=private@example.com" },
    { ...validEvent, surface: "x".repeat(65) },
    { ...validEvent, email: "private@example.com" },
    { ...validEvent, occurredAt: "2020-01-01T00:00:00.000Z" },
  ])("rejects unsupported or personal fields", (event) => {
    expect(parseClientJourneyEvent(event)).toBeNull();
  });
});
