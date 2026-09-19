"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest < 80) {
      setHidden(false);
      return;
    }
    if (diff > 4) {
      setHidden(true);
    } else if (diff < -4) {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-transparent"
    >
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-8">
        <Link
          href="/"
          className="font-display text-[17px] font-semibold tracking-tight"
        >
          daniel<span className="text-accent-blue">.co</span>
          <span className="text-accent-purple">.ke</span>
        </Link>

        <div className="hidden gap-9 text-[14.5px] text-text-secondary md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
          Available for work
        </div>
      </div>
    </motion.nav>
  );
}