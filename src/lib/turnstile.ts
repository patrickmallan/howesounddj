/** Cloudflare Turnstile siteverify, https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ */
export async function verifyTurnstileToken(secret: string, token: string): Promise<boolean> {
  if (!token.trim()) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Fail closed without leaving a couple waiting indefinitely on the provider.
    return false;
  }
}
