import { useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

interface RafMouse {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const LERP = 0.12;

/**
 * Normalized (-1..1) cursor position, rAF-throttled and lerped toward the raw
 * target — writes straight to motion values, never triggers React state/renders.
 * Pass `enabled: false` (reduced motion, touch) to skip attaching the listener.
 */
export function useRafMouse(enabled = true): RafMouse {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    function handleMouseMove(event: MouseEvent) {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    let rafId: number;
    function tick() {
      x.set(x.get() + (target.current.x - x.get()) * LERP);
      y.set(y.get() + (target.current.y - y.get()) * LERP);
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, x, y]);

  return { x, y };
}
