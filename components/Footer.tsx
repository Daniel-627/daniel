import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";
import SocialIcon from "@/components/SocialIcon";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export default async function Footer() {
  const socials = await client.fetch(SOCIAL_LINKS_QUERY);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-7 text-center text-[13.5px] text-text-secondary sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="daniel.co.ke" width={18} height={18} className="sm:hidden" />
          <span>© {new Date().getFullYear()} Daniel. All rights reserved.</span>
        </div>
        <StaggerGroup once={false} className="flex gap-5">
          {socials.map((s: { label: string; platform: string; url: string }) => (
            <StaggerItem key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="transition-colors hover:text-text-primary"
              >
                <SocialIcon platform={s.platform} size={16} />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <a href="#top" className="transition-colors hover:text-text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}