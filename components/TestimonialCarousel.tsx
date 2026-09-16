"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  avatar?: unknown;
};

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(testimonials.length <= 1);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * (trackRef.current.clientWidth ?? 0),
      behavior: "smooth",
    });
  };

  if (!testimonials?.length) return null;

  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div className="text-sm text-text-secondary">What clients say</div>
        <div className="flex gap-2.5">
          <button
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-accent-blue hover:text-accent-blue disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-accent-blue hover:text-accent-blue disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto border-t border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <div key={i} className="w-full shrink-0 snap-start py-10">
            <div className="mb-7 flex items-center gap-3.5">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#3a3b3e] to-[#222]">
                {t.avatar ? (
                  <Image
                    src={urlFor(t.avatar).width(88).height(88).url()}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <div className="text-[15px] font-medium">{t.name}</div>
                <div className="text-[13px] text-text-secondary">
                  {t.role}
                </div>
              </div>
            </div>
            <p className="max-w-[820px] font-display text-xl font-normal leading-snug tracking-tight md:text-[32px]">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}