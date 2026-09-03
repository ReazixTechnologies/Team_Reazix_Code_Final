import { motion, useSpring } from "motion/react";
import type { RefObject } from "react";
import { useCardCursor } from "@/hooks/useCardCursor";
import type { ServiceAccent } from "@/types";

const ACCENT_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

const GLOW_SIZE = 420;

interface ServiceGlowProps {
  cardRef: RefObject<HTMLElement | null>;
  accent: ServiceAccent;
  isHovered: boolean;
}

/** Per-card ambient light that trails the cursor, local to that card only. */
export function ServiceGlow({ cardRef, accent, isHovered }: ServiceGlowProps) {
  const { x, y } = useCardCursor(cardRef);
  const springX = useSpring(x, { stiffness: 120, damping: 25 });
  const springY = useSpring(y, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        width: GLOW_SIZE,
        height: GLOW_SIZE,
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
        background: `radial-gradient(circle, ${ACCENT_VAR[accent]} 0%, transparent 70%)`,
        filter: "blur(80px)",
        mixBlendMode: "screen",
      }}
      animate={{ opacity: isHovered ? 0.14 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}
