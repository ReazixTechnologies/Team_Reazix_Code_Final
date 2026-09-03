import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "motion/react";
import { Children, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop at normal (non-hovered) speed. */
  speed?: number;
  direction?: "left" | "right";
  /** true (default): hovering pauses the scroll outright. false: hovering eases the
   * speed down to `hoverSlowFactor` instead of stopping dead — use this when items
   * inside the marquee are themselves interactive/hoverable. */
  pauseOnHover?: boolean;
  /** Fraction of normal speed while hovered. Only used when pauseOnHover is false. */
  hoverSlowFactor?: number;
}

/**
 * Infinite horizontal scroller. Driven by a spring-smoothed progress value (not raw
 * CSS keyframes) so the speed can be smoothly retargeted on hover instead of jumping —
 * see `pauseOnHover` / `hoverSlowFactor`. Two duplicated tracks create the seamless loop.
 */
export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  hoverSlowFactor = 0.25,
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const items = Children.toArray(children);
  const [hovered, setHovered] = useState(false);

  const speedMultiplier = useSpring(1, { stiffness: 120, damping: 26 });
  speedMultiplier.set(hovered ? (pauseOnHover ? 0 : hoverSlowFactor) : 1);

  const progress = useMotionValue(0);
  const xPercent = useTransform(progress, (p) =>
    direction === "right" ? `${p * 100 - 100}%` : `${-p * 100}%`,
  );

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    const deltaSeconds = delta / 1000;
    const next = (progress.get() + (deltaSeconds / speed) * speedMultiplier.get()) % 1;
    progress.set(next < 0 ? next + 1 : next);
  });

  if (reducedMotion) {
    return <div className={cn("flex flex-wrap items-center gap-8", className)}>{items}</div>;
  }

  return (
    <div
      className={cn("group flex overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {[0, 1].map((setIndex) => (
        <motion.div
          key={setIndex}
          aria-hidden={setIndex === 1}
          className="flex shrink-0 items-center gap-8 pr-8"
          style={{ x: xPercent }}
        >
          {items}
        </motion.div>
      ))}
    </div>
  );
}
