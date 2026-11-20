import type { Metadata } from "next";
import { company } from "@/data/company";
import { mediaPath, type MediaKey } from "@/lib/media";

export const absolute = (path: string) => new URL(path, company.url).href;

export function pageMetadata(title: string, description: string, path: string, image: MediaKey = "erection"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: title + " | YMS Engineering", description, url: path, images: [mediaPath(image)], type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...items].map(({ name, href }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: absolute(href),
    })),
  };
}
