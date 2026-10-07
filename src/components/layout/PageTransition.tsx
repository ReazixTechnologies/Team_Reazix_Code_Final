import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

/**
 * Holds on to the route element it was first rendered with.
 *
 * A plain <Outlet /> always renders the CURRENT route, so during the exit
 * animation the old page was instantly replaced by the new page's content:
 * the new page flashed, faded out, then mounted a second time and faded in.
 * That double mount also left scroll-linked and "wait for the visitor"
 * animations (the homepage hero) in a broken state. Freezing the outlet per
 * pathname makes the old page fade out as itself, and the new page mount once.
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

/** Fades/lifts route content on navigation — keyed on pathname so AnimatePresence detects the change. */
export function PageTransition() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const lenisRef = useLenis();

  if (reducedMotion) {
    return <FrozenOutlet key={location.pathname} />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: EASE }}
        onAnimationComplete={() => {
          // The new page has a different height: let Lenis re-measure, then nudge
          // scroll-linked animations so they recompute against the new layout.
          lenisRef.current?.resize();
          window.dispatchEvent(new Event("scroll"));
        }}
      >
        <FrozenOutlet />
      </motion.div>
    </AnimatePresence>
  );
}