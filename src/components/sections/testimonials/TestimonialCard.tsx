import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { TESTIMONIALS_PROJECT_LINK_LABEL } from "@/content/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isHovered: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

/** One quote: a large quotation glyph, the quote itself, then the attribution — lifts and lights on hover, siblings dim. */
export function TestimonialCard({ testimonial, isHovered, isDimmed, onActivate, onDeactivate }: TestimonialCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      aria-labelledby={`testimonial-${testimonial.id}-author`}
      data-cursor="hover"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      animate={{
        y: !reducedMotion && isHovered ? -6 : 0,
        opacity: isDimmed ? 0.65 : 1,
      }}
      transition={
        reducedMotion ? { duration: 0 } : { y: { type: "spring", stiffness: 200, damping: 25 }, opacity: { duration: 0.3 } }
      }
      className={cn(
        "flex w-[min(460px,85vw)] shrink-0 flex-col gap-6 rounded-lg border bg-surface p-8 transition-colors duration-300",
        isHovered ? "border-ember/35" : "border-line",
      )}
    >
      <span aria-hidden="true" className="font-display text-display leading-none text-text/[0.08]">
        &ldquo;
      </span>

      <p className="font-display text-h3 font-light text-text">{testimonial.quote}</p>

      <div aria-hidden="true" className="h-px w-full bg-line" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 font-mono text-label uppercase tracking-[0.22em]">
          <span id={`testimonial-${testimonial.id}-author`} className="text-text">
            {testimonial.author}
          </span>
          <span className="text-text-faint">
            {testimonial.role} &middot; {testimonial.company}
          </span>
        </div>

        {testimonial.projectSlug ? (
          <Link
            to={`/work/${testimonial.projectSlug}`}
            data-cursor="hover"
            className="inline-flex w-fit items-center gap-2 font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text"
          >
            {TESTIMONIALS_PROJECT_LINK_LABEL} &rarr;
          </Link>
        ) : null}
      </div>
    </motion.article>
  );
}
