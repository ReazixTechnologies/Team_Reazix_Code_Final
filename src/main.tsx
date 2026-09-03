import "./index.css";

// Self-hosted fonts (replaces next/font/google). Weight files chosen to match
// the weights the site actually uses: Sora 300/400/600, Inter 400/500,
// JetBrains Mono 400/500. The two variable fonts cover their full weight
// range from a single file; JetBrains Mono ships per-weight static files.
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
