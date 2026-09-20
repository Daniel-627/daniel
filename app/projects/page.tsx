import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectMasonry from "@/components/ProjectMasonry";
import FadeIn from "@/components/motion/FadeIn";

export const revalidate = 60;

export const metadata = {
  title: "Projects — daniel.co.ke",
};

export default async function ProjectsPage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <div>
      <FadeIn once={false}>
        <header className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 md:pt-[120px]">
          <div className="mb-4 text-sm text-text-secondary sm:mb-5">
            Projects ({projects.length})
          </div>
          <h1 className="max-w-[760px] font-display text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.02] md:text-[76px]">
            Everything I&apos;ve shipped, in one place.
          </h1>
        </header>
      </FadeIn>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ProjectMasonry projects={projects} />
      </div>
    </div>
  );
}