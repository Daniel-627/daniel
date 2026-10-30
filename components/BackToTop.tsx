"use client";

import Magnetic from "@/components/Magnetic";

export default function BackToTop() {
  return (
    <Magnetic strength={0.3}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group inline-flex items-center gap-1.5 transition-colors hover:text-text-primary"
      >
        Back to top
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
        >
          ↑
        </span>
      </button>
    </Magnetic>
  );
}
