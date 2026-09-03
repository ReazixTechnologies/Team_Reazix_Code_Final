import { animate, useInView, type UseInViewOptions } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** useInView root margin, e.g. "-15% 0px". Defaults to the original "-10% 0px". */
  margin?: UseInViewOptions["margin"];
}

/** Counts up from 0 to value when scrolled into view. */
export function AnimatedCounter({
  value,
  className,
  style,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  margin = "-10% 0px",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: reducedMotion ? 0 : duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [isInView, reducedMotion, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
