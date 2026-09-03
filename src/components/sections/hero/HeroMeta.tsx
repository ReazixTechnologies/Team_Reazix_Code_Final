import { motion } from "motion/react";
import { useIstClock } from "@/hooks/useIstClock";
import { EASE } from "@/lib/motion";

interface HeroMetaProps {
  phase: "idle" | "engaged";
}

const META_BASE_DELAY = 1.4;

/** Bottom metadata rail: IST clock, hidden below 1024px. */
export function HeroMeta({ phase }: HeroMetaProps) {
  const engaged = phase === "engaged";
  const istTime = useIstClock();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 hidden items-end justify-end px-5 sm:px-10 lg:flex lg:px-16">
      <motion.div
        className="flex flex-col items-end gap-1 font-mono text-label uppercase tracking-[0.22em] text-text-faint"
        initial={false}
        animate={{ opacity: engaged ? 1 : 0 }}
        transition={{
          duration: 0.8,
          ease: EASE,
          delay: engaged ? META_BASE_DELAY : 0,
        }}
      >
        <span className="tabular-nums">{istTime ?? "--:--:--"}</span>
        <span>Pune, India</span>
      </motion.div>
    </div>
  );
}
