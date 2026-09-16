"use client";

import { useState } from "react";

type Step = { num: string; label: string; description?: string };

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {steps.map((s, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={s.num}
            onMouseEnter={() => setOpenIndex(i)}
            onMouseLeave={() => setOpenIndex(null)}
            className="border-t border-border last:border-b"
          >
            <div className="flex w-full items-center justify-between py-5 text-left text-lg">
              <div className="flex items-center gap-5">
                <span className="font-display text-sm text-text-secondary">
                  {s.num}
                </span>
                {s.label}
              </div>
              <span
                className={`text-xl text-text-secondary transition-transform ${
                  isOpen ? "rotate-45 text-accent-blue" : ""
                }`}
              >
                +
              </span>
            </div>
            {isOpen && s.description && (
              <div className="mb-5 rounded-xl bg-bg-raised p-5 text-[14.5px] leading-relaxed text-text-secondary">
                {s.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}