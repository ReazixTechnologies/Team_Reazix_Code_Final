import { motion } from "motion/react";
import { useRef, useState } from "react";
import { AnimatedPrice } from "./AnimatedPrice";
import { IncludedList } from "./IncludedList";
import { ServiceGlow } from "@/components/sections/services/ServiceGlow";
import { Magnetic } from "@/components/motion/Magnetic";
import { Spotlight } from "@/components/fx/Spotlight";
import { buttonClasses } from "@/components/ui/Button";
import { useLenis } from "@/components/providers/SmoothScroll";
import {
  PRICING_CUSTOM_LABEL,
  PRICING_FEATURED_BADGE,
  PRICING_FROM_LABEL,
  PRICING_IDEAL_LABEL,
  PRICING_WHO_LABEL,
} from "@/content/pricing";
import { useCurrency } from "@/hooks/useCurrency";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { PricingTier, ServiceAccent } from "@/types";

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember/30",
  amber: "border-amber/30",
  blush: "border-blush/30",
  violet: "border-violet/30",
  mint: "border-mint/30",
};

const ACCENT_HOVER_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember/35",
  amber: "border-amber/35",
  blush: "border-blush/35",
  violet: "border-violet/35",
  mint: "border-mint/35",
};

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const ACCENT_GRADIENT: Record<ServiceAccent, string> = {
  ember: "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
  amber: "linear-gradient(135deg, var(--color-amber), var(--color-ember))",
  blush: "linear-gradient(135deg, var(--color-blush), var(--color-violet))",
  violet: "linear-gradient(135deg, var(--color-violet), var(--color-blush))",
  mint: "linear-gradient(135deg, var(--color-mint), var(--color-amber))",
};

interface PricingCardProps {
  tier: PricingTier;
  index: number;
  isHovered: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export function PricingCard({ tier, index, isHovered, isDimmed, onActivate, onDeactivate }: PricingCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();
  const lenisRef = useLenis();
  const { formatAmount } = useCurrency();

  const hoverEnabled = !isCoarsePointer;
  const glowEnabled = hoverEnabled && !reducedMotion;
  const active = (hoverEnabled && isHovered) || isFocused;

  const isCustomPriced = tier.priceINR === null || tier.priceUSD === null;
  const priceLabel = isCustomPriced ? PRICING_CUSTOM_LABEL : formatAmount(tier.priceINR!, tier.priceUSD!);

  function handleCtaClick() {
    const target = document.querySelector(tier.cta.href);
    if (!(target instanceof HTMLElement)) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      target.scrollIntoView({ block: "start" });
    }
  }

  return (
    <motion.article
      ref={cardRef}
      aria-labelledby={`pricing-${tier.id}-name`}
      data-cursor="hover"
      onMouseEnter={() => hoverEnabled && onActivate()}
      onMouseLeave={() => hoverEnabled && onDeactivate()}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      animate={{
        y: !reducedMotion && active ? -6 : 0,
        opacity: isDimmed ? 0.6 : 1,
        scale: tier.featured && isDesktop ? 1.02 : 1,
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { y: { type: "spring", stiffness: 200, damping: 25 }, opacity: { duration: 0.35 }, scale: { duration: 0.4 } }
      }
      className={cn(
        "group relative isolate flex h-full flex-col rounded-xl border bg-surface p-[clamp(2rem,3vw,3rem)] transition-colors duration-500 ease-out-expo",
        tier.featured && "order-first lg:order-none",
        active ? [ACCENT_HOVER_BORDER_CLASS[tier.accent], "bg-surface-2"] : tier.featured ? ACCENT_BORDER_CLASS[tier.accent] : "border-line",
      )}
    >
      {/* Clips the ambient glow/spotlight to the card's rounded corners without clipping the badge below, which deliberately sits half outside the border. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        {tier.featured ? (
          <Spotlight
            color={`var(--color-${tier.accent})`}
            size={480}
            blur={140}
            className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 opacity-25"
          />
        ) : null}

        {glowEnabled ? <ServiceGlow cardRef={cardRef} accent={tier.accent} isHovered={isHovered} /> : null}
      </div>

      {tier.featured ? (
        <span
          className={cn(
            "absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-void px-3 py-1 font-mono text-label uppercase tracking-[0.22em]",
            ACCENT_BORDER_CLASS[tier.accent],
            ACCENT_TEXT_CLASS[tier.accent],
          )}
        >
          {PRICING_FEATURED_BADGE}
        </span>
      ) : null}

      <div className="relative z-10 flex h-full flex-col gap-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
            {String(index + 1).padStart(2, "0")} / {tier.name.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 id={`pricing-${tier.id}-name`} className="font-display text-h3 font-normal text-text">
            {tier.name}
          </h3>
          <p className="text-body text-text">{tier.positioning}</p>
        </div>

        <div className="flex flex-col gap-3">
          {isCustomPriced ? null : (
            <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{PRICING_FROM_LABEL}</span>
          )}
          <AnimatedPrice
            value={priceLabel}
            className={cn(
              "font-display text-h1 font-light leading-none tabular-nums",
              tier.featured ? "bg-clip-text text-transparent" : "text-text",
            )}
            style={
              tier.featured
                ? { backgroundImage: ACCENT_GRADIENT[tier.accent], WebkitBackgroundClip: "text" }
                : undefined
            }
          />
          <span className="mt-1 inline-flex w-fit items-center rounded-full border border-line px-3 py-1 font-mono text-label uppercase tracking-[0.22em] text-text-muted">
            {tier.timeline}
          </span>
        </div>

        <div aria-hidden="true" className="h-px w-full bg-line" />

        <div className="flex flex-col gap-3">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{PRICING_WHO_LABEL}</span>
          <p className="text-body text-text-muted">{tier.forWho}</p>
        </div>

        <IncludedList items={tier.includes} accent={tier.accent} emphasizeFirst={tier.id === "scale"} />

        <div className="flex flex-col gap-3">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{PRICING_IDEAL_LABEL}</span>
          <div className="flex flex-wrap gap-2">
            {tier.idealFor.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-3 py-1 font-mono text-label text-text-faint"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Magnetic className="block">
            <button
              type="button"
              onClick={handleCtaClick}
              className={buttonClasses({
                variant: tier.featured ? "primary" : "outline",
                size: "lg",
                className: tier.featured ? "w-full" : undefined,
              })}
            >
              {tier.cta.label}
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.article>
  );
}
