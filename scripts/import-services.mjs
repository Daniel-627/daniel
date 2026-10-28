import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const WRITE = process.argv.includes("--write");
// If your schema calls the number field "number" instead of "num", change this.
const NUM_FIELD = "num";

const client = createClient({
  projectId: "k3jt4ps9",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const services = [
  {
    slug: "branding-design",
    num: "01",
    title: "Branding & Design",
    featured: true,
    tagline: "Visual identity, graphics, and web design that gives a business a clear, consistent look.",
    startingPriceKsh: "From KSh 8,000",
    startingPriceUsd: "From $150",
    features: [
      "Logo design (2–3 concepts)",
      "Color palette & typography",
      "Basic brand usage guide",
      "Full identity system available",
    ],
  },
  {
    slug: "development",
    num: "02",
    title: "Development",
    featured: true,
    tagline: "Interfaces and products built with React and Next.js that hold up as the product grows.",
    startingPriceKsh: "From KSh 20,000",
    startingPriceUsd: "From $400",
    features: [
      "Responsive, fast-loading build",
      "CMS-powered content (Sanity)",
      "Basic SEO setup",
      "M-Pesa/Daraja integration available",
    ],
  },
  {
    slug: "full-custom-package",
    num: "03",
    title: "Full / Custom Package",
    featured: true,
    tagline: "Design through deployment, or a revamp of what's already there — scoped to fit from scratch, changes, or a full rebuild.",
    startingPriceKsh: "From KSh 60,000",
    startingPriceUsd: "From $1,200",
    features: [
      "Brand + build in one engagement",
      "Single point of contact, start to finish",
      "Scope set after a discovery call",
    ],
  },
  {
    slug: "logo-poster-design",
    title: "Logo & Poster Design",
    featured: false,
    category: "design",
    tagline: "Standalone design work — a logo, a poster, event graphics — without the full brand system.",
    startingPriceKsh: "From KSh 3,000",
    startingPriceUsd: "From $50",
    features: [
      "Logo only",
      "Event/promo posters",
      "Social media graphics",
      "Fast turnaround (2–4 days)",
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    featured: false,
    category: "web-apps",
    tagline: "A single, focused page built to convert — for a launch, a campaign, or a product.",
    startingPriceKsh: "From KSh 12,000",
    startingPriceUsd: "From $250",
    features: [
      "One page, built fast",
      "Mobile-first, conversion-focused",
      "Analytics wired in",
      "Delivered in 3–5 days",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    featured: false,
    category: "web-apps",
    tagline: "iOS and Android apps — for a business, a service, or a product idea.",
    startingPriceKsh: "From KSh 120,000",
    startingPriceUsd: "From $2,500",
    features: [
      "Cross-platform (React Native)",
      "Push notifications",
      "Backend/API included",
      "App store submission support",
    ],
  },
  {
    slug: "pos-systems",
    title: "Point of Sale (POS) Systems",
    featured: false,
    category: "business-systems",
    tagline: "Custom checkout and inventory systems built for how a specific business actually sells.",
    startingPriceKsh: "From KSh 100,000",
    startingPriceUsd: "From $2,000",
    features: [
      "Sales & inventory tracking",
      "M-Pesa integration",
      "Receipt printing support",
      "Multi-user/staff accounts",
    ],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    featured: false,
    category: "business-systems",
    tagline: "Track leads, clients, and follow-ups in one place built around your actual sales process.",
    startingPriceKsh: "From KSh 90,000",
    startingPriceUsd: "From $1,800",
    features: [
      "Contact & pipeline tracking",
      "Task/follow-up reminders",
      "Custom reporting",
      "Role-based access",
    ],
  },
  {
    slug: "erp-business-management",
    title: "ERP / Business Management Systems",
    featured: false,
    category: "business-systems",
    tagline: "Operations, inventory, staff, and finance in one connected system — scoped to the business.",
    startingPriceKsh: "From KSh 180,000",
    startingPriceUsd: "From $3,500",
    features: [
      "Modular — build what's needed first",
      "Multi-department access",
      "Custom reporting dashboards",
      "Scales as the business grows",
    ],
  },
  {
    slug: "networking-infrastructure",
    title: "Networking & Infrastructure Setup",
    featured: false,
    category: "infrastructure",
    tagline: "Office and business network setup — connectivity, security, and systems that actually talk to each other.",
    startingPriceKsh: "From KSh 25,000",
    startingPriceUsd: "From $500",
    features: [
      "LAN/WiFi setup & config",
      "Security hardening",
      "Server/device setup",
      "Remote support available",
    ],
  },
];

for (const [i, s] of services.entries()) {
  const found = await client.fetch(
    `*[_type=="service" && title==$title][0]._id`,
    { title: s.title }
  );
  const id = (found ?? `service-${s.slug}`).replace(/^drafts\./, "");
  console.log(`${found ? "UPDATE" : "CREATE"}  ${s.title}  (${id})`);
  if (!WRITE) continue;

  await client.createIfNotExists({ _id: id, _type: "service", title: s.title });

  const set = {
    title: s.title,
    featured: s.featured,
    tagline: s.tagline,
    startingPriceKsh: s.startingPriceKsh,
    startingPriceUsd: s.startingPriceUsd,
    features: s.features,
    order: i + 1,
  };
  if (s.category) set.category = s.category;
  if (s.num) set[NUM_FIELD] = s.num;

  await client.patch(id).set(set).commit();
}

console.log(WRITE ? "Done. Open the Studio and Publish." : "Dry run only. Add --write to apply.");