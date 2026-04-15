export {};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset?: (id?: string) => void;
      remove?: (id?: string) => void;
    };
  }
}
