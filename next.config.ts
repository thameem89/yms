import type { NextConfig } from "next";

const legacyPaths = {
  "/about-us": "/about",
  "/who-we-are": "/about",
  "/what-we-do": "/facilities",
  "/design": "/services/design-engineering",
  "/fabrication": "/services/steel-fabrication",
  "/erection": "/services/installation-erection",
  "/protective-coating": "/services/protective-coating",
  "/fireproofing": "/services/fireproofing",
  "/surface-preparation": "/services/surface-preparation",
  "/corporate-office": "/facilities",
  "/project-list": "/projects",
  "/gallery": "/projects#gallery",
  "/project-gallery": "/projects#gallery",
  "/contact-us": "/contact",
  "/copy-of-disclaimer": "/qhse",
  "/copy-of-quality-policy": "/disclaimer",
  "/copy-of-career": "/career#vacancies",
};

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/webp"], qualities: [65, 75] },
  async redirects() {
    return Object.entries(legacyPaths).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default config;
