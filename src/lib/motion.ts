import type { Transition, Variants } from "motion/react";

/** Primary "expo out" ease — used for nearly everything that enters the screen. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Symmetric ease for looping / back-and-forth motion. */
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  xslow: 1.8,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

export const transitionBase: Transition = {
  duration: DUR.base,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE },
  },
};

export const maskReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE },
  },
};
