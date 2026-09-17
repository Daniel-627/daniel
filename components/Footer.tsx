import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";
import SocialIcon from "@/components/SocialIcon";

export default async function Footer() {
  const socials = await client.fetch(SOCIAL_LINKS_QUERY);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-7 text-[13.5px] text-text-secondary">
        <div>© {new Date().getFullYear()} Daniel. All rights reserved.</div>
        <div className="flex gap-5">
          {socials.map((s: { label: string; platform: string; url: string }) => (
            
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="transition-colors hover:text-text-primary"
            >
              <SocialIcon platform={s.platform} size={16} />
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