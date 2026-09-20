import FadeIn from "@/components/motion/FadeIn";

export const metadata = {
  title: "Terms of Use — daniel.co.ke",
};

export default function TermsPage() {
  return (
    <FadeIn once={false}>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 md:pt-[120px]">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#c7c7c7]">
          <p>
            This site (daniel.co.ke) is a personal portfolio operated by
            Daniel Ochieng. By using it, you agree to the following.
          </p>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Content &amp; ownership
            </h2>
            <p>
              All project work, case studies, brand assets, and writing
              shown on this site are my own, or shown with permission from
              the relevant client. Nothing here may be reproduced,
              redistributed, or used commercially without written
              permission.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Downloads &amp; resources
            </h2>
            <p>
              Where files or resources are made available for download,
              they&apos;re provided as-is for personal or reference use
              unless stated otherwise. I&apos;m not responsible for how
              they&apos;re used once downloaded.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              External links
            </h2>
            <p>
              This site links to external services and projects (client
              sites, social platforms, hosted apps). I&apos;m not
              responsible for the content, availability, or practices of
              those external sites.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              No warranty
            </h2>
            <p>
              This site is provided as-is. While I aim to keep it accurate
              and available, I make no guarantees about uptime, error-free
              operation, or that information here is always current.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of Kenya.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Changes
            </h2>
            <p>
              These terms may be updated from time to time; the date above
              reflects the latest revision.
            </p>
          </section>
        </div>
      </div>
    </FadeIn>
  );
}