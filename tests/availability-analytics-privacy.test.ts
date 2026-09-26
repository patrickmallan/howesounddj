import { describe, expect, it } from "vitest";
import { availabilityCheckEventParams } from "@/lib/analytics";

describe("availability analytics data minimization", () => {
  it("reports the outcome without exporting a couple's exact wedding date", () => {
    const params = availabilityCheckEventParams("available", "contact_form");

    expect(params).toMatchObject({
      availability_status: "available",
      surface: "contact_form",
    });
    expect(params).not.toHaveProperty("date_selected");
    expect(JSON.stringify(params)).not.toContain("2027-08-14");
  });
});
