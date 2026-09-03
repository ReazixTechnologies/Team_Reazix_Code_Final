import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The ambient cursor-follow light: a heavy-lag glow blob, a fast-follow ring,
 * and a zero-lag dot. Disabled on touch devices and under reduced motion.
 */
export function CursorGlow() {
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [textLabel, setTextLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const glowX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 1 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 1 });

  const ringX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.5 });

  const disabled = isCoarsePointer || reducedMotion;

  useEffect(() => {
    if (disabled) return;

    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const textTarget = target?.closest("[data-cursor-text]");
      const hoverTarget = target?.closest('[data-cursor="hover"]');

      setTextLabel(textTarget?.getAttribute("data-cursor-text") ?? null);
      setHovering(Boolean(hoverTarget));
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, mouseX, mouseY]);

  if (disabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, var(--color-ember) 0%, var(--color-blush) 55%, transparent 75%)",
          filter: "blur(100px)",
          opacity: 0.18,
          mixBlendMode: "screen",
        }}
      />

      <motion.div
        className="absolute flex items-center justify-center overflow-hidden rounded-full border border-ember"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          boxShadow: "0 0 12px rgba(255, 107, 53, 0.35)",
        }}
        animate={{
          width: textLabel ? 64 : 28,
          height: textLabel ? 64 : 28,
          scale: hovering && !textLabel ? 2.5 : 1,
          borderColor: hovering && !textLabel ? "rgba(255, 107, 53, 0.2)" : "rgba(255, 107, 53, 1)",
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <AnimatePresence>
          {textLabel ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-text"
            >
              {textLabel}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute h-1 w-1 rounded-full bg-ember"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}
