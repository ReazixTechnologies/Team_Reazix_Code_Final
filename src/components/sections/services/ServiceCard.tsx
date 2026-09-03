import { useRef, useState } from "react";
import { CapabilityList } from "./CapabilityList";
import { ServiceGlow } from "./ServiceGlow";
import { Magnetic } from "@/components/motion/Magnetic";
import { SERVICE_CARD_DISCUSS_LABEL } from "@/content/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScrollLink } from "@/hooks/useSmoothScrollLink";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Service, ServiceAccent } from "@/types";

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember/25",
  amber: "border-amber/25",
  blush: "border-blush/25",
  violet: "border-violet/25",
  mint: "border-mint/25",
};

const ACCENT_INDEX_GRADIENT: Record<ServiceAccent, string> = {
  ember: "linear-gradient(180deg, var(--color-ember), transparent)",
  amber: "linear-gradient(180deg, var(--color-amber), transparent)",
  blush: "linear-gradient(180deg, var(--color-blush), transparent)",
  violet: "linear-gradient(180deg, var(--color-violet), transparent)",
  mint: "linear-gradient(180deg, var(--color-mint), transparent)",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const handleSmoothScroll = useSmoothScrollLink();

  const hoverEnabled = !isCoarsePointer;
  const glowEnabled = hoverEnabled && !reducedMotion;
  const active = hoverEnabled && isHovered;

  return (
    <article
      ref={cardRef}
      id={`service-${service.id}`}
      aria-labelledby={`service-${service.id}-title`}
      data-cursor="hover"
      onMouseEnter={() => hoverEnabled && setIsHovered(true)}
      onMouseLeave={() => hoverEnabled && setIsHovered(false)}
      className={cn(
        "group relative isolate overflow-hidden rounded-xl border bg-surface transition-colors duration-500 ease-out-expo lg:min-h-[78vh]",
        active ? [ACCENT_BORDER_CLASS[service.accent], "bg-surface-2"] : "border-line",
      )}
    >
      {glowEnabled ? <ServiceGlow cardRef={cardRef} accent={service.accent} isHovered={isHovered} /> : null}

      <div className="relative z-10 grid h-full grid-cols-1 gap-10 p-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <span
              aria-hidden="true"
              className={cn(
                "font-display text-display font-light leading-none transition-opacity duration-500",
                active ? "text-text/[0.16]" : "text-text/[0.08]",
              )}
              style={
                active
                  ? {
                      backgroundImage: ACCENT_INDEX_GRADIENT[service.accent],
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }
                  : undefined
              }
            >
              {service.index}
            </span>

            <div className="flex flex-col gap-4">
              <h3
                id={`service-${service.id}-title`}
                className="text-h2 font-display font-light tracking-[-0.025em] text-text"
              >
                {service.title}
              </h3>
              <p className="max-w-[380px] text-body text-text-muted">{service.tagline}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="flex items-start gap-2 text-body text-text/90">
              <span aria-hidden="true" className={cn("mt-1", ACCENT_TEXT_CLASS[service.accent])}>
                &rarr;
              </span>
              {service.outcome}
            </p>

            <Magnetic className="self-start">
              <a
                href="#contact"
                data-cursor="hover"
                onClick={(event) => handleSmoothScroll(event, "#contact")}
                className="font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text"
              >
                {SERVICE_CARD_DISCUSS_LABEL}
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <p className="text-body text-text-muted">{service.description}</p>

          <CapabilityList capabilities={service.capabilities} accent={service.accent} />

          <div className="flex flex-wrap gap-2">
            {service.stack.map((item, index) => (
              <span
                key={item}
                className={cn(
                  "rounded-full border border-line px-3 py-1 font-mono text-label text-text-faint transition-colors duration-300",
                  active && "text-text-muted",
                )}
                style={active ? { transitionDelay: `${index * STAGGER.tight}s` } : undefined}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
