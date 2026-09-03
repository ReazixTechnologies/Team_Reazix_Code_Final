import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { TESTIMONIALS_DRAG_CURSOR_LABEL, TESTIMONIALS_RAIL_ARIA_LABEL } from "@/content/testimonials";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import type { Testimonial } from "@/types";

const ARROW_KEY_STEP = 360;

interface TestimonialRailProps {
  testimonials: Testimonial[];
}

/** Horizontal rail: framer-motion drag on desktop, native scroll-snap on touch, a stacked list under reduced motion. */
export function TestimonialRail({ testimonials }: TestimonialRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || isCoarsePointer) return;

    function measure() {
      if (!containerRef.current || !trackRef.current) return;
      setMaxDrag(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reducedMotion, isCoarsePointer, testimonials]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const current = x.get();
    const next =
      event.key === "ArrowLeft" ? Math.min(0, current + ARROW_KEY_STEP) : Math.max(-maxDrag, current - ARROW_KEY_STEP);
    animate(x, next, { duration: 0.4, ease: EASE });
  }

  if (reducedMotion) {
    return (
      <div className="flex flex-col gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isHovered={false}
            isDimmed={false}
            onActivate={() => {}}
            onDeactivate={() => {}}
          />
        ))}
      </div>
    );
  }

  if (isCoarsePointer) {
    return (
      <div
        role="region"
        aria-label={TESTIMONIALS_RAIL_ARIA_LABEL}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-10 sm:px-10"
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="shrink-0 snap-start">
            <TestimonialCard testimonial={testimonial} isHovered={false} isDimmed={false} onActivate={() => {}} onDeactivate={() => {}} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="group"
      aria-label={TESTIMONIALS_RAIL_ARIA_LABEL}
      data-cursor="hover"
      data-cursor-text={TESTIMONIALS_DRAG_CURSOR_LABEL}
      onKeyDown={handleKeyDown}
      className="overflow-hidden rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
    >
      <motion.div
        ref={trackRef}
        className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isHovered={hoveredId === testimonial.id}
            isDimmed={hoveredId !== null && hoveredId !== testimonial.id}
            onActivate={() => setHoveredId(testimonial.id)}
            onDeactivate={() => setHoveredId(null)}
          />
        ))}
      </motion.div>
    </div>
  );
}
