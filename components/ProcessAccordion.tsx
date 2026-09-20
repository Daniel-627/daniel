"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Step = { num: string; label: string; description?: string };

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(mql.matches);
    const listener = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const rowProps = (i: number) =>
    supportsHover
      ? {
          onMouseEnter: () => setOpenIndex(i),
          onMouseLeave: () => setOpenIndex(null),
        }
      : {
          onClick: () =>
            setOpenIndex((current) => (current === i ? null : i)),
        };

  return (
    <StaggerGroup once={false}>
      {steps.map((s, i) => {
        const isOpen = openIndex === i;
        return (
          <StaggerItem
            key={s.num}
            {...rowProps(i)}
            className={`border-t border-border last:border-b ${
              supportsHover ? "" : "cursor-pointer"
            }`}
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
            <AnimatePresence initial={false}>
              {isOpen && s.description && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mb-5 rounded-xl bg-bg-raised p-5 text-[14.5px] leading-relaxed text-text-secondary">
                    {s.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}