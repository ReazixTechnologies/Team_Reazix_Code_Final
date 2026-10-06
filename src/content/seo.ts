// Single source of truth for SEO. Used by <Seo /> at runtime and by the
// build step in vite.config.ts (per-route HTML + sitemap.xml), so keep the
// imports here relative — the "@/" alias is not available in vite.config.ts.
import { PROJECTS } from "./projects";
import { siteConfig } from "./site";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

export const DEFAULT_OG_IMAGE = `${siteConfig.url}/og-image.png`;

const page = (path: string, name: string, description: string): RouteMeta => ({
  path,
  title: `${name} | ${siteConfig.name}`,
  description,
});

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    title: `${siteConfig.name} | Web, AI & Digital Solutions`,
    description:
      "Reazix Technology builds modern web applications, AI & ML solutions, mobile applications, and scalable digital solutions for businesses.",
  },
  page(
    "/about",
    "About",
    "Reazix Technology is a digital product studio in India — strategy, design, engineering and AI under one roof for founders and growing businesses.",
  ),
  page(
    "/services",
    "Services",
    "Services from Reazix Technology: web development, UI/UX design, mobile apps, AI development, custom software, e-commerce, SEO & growth, and 3D.",
  ),
  page(
    "/work",
    "Our Work",
    "Projects designed and built by Reazix Technology — e-commerce platforms and product websites for brands such as Darshan Masale and DERO.",
  ),
  page(
    "/process",
    "Our Process",
    "How Reazix Technology works: discovery, definition, design, build, launch and evolve — a clear process adapted to your business.",
  ),
  page(
    "/pricing",
    "Pricing",
    "Fixed-scope, fixed-price engagement models from Reazix Technology — no hourly invoices, no open-ended quotes.",
  ),
  page(
    "/contact",
    "Contact",
    "Contact Reazix Technology to start your web, mobile or AI project. Call +91 82755 29298 or email contact@reazix.com.",
  ),
  page(
    "/privacy",
    "Privacy Policy",
    "How Reazix Technology collects, uses and protects the information you share with us.",
  ),
  page(
    "/terms",
    "Terms & Conditions",
    "The terms that govern use of this website and engagements with Reazix Technology.",
  ),
  ...PROJECTS.map((project) => page(`/work/${project.slug}`, project.title, project.summary)),
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_META.find((route) => route.path === path);
}

export function canonicalUrl(path: string): string {
  return path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Static <head> tags for one route. Each tag carries data-rh so
 * react-helmet-async adopts it on load instead of adding a duplicate.
 */
export function renderHeadTags(meta: RouteMeta): string {
  const url = canonicalUrl(meta.path);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return [
    `<title>${title}</title>`,
    `<meta data-rh="true" name="description" content="${description}" />`,
    `<link data-rh="true" rel="canonical" href="${url}" />`,
    `<meta data-rh="true" property="og:title" content="${title}" />`,
    `<meta data-rh="true" property="og:description" content="${description}" />`,
    `<meta data-rh="true" property="og:url" content="${url}" />`,
    `<meta data-rh="true" property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta data-rh="true" name="twitter:title" content="${title}" />`,
    `<meta data-rh="true" name="twitter:description" content="${description}" />`,
    `<meta data-rh="true" name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  ].join("\n    ");
}
