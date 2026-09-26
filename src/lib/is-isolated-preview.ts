/** Keep the separate launch-review project inert even if Vercel targets production by mistake. */
export function isIsolatedPreview(): boolean {
  return process.env.HSDJ_ISOLATED_PREVIEW === "1" || process.env.VERCEL_ENV === "preview";
}
