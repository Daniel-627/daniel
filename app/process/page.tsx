import { client } from "@/sanity/lib/client";
import { PROCESS_STEPS_DETAILED_QUERY } from "@/sanity/lib/queries";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const revalidate = 60;

export const metadata = {
  title: "Process — daniel.co.ke",
};

type Step = {
  num: string;
  label: string;
  extendedBody?: string;
  duration?: string;
  deliverables?: string[];
  whatINeed?: string[];
};

export default async function ProcessPage() {
  const steps: Step[] = await client.fetch(PROCESS_STEPS_DETAILED_QUERY);

  return (
    <div>
      <FadeIn>
        <header className="mx-auto max-w-6xl px-8 pb-16 pt-24 md:pt-[120px]">
          <div className="mb-5 text-sm text-text-secondary">Process</div>
          <h1 className="max-w-[820px] font-display text-[44px] font-semibold leading-[1.02] tracking-tight md:text-[76px]">
            How a project actually goes, start to finish.
          </h1>
          <p className="mt-6 max-w-[560px] text-[15.5px] text-text-secondary">
            The same four stages apply whether we&apos;re building a product
            or shaping a brand — what changes is the work inside each one.
          </p>
        </header>
      </FadeIn>

      {steps.map((s, i) => (
        <FadeIn key={s.num} delay={i * 0.05}>
          <section className="mx-auto max-w-6xl border-t border-border px-8 py-20">
            <div className="grid gap-10 md:grid-cols-[200px_1fr]">
              <div className="flex items-start gap-4 md:flex-col md:gap-2">
                <span className="font-display text-5xl text-text-secondary md:text-6xl">
                  {s.num}
                </span>
                {s.duration && (
                  <span className="mt-1 inline-block w-fit rounded-full border border-border px-3 py-1 text-[12.5px] text-text-secondary md:mt-3">
                    {s.duration}
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-display text-[28px] font-medium tracking-tight md:text-[36px]">
                  {s.label}
                </h2>

                {s.extendedBody && (
                  <div className="mt-5 max-w-[720px] space-y-4 text-[15.5px] leading-relaxed text-[#c7c7c7]">
                    {s.extendedBody
                      .split(/\n\s*\n/)
                      .map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                )}

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  {s.deliverables && s.deliverables.length > 0 && (
                    <div>
                      <div className="mb-3 text-[13px] text-text-secondary">
                        What you get
                      </div>
                      <StaggerGroup className="space-y-2 text-[14.5px]">
                        {s.deliverables.map((d) => (
                          <StaggerItem key={d} className="flex gap-2">
                            <span className="text-accent-blue">—</span>
                            {d}
                          </StaggerItem>
                        ))}
                      </StaggerGroup>
                    </div>
                  )}

                  {s.whatINeed && s.whatINeed.length > 0 && (
                    <div>
                      <div className="mb-3 text-[13px] text-text-secondary">
                        What I need from you
                      </div>
                      <StaggerGroup className="space-y-2 text-[14.5px] text-text-secondary">
                        {s.whatINeed.map((w) => (
                          <StaggerItem key={w} className="flex gap-2">
                            <span className="text-accent-purple">—</span>
                            {w}
                          </StaggerItem>
                        ))}
                      </StaggerGroup>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      ))}

      <FadeIn>
        <section id="contact" className="mx-auto max-w-6xl px-8 pb-16 pt-24">
          <div className="flex items-start gap-6">
            <div className="relative mt-2 h-[52px] w-[52px] shrink-0 rounded-full bg-gradient-to-br from-[#3a3b3e] to-[#222]">
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-bg bg-accent-blue" />
            </div>
            <h2 className="font-display text-[30px] font-medium leading-tight tracking-tight md:text-[56px]">
              Let&apos;s talk about a project, collaboration, or an idea you
              may have
            </h2>
          </div>
          <div className="mt-10 flex justify-end">
            <CtaButton href="mailto:ochiengdaniel627@gmail.com">
              Drop me a line
            </CtaButton>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}