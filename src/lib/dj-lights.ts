export const DJ_LIGHTS_EVENT = "hsdj:dj-lights-change";
const DJ_LIGHTS_KEY = "hsdj:dj-lights";
let currentPageChoice: boolean | null = null;

export function djLightsEnabled() {
  if (currentPageChoice !== null) return currentPageChoice;
  try {
    return window.localStorage.getItem(DJ_LIGHTS_KEY) === "on";
  } catch {
    return false;
  }
}

export function setDjLightsEnabled(enabled: boolean) {
  currentPageChoice = enabled;
  try {
    window.localStorage.setItem(DJ_LIGHTS_KEY, enabled ? "on" : "off");
  } catch {
    // The current page can still honor the choice when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent<boolean>(DJ_LIGHTS_EVENT, { detail: enabled }));
}
