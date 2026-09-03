import { type RefObject, useMemo } from "react";
import { useScroll, useSpring, type MotionValue } from "motion/react";

interface UseScrollProgressOptions {
  target?: RefObject<HTMLElement | null>;
  smooth?: boolean;
}

/** Wraps framer-motion's useScroll with an optional spring smoothing pass. */
export function useScrollProgress({
  target,
  smooth = true,
}: UseScrollProgressOptions = {}): MotionValue<number> {
  const { scrollYProgress } = useScroll(
    target ? { target, offset: ["start end", "end start"] } : undefined,
  );

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return useMemo(() => (smooth ? smoothed : scrollYProgress), [smooth, smoothed, scrollYProgress]);
}
