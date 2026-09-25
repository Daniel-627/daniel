import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProcessAccordion from "@/components/ProcessAccordion";
import SocialIcon from "@/components/SocialIcon";
import SelectedWork from "@/components/SelectedWork";
import ClientLogos from "@/components/ClientLogos";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { HeroReveal, HeroItem } from "@/components/motion/HeroReveal";
import { client } from "@/sanity/lib/client";
import {
  FEATURED_PROJECTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  CLIENT_LOGOS_QUERY,
  PROCESS_STEPS_QUERY,
  SOCIAL_LINKS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [featured, services, testimonials, logos, processSteps, socialLinks] =
    await Promise.all([
      client.fetch(FEATURED_PROJECTS_QUERY),
      client.fetch(SERVICES_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
      client.fetch(CLIENT_LOGOS_QUERY),
      client.fetch(PROCESS_STEPS_QUERY),
      client.fetch(SOCIAL_LINKS_QUERY),
    ]);

  return (
    <div id="top">
      <div className="sticky top-0 z-0">
        <HeroReveal>
<header className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 md:pt-[80px] md:pb-[90px]">            <HeroItem className="flex flex-wrap items-start justify-between gap-6 sm:gap-10">
              <h1 className="font-display text-[38px] font-semibold leading-[0.98] tracking-tight sm:text-[52px] md:text-[100px]">
                Designer &
                <br />
                Developer.
              </h1>
              <p className="max-w-[260px] pt-2 text-sm text-text-secondary sm:pt-3.5">
                Branding, graphic design, websites, web apps, and mobile apps.
              </p>
            </HeroItem>

            <HeroItem>
              <p className="mt-8 max-w-[640px] text-base leading-relaxed text-[#c7c7c7] sm:mt-12 sm:text-lg md:text-[19px]">
                I help startups and business owners turn ideas into fast, reliable
                products — from custom web apps to client sites built to actually
                convert. Based in Kenya, working with teams anywhere.
              </p>
            </HeroItem>

            <HeroItem className="mt-8 flex flex-wrap items-end justify-between gap-7 sm:mt-14">
              <CtaButton href="/contact">Let&apos;s talk</CtaButton>
              <div className="text-sm">
                <div className="mb-3 w-full max-w-40 border-b border-border pb-3 text-text-secondary">
                  Let&apos;s get connected
                </div>
                <StaggerGroup once={false} className="mt-4 grid w-fit grid-cols-4 gap-x-5 gap-y-4">
  {socialLinks.map((s: { label: string; platform: string; url: string }) => (
    <StaggerItem key={s.label}>
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        aria-label={s.label}
        className="flex items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
      >
        <SocialIcon platform={s.platform} size={20} />
      </a>
    </StaggerItem>
  ))}
</StaggerGroup>
              </div>
            </HeroItem>
          </header>
        </HeroReveal>
      </div>

      <div className="relative z-10 rounded-t-[28px] bg-bg">
        <FadeIn once={false}>
          <section className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
            <div className="mb-8 text-sm text-text-secondary sm:mb-14">
              I can help you with ...
            </div>
            <StaggerGroup once={false} className="grid gap-8 sm:grid-cols-3 sm:gap-8">
              {services.map((s: { num: string; title: string; body: string }) => (
                <StaggerItem key={s.num} className="border-t border-border pt-5">
                  <span className="mb-8 block font-display text-[40px] text-text-secondary sm:mb-14 sm:text-[56px]">
                    {s.num}
                  </span>
                  <h3 className="mb-2.5 font-display text-xl font-medium">
                    {s.title}
                  </h3>
                  <p className="max-w-[280px] text-[14.5px] text-text-secondary">
                    {s.body}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        </FadeIn>

        <FadeIn once={false}>
          <section id="work" className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
            <div className="mb-8 text-sm text-text-secondary sm:mb-14">
              Selected Work <sup className="text-accent-blue">({featured.length})</sup>
            </div>

            <SelectedWork projects={featured} />

            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 border-b border-text-primary pb-0.5 text-[15px] transition-colors hover:border-accent-blue hover:text-accent-blue sm:mt-12"
            >
              View all projects →
            </Link>
          </section>
        </FadeIn>

        <FadeIn once={false}>
          <section id="testimonials" className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
            <TestimonialCarousel testimonials={testimonials} />
          </section>
        </FadeIn>

        <ClientLogos logos={logos} />

        <FadeIn once={false}>
          <section id="process" className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
            <div className="grid gap-8 sm:gap-14 md:grid-cols-2">
              <div>
                <h2 className="font-display text-[26px] font-medium leading-tight tracking-tight sm:text-[30px] md:text-[42px]">
                  My way of
                  <br />
                  getting things done
                </h2>
                <p className="mt-4 max-w-[400px] text-[15px] text-text-secondary sm:mt-5 sm:text-[15.5px]">
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

        <FadeIn once={false}>
          <section id="contact" className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-24">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="relative mt-1 h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[#3a3b3e] to-[#222] sm:mt-2 sm:h-[52px] sm:w-[52px]">
                <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent-blue sm:h-3 sm:w-3" />
              </div>
              <h2 className="font-display text-[24px] font-medium leading-tight tracking-tight sm:text-[30px] md:text-[56px]">
                Let&apos;s talk about a project, collaboration, or an idea you may
                have
              </h2>
            </div>
            <div className="mt-8 flex justify-end sm:mt-10">
              <CtaButton href="/contact">Drop me a line</CtaButton>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}