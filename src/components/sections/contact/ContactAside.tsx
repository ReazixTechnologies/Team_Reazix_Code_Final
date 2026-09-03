import { useEffect, useRef, useState } from "react";
import {
  ASIDE_CALL_LINE,
  ASIDE_COPIED_LABEL,
  ASIDE_COPY_LABEL,
  ASIDE_LOCATION_LABEL,
  ASIDE_RESPONSE_LABEL,
  ASIDE_RESPONSE_VALUE,
  ASIDE_SOCIALS_LABEL,
} from "@/content/contact";
import { siteConfig, socialLinks } from "@/content/site";
import { useIstClock } from "@/hooks/useIstClock";

const COPIED_RESET_DELAY = 2000;

interface CopyLineProps {
  value: string;
}

/** A direct-contact value with an inline copy-to-clipboard action; falls back gracefully if the API is unavailable. */
function CopyLine({ value }: CopyLineProps) {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimeout.current !== null) window.clearTimeout(resetTimeout.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (resetTimeout.current !== null) window.clearTimeout(resetTimeout.current);
      resetTimeout.current = window.setTimeout(() => setCopied(false), COPIED_RESET_DELAY);
    } catch {
      // Clipboard blocked — the value is still visible as plain text to copy manually.
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-body text-text">{value}</span>
      <button
        type="button"
        data-cursor="hover"
        onClick={handleCopy}
        className="font-mono text-label uppercase tracking-[0.22em] text-text-faint transition-colors duration-300 hover:text-text"
      >
        <span aria-live="polite">{copied ? ASIDE_COPIED_LABEL : ASIDE_COPY_LABEL}</span>
      </button>
    </div>
  );
}

/** Right-column (desktop) / below-form (mobile) alternatives to the form: direct contact, response time, location, socials. */
export function ContactAside() {
  const istTime = useIstClock();

  return (
    <aside className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <CopyLine value={siteConfig.email} />
        <CopyLine value={siteConfig.phone} />
      </div>

      <div className="flex flex-col gap-1 border-t border-line pt-6">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{ASIDE_RESPONSE_LABEL}</span>
        <span className="text-body text-text-muted">{ASIDE_RESPONSE_VALUE}</span>
      </div>

      <div className="flex flex-col gap-1 border-t border-line pt-6">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{ASIDE_LOCATION_LABEL}</span>
        <span className="text-body text-text-muted">{siteConfig.location}</span>
        <span className="font-mono text-sm tabular-nums text-text-faint">{istTime ?? "--:--:--"} IST</span>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{ASIDE_SOCIALS_LABEL}</span>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-line pt-6 font-mono text-sm text-text-faint">{ASIDE_CALL_LINE}</p>
    </aside>
  );
}
