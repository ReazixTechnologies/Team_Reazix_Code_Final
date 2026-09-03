import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Container } from "@/components/ui/Container";
import { footerColumns, siteConfig, socialLinks } from "@/content/site";
import logo from "@/assets/logo.png";

function isHashLink(href: string) {
  return href.startsWith("#");
}

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  function handleHashClick(event: { preventDefault: () => void }, href: string) {
    event.preventDefault();

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
    <footer className="relative border-t border-line bg-void">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-section sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <Link to="/" aria-label={siteConfig.name} className="flex w-fit items-center">
            <img src={logo} alt={siteConfig.name} className="h-6 w-auto" />
          </Link>
          <p className="max-w-[280px] text-body text-text-muted">{siteConfig.tagline}</p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
              {column.title}
            </span>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) =>
                isHashLink(link.href) ? (
                  <li key={link.label}>
                    <a
                      href={location.pathname !== "/" ? `/${link.href}` : link.href}
                      onClick={(event) => handleHashClick(event, link.href)}
                      data-cursor="hover"
                      className="text-body text-text-muted transition-colors duration-300 hover:text-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : link.href.startsWith("http") || link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      data-cursor="hover"
                      className="text-body text-text-muted transition-colors duration-300 hover:text-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      data-cursor="hover"
                      className="text-body text-text-muted transition-colors duration-300 hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 sm:flex-row">
        <p className="font-mono text-label text-text-faint">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="font-mono text-label uppercase tracking-[0.18em] text-text-faint transition-colors duration-300 hover:text-text"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
