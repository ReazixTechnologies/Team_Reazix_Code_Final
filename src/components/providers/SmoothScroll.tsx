import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Exposes a ref to the active Lenis instance so later modules can call
 * `lenisRef.current?.scrollTo(...)` from a nav link's click handler.
 */
export function useLenis(): RefObject<Lenis | null> {
  const ref = useContext(LenisContext);
  if (!ref) {
    throw new Error("useLenis must be used within <SmoothScroll>");
  }
  return ref;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.2,
      // exponential ease-out
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      // syncTouch intentionally left unset so touch scrolling stays native/un-smoothed
    });

    lenisRef.current = instance;

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
