import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("public website environment contract (R1)", () => {
  it("env.example contains no obsolete Google Calendar variables", () => {
    const example = readFileSync(join(ROOT, "env.example"), "utf8");
    expect(example).not.toMatch(/GOOGLE_CALENDAR_/);
    expect(example).not.toMatch(/GOOGLE_CLIENT_EMAIL/);
    expect(example).not.toMatch(/GOOGLE_PRIVATE_KEY/);
    expect(example).toMatch(/HSDJ_OPERATIONS/);
  });

  it("environment contract documents Operations-only calendar authority", () => {
    const contract = readFileSync(
      join(ROOT, "docs/PUBLIC_WEBSITE_ENVIRONMENT_CONTRACT_V1.md"),
      "utf8",
    );
    expect(contract).toMatch(/must not hold Google Calendar credentials/i);
    expect(contract).toMatch(/HSDJ Operations/);
  });

  it("no source import references removed google-calendar module", () => {
    const checkPublic = readFileSync(
      join(ROOT, "src/lib/check-public-availability.ts"),
      "utf8",
    );
    expect(checkPublic).not.toMatch(/google-calendar/);
    expect(checkPublic).toMatch(/ops\.howesounddj\.com/);
  });
});
