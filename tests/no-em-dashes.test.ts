import { readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";

const TEXT_EXTENSIONS = new Set([".css", ".html", ".json", ".md", ".ts", ".tsx", ".txt", ".svg"]);

function textFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return textFiles(path);
    return TEXT_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
  });
}

describe("site punctuation policy", () => {
  it("contains no em dashes or encoded em dash entities", () => {
    const emDash = String.fromCodePoint(0x2014);
    const forbidden = [emDash, `&${"mdash;"}`, `&#${"8212;"}`, `&#x${"2014;"}`];
    const files = [...textFiles("src"), ...textFiles("public"), "next.config.ts"];
    const offenders = files.filter((file) => {
      const source = readFileSync(file, "utf8");
      return forbidden.some((token) => source.includes(token));
    });

    expect(offenders).toEqual([]);
  });
});
