/**
 * Cookie consent + analytics loading.
 *
 * Analytics is loaded ONLY after the visitor clicks "Accept". If they decline
 * (or never answer), nothing is loaded and no tracking cookies are set.
 *
 * To turn on Google Analytics, paste your Measurement ID below
 * (Google Analytics → Admin → Data streams → it looks like "G-XXXXXXXXXX").
 * Leave it empty and the banner still works, but no analytics runs.
 */
export const GA_MEASUREMENT_ID = "G-79FJHV73SH";

export type ConsentChoice = "accepted" | "declined";

const STORAGE_KEY = "reazix:cookie-consent";
/** Fired on window to reopen the banner (used by "Cookie settings" in the footer). */
export const OPEN_CONSENT_EVENT = "reazix:open-cookie-settings";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked — the banner will simply ask again next visit.
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

let analyticsLoaded = false;

/** Applies the visitor's choice: starts analytics on accept, switches it off on decline. */
export function applyConsent(choice: ConsentChoice) {
  if (!GA_MEASUREMENT_ID) return;
  const w = window as unknown as GtagWindow;

  // Google's documented opt-out switch — stops all hits for this ID.
  w[`ga-disable-${GA_MEASUREMENT_ID}`] = choice !== "accepted";
  if (choice !== "accepted" || analyticsLoaded) return;

  analyticsLoaded = true;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}