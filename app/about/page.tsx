import ClosingCta from "@/components/ClosingCta";
import { pageMeta } from "@/lib/seo";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { client } from "@/sanity/lib/client";
import {
  SKILLS_QUERY,
  TIMELINE_QUERY,
  ABOUT_PAGE_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = pageMeta({
  title: "About",
  description:
    "About Daniel Ochieng, a designer and developer in Kenya who builds brands, websites and web apps.",
  path: "/about",
});

export default async function AboutPage() {
  const [skills, timeline, about] = await Promise.all([
    client.fetch(SKILLS_QUERY),
    client.fetch(TIMELINE_QUERY),
    client.fetch(ABOUT_PAGE_QUERY),
  ]);

  return (
    <div>
      <FadeIn once={false}>
        <header className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 md:pt-[120px]">
          <h1 className="max-w-[820px] font-display text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] md:text-[80px]">
            {about?.headline}
          </h1>
          <p className="mt-6 max-w-[640px] text-base leading-relaxed text-[#c7c7c7] sm:mt-8 sm:text-lg">
            {about?.intro}
          </p>
        </header>
      </FadeIn>

      <FadeIn once={false}>
        <section className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
          <div className="grid gap-6 sm:gap-14 md:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-[28px] md:text-[38px]">
              What I work with
            </h2>
            <StaggerGroup once={false}>
              {skills.map((s: { label: string; value: string }) => (
                <StaggerItem
                  key={s.label}
                  className="flex flex-col gap-1 border-t border-border py-4 text-base last:border-b sm:flex-row sm:items-center sm:justify-between sm:py-5"
                >
                  <span>{s.label}</span>
                  <span className="text-sm text-text-secondary">
                    {s.value}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </FadeIn>

      <FadeIn once={false}>
        <section className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
          <div className="mb-8 text-sm text-text-secondary sm:mb-14">
            A rough timeline
          </div>
          <StaggerGroup once={false}>
            {timeline.map((t: { year: string; title: string; body: string }) => (
              <StaggerItem
                key={t.year}
                className="grid grid-cols-1 gap-1.5 border-t border-border py-6 last:border-b sm:py-7 md:grid-cols-[120px_1fr_1fr] md:items-baseline md:gap-6"
              >
                <div className="font-display text-[15px] text-text-secondary">
                  {t.year}
                </div>
                <h4 className="font-display text-[17px] font-medium sm:text-[19px]">
                  {t.title}
                </h4>
                <p className="text-[14.5px] text-text-secondary">{t.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      </FadeIn>

      <ClosingCta source="about" />
    </div>
  );
}