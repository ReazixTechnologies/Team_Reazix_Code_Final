import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CREDIBILITY_EYEBROW, CREDIBILITY_HEADING, CREDIBILITY_ITEMS, CREDIBILITY_NOTE } from "@/content/testimonials";
import { EASE, STAGGER } from "@/lib/motion";

const ICON_PROPS = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", "aria-hidden": true } as const;
const PATH_PROPS = { stroke: "var(--color-ember)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function drawTransition(delay: number) {
  return { duration: 0.6, ease: EASE, delay };
}

/** A checked box — "fixed scope, fixed price" is a commitment you sign off on. */
function ScopeIcon({ delay }: { delay: number }) {
  return (
    <svg {...ICON_PROPS}>
      <motion.rect
        x="4"
        y="4"
        width="20"
        height="20"
        rx="4"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay)}
      />
      <motion.path
        d="M9 14.5L12.5 18L19.5 10"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay + 0.15)}
      />
    </svg>
  );
}

/** An open window — "staging access from week one", nothing behind a wall. */
function StagingIcon({ delay }: { delay: number }) {
  return (
    <svg {...ICON_PROPS}>
      <motion.rect
        x="4"
        y="6"
        width="20"
        height="16"
        rx="3"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay)}
      />
      <motion.path
        d="M4 11H24"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay + 0.15)}
      />
      <motion.circle
        cx="8"
        cy="8.5"
        r="0.75"
        fill="var(--color-ember)"
        stroke="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ ...drawTransition(delay + 0.3), duration: 0.3 }}
      />
    </svg>
  );
}

/** A key — "code and accounts are yours", handed over rather than held. */
function OwnershipIcon({ delay }: { delay: number }) {
  return (
    <svg {...ICON_PROPS}>
      <motion.circle
        cx="9.5"
        cy="9.5"
        r="5.5"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay)}
      />
      <motion.path
        d="M13.5 13.5L23 23M19 19L23 19M21 21L24 24"
        {...PATH_PROPS}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={drawTransition(delay + 0.15)}
      />
    </svg>
  );
}

const ICONS: ((props: { delay: number }) => ReactNode)[] = [ScopeIcon, StagingIcon, OwnershipIcon];

/** The honest, testimonial-free alternative: verifiable commitments instead of praise. Shown while src/content/testimonials.ts ships empty. */
export function CredibilityBlock() {
  return (
    <section id="testimonials" aria-labelledby="credibility-heading" className="relative bg-void">
      <Container className="flex flex-col gap-16 py-section">
        <div className="flex flex-col gap-5">
          <Eyebrow>{CREDIBILITY_EYEBROW}</Eyebrow>
          <h2 id="credibility-heading" className="font-display text-h2 font-light text-text">
            {CREDIBILITY_HEADING}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {CREDIBILITY_ITEMS.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={item.title} delay={index * STAGGER.base} className="flex flex-col gap-4">
                <Icon delay={index * STAGGER.base} />
                <h3 className="font-display text-h3 font-light text-text">{item.title}</h3>
                <p className="text-body text-text-muted">{item.description}</p>
              </Reveal>
            );
          })}
        </div>

        <p className="max-w-[640px] text-body text-text-muted">{CREDIBILITY_NOTE}</p>
      </Container>
    </section>
  );
}
