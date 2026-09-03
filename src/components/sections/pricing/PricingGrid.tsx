import { useState } from "react";
import { PricingCard } from "./PricingCard";
import { Reveal } from "@/components/motion/Reveal";
import { PRICING_TIERS } from "@/content/pricing";
import { STAGGER } from "@/lib/motion";

/** The three engagement tiers — hover on one dims its siblings, same selection language as Services and Work. */
export function PricingGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
      {PRICING_TIERS.map((tier, index) => (
        <Reveal
          key={tier.id}
          delay={tier.featured ? PRICING_TIERS.length * STAGGER.base : index * STAGGER.base}
          className="h-full"
        >
          <PricingCard
            tier={tier}
            index={index}
            isHovered={hoveredId === tier.id}
            isDimmed={hoveredId !== null && hoveredId !== tier.id}
            onActivate={() => setHoveredId(tier.id)}
            onDeactivate={() => setHoveredId((current) => (current === tier.id ? null : current))}
          />
        </Reveal>
      ))}
    </div>
  );
}
