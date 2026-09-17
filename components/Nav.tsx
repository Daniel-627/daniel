"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [showBg, setShowBg] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBg(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowBg(true), 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        showBg
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-none"
      }`}
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
    </nav>
  );
}