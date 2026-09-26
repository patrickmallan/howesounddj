type CoreVitalInput = {
  name: string;
  value: number;
  rating: string;
  navigationType: string;
};

/** Minimal GA payload: no metric ID, performance entries, URL query, or visitor data. */
export function webVitalEventPayload(metric: CoreVitalInput, pathname: string) {
  if (metric.name !== "LCP" && metric.name !== "INP" && metric.name !== "CLS") return null;
  if (!Number.isFinite(metric.value)) return null;

  return {
    metric_name: metric.name,
    metric_value: Math.round(metric.value * 1000) / 1000,
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
    page_path: pathname,
  };
}
