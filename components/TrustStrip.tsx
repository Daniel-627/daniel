import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

export default async function TrustStrip() {
  const [projects, testimonials] = await Promise.all([
    client.fetch(ALL_PROJECTS_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
  ]);

  const quote = testimonials?.[0];

  if (!projects?.length && !quote) return null;

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 border-t border-border px-5 py-6 text-[13.5px] text-text-secondary sm:px-8">
      {projects?.length > 0 && (
        <div>
          <span className="font-display text-text-primary">{projects.length}</span>{" "}
          projects shipped
        </div>
      )}
      {quote && (
        <div className="max-w-[480px]">
          &ldquo;{quote.quote}&rdquo;{" "}
          <span className="text-text-primary">— {quote.name}</span>
        </div>
      )}
    </div>
  );
}