import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { GrainOverlay } from "@/components/fx/GrainOverlay";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll, useLenis } from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/content/site";

/** How long to keep polling for a hash target before giving up — covers PageTransition's exit animation. */
const HASH_TARGET_TIMEOUT_MS = 800;

/**
 * Resets scroll on every route change — Lenis-aware, falls back to native scroll when Lenis
 * is disabled. A `#hash` in the URL (cross-page nav-link clicks land here first) scrolls to
 * that element instead of the top, once it exists in the newly-rendered page. PageTransition
 * delays mounting the new route until the old one finishes exiting, so the target may not be
 * in the DOM yet on the first check — poll for it instead of giving up immediately.
 */
function ScrollToTopOnNavigate() {
  const location = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    let cancelled = false;
    let frame: number;

    function scrollToTop() {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    if (!location.hash) {
      scrollToTop();
      return;
    }

    const deadline = Date.now() + HASH_TARGET_TIMEOUT_MS;

    const tryScroll = () => {
      if (cancelled) return;

      const target = document.querySelector(location.hash);
      if (target instanceof HTMLElement) {
        if (lenisRef.current) {
          // Lenis caches the scrollable height and only recomputes it lazily; force a
          // recompute against the newly-mounted route before jumping, or scrollTo can
          // clamp to the previous page's (stale, shorter) height.
          lenisRef.current.resize();
          lenisRef.current.scrollTo(target, { immediate: true });
          // An instant jump (vs. a gradual scroll) never fires a native scroll event on
          // its own, so scroll-linked transforms (e.g. the stacked service cards' fade-in)
          // stay stuck at their pre-jump value until something nudges them awake.
          window.dispatchEvent(new Event("scroll"));
        } else {
          target.scrollIntoView({ block: "start" });
        }
        return;
      }

      if (Date.now() < deadline) {
        frame = requestAnimationFrame(tryScroll);
      } else {
        scrollToTop();
      }
    };

    tryScroll();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash, lenisRef]);

  return null;
}

export function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{`${siteConfig.name} — ${siteConfig.tagline}`}</title>
        <meta name="description" content={siteConfig.tagline} />
      </Helmet>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:text-void"
      >
        Skip to content
      </a>
      <SmoothScroll>
        <ScrollToTopOnNavigate />
        <CursorGlow />
        <GrainOverlay />
        <Navbar />
        <main id="main-content">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
