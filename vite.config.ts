import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { canonicalUrl, getRouteMeta, renderHeadTags, ROUTE_META } from "./src/content/seo";

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const withSeo = (html: string, routePath: string) =>
  html.replace(SEO_BLOCK, `<!--seo:start-->\n    ${renderHeadTags(getRouteMeta(routePath)!)}\n    <!--seo:end-->`);

/**
 * Gives every route its own HTML file with the right <title>, description and
 * canonical already in it (dist/about.html, dist/work/dero-world.html, …), and
 * writes sitemap.xml from the same route list. Cloudflare serves about.html at
 * /about, so crawlers get correct tags without running JavaScript.
 */
function seoPages(): Plugin {
  let outDir = "dist";
  return {
    name: "seo-pages",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: (html) => withSeo(html, "/"),
    closeBundle() {
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const template = fs.readFileSync(indexFile, "utf8");

      for (const route of ROUTE_META) {
        if (route.path === "/") continue;
        const file = path.join(outDir, `${route.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, withSeo(template, route.path));
      }

      const today = new Date().toISOString().slice(0, 10);
      const urls = ROUTE_META.map(
        (route) => `  <url>\n    <loc>${canonicalUrl(route.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
      ).join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
