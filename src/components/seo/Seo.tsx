import { Helmet } from "react-helmet-async";
import { canonicalUrl, DEFAULT_OG_IMAGE, getRouteMeta } from "@/content/seo";
import { siteConfig } from "@/content/site";

interface SeoProps {
  /** Route path as listed in src/content/seo.ts, e.g. "/about". */
  path?: string;
  /** Overrides, for pages not listed in ROUTE_META. */
  title?: string;
  description?: string;
  /** Keep this page out of search results (404 etc.). */
  noindex?: boolean;
}

/** Per-page title, description, canonical and social tags. */
export function Seo({ path, title, description, noindex = false }: SeoProps) {
  const meta = path ? getRouteMeta(path) : undefined;
  const pageTitle = title ?? meta?.title ?? siteConfig.name;
  const pageDescription = description ?? meta?.description ?? "";
  const url = path && !noindex ? canonicalUrl(path) : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex ? <meta name="robots" content="noindex" /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
