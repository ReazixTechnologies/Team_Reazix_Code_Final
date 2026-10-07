import type { Project, WorkFilter } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "darshan-masale",
    title: "Darshan Masale",
    client: "Darshan Masale — Premium Indian Spices",
    year: "2026",
    duration: "12 weeks",
    category: "E-Commerce Platform",
    filter: "Product",
    services: ["Product Strategy", "UI/UX Design", "Web Development", "E-Commerce Development"],
    summary:
      "A production-ready MERN e-commerce platform for a premium Indian spice manufacturer, enabling direct-to-consumer sales with secure payments and full order management.",
    challenge:
      "Darshan Masale, a premium spice manufacturer in Nandurbar, needed to transition from offline sales to a digital storefront. They required a platform that could handle product discovery, secure payments, order management, and customer communication — all while maintaining a premium brand experience.",
    approach:
      "We designed and built a full-stack MERN application with role-based access for customers, admins, and guests. The platform features product and category management, a persistent shopping cart, wishlist, coupon system, multi-address checkout, Cashfree payment integration, and automated email notifications via SMTP.",
    outcome:
      "A complete e-commerce ecosystem where customers can browse, discover, and purchase premium spices online with a seamless checkout experience. The admin dashboard provides full control over products, orders, customers, and marketing tools.",
    results: [
      { label: "Pages Built", value: 35, suffix: "+", note: "Full-featured e-commerce platform" },
      { label: "API Endpoints", value: 70, suffix: "+", note: "RESTful API architecture" },
      { label: "Database Collections", value: 10, suffix: "+", note: "User, Products, Orders, etc." },
      { label: "Admin Modules", value: 12, suffix: "+", note: "Full store management" },
    ],
    stack: [
      "React 19",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Tailwind CSS",
      "Cashfree Payments",
      "Cloudinary",
      "JWT Authentication",
      "Nodemailer",
    ],
    accent: "ember",
    cover: "/images/work/darshan-masale-coverrr.jpg",
    liveUrl: "https://darshanmasale.pages.dev/",
    gallery: ["/images/work/darshan-masale-cover.jpg"],
  },
  {
    slug: "dero-world",
    title: "DERO Water Purifier",
    client: "DERO — 12-Stage RO Water Purifiers",
    year: "2026",
    duration: "8 weeks",
    category: "E-Commerce Platform",
    filter: "Product",
    services: ["UI/UX Design", "Web Development", "E-Commerce Development"],
    summary:
      "A premium product website for DERO's 12-stage RO water purification system, built around product education, trust, and direct-to-consumer ordering.",
    challenge:
      "DERO needed to launch a new water purifier brand in India with a premium, trust-building digital presence. The site had to communicate a complex 12-stage purification process simply, address common buyer questions, and drive direct orders — all against established competitors.",
    approach:
      "We designed a clean product-first layout that leads with the 12-stage purification system, supports it with FAQs, customer reviews, and service guarantees, and makes ordering frictionless across desktop and mobile.",
    outcome:
      "A modern, premium landing experience that positions DERO as a serious contender in the Indian water purifier market and turns visitors into direct buyers.",
    results: [
      { label: "Sections Built", value: 12, suffix: "+", note: "Hero, features, FAQs, reviews, CTA" },
      { label: "Purification Stages", value: 12, suffix: "", note: "RO, UV, UF, Alkaline, Copper" },
      { label: "Reviews Featured", value: 5, suffix: "+", note: "Customer testimonials" },
      { label: "Warranty Years", value: 2, suffix: "", note: "Free installation included" },
    ],
    stack: ["React", "Tailwind CSS", "Vite", "Responsive Design", "SEO"],
    accent: "violet",
    cover: "/images/work/dero-world-cover.jpg",
    liveUrl: "https://deroworld.com/",
    gallery: [],
  },
  {
    slug: "laptop-shop-crm",
    title: "Laptop Shop CRM",
    client: "NEXA Computers — Laptop Sales & Service",
    year: "2026",
    duration: "In progress",
    category: "CRM",
    filter: "Product",
    status: "in-production",
    services: ["Product Strategy", "UI/UX Design", "Custom Software Development"],
    summary:
      "A CRM dashboard for a laptop sales and service shop, built to keep customers, sales and service work in one place. Currently under production.",
    challenge:
      "A laptop shop handles sales, repairs and follow-ups every day, and tracking them across notebooks and spreadsheets makes it easy to lose a customer or miss a job.",
    approach:
      "We are building a single web dashboard the shop team can open on any device, with the day-to-day records organised around the customer rather than around separate registers.",
    outcome:
      "This project is under production. The dashboard is being built and tested with the client, and this page will be updated with results once it is in daily use.",
    results: [],
    stack: ["Web Dashboard", "Responsive Design", "Vercel"],
    accent: "amber",
    cover: "/images/work/laptop-shop-crm-cover.jpg",
    liveUrl: "https://laptop-shop-crm.vercel.app",
    gallery: [],
  },
  {
    slug: "cherry-dental-studio",
    title: "Cherry Dental Studio",
    client: "Cherry Dental Studio — Dental Clinic, Siliguri",
    year: "2026",
    duration: "In progress",
    category: "Web Application",
    filter: "Web",
    status: "in-production",
    services: ["UI/UX Design", "Web Development", "SEO & Growth"],
    summary:
      "A patient-focused website for Cherry Dental Studio in Siliguri, covering treatments such as root canal treatment, dental crowns and tooth extraction. Currently under production.",
    challenge:
      "Patients look for a dentist online before they call. The clinic needed a clear, trustworthy website that explains its treatments in simple language and makes it easy to get in touch.",
    approach:
      "We are designing a clean, mobile-first site built around what patients ask first: symptoms, treatments, the doctor, reviews and how to reach the clinic.",
    outcome:
      "This project is under production. The preview site is live for client review, and this page will be updated once the final version launches.",
    results: [],
    stack: ["Responsive Design", "SEO", "Vercel"],
    accent: "blush",
    cover: "/images/work/cherry-dental-studio-cover.jpg",
    liveUrl: "https://cherry-dental-studio.vercel.app/",
    gallery: [],
  },
  {
    slug: "eminence-power-public-school",
    title: "Eminence Power Public School",
    client: "Eminence Power Public School — Nandurbar, Maharashtra",
    year: "2026",
    duration: "In progress",
    category: "Web Application",
    filter: "Web",
    status: "in-production",
    services: ["UI/UX Design", "Web Development"],
    summary:
      "A website for Eminence Power Public School in Nandurbar, presenting its Pre-Primary to Class 5 programme, activity-based teaching and small class sizes to parents. Currently under production.",
    challenge:
      "Parents choosing a school want to understand its teaching approach, classes and environment quickly. The school needed an online presence that answers those questions clearly.",
    approach:
      "We are building an accessible, easy-to-navigate site that leads with what makes the school different — activity-based learning and personal attention — and guides parents towards admission enquiries.",
    outcome:
      "This project is under production. The preview site is live for client review, and this page will be updated once the final version launches.",
    results: [],
    stack: ["Responsive Design", "Accessibility", "Vercel"],
    accent: "mint",
    cover: "/images/work/eminence-power-public-school-cover.jpg",
    liveUrl: "https://epps-eight.vercel.app",
    gallery: [],
  },
];

