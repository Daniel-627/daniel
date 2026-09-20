"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Project = {
  slug: string;
  title: string;
  filterTags?: string[];
  year?: string;
  thumbnail?: unknown;
};

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMove} className="relative">
      <StaggerGroup once={false}>
        {projects.map((p) => (
          <StaggerItem key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setActive(p)}
              onMouseLeave={() => setActive(null)}
              className="flex items-baseline justify-between border-t border-border py-8 transition-opacity last:border-b hover:opacity-60"
            >
              <div>
                <h3 className="font-display text-[32px] font-medium tracking-tight md:text-[56px]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] text-text-secondary">
                  {p.filterTags?.join(", ")}
                </p>
              </div>
              <div className="font-display text-2xl text-text-secondary">
                /{p.year}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {active && active.thumbnail ? (
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: springX, y: springY }}
            className="pointer-events-none fixed left-0 top-0 z-50 h-[220px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-border shadow-2xl"
          >
            <Image
              src={urlFor(active.thumbnail).width(600).url()}
              alt={active.title}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}