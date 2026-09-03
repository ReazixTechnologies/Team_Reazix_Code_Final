import { useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

interface CardCursor {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Cursor position local to `ref`'s element (in px from its top-left), written
 * straight to motion values — never triggers React state/renders — and
 * coalesced through a single rAF per frame so rapid mousemove events don't
 * each force a commit.
 */
export function useCardCursor(ref: RefObject<HTMLElement | null>): CardCursor {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handleMouseMove(event: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      target.current.x = event.clientX - rect.left;
      target.current.y = event.clientY - rect.top;

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          x.set(target.current.x);
          y.set(target.current.y);
          rafId.current = null;
        });
      }
    }

    node.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [ref, x, y]);

  return { x, y };
}
