"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const FILTERS = ["All", "Web Design", "Development", "Webflow", "Branding"];

const heightMap: Record<Project["thumbHeight"], string> = {
  h1: "h-[180px]",
  h2: "h-[260px]",
  h3: "h-[340px]",
  h4: "h-[220px]",
  h5: "h-[300px]",
};

export default function ProjectMasonry({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.filterTags.includes(active));
  }, [projects, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 pb-[60px]">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-[18px] py-2 text-[13.5px] transition-colors ${
              active === f
                ? "border-text-primary bg-text-primary text-bg"
                : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 pb-[60px] sm:columns-2 md:columns-3 xl:columns-4">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="mb-4 block break-inside-avoid transition-opacity hover:opacity-85"
          >
            <div
              className={`relative flex items-end overflow-hidden rounded-[10px] border border-border bg-gradient-to-br from-[#232427] to-[#17181a] p-4 ${heightMap[p.thumbHeight]}`}
            >
              <h3 className="rounded-full bg-black/50 px-3 py-1 font-display text-[15px] font-medium tracking-tight text-text-primary">
                {p.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
