import { useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";

interface ActiveIndexResult {
  /** The current discrete segment (0..count-1). React state — updates only when the integer segment changes. */
  index: number;
  /** 0..1 progress within the active segment, as a derived motion value (no re-renders). */
  indexProgress: MotionValue<number>;
}

/**
 * Maps a 0..1 scroll-progress motion value across `count` equal segments to a
 * discrete active index. Listens via `useMotionValueEvent` and only calls
 * `setState` when the floored segment actually changes, so a 700vh scroll
 * region re-renders at most `count` times instead of every frame.
 */
export function useActiveIndex(progress: MotionValue<number>, count: number): ActiveIndexResult {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    if (next !== indexRef.current) {
      indexRef.current = next;
      setIndex(next);
    }
  });

  const indexProgress = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);

  return { index, indexProgress };
}
