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
      <FadeIn>
        <header className="mx-auto max-w-6xl px-8 pb-16 pt-24 md:pt-[120px]">
          {contact?.availability && (
            <div className="mb-5 flex items-center gap-2 text-sm text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
              {contact.availability}
            </div>
          )}
          <h1 className="max-w-[720px] font-display text-[44px] font-semibold leading-[1.05] tracking-tight md:text-[72px]">
            {contact?.headline}
          </h1>
        </header>
      </FadeIn>

      <section className="mx-auto max-w-6xl border-t border-border px-8 py-20">
        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
          <FadeIn>
            <div>
              <StaggerGroup className="space-y-8">
                <StaggerItem>
                  <div className="mb-2 text-[13px] text-text-secondary">
                    Email
                  </div>
                  <a
                    href={`mailto:${contact?.email}`}
                    className="font-display text-2xl transition-colors hover:text-accent-blue"
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
                      className="font-display text-2xl transition-colors hover:text-accent-blue"
                    >
                      {contact.phone}
                    </a>
                  </StaggerItem>
                )}

                <StaggerItem>
                  <div className="mb-2 text-[13px] text-text-secondary">
                    Location
                  </div>
                  <div className="text-[17px]">{contact?.location}</div>
                </StaggerItem>

                <StaggerItem>
                  <div className="mb-3 text-[13px] text-text-secondary">
                    Elsewhere
                  </div>
                  <div className="flex gap-4">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="text-text-secondary transition-colors hover:text-text-primary"
                      >
                        <SocialIcon platform={s.platform} size={20} />
                      </a>
                    ))}
                  </div>
                </StaggerItem>
              </StaggerGroup>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}