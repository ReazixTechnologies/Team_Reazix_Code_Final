// Renders public/og-image.png (1200x630) with Puppeteer's bundled Chromium so social
// previews get a real branded image instead of the platform default. Re-run this
// manually whenever the wordmark/tagline copy changes — it is not wired into the
// build because it needs a headless browser, which most CI/deploy environments for
// a static site won't have preinstalled.
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.resolve(__dirname, "../public/og-image.png");

const SITE_NAME = "Reazix";
const TAGLINE = "Premium digital products, designed and engineered to close deals.";

const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: 1200px;
        height: 630px;
        background: #07070a;
        background-image: radial-gradient(circle at 15% 15%, rgba(255, 107, 53, 0.16), transparent 45%),
          radial-gradient(circle at 85% 85%, rgba(124, 107, 255, 0.12), transparent 45%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 28px;
        padding: 0 96px;
      }
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 999px;
        background: #ff6b35;
      }
      .wordmark {
        font-size: 128px;
        font-weight: 600;
        letter-spacing: -0.03em;
        color: #f4f3f1;
      }
      .tagline {
        font-size: 34px;
        font-weight: 400;
        color: #8a8a94;
        max-width: 920px;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="dot"></div>
      <div class="wordmark">${SITE_NAME}</div>
      <div class="tagline">${TAGLINE}</div>
    </div>
  </body>
</html>
`;

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.screenshot({ path: OUTPUT_PATH });
await browser.close();

console.log(`OG image written to ${OUTPUT_PATH}`);
