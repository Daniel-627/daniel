import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://daniel.co.ke";
  const projects: { slug: string }[] = await client.fetch(ALL_PROJECTS_QUERY);

  const pages = ["", "/about", "/projects", "/services", "/process", "/contact"].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date() })
  );
  const projectPages = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...projectPages];
}