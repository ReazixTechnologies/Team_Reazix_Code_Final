import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Spotlight } from "@/components/fx/Spotlight";
import { Container } from "@/components/ui/Container";
import { MANIFESTO_FOOTER_LINE, MANIFESTO_STATEMENT_WORDS } from "@/content/manifesto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const WORD_COUNT = MANIFESTO_STATEMENT_WORDS.length;

const HIGHLIGHT_GRADIENT_STYLE = {
  backgroundImage: "linear-gradient(90deg, var(--color-ember), var(--color-amber), var(--color-blush))",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
} as const;

interface IlluminatedWordProps {
  text: string;
  highlight: boolean;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

function IlluminatedWord({ text, highlight, index, scrollYProgress, reducedMotion }: IlluminatedWordProps) {
  const start = index / WORD_COUNT;
  const end = start + 1 / WORD_COUNT;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  if (reducedMotion) {
    return (
      <span className={cn("inline-block", !highlight && "text-text")} style={highlight ? HIGHLIGHT_GRADIENT_STYLE : undefined}>
        {text}
      </span>
    );
  }

  return (
    <span className="relative inline-block">
      <span className="text-text/[0.12]">{text}</span>
      <motion.span
        aria-hidden="true"
        className={cn("absolute inset-0", !highlight && "text-text")}
        style={highlight ? { ...HIGHLIGHT_GRADIENT_STYLE, opacity } : { opacity }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/** The emotional core: a scroll-lit, word-by-word statement held sticky-centered. */
export function ManifestoStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  // "start 1.075" trims ~35% off the residual blank beat after the ticker exits (was "start 1"),
  // while staying above the section's raw sticky-visibility point so it can't reintroduce overlap.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 1.075", "end 0.4"] });

  const spotlightScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.1]);
  const footerOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative mt-[calc(100vh+11rem)] min-h-[120vh]">
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ scale: spotlightScale }}
        >
          <Spotlight color="var(--color-ember)" size={900} blur={200} className="relative opacity-[0.12]" />
        </motion.div>
      )}

      <div className="sticky top-1/2 -translate-y-1/2">
        <Container className="flex flex-col items-center gap-10 text-center">
          <p className="max-w-[1000px] text-h2 font-display font-light text-text">
            {MANIFESTO_STATEMENT_WORDS.map((word, index) => (
              <span key={index}>
                <IlluminatedWord
                  text={word.text}
                  highlight={word.highlight}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={reducedMotion}
                />
                {index < WORD_COUNT - 1 ? " " : null}
              </span>
            ))}
          </p>

          {reducedMotion ? (
            <p className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
              {MANIFESTO_FOOTER_LINE}
            </p>
          ) : (
            <motion.p
              className="font-mono text-label uppercase tracking-[0.22em] text-text-faint"
              style={{ opacity: footerOpacity }}
            >
              {MANIFESTO_FOOTER_LINE}
            </motion.p>
          )}
        </Container>
      </div>
    </section>
  );
}
