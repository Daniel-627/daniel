import { client } from "@/sanity/lib/client";
import { SERVICES_DETAILED_QUERY } from "@/sanity/lib/queries";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const revalidate = 60;

export const metadata = {
  title: "Services & Pricing — daniel.co.ke",
};

type Service = {
  num?: string;
  title: string;
  featured?: boolean;
  category?: string;
  tagline?: string;
  startingPriceKsh?: string;
  startingPriceUsd?: string;
  features?: string[];
};

const categoryLabels: Record<string, string> = {
  design: "Design",
  "web-apps": "Web & Apps",
  "platform-builds": "No-Code & Platform Builds",
  "business-systems": "Business Systems",
  infrastructure: "Infrastructure & Other",
};

function ServiceRow({ s, index }: { s: Service; index: number }) {
  return (
    <FadeIn key={s.title} delay={index * 0.05} once={false}>
      <section className="mx-auto max-w-6xl border-t border-border px-5 py-12 sm:px-8 sm:py-20">
        <div className="grid gap-6 sm:gap-10 md:grid-cols-[200px_1fr]">
          <div>
            {s.num && (
              <span className="font-display text-4xl text-text-secondary sm:text-5xl md:text-6xl">
                {s.num}
              </span>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-[28px] md:text-[36px]">
              {s.title}
            </h2>
            {s.tagline && (
              <p className="mt-2 max-w-[560px] text-[15px] text-text-secondary sm:text-[15.5px]">
                {s.tagline}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-6 sm:mt-8">
              {s.startingPriceKsh && (
                <div>
                  <div className="mb-1 text-[12.5px] text-text-secondary">Local</div>
                  <div className="font-display text-xl font-medium text-accent-blue sm:text-2xl">
                    {s.startingPriceKsh}
                  </div>
                </div>
              )}
              {s.startingPriceUsd && (
                <div>
                  <div className="mb-1 text-[12.5px] text-text-secondary">International</div>
                  <div className="font-display text-xl font-medium text-accent-purple sm:text-2xl">
                    {s.startingPriceUsd}
                  </div>
                </div>
              )}
            </div>

            {s.features && s.features.length > 0 && (
              <div className="mt-8">
                <div className="mb-3 text-[13px] text-text-secondary">What&apos;s included</div>
                <StaggerGroup once={false} className="space-y-2 text-[14.5px]">
                  {s.features.map((f) => (
                    <StaggerItem key={f} className="flex gap-2">
                      <span className="text-accent-blue">—</span>
                      {f}
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            )}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

export default async function ServicesPage() {
  const services: Service[] = await client.fetch(SERVICES_DETAILED_QUERY);
  const core = services.filter((s) => s.featured);
  const additional = services.filter((s) => !s.featured);

  const grouped = additional.reduce<Record<string, Service[]>>((acc, s) => {
    const key = s.category ?? "infrastructure";
    acc[key] = acc[key] ?? [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <div>
      <FadeIn once={false}>
        <header className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 md:pt-[120px]">
          <div className="mb-4 text-sm text-text-secondary sm:mb-5">
            Services &amp; Pricing
          </div>
          <h1 className="max-w-[820px] font-display text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.02] md:text-[76px]">
            What it costs to work together.
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] text-text-secondary sm:mt-6 sm:text-[15.5px]">
            Rough starting points below — every project gets scoped properly
            on a quick call before anything&apos;s locked in.
          </p>
        </header>
      </FadeIn>

      {core.map((s, i) => (
        <ServiceRow key={s.title} s={s} index={i} />
      ))}

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <FadeIn once={false}>
            <div className="mx-auto max-w-6xl border-t border-border px-5 pb-2 pt-12 sm:px-8 sm:pt-20">
              <div className="text-sm text-text-secondary">
                {categoryLabels[cat] ?? cat}
              </div>
            </div>
          </FadeIn>
          {items.map((s, i) => (
            <ServiceRow key={s.title} s={s} index={i} />
          ))}
        </div>
      ))}

      <FadeIn once={false}>
        <section id="contact" className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-16 sm:pt-24">
          <h2 className="font-display text-[24px] font-medium leading-tight tracking-tight sm:text-[30px] md:text-[48px]">
            Not sure which fits? Let&apos;s talk it through.
          </h2>
          <div className="mt-8 flex justify-start sm:mt-10">
            <CtaButton href="/contact">Get in touch</CtaButton>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}