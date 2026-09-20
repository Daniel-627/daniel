import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/motion/FadeIn";

export const metadata = {
  title: "Privacy Policy — daniel.co.ke",
};

export default function PrivacyPage() {
  return (
    <FadeIn once={false}>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 md:pt-[120px]">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#c7c7c7]">
          <p>
            This site (daniel.co.ke) is operated by Daniel Ochieng. This
            policy explains what information is collected here, how it&apos;s
            used, and the choices you have — in line with Kenya&apos;s Data
            Protection Act, 2019.
          </p>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              What I collect
            </h2>
            <p className="mb-2">
              <strong className="text-text-primary">Contact form.</strong> If
              you submit the contact form, I collect your name, email
              address, and message content. This is sent via Resend
              directly to my inbox and used solely to respond to your
              enquiry — it isn&apos;t added to a mailing list or shared with
              anyone else.
            </p>
            <p>
              <strong className="text-text-primary">Analytics.</strong> This
              site uses Vercel Analytics to understand general traffic
              patterns — pages visited, approximate location (country/region
              level), and device type. This data is aggregated and
              anonymized; it does not use cookies and does not identify you
              individually.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              How it&apos;s used
            </h2>
            <p>
              Contact form submissions are used only to reply to you.
              Analytics data is used only to understand which pages and
              content are useful, so the site can be improved over time.
              Neither is sold, rented, or shared with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Third-party services
            </h2>
            <p>
              This site relies on a few external services to function:
              Resend (sends contact form emails), Sanity (content
              management — no personal data from visitors is stored here),
              and Vercel (hosting and anonymized analytics). Each has its
              own privacy practices governing the data it processes on my
              behalf.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Your rights
            </h2>
            <p>
              Under the Data Protection Act, 2019, you have the right to ask
              what personal data I hold about you (limited, in practice, to
              contact form submissions), request it be corrected or deleted,
              and object to its processing. To exercise any of these, email
              me at{" "}
              <a
                href="mailto:hello@daniel.co.ke"
                className="text-text-primary underline decoration-text-secondary underline-offset-2 hover:decoration-accent-blue"
              >
                hello@daniel.co.ke
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-medium text-text-primary">
              Changes to this policy
            </h2>
            <p>
              If what this site collects or how it&apos;s used changes,
              this page will be updated with a new &ldquo;last updated&rdquo;
              date above.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <CtaButton href="/contact">Get in touch</CtaButton>
        </div>
      </div>
    </FadeIn>
  );
}