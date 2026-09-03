import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Spotlight } from "@/components/fx/Spotlight";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  CLOSING_CTA_BUTTON_LABEL,
  CLOSING_CTA_COPIED_LABEL,
  CLOSING_CTA_EYEBROW,
  CLOSING_CTA_HEADING_LINES,
  CLOSING_CTA_REASSURANCES,
  CLOSING_CTA_SUPPORTING,
  siteConfig,
} from "@/content/site";

const COPIED_RESET_DELAY = 2000;

/** Click-to-copy email link: writes to the clipboard, falls back to a mailto navigation, announces the copied state. */
function EmailCopyLink() {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimeout.current !== null) window.clearTimeout(resetTimeout.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
      return;
    }

    if (resetTimeout.current !== null) window.clearTimeout(resetTimeout.current);
    resetTimeout.current = window.setTimeout(() => setCopied(false), COPIED_RESET_DELAY);
  }

  return (
    <button type="button" data-cursor="hover" onClick={handleCopy} className={buttonClasses({ variant: "ghost", size: "lg" })}>
      <span aria-live="polite">{copied ? CLOSING_CTA_COPIED_LABEL : siteConfig.email}</span>
    </button>
  );
}

/** The final pre-contact call to action: full-width, tall, rising ember/blush glow. */
export function ClosingCta() {
  const lenisRef = useLenis();

  function scrollToContact() {
    const target = document.querySelector("#contact");
    if (!(target instanceof HTMLElement)) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      target.scrollIntoView({ block: "start" });
    }
  }

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-void py-section text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden">
        <Spotlight
          color="var(--color-ember)"
          size={700}
          blur={160}
          className="left-1/2 bottom-[-30%] -translate-x-1/2 mix-blend-screen opacity-30"
        />
        <Spotlight
          color="var(--color-blush)"
          size={560}
          blur={150}
          className="left-[60%] bottom-[-20%] -translate-x-1/2 mix-blend-screen opacity-20"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center gap-8">
        <Eyebrow>{CLOSING_CTA_EYEBROW}</Eyebrow>

        <h2 id="closing-cta-heading" className="flex flex-col items-center font-display text-display font-light text-text">
          {CLOSING_CTA_HEADING_LINES.map((line) => (
            <SplitText key={line} text={line} as="span" className="block" />
          ))}
        </h2>

        <p className="max-w-[560px] text-body text-text-muted">{CLOSING_CTA_SUPPORTING}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic>
            <Button variant="primary" size="lg" onClick={scrollToContact}>
              {CLOSING_CTA_BUTTON_LABEL}
            </Button>
          </Magnetic>
          <Magnetic>
            <EmailCopyLink />
          </Magnetic>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          {CLOSING_CTA_REASSURANCES.map((line, index) => (
            <span key={line} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line-strong" /> : null}
              {line}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
