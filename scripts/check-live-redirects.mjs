/** Read-only check of configured legacy URL redirects against a deployed build. */
import nextConfig from "../next.config.ts";

const base = (process.env.HSDJ_REDIRECT_BASE_URL || "https://www.howesounddj.com").replace(/\/$/, "");
const redirects = await nextConfig.redirects();
let failures = 0;

for (const rule of redirects) {
  const response = await fetch(`${base}${rule.source}`, { redirect: "manual" });
  const location = response.headers.get("location");
  const destination = location ? new URL(location, base).pathname : null;
  const valid = response.status === 308 && destination === rule.destination;
  console.log(JSON.stringify({ source: rule.source, status: response.status, destination, expected: rule.destination, valid }));
  if (!valid) failures += 1;
}

if (failures) {
  console.error(`${failures} redirect(s) did not match the configured one-hop destination.`);
  process.exitCode = 1;
}
