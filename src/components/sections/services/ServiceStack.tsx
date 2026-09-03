import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ServiceCard } from "./ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STAGGER } from "@/lib/motion";
import type { Service } from "@/types";

const STACK_TOP_BASE = 88;
const STACK_TOP_STEP = 18;
const STACK_SPRING = { stiffness: 100, damping: 30 };

interface StackedServiceCardProps {
  service: Service;
  index: number;
}

/** One card in the stack: sticky-pinned, receding in scale/opacity/blur as the next card covers it. */
function StackedServiceCard({ service, index }: StackedServiceCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start 88px", "end start"] });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const blurRaw = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const scale = useSpring(scaleRaw, STACK_SPRING);
  const opacity = useSpring(opacityRaw, STACK_SPRING);
  const blur = useSpring(blurRaw, STACK_SPRING);
  const y = useSpring(yRaw, STACK_SPRING);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "85vh" }}>
      <motion.div
        className="sticky"
        style={{
          top: `calc(${STACK_TOP_BASE}px + ${index * STACK_TOP_STEP}px)`,
          zIndex: index + 1,
          scale,
          opacity,
          filter,
          y,
        }}
      >
        <ServiceCard service={service} />
      </motion.div>
    </div>
  );
}

/** The sticky stacking scroll: cards pile up like dealt cards on desktop, a plain list below 768px. */
export function ServiceStack() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (reducedMotion || isMobile) {
    return (
      <div className="flex flex-col gap-6">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id} delay={index * STAGGER.tight}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {SERVICES.map((service, index) => (
        <StackedServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
