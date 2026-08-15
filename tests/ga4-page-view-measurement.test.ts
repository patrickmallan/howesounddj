import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { trackPageView } from "@/lib/analytics";

describe("GA4 page_view measurement", () => {
  const gtag = vi.fn();

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubGlobal("window", {
      gtag,
      location: {
        origin: "https://www.howesounddj.com",
        search: "",
        hash: "",
      },
    } as Window & typeof globalThis);
    vi.stubGlobal("document", { title: "Howe Sound Wedding DJ" });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    gtag.mockReset();
  });

  it("fires explicit page_view events (not config-only updates)", () => {
    trackPageView("/vancouver-wedding-dj");

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/vancouver-wedding-dj",
      page_location: "https://www.howesounddj.com/vancouver-wedding-dj",
      page_title: "Howe Sound Wedding DJ",
    });
  });

  it("no-ops when GA measurement ID is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    trackPageView("/");
    expect(gtag).not.toHaveBeenCalled();
  });
});
