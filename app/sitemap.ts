import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://daniel.co.ke";

  // Real "last changed" dates from Sanity, so crawlers aren't told that
  // every page changed today. Read-only query; no schema involved.
  const projects: { slug: string; updated: string }[] = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }`
  );

  const pages = ["", "/about", "/projects", "/services", "/process", "/contact"].map(
    (path) => ({ url: `${base}${path}` })
  );
  const projectPages = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updated),
  }));

  return [...pages, ...projectPages];
}