export const WORK_FILTERS: WorkFilter[] = ["Product"];

export interface WorkPreviewItem {
  slug: string;
  size: "large" | "small";
  categoryLabel: string;
  title: string;
}

export const WORK_PREVIEW_ITEMS: WorkPreviewItem[] = [
  { slug: "darshan-masale", size: "large", categoryLabel: "E-COMMERCE", title: "Darshan Masale" },
  { slug: "dero-world", size: "large", categoryLabel: "E-COMMERCE", title: "DERO Water Purifier" },
];

export const WORK_PREVIEW_EYEBROW = "Selected work";
export const WORK_PREVIEW_HEADING = "A few products we've helped bring to life.";
export const WORK_PREVIEW_VIEW_ALL_LABEL = "View all projects";

export const WORK_INTRO_EYEBROW = "Selected work";
export const WORK_INTRO_HEADING_LINES = ["Products we shipped.", "Outcomes we can point to."];
export const WORK_INTRO_DESCRIPTION =
  "Every engagement below started as a business problem, not a design brief. The screenshots are the least interesting part.";

export const WORK_FILTER_DEFAULT: WorkFilter = "Product";
export const WORK_ROW_ARIA_PREFIX = "View case study:";
export const WORK_OUTRO_HEADING = "That's the studio's current case-study set.";
export const WORK_OUTRO_DESCRIPTION =
  "Some projects are still under production — ask us for a walkthrough or client references.";
export const WORK_OUTRO_CTA_LABEL = "View all work";
export const WORK_INDEX_EYEBROW = "Work";
export const WORK_INDEX_HEADING = "Selected engagements";
export const WORK_INDEX_DESCRIPTION =
  "Real client projects we have designed and built. Projects marked Under production are still being built with the client.";

export const WORK_META_LABELS = {
  client: "Client type",
  year: "Year",
  services: "Services",
  stack: "Stack",
  duration: "Duration",
};
export const WORK_CHALLENGE_LABEL = "The challenge";
export const WORK_APPROACH_LABEL = "Our approach";
export const WORK_OUTCOME_LABEL = "The outcome";
export const WORK_RESULTS_LABEL = "The results";
export const WORK_NEXT_PROJECT_LABEL = "Next case study";
export const WORK_CURSOR_VIEW_LABEL = "View";
export const WORK_IN_PRODUCTION_LABEL = "Under production";
export const WORK_EMPTY_FILTER_MESSAGE = "No case studies in this category yet.";