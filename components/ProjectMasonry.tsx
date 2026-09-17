"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Project = {
  slug: string;
  title: string;
  filterTags?: string[];
  thumbnail?: unknown;
  thumbAspect?: number;
};

const FILTERS = ["All", "Web Design", "Development", "Webflow", "Branding"];

const filterBarVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const filterBtnVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectMasonry({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.filterTags?.includes(active));
  }, [projects, active]);

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={filterBarVariants}
        className="flex flex-wrap gap-2.5 pb-[60px]"
      >
        {FILTERS.map((f) => (
          <motion.button
            key={f}
            variants={filterBtnVariants}
            onClick={() => setActive(f)}
            className={`rounded-full border px-[18px] py-2 text-[13.5px] transition-colors ${
              active === f
                ? "border-text-primary bg-text-primary text-bg"
                : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {f}
          </motion.button>
        ))}
      </motion.div>

      <StaggerGroup className="columns-1 gap-4 pb-[60px] sm:columns-2 md:columns-3 xl:columns-4">
        {filtered.map((p) => (
          <StaggerItem key={p.slug} className="mb-4 break-inside-avoid">
            <Link href={`/projects/${p.slug}`}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-end overflow-hidden rounded-[10px] border border-border bg-gradient-to-br from-[#232427] to-[#17181a] p-4"
                style={{ aspectRatio: p.thumbAspect ? p.thumbAspect : "4 / 5" }}
              >
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
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}