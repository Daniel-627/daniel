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
    <Link href={`/projects/${slug}`} className="block border-t border-border px-5 py-14 text-center sm:px-8 sm:py-20">
      <div className="mb-3 text-sm text-text-secondary sm:mb-4">Next project</div>
      <motion.h2
        whileHover="hover"
        className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent-blue sm:gap-3 sm:text-4xl md:text-6xl"
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