import { client } from "@/sanity/lib/client";
import { CONTACT_PAGE_QUERY, SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";
import SocialIcon from "@/components/SocialIcon";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const revalidate = 60;

export const metadata = {
  title: "Contact — daniel.co.ke",
};

type ContactInfo = {
  headline: string;
  email: string;
  phone?: string;
  location: string;
  availability?: string;
};

export default async function ContactPage() {
  const [contact, socials]: [ContactInfo, { label: string; platform: string; url: string }[]] =
    await Promise.all([
      client.fetch(CONTACT_PAGE_QUERY),
      client.fetch(SOCIAL_LINKS_QUERY),
    ]);

  return (
    <div>
      <FadeIn once={false}>
        <header className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 md:pt-[120px]">
          {contact?.availability && (
            <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary sm:mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
              {contact.availability}
            </div>
          )}
          <h1 className="max-w-[720px] font-display text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] md:text-[72px]">
            {contact?.headline}
          </h1>
        </header>
      </FadeIn>

      <section className="mx-auto max-w-6xl border-t border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:gap-16 md:grid-cols-[1fr_1.3fr]">
          <FadeIn once={false}>
            <div>
              <StaggerGroup once={false} className="space-y-6 sm:space-y-8">
                <StaggerItem>
                  <div className="mb-2 text-[13px] text-text-secondary">
                    Email
                  </div>
                  <a
                    href={`mailto:${contact?.email}`}
                    className="break-all font-display text-xl transition-colors hover:text-accent-blue sm:text-2xl"
                  >
                    {contact?.email}
                  </a>
                </StaggerItem>

                {contact?.phone && (
                  <StaggerItem>
                    <div className="mb-2 text-[13px] text-text-secondary">
                      Phone
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-display text-xl transition-colors hover:text-accent-blue sm:text-2xl"
                    >
                      {contact.phone}
                    </a>
                  </StaggerItem>
                )}

                <StaggerItem>
                  <div className="mb-2 text-[13px] text-text-secondary">
                    Location
                  </div>
                  <div className="text-[16px] sm:text-[17px]">{contact?.location}</div>
                </StaggerItem>

                <StaggerItem>
  <div className="mb-3 text-[13px] text-text-secondary">
    Elsewhere
  </div>
  <StaggerGroup once={false} className="flex gap-4">
    {socials.map((s) => (
      <StaggerItem key={s.label}>
        <a
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="text-text-secondary transition-colors hover:text-text-primary"
        >
          <SocialIcon platform={s.platform} size={20} />
        </a>
      </StaggerItem>
    ))}
  </StaggerGroup>
</StaggerItem>
              </StaggerGroup>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} once={false}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}