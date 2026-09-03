import { motion, useInView } from "motion/react";
import { useMemo, useRef } from "react";
import { maskReveal, staggerParent, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MotionTagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type SplitTextTag = keyof typeof MotionTagMap;

interface SplitTextProps {
  text: string;
  as?: SplitTextTag;
  splitBy?: "words" | "chars";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/** Splits text into words/chars and reveals them with a staggered mask animation. */
export function SplitText({
  text,
  as = "div",
  splitBy = "words",
  className,
  delay = 0,
  stagger = STAGGER.base,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();

  const parts = useMemo(
    () => (splitBy === "chars" ? Array.from(text) : text.split(" ")),
    [text, splitBy],
  );

  const MotionTag = MotionTagMap[as];

  if (reducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerParent}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      <span ref={ref} aria-hidden="true">
        {parts.map((part, index) => (
          <span
            key={index}
            style={{ display: "inline-block", overflow: "hidden" }}
            className={splitBy === "words" ? "mr-[0.25em]" : undefined}
          >
            <motion.span style={{ display: "inline-block" }} variants={maskReveal}>
              {part}
            </motion.span>
          </span>
        ))}
      </span>
    </MotionTag>
  );
}
