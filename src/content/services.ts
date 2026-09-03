import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "website-development",
    index: "01",
    title: "Premium Website Development",
    tagline: "Websites that carry the weight of your brand.",
    description:
      "High-end marketing sites, corporate platforms and web applications — fast, responsive, and engineered to make a first impression that closes deals.",
    capabilities: [
      "Marketing Websites",
      "Corporate Platforms",
      "Web Applications",
      "Headless CMS",
      "Performance Engineering",
      "Responsive Systems",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
    accent: "ember",
    outcome: "A site that makes you look like the category leader.",
  },
  {
    id: "ui-ux-design",
    index: "02",
    title: "UI/UX Design",
    tagline: "Design that removes friction and adds conviction.",
    description:
      "Product design, design systems, and interface work grounded in how people actually use software — not in what looks good in a portfolio shot.",
    capabilities: [
      "Product Design",
      "Website Design",
      "Mobile App Design",
      "Wireframes & Prototypes",
      "Design Systems",
      "UX Optimisation",
    ],
    stack: ["Figma", "Framer", "Design Tokens", "Storybook"],
    accent: "blush",
    outcome: "Interfaces users understand without being taught.",
  },
  {
    id: "mobile-app-development",
    index: "03",
    title: "Mobile App Development",
    tagline: "Production-grade apps, not prototypes.",
    description:
      "iOS, Android and cross-platform products built to ship, scale, and survive the App Store review — including startup MVPs with a real path to v2.",
    capabilities: [
      "iOS Applications",
      "Android Applications",
      "Cross-Platform Builds",
      "Startup MVPs",
      "App Store Delivery",
      "Offline-First Architecture",
    ],
    stack: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"],
    accent: "violet",
    outcome: "An app in your users' hands, not in a slide deck.",
  },
  {
    id: "ai-development",
    index: "04",
    title: "AI Development & Integration",
    tagline: "AI that does a job, not a demo.",
    description:
      "Chatbots, assistants, RAG systems and autonomous agents wired into the workflows that actually cost you time and money.",
    capabilities: [
      "AI Chatbots",
      "AI Assistants",
      "LLM Integration",
      "RAG Systems",
      "AI Agents",
      "Workflow Automation",
      "Custom AI Features",
    ],
    stack: ["OpenAI", "Anthropic", "LangChain", "Vector DBs", "Python", "Node"],
    accent: "mint",
    outcome: "Hours of manual work replaced by a system that runs itself.",
  },
  {
    id: "custom-software",
    index: "05",
    title: "Custom Software Development",
    tagline: "For businesses that outgrew off-the-shelf.",
    description:
      "CRMs, ERPs, SaaS platforms, internal tools and the APIs behind them — built around how your business actually operates.",
    capabilities: [
      "CRM Systems",
      "ERP Systems",
      "SaaS Platforms",
      "Internal Tools",
      "Custom Dashboards",
      "APIs & Backends",
    ],
    stack: ["Node", "Postgres", "Prisma", "AWS", "Docker", "GraphQL"],
    accent: "amber",
    outcome: "Software shaped to your process instead of the reverse.",
  },
  {
    id: "ecommerce",
    index: "06",
    title: "E-commerce Development",
    tagline: "Storefronts engineered to convert.",
    description:
      "Shopify builds, headless commerce, and bespoke checkout experiences where every millisecond and every click is accounted for.",
    capabilities: [
      "Shopify Development",
      "Headless Commerce",
      "Custom Storefronts",
      "Checkout Optimisation",
      "Payment Integration",
      "Conversion Engineering",
    ],
    stack: ["Shopify", "Hydrogen", "Stripe", "Medusa", "Next.js"],
    accent: "ember",
    outcome: "More revenue from the traffic you already have.",
  },
  {
    id: "seo-digital-marketing",
    index: "07",
    title: "SEO & Digital Marketing",
    tagline: "Growth that compounds instead of renting attention.",
    description:
      "Technical SEO, content strategy, paid acquisition and lifecycle marketing, measured against pipeline — not impressions.",
    capabilities: [
      "Technical SEO",
      "Content Strategy",
      "Search Optimisation",
      "Paid Advertising",
      "Email & Lifecycle",
      "Analytics & Growth",
    ],
    stack: ["GA4", "GSC", "Ahrefs", "Klaviyo", "Meta & Google Ads"],
    accent: "blush",
    outcome: "Qualified demand arriving without you paying for every click.",
  },
  {
    id: "3d-interactive",
    index: "08",
    title: "3D & Interactive Experiences",
    tagline: "The reason people remember your site.",
    description:
      "WebGL scenes, 3D product experiences and motion design that make a brand feel expensive within three seconds of landing.",
    capabilities: [
      "Three.js / WebGL",
      "3D Websites",
      "Interactive Animation",
      "Motion Design",
      "Scroll Experiences",
      "Shader Work",
    ],
    stack: ["Three.js", "React Three Fiber", "GSAP", "Blender", "GLSL"],
    accent: "violet",
    outcome: "A site people screenshot and send to a colleague.",
  },
];

export const SERVICES_INTRO_EYEBROW = "What we do";

export const SERVICES_INTRO_HEADING_LINES = ["Eight disciplines.", "One accountable partner."];

export const SERVICES_INTRO_DESCRIPTION =
  "Most companies stitch together an agency, a designer, a developer and a growth consultant — then spend their time translating between them. We hold the whole product: strategy, design, engineering, AI and growth, under one roof and one point of contact.";

export const SERVICES_INTRO_RANGE_LABEL = "01 — 08";

export const SERVICE_CARD_DISCUSS_LABEL = "Discuss this →";

export const SERVICES_OUTRO_HEADING = "Not sure which of these you need?";

export const SERVICES_OUTRO_DESCRIPTION =
  "Most engagements start with two or three and grow from there. A 30-minute call is usually enough to scope it.";

export const SERVICES_OUTRO_CTA_LABEL = "Book a scoping call";
