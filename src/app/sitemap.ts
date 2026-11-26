import type { MetadataRoute } from "next";
import { navigation, legal } from "@/data/navigation";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...navigation.map(({ href }) => href), ...legal.map(({ href }) => href), "/career", "/facilities/machinery-equipment", ...services.map(({ slug }) => "/services/" + slug), ...projects.map(({ slug }) => "/projects/" + slug)].map((path) => ({ url: absolute(path) }));
}
