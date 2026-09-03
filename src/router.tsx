import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PricingPage } from "./pages/PricingPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ServicesPage } from "./pages/ServicesPage";
import { TermsPage } from "./pages/TermsPage";
import { WorkIndex } from "./pages/WorkIndex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "work", element: <WorkIndex /> },
      { path: "work/:slug", element: <ProjectDetail /> },
      { path: "process", element: <ProcessPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <PrivacyPolicyPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
