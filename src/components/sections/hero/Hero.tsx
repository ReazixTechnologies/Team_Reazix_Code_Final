import { motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientCanvas } from "./AmbientCanvas";
import { BeginGate } from "./BeginGate";
import { HeroHeadline } from "./HeroHeadline";
import { HeroMeta } from "./HeroMeta";
import { Container } from "@/components/ui/Container";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroPhase = "idle" | "engaged";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<HeroPhase>("idle");
  const engagedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");

  const engage = useCallback(() => {
    if (engagedRef.current) return;
    engagedRef.current = true;
    setPhase("engaged");
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      engage();
      return;
    }

    let stopListening: (() => void) | undefined;

    function startListening() {
      if (engagedRef.current) return;

      window.addEventListener("mousemove", engage, { once: true });
      window.addEventListener("scroll", engage, { once: true, passive: true });
      window.addEventListener("touchstart", engage, { once: true, passive: true });
      const timeoutId = window.setTimeout(engage, 4000);

      stopListening = () => {
        window.removeEventListener("mousemove", engage);
        window.removeEventListener("scroll", engage);
        window.removeEventListener("touchstart", engage);
        window.clearTimeout(timeoutId);
      };
    }

    // Wait for the preloader to finish before arming the engage trigger. If no
    // Preloader is mounted (not built yet in this repo), start listening right away
    // instead of waiting forever on an event nobody will dispatch.
    if (document.querySelector("[data-preloader]")) {
      window.addEventListener("preloader:done", startListening, { once: true });
    } else {
      startListening();
    }

    return () => {
      window.removeEventListener("preloader:done", startListening);
      stopListening?.();
    };
  }, [reducedMotion, engage]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ambientScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-void"
    >
      <AmbientCanvas
        phase={phase}
        reducedMotion={reducedMotion}
        disableParallax={isCoarsePointer}
        style={{ scale: ambientScale, opacity: ambientOpacity }}
      />

      <BeginGate phase={phase} reducedMotion={reducedMotion} />

      <Container className="relative z-10 flex w-full justify-center py-32">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="w-full">
          <HeroHeadline phase={phase} reducedMotion={reducedMotion} />
        </motion.div>
      </Container>

      <motion.div style={{ opacity: metaOpacity }}>
        <HeroMeta phase={phase} />
      </motion.div>
    </section>
  );
}
