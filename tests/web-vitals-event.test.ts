import { describe, expect, it } from "vitest";
import { webVitalEventPayload } from "@/lib/web-vitals-event";

describe("real-user web vitals event", () => {
  it("sends only a numeric core vital and a path", () => {
    const metric = {
      name: "LCP",
      value: 2534.5678,
      rating: "needs-improvement",
      navigationType: "navigate",
      id: "private-metric-id",
      entries: [{ name: "https://example.test/contact?private=1" }],
    };
    expect(webVitalEventPayload(metric, "/contact")).toEqual({
      metric_name: "LCP",
      metric_value: 2534.568,
      metric_rating: "needs-improvement",
      navigation_type: "navigate",
      page_path: "/contact",
    });
  });

  it("ignores non-core and invalid values", () => {
    const metric = { name: "FCP", value: 1200, rating: "good", navigationType: "navigate" };
    expect(webVitalEventPayload(metric, "/")).toBeNull();
    expect(webVitalEventPayload({ ...metric, name: "INP", value: Number.NaN }, "/")).toBeNull();
  });
});
