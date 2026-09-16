import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectMasonry from "@/components/ProjectMasonry";

export const revalidate = 60;

export const metadata = {
  title: "Projects — daniel.co.ke",
};

export default async function ProjectsPage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <div>
      <header className="mx-auto max-w-6xl px-8 pb-20 pt-24 md:pt-[120px]">
        <div className="mb-5 text-sm text-text-secondary">
          Projects ({projects.length})
        </div>
        <h1 className="max-w-[760px] font-display text-[44px] font-semibold leading-[1.02] tracking-tight md:text-[76px]">
          Everything I&apos;ve shipped, in one place.
        </h1>
      </header>

      <div className="mx-auto max-w-6xl px-8">
        <ProjectMasonry projects={projects} />
      </div>
    </div>
  );
}