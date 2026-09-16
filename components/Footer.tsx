import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";

export default async function Footer() {
  const socials = await client.fetch(SOCIAL_LINKS_QUERY);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-7 text-[13.5px] text-text-secondary">
        <div>© {new Date().getFullYear()} Daniel. All rights reserved.</div>
        <div className="flex gap-6">
          {socials.map((s: { label: string; url: string }) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>
        <a href="#top" className="transition-colors hover:text-text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}