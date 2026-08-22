import { describe, expect, it } from "vitest";
import { boundedString, readJsonObject } from "@/lib/api-request";

describe("readJsonObject", () => {
  it("accepts a bounded JSON object", async () => {
    const request = new Request("https://example.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: "2027-08-07" }),
    });
    await expect(readJsonObject(request, 1024)).resolves.toEqual({ date: "2027-08-07" });
  });

  it("rejects a declared oversized body", async () => {
    const request = new Request("https://example.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": "2048" },
      body: "{}",
    });
    await expect(readJsonObject(request, 1024)).rejects.toMatchObject({ status: 413 });
  });

  it("rejects non-object JSON", async () => {
    const request = new Request("https://example.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "[]",
    });
    await expect(readJsonObject(request, 1024)).rejects.toMatchObject({ status: 400 });
  });
});

describe("boundedString", () => {
  it("trims valid values and rejects oversized values", () => {
    expect(boundedString("  hello  ", 10)).toBe("hello");
    expect(boundedString("too long", 3)).toBe("");
  });
});
