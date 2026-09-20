import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Resource = {
  title: string;
  description?: string;
  category: string;
  url: string;
  thumbnail?: unknown;
};

const categoryLabels: Record<string, string> = {
  app: "App",
  web: "Web Project",
  design: "Design File",
  document: "Document",
  archive: "Archive",
};

export default function ResourcesSection({ resources }: { resources: Resource[] }) {
  if (!resources?.length) return null;

  return (
    <section id="resources" className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-24">
      <div className="mb-8 text-sm text-text-secondary sm:mb-14">
        Downloads &amp; Resources
      </div>

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <StaggerItem key={r.title}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-border transition-colors hover:border-accent-blue"
            >
              {r.thumbnail ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={urlFor(r.thumbnail).width(600).url()}
                    alt={r.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#232427] to-[#17181a]">
                  <ExternalLink size={24} className="text-text-secondary" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-secondary">
                  {categoryLabels[r.category] ?? r.category}
                </span>
                <h3 className="font-display text-lg font-medium">{r.title}</h3>
                {r.description && (
                  <p className="text-[13.5px] text-text-secondary">{r.description}</p>
                )}
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}