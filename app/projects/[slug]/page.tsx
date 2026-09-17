import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import NextProjectLink from "@/components/NextProjectLink";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
  return { title: project ? `${project.title} — daniel.co.ke` : "Project" };
}

const galleryClass = (layout?: string) => {
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
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
  if (!project) notFound();

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

      <FadeIn>
        <header className="mx-auto max-w-6xl px-8 pb-14 pt-10">
          <h1 className="max-w-[820px] font-display text-[44px] font-semibold leading-none tracking-tight md:text-[88px]">
            {project.title}
          </h1>

          <StaggerGroup className="mt-11 flex flex-wrap gap-12 border-t border-border pt-6">
            {project.metaFields?.map((m: { label: string; value: string; href?: string }) => (
              <StaggerItem key={m.label}>
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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </header>
      </FadeIn>

      <FadeIn>
        <div className="mx-auto max-w-6xl px-8">
          <div className="relative my-14 aspect-video w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#232427] to-[#17181a]">
            {project.heroImage ? (
              <Image
                src={urlFor(project.heroImage).width(1600).url()}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <section className="mx-auto grid max-w-6xl gap-14 border-t border-border px-8 py-[60px] md:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-[26px] font-medium tracking-tight md:text-[34px]">
            Overview
          </h2>
          <div className="space-y-[18px] text-[16.5px] leading-relaxed text-[#c7c7c7]">
            {Array.isArray(project.overview) &&
              project.overview.map((block: { _key: string; children?: { text: string }[] }) => (
                <p key={block._key}>
                  {block.children?.map((c) => c.text).join("")}
                </p>
              ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mx-auto max-w-6xl border-t border-border px-8 py-[60px]">
          <StaggerGroup>
            {project.didList?.map((d: { task: string; tag: string }) => (
              <StaggerItem
                key={d.task}
                className="flex items-center justify-between border-t border-border py-[22px] text-base last:border-b"
              >
                <span>{d.task}</span>
                <span className="text-sm text-text-secondary">{d.tag}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      </FadeIn>

      {project.gallery?.length ? (
        <FadeIn>
          <section className="mx-auto max-w-6xl border-t border-border px-8 py-[60px]">
            <StaggerGroup
              className={`grid gap-4 ${
                isDesign ? "grid-cols-3 auto-rows-[200px]" : "grid-cols-2 auto-rows-[280px]"
              }`}
            >
              {project.gallery.map(
                (g: { _key: string; image?: unknown; layout?: string }) => (
                  <StaggerItem
                    key={g._key}
                    className={`relative overflow-hidden rounded-[10px] border border-border bg-gradient-to-br from-[#232427] to-[#17181a] ${
                      isDesign ? galleryClass(g.layout) : ""
                    }`}
                  >
                    {g.image ? (
                      <Image
                        src={urlFor(g.image).width(1000).url()}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </StaggerItem>
                )
              )}
            </StaggerGroup>
          </section>
        </FadeIn>
      ) : null}

      {project.nextProject && (
        <NextProjectLink
          slug={project.nextProject.slug}
          title={project.nextProject.title}
        />
      )}
    </div>
  );
}