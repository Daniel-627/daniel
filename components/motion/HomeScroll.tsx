"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * GSAP scroll choreography for the homepage. Renders nothing; it finds
 * elements by data attributes so the server-rendered page stays untouched:
 *
 *  [data-hero]            sticky hero — recedes (scale/fade/blur) as the sheet covers it
 *  [data-sheet]           content sheet — its rounded top corners flatten as it docks
 *  [data-split]           headings — words rise out of a mask, scrubbed to scroll
 *  [data-parallax="n"]    drifts at its own speed (desktop only)
 *  [data-work-title/year] project rows slide in from opposite sides and skew with velocity
 */
export default function HomeScroll() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean };
          const q = gsap.utils.selector(document);

          // 1. Hero recedes while the sheet slides over it
          const hero = q("[data-hero]")[0];
          const sheet = q("[data-sheet]")[0];
          if (hero && sheet) {
            gsap.to(hero, {
              scale: desktop ? 0.9 : 0.96,
              opacity: 0.15,
              yPercent: desktop ? -6 : -3,
              filter: desktop ? "blur(8px)" : "none",
              transformOrigin: "50% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: sheet,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
            gsap.to(sheet, {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sheet,
                start: "top 40%",
                end: "top top",
                scrub: true,
              },
            });
          }

          // 2. Masked word reveal, re-split on resize so lines stay correct
          q("[data-split]").forEach((el) => {
            SplitText.create(el, {
              type: "lines,words",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.words, {
                  yPercent: 110,
                  rotate: desktop ? 4 : 0,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    end: desktop ? "top 45%" : "top 60%",
                    scrub: 0.6,
                  },
                });
              },
            });
          });

          // 3. Project rows: title and year approach from opposite sides
          q("[data-work-title]").forEach((el) => {
            gsap.fromTo(
              el,
              { x: desktop ? -80 : -24, opacity: 0.2 },
              {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 95%",
                  end: "top 60%",
                  scrub: true,
                },
              }
            );
          });
          q("[data-work-year]").forEach((el) => {
            gsap.fromTo(
              el,
              { x: desktop ? 80 : 24, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 95%",
                  end: "top 60%",
                  scrub: true,
                },
              }
            );
          });

          // Desktop-only extras: parallax drift and velocity skew
          if (desktop) {
            q("[data-parallax]").forEach((el) => {
              const speed = parseFloat(el.getAttribute("data-parallax") || "0.1");
              gsap.fromTo(
                el,
                { y: () => speed * 200 },
                {
                  y: () => -speed * 200,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

            const titles = q("[data-work-title]");
            if (titles.length) {
              const skew = gsap.quickTo(titles, "skewX", { duration: 0.5, ease: "power3" });
              ScrollTrigger.create({
                trigger: titles[0],
                endTrigger: titles[titles.length - 1],
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) =>
                  skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)),
                onLeave: () => skew(0),
                onLeaveBack: () => skew(0),
              });
              const settle = () => skew(0);
              ScrollTrigger.addEventListener("scrollEnd", settle);
              return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
            }
          }
        }
      );

      // Late layout shifts (fonts, Sanity images) change trigger positions
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root} hidden aria-hidden="true" />;
}
