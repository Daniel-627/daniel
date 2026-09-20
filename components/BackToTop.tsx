"use client";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="transition-colors hover:text-text-primary"
    >
      Back to top ↑
    </button>
  );
}