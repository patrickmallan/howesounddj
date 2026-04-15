/** gtag.js loaded by Google Analytics 4 (see `src/components/google-analytics.tsx`). */
export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
