import Link from "next/link";
import MagneticCtaButton from "@/components/MagneticCtaButton";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProcessAccordion from "@/components/ProcessAccordion";
import SocialIcon from "@/components/SocialIcon";
import SelectedWork from "@/components/SelectedWork";
import FadeIn from "@/components/motion/FadeIn";
import { client } from "@/sanity/lib/client";
import {
  FEATURED_PROJECTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  PROCESS_STEPS_QUERY,
  SOCIAL_LINKS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [featured, services, testimonials, processSteps, socialLinks] =
    await Promise.all([
      client.fetch(FEATURED_PROJECTS_QUERY),
      client.fetch(SERVICES_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
      client.fetch(PROCESS_STEPS_QUERY),
      client.fetch(SOCIAL_LINKS_QUERY),
    ]);

  return (
    <div id="top">
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
          <MagneticCtaButton href="/contact">Let&apos;s talk</MagneticCtaButton>
          <div className="text-sm">
            <div className="mb-3 w-40 border-b border-border pb-3 text-text-secondary">
              Let&apos;s get connected
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {socialLinks.map((s: { label: string; platform: string; url: string }) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <SocialIcon platform={s.platform} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <FadeIn>
        <section className="mx-auto max-w-6xl border-t border-border px-8 py-24">
          <div className="mb-14 text-sm text-text-secondary">
            I can help you with ...
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {services.map((s: { num: string; title: string; body: string }) => (
              <div key={s.num} className="border-t border-border pt-5">
                <span className="mb-14 block font-display text-[56px] text-text-secondary">
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
      </FadeIn>

      <FadeIn>
        <section id="work" className="mx-auto max-w-6xl border-t border-border px-8 py-24">
          <div className="mb-14 text-sm text-text-secondary">
            Selected Work <sup className="text-accent-blue">({featured.length})</sup>
          </div>

          <SelectedWork projects={featured} />

          <Link
            href="/projects"
            className="mt-12 inline-flex items-center gap-2 border-b border-text-primary pb-0.5 text-[15px] transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            View all projects →
          </Link>
        </section>
      </FadeIn>

      <FadeIn>
        <section id="testimonials" className="mx-auto max-w-6xl border-t border-border px-8 py-24">
          <TestimonialCarousel testimonials={testimonials} />
        </section>
      </FadeIn>

      <FadeIn>
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
              <ProcessAccordion steps={processSteps} />
              <Link
                href="/process"
                className="mt-8 inline-flex items-center gap-2 border-b border-text-primary pb-0.5 text-[15px] transition-colors hover:border-accent-blue hover:text-accent-blue"
              >
                View full process →
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
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
            <MagneticCtaButton href="/contact">Drop me a line</MagneticCtaButton>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}