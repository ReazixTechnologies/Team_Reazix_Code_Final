import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyConsent, OPEN_CONSENT_EVENT, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

/**
 * Accept / Decline cookie banner. Shows until the visitor chooses, remembers
 * the choice, and can be reopened from "Cookie settings" in the footer.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) applyConsent(saved);
    else setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    applyConsent(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-describedby="cookie-banner-text"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-line-strong bg-surface-2 p-5 shadow-2xl shadow-black/60 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:mx-0 sm:p-6"
    >
      <p className="font-display text-lg text-text">We value your privacy</p>
      <p id="cookie-banner-text" className="mt-2 text-sm leading-relaxed text-text/80">
        We use essential storage to make this site work. With your permission, we also use analytics cookies to
        understand how visitors use the site. You can change your choice any time from “Cookie settings” in the
        footer.{" "}
        <Link to="/privacy" className="text-ember underline underline-offset-4 hover:text-text">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => choose("accepted")}
          data-cursor="hover"
          className="flex-1 rounded-xl bg-ember px-5 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-void transition-colors hover:bg-ember/85"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          data-cursor="hover"
          className="flex-1 rounded-xl border border-line-strong px-5 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-text transition-colors hover:border-white/40 hover:bg-white/5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}