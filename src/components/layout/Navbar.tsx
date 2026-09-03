import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/content/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const START_PROJECT_HREF = "/contact";

function isHashLink(href: string) {
  return href.startsWith("#");
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const scrollDirection = useScrollDirection();

  useLockBodyScroll(isMenuOpen);

  function goToLink(event: { preventDefault: () => void }, href: string) {
    if (!isHashLink(href)) return;

    event.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    if (lenis.current) {
      lenis.current.scrollTo(target);
    } else {
      target.scrollIntoView({ block: "start" });
    }
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
        scrollDirection === "down" && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "border-b transition-colors duration-500",
          isMenuOpen ? "border-transparent bg-void" : "border-line/60 bg-void/70 backdrop-blur-md",
        )}
      >
        <Container className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            data-cursor="hover"
            aria-label={siteConfig.name}
            className="flex items-center"
          >
            <img src={logo} alt={siteConfig.name} className="h-6 w-auto sm:h-8 lg:h-[70px]" />
          </Link>

          <ul className="hidden items-center gap-12 lg:flex">
            {navLinks.map((link) =>
              isHashLink(link.href) ? (
                <li key={link.label}>
                  <a
                    href={location.pathname !== "/" ? `/${link.href}` : link.href}
                    onClick={(event) => goToLink(event, link.href)}
                    data-cursor="hover"
                    className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-text lg:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    data-cursor="hover"
                    className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-text lg:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="hidden lg:block">
            <Magnetic strength={0.35}>
              <Link
                to={START_PROJECT_HREF}
                data-cursor="hover"
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                Start a Project <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            data-cursor="hover"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={cn(
                "h-px w-6 bg-text transition-transform duration-300",
                isMenuOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-text transition-transform duration-300",
                isMenuOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </Container>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: EASE }}
            className="border-b border-line bg-void lg:hidden"
          >
            <Container className="flex flex-col gap-8 py-10">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) =>
                  isHashLink(link.href) ? (
                    <li key={link.label}>
                      <a
                        href={location.pathname !== "/" ? `/${link.href}` : link.href}
                        onClick={(event) => goToLink(event, link.href)}
                        data-cursor="hover"
                        className="font-display text-h3 font-light text-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        data-cursor="hover"
                        className="font-display text-h3 font-light text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>

              <Link
                to={START_PROJECT_HREF}
                onClick={() => setIsMenuOpen(false)}
                data-cursor="hover"
                className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
              >
                Start a Project <span aria-hidden="true">→</span>
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
