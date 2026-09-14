import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { projects } from "@/lib/projects";

const services = [
  {
    num: "01",
    title: "Frontend",
    body: "Interfaces built with React and Next.js that feel fast and hold up as the product grows.",
  },
  {
    num: "02",
    title: "Fullstack",
    body: "APIs, auth, and data layers with Node.js and Hono — the part users never see but always feel.",
  },
  {
    num: "03",
    title: "The Full Package",
    body: "Design through deployment — one person owning the whole build, start to finish.",
  },
];

const processSteps = [
  { num: "01", label: "Discovery & Scope" },
  { num: "02", label: "Design & Wireframes" },
  { num: "03", label: "Development" },
  { num: "04", label: "Launch & Support" },
];

export default function Home() {
  const featured = projects.slice(0, 4);

  return (
    <div id="top">
      {/* HERO */}
      <header className="mx-auto max-w-6xl px-8 pb-24 pt-24 md:pt-[120px] md:pb-[140px]">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <h1 className="font-display text-[52px] font-semibold leading-[0.98] tracking-tight md:text-[104px]">
            Fullstack
            <br />
            Developer
          </h1>
          <p className="max-w-[260px] pt-4 text-sm text-text-secondary">
            specialized in React, Next.js, Node.js, and WordPress.
          </p>
        </div>

        <p className="mt-14 max-w-[640px] text-lg leading-relaxed text-[#c7c7c7] md:text-[19px]">
          I help startups and business owners turn ideas into fast, reliable
          products — from custom web apps to client sites built to actually
          convert. Based in Kenya, working with teams anywhere.
        </p>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-7">
          <CtaButton href="/#contact">Let&apos;s talk</CtaButton>
          <div className="text-sm">
            <div className="mb-3 w-40 border-b border-border pb-3 text-text-secondary">
              Let&apos;s get connected
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { label: "GitHub", href: "https://github.com/Daniel-627" },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/daniel-ochieng",
                },
                { label: "X / Twitter", href: "https://x.com/Daniel__627" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <div className="mb-14 text-sm text-text-secondary">
          I can help you with ...
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <div key={s.num} className="border-t border-border pt-5">
              <span className="mb-14 block font-display text-[15px] text-text-secondary">
                {s.num}
              </span>
              <h3 className="mb-2.5 font-display text-xl font-medium">
                {s.title}
              </h3>
              <p className="max-w-[280px] text-[14.5px] text-text-secondary">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <div className="mb-14 text-sm text-text-secondary">
          Selected Work <sup className="text-accent-blue">(4)</sup>
        </div>

        {featured.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="flex items-baseline justify-between border-t border-border py-8 transition-opacity last:border-b hover:opacity-60"
          >
            <div>
              <h3 className="font-display text-[32px] font-medium tracking-tight md:text-[56px]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-text-secondary">
                {p.filterTags.join(", ")}
              </p>
            </div>
            <div className="font-display text-2xl text-text-secondary">
              /{p.year}
            </div>
          </Link>
        ))}

        <Link
          href="/projects"
          className="mt-12 inline-flex items-center gap-2 border-b border-text-primary pb-0.5 text-[15px] transition-colors hover:border-accent-blue hover:text-accent-blue"
        >
          View all projects →
        </Link>
      </section>

      {/* TESTIMONIALS + LOGOS */}
      <section id="testimonials" className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <TestimonialCarousel />

        <div className="mt-20 grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
          {["Logo 1", "Logo 2", "Logo 3", "Logo 4", "Logo 5", "Logo 6", "Logo 7", "Logo 8"].map(
            (l) => (
              <div
                key={l}
                className="flex h-[110px] items-center justify-center border-r border-b border-border font-display text-[15px] text-text-secondary opacity-55 grayscale transition-opacity hover:opacity-100 hover:text-text-primary"
              >
                {l}
              </div>
            )
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[30px] font-medium leading-tight tracking-tight md:text-[42px]">
              My way of
              <br />
              getting things done
            </h2>
            <p className="mt-5 max-w-[400px] text-[15.5px] text-text-secondary">
              Clear scope, honest timelines, and steady updates — you always
              know where the project stands. I work in focused steps so
              nothing gets built twice.
            </p>
          </div>
          <div>
            {processSteps.map((s) => (
              <div
                key={s.num}
                className="group flex cursor-pointer items-center justify-between border-t border-border py-5 text-lg last:border-b"
              >
                <div className="flex items-center gap-5">
                  <span className="font-display text-sm text-text-secondary">
                    {s.num}
                  </span>
                  {s.label}
                </div>
                <span className="text-xl text-text-secondary transition-transform group-hover:rotate-45 group-hover:text-accent-blue">
                  +
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-8 pb-16 pt-24">
        <div className="flex items-start gap-6">
          <div className="relative mt-2 h-[52px] w-[52px] shrink-0 rounded-full bg-gradient-to-br from-[#3a3b3e] to-[#222]">
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-bg bg-accent-blue" />
          </div>
          <h2 className="font-display text-[30px] font-medium leading-tight tracking-tight md:text-[56px]">
            Let&apos;s talk about a project, collaboration, or an idea you may
            have
          </h2>
        </div>
        <div className="mt-10 flex justify-end">
          <CtaButton href="mailto:ochiengdaniel627@gmail.com">
            Drop me a line
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
