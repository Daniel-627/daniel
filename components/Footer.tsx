import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";
import SocialIcon from "@/components/SocialIcon";
import FooterReveal from "@/components/motion/FooterReveal";
import BackToTop from "@/components/BackToTop";

export default async function Footer() {
  const socials = await client.fetch(SOCIAL_LINKS_QUERY);

  return (
    <footer className="border-t border-border">
      <FooterReveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-7 text-center text-[13.5px] text-text-secondary sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="daniel.co.ke" width={18} height={18} className="sm:hidden" />
            <span>© {new Date().getFullYear()} Daniel. All rights reserved.</span>
          </div>
          <div className="flex gap-4 text-[12.5px]">
            <Link href="/privacy" className="transition-colors hover:text-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-text-primary">
              Terms
            </Link>
          </div>
        </div>
        <div className="flex gap-5">
          {socials.map((s: { label: string; platform: string; url: string }) => (
            <a
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
        <BackToTop />
      </FooterReveal>
    </footer>
  );
}