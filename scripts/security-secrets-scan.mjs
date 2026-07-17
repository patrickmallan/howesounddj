#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SCAN_ROOTS = ["src", "scripts"];
const SCAN_FILES = ["env.example"];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const PATTERNS = [
  /BEGIN PRIVATE KEY/,
  /GOOGLE_PRIVATE_KEY\s*=\s*["'][^"']+BEGIN/,
  /refresh_token\s*[:=]\s*["'][\w-]{20,}/i,
  /SUPABASE_SERVICE_ROLE/i,
];

let findings = 0;
let scanned = 0;

function walk(dir, files = []) {
  if (!statSync(dir).isDirectory()) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      walk(full, files);
      continue;
    }
    if (/\.(ts|tsx|js|mjs)$/.test(entry)) files.push(full);
  }
  return files;
}

const files = [...SCAN_FILES.map((f) => join(ROOT, f))];
for (const root of SCAN_ROOTS) {
  const path = join(ROOT, root);
  try {
    files.push(...walk(path));
  } catch {
    // ignore missing roots
  }
}

for (const file of files) {
  scanned += 1;
  const content = readFileSync(file, "utf8");
  if (file.endsWith("security-secrets-scan.mjs")) continue;
  for (const pattern of PATTERNS) {
    if (pattern.test(content)) {
      findings += 1;
      console.log(`[FINDING] ${file} matches ${pattern}`);
    }
  }
}

console.log(`Scanned files: ${scanned}`);
console.log(`Findings: ${findings}`);
process.exit(findings === 0 ? 0 : 1);
