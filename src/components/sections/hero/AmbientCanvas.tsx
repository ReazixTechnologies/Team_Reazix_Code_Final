import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { useRafMouse } from "@/hooks/useRafMouse";
import { EASE_IN_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroPhase = "idle" | "engaged";

interface BlobSpec {
  id: string;
  color: string;
  size: string;
  top: string;
  left: string;
  /** Cursor-parallax depth in px; sign flips direction. */
  depth: number;
  /** Base opacity of this blob within the field (mint stays subtle). */
  opacity: number;
  /** Idle-drift travel as a % of the blob's own box. */
  driftRange: number;
  driftDuration: number;
  driftDelay: number;
}

const BLOBS: BlobSpec[] = [
  {
    id: "ember",
    color: "var(--color-ember)",
    size: "55vw",
    top: "-15vw",
    left: "-8vw",
    depth: 40,
    opacity: 1,
    driftRange: 6,
    driftDuration: 22,
    driftDelay: 0,
  },
  {
    id: "amber",
    color: "var(--color-amber)",
    size: "45vw",
    top: "0vw",
    left: "55vw",
    depth: -60,
    opacity: 1,
    driftRange: 8,
    driftDuration: 26,
    driftDelay: 3,
  },
  {
    id: "blush",
    color: "var(--color-blush)",
    size: "50vw",
    top: "45vw",
    left: "42vw",
    depth: 80,
    opacity: 1,
    driftRange: 5,
    driftDuration: 24,
    driftDelay: 6,
  },
  {
    id: "mint",
    color: "var(--color-mint)",
    size: "30vw",
    top: "55vw",
    left: "-8vw",
    depth: -30,
    opacity: 0.35,
    driftRange: 7,
    driftDuration: 18,
    driftDelay: 2,
  },
];

interface BlobProps {
  spec: BlobSpec;
  phase: HeroPhase;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
  settled: boolean;
}

function Blob({ spec, phase, mouseX, mouseY, reducedMotion, settled }: BlobProps) {
  const parallaxX = useTransform(mouseX, [-1, 1], [-spec.depth, spec.depth]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-spec.depth, spec.depth]);
  const springX = useSpring(parallaxX, { stiffness: 30, damping: 25, mass: 1.2 });
  const springY = useSpring(parallaxY, { stiffness: 30, damping: 25, mass: 1.2 });

  const driftAnimate = reducedMotion
    ? { x: "0%", y: "0%" }
    : {
        x: ["0%", `${spec.driftRange}%`, `${-spec.driftRange * 0.6}%`, "0%"],
        y: ["0%", `${-spec.driftRange * 0.7}%`, `${spec.driftRange * 0.5}%`, "0%"],
      };

  return (
    <motion.div
      className="absolute"
      style={{ width: spec.size, height: spec.size, top: spec.top, left: spec.left }}
      animate={driftAnimate}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: spec.driftDuration, delay: spec.driftDelay, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${spec.color} 0%, transparent 70%)`,
          filter: "blur(120px)",
          mixBlendMode: "screen",
          opacity: spec.opacity,
          x: reducedMotion ? 0 : springX,
          y: reducedMotion ? 0 : springY,
          willChange: settled ? undefined : "transform",
        }}
        animate={{ scale: reducedMotion || phase === "engaged" ? 1 : 0.85 }}
        transition={{ duration: 1.2, ease: EASE_IN_OUT }}
      />
    </motion.div>
  );
}

interface AmbientCanvasProps {
  phase: HeroPhase;
  reducedMotion: boolean;
  disableParallax: boolean;
  className?: string;
  style?: { scale?: MotionValue<number>; opacity?: MotionValue<number> };
}

/** The cursor-reactive ambient light field behind the hero — CSS transforms only, no canvas/WebGL. */
export function AmbientCanvas({ phase, reducedMotion, disableParallax, className, style }: AmbientCanvasProps) {
  const { x: mouseX, y: mouseY } = useRafMouse(!reducedMotion && !disableParallax);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (phase !== "engaged" || reducedMotion) return;
    const timeoutId = window.setTimeout(() => setSettled(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, [phase, reducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-void", className)}
      style={style}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: reducedMotion || phase === "engaged" ? 1 : 0.35 }}
        transition={{ duration: reducedMotion ? 0.4 : 1.2, ease: EASE_IN_OUT }}
      >
        {BLOBS.map((spec) => (
          <Blob
            key={spec.id}
            spec={spec}
            phase={phase}
            mouseX={mouseX}
            mouseY={mouseY}
            reducedMotion={reducedMotion}
            settled={settled}
          />
        ))}
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.75) 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-void))" }}
      />
    </motion.div>
  );
}
