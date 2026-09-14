import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — daniel.co.ke` : "Project" };
}

const galleryClass = (layout?: "wide" | "tall") => {
  if (layout === "wide") return "col-span-2";
  if (layout === "tall") return "row-span-2";
  return "";
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = getProject(project.nextSlug);
  const isDesign = project.category === "design";

  return (
    <div>
      <div className="mx-auto max-w-6xl px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 pt-8 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          ← Back to all projects
        </Link>
      </div>

      <header className="mx-auto max-w-6xl px-8 pb-14 pt-10">
        <h1 className="max-w-[820px] font-display text-[44px] font-semibold leading-none tracking-tight md:text-[88px]">
          {project.title}
        </h1>

        <div className="mt-11 flex flex-wrap gap-12 border-t border-border pt-6">
          {project.metaFields.map((m) => (
            <div key={m.label}>
              <div className="mb-1.5 text-[13px] text-text-secondary">
                {m.label}
              </div>
              <div className="text-[15px]">
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                  >
                    {m.value}
                  </a>
                ) : (
                  m.value
                )}
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-8">
        <div className="my-14 flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#232427] to-[#17181a] text-sm text-text-secondary">
          Hero image
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-14 border-t border-border px-8 py-[60px] md:grid-cols-[1fr_1.6fr]">
        <h2 className="font-display text-[26px] font-medium tracking-tight md:text-[34px]">
          Overview
        </h2>
        <div className="space-y-[18px]">
          {project.overview.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-relaxed text-[#c7c7c7]">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-8 py-[60px]">
        {project.didList.map((d) => (
          <div
            key={d.task}
            className="flex items-center justify-between border-t border-border py-[22px] text-base last:border-b"
          >
            <span>{d.task}</span>
            <span className="text-sm text-text-secondary">{d.tag}</span>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-8 py-[60px]">
        <div
          className={`grid gap-4 ${
            isDesign ? "grid-cols-3 auto-rows-[200px]" : "grid-cols-2"
          }`}
        >
          {project.gallery.map((g, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-[10px] border border-border bg-gradient-to-br from-[#232427] to-[#17181a] text-[13px] text-text-secondary ${
                isDesign ? galleryClass(g.layout) : "aspect-[4/3]"
              }`}
            >
              {g.label}
            </div>
          ))}
        </div>
      </section>

      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="block border-t border-border py-20 text-center"
        >
          <div className="mb-4 text-sm text-text-secondary">
            Next project
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight transition-colors hover:text-accent-blue md:text-6xl">
            {nextProject.title} →
          </h2>
        </Link>
      )}
    </div>
  );
}
