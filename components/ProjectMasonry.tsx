"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  slug: string;
  title: string;
  filterTags?: string[];
  thumbnail?: unknown;
};

const FILTERS = ["All", "Web Design", "Development", "Webflow", "Branding"];

export default function ProjectMasonry({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.filterTags?.includes(active));
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
            <div className="relative flex min-h-[220px] items-end overflow-hidden rounded-[10px] border border-border bg-gradient-to-br from-[#232427] to-[#17181a] p-4">
              {p.thumbnail ? (
                <Image
                  src={urlFor(p.thumbnail).width(800).url()}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : null}
              <h3 className="relative z-10 rounded-full bg-black/50 px-3 py-1 font-display text-[15px] font-medium tracking-tight text-text-primary">
                {p.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}