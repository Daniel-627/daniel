"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NextProjectLink({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  return (
    <Link href={`/projects/${slug}`} className="block border-t border-border py-20 text-center">
      <div className="mb-4 text-sm text-text-secondary">Next project</div>
      <motion.h2
        whileHover="hover"
        className="inline-flex items-center gap-3 font-display text-4xl font-semibold tracking-tight transition-colors hover:text-accent-blue md:text-6xl"
      >
        {title}
        <motion.span
          variants={{ hover: { x: 8 } }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          →
        </motion.span>
      </motion.h2>
    </Link>
  );
}