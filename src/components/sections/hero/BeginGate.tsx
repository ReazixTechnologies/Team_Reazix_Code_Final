import { motion } from "motion/react";
import { EASE_IN_OUT } from "@/lib/motion";

interface BeginGateProps {
  phase: "idle" | "engaged";
  reducedMotion: boolean;
}

/** The pre-interaction ring + "Move to begin" prompt. Skipped entirely under reduced motion. */
export function BeginGate({ phase, reducedMotion }: BeginGateProps) {
  if (reducedMotion) return null;

  const engaged = phase === "engaged";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-7 w-7 items-center justify-center">
          <motion.span
            className="absolute h-11 w-11 rounded-full border border-ember"
            animate={engaged ? { scale: 1.6, opacity: 0 } : { scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={
              engaged
                ? { duration: 0.4, ease: "easeOut" }
                : { duration: 2.6, repeat: Infinity, ease: "easeOut" }
            }
          />
          <motion.span
            className="absolute h-7 w-7 rounded-full border border-ember"
            style={{ boxShadow: "0 0 24px rgba(255, 107, 53, 0.45)" }}
            animate={engaged ? { scale: 18, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_IN_OUT }}
          />
          <span className="h-1 w-1 rounded-full bg-ember" />
        </div>

        <motion.p
          className="mt-[90px] font-mono text-label uppercase tracking-[0.35em] text-text-faint"
          animate={
            engaged
              ? { opacity: 0, y: -20, filter: "blur(6px)" }
              : { opacity: [0.4, 0.85, 0.4], y: 0, filter: "blur(0px)" }
          }
          transition={
            engaged
              ? { duration: 0.5, ease: EASE_IN_OUT }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Move to begin
        </motion.p>
      </div>
    </div>
  );
}
