import CtaButton from "@/components/CtaButton";

const skills = [
  { label: "Frontend", value: "React, Next.js, TypeScript" },
  { label: "Backend", value: "Node.js, Hono" },
  { label: "CMS / Client sites", value: "WordPress" },
  { label: "Tooling", value: "Vite, Git" },
  { label: "Design", value: "Adobe Illustrator" },
];

const timeline = [
  {
    year: "2026",
    title: "Freelance Fullstack Developer",
    body: "Client and product work across web apps, booking platforms, and content sites.",
  },
  {
    year: "2024",
    title: "Started freelancing full-time",
    body: "Moved from side projects to taking on client work as a full-time freelancer.",
  },
  {
    year: "Earlier",
    title: "Learning the craft",
    body: "Self-taught through building — early projects, design experiments, and a lot of iteration.",
  },
];

export const metadata = {
  title: "About — daniel.co.ke",
};

export default function AboutPage() {
  return (
    <div>
      <header className="mx-auto max-w-6xl px-8 pb-24 pt-24 md:pt-[120px]">
        <h1 className="max-w-[820px] font-display text-[44px] font-semibold leading-[1.05] tracking-tight md:text-[80px]">
          I build things for the web — and I care about how they&apos;re
          built.
        </h1>
        <p className="mt-8 max-w-[640px] text-lg leading-relaxed text-[#c7c7c7]">
          Fullstack developer based in Kenya, working across React, Next.js,
          Node.js, and Hono. I split my time between client work and my own
          products, which keeps me equally sharp on deadlines and on craft.
        </p>
      </header>

      <section className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <div className="grid gap-14 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-[28px] font-medium leading-tight tracking-tight md:text-[38px]">
            What I work with
          </h2>
          <div>
            {skills.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between border-t border-border py-5 text-base last:border-b"
              >
                <span>{s.label}</span>
                <span className="text-sm text-text-secondary">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-8 py-24">
        <div className="mb-14 text-sm text-text-secondary">
          A rough timeline
        </div>
        {timeline.map((t) => (
          <div
            key={t.year}
            className="grid grid-cols-1 gap-1.5 border-t border-border py-7 last:border-b md:grid-cols-[120px_1fr_1fr] md:items-baseline md:gap-6"
          >
            <div className="font-display text-[15px] text-text-secondary">
              {t.year}
            </div>
            <h4 className="font-display text-[19px] font-medium">
              {t.title}
            </h4>
            <p className="text-[14.5px] text-text-secondary">{t.body}</p>
          </div>
        ))}
      </section>

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
