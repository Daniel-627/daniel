import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";

export default async function JsonLd() {
  const socials: { url: string }[] = await client.fetch(SOCIAL_LINKS_QUERY);
  const sameAs = socials
    .map((s) => s.url)
    .filter((u) => /^https?:\/\//.test(u) && !u.includes("wa.me"));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://daniel.co.ke/#person",
        name: "Daniel Ochieng",
        url: "https://daniel.co.ke",
        image: "https://daniel.co.ke/logo.png",
        jobTitle: "Designer & Developer",
        address: { "@type": "PostalAddress", addressCountry: "KE" },
        sameAs,
        knowsAbout: [
          "Web development",
          "Next.js",
          "React",
          "Brand identity design",
          "Logo design",
          "M-Pesa payment integration",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://daniel.co.ke/#service",
        name: "Daniel Ochieng, Designer & Developer",
        url: "https://daniel.co.ke",
        provider: { "@id": "https://daniel.co.ke/#person" },
        serviceType: [
          "Brand identity design",
          "Website design and development",
          "Web app development",
          "M-Pesa payment integration",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}