import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import {
  PROCESS_LOOP_DESCRIPTION,
  PROCESS_LOOP_HEADING,
  PROCESS_LOOP_MARK_BOTTOM,
  PROCESS_LOOP_MARK_TOP,
} from "@/content/process";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

const SIZE = 180;
const RADIUS = 78;

/** Closes the section: the process is a loop, not a line. */
export function ProcessLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const drawn = reducedMotion || isInView;

  return (
    <div ref={ref}>
      <Container className="flex flex-col items-center gap-12 py-section text-center lg:flex-row lg:justify-center lg:gap-20 lg:text-left">
        <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
          <motion.svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            initial={false}
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={reducedMotion ? undefined : { duration: 30, ease: "linear", repeat: Infinity }}
          >
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--color-ember)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.4, ease: EASE }}
            />
            <path
              d={`M${SIZE / 2 - 5} 8 L${SIZE / 2} 0 L${SIZE / 2 + 5} 8`}
              fill="none"
              stroke="var(--color-ember)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
              {PROCESS_LOOP_MARK_TOP}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint">
              {PROCESS_LOOP_MARK_BOTTOM}
            </span>
          </div>
        </div>

        <div className="flex max-w-md flex-col gap-4">
          <p className="font-display text-h3 font-light text-text">{PROCESS_LOOP_HEADING}</p>
          <p className="text-body text-text-muted">{PROCESS_LOOP_DESCRIPTION}</p>
        </div>
      </Container>
    </div>
  );
}
