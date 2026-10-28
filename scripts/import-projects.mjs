import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const WRITE = process.argv.includes("--write");

const client = createClient({
  projectId: "k3jt4ps9",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 12);
const block = (text) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});
const meta = (label, value, href) => ({
  _type: "metaField",
  _key: key(),
  label,
  value,
  ...(href ? { href } : {}),
});
const did = (task, tag) => ({ _type: "didItem", _key: key(), task, tag });

const projects = [
  {
    slug: "confessed",
    title: "Confessed",
    category: "hybrid",
    filterTags: ["Development", "Branding"],
    year: "26",
    next: "confessed-contribute",
    metaFields: [
      meta("Role", "Fullstack Development & Brand Identity"),
      meta("Stack", "Next.js, Hono, PostgreSQL"),
      meta("Year", "2026"),
      meta("Live site", "confessed.faith ↗", "https://confessed.faith"),
    ],
    overview: [
      "Confessed is a Reformed Baptist content platform I designed and built end to end: the brand, a Next.js web app, a Hono API, and online giving.",
      "It brings articles across eight content series, a free resource library, a member dashboard, a newsletter and giving under one brand. The dark navy and gold identity, built around an architectural cross mark, carries from a phone notification to a printed conference banner.",
      "Under the surface is a Next.js 16 frontend and a separate Hono API on Neon PostgreSQL with Drizzle ORM. Clerk handles sign-in, while roles live in my own database, so access control doesn't depend on any one provider. Every sensitive action goes into an audit log.",
      "Readers can create an account, set their reading preferences, subscribe to the newsletter and send a contributor application. Gifts are taken by M-Pesa and card through Paystack, with PayPal for dollars. The browser redirect and the webhook are only hints: the API re-verifies every payment with the provider and sends the receipt once.",
      "Pages are statically regenerated every 60 seconds so reading stays fast, and the free resource library is managed from Sanity.",
    ],
    didList: [
      ["Brand identity: name, cross mark, navy and gold system", "Identity"],
      ["Brand guidelines and full project guide", "Documentation"],
      ["Content architecture: 8 series and an audience pipeline", "Planning"],
      ["UI design for reading, giving, apply and dashboard flows", "Design"],
      ["Frontend in Next.js 16 and TypeScript", "Development"],
      ["REST API in Hono", "Development"],
      ["Database design with Drizzle migrations", "Development"],
      ["Authentication and role system (Clerk, Drizzle, Postgres)", "Development"],
      ["Contributor application form", "Development"],
      ["Audit logging for sensitive actions", "Development"],
      ["Donations: Paystack (M-Pesa, card) and PayPal", "Development"],
      ["Branded email with Resend: 9 templates", "Development"],
      ["Newsletter, contact form and resource library (Sanity)", "Development"],
      ["Deployment on Vercel", "Infrastructure"],
    ],
  },
  {
    slug: "confessed-contribute",
    title: "Confessed Contribute",
    category: "development",
    filterTags: ["Development"],
    year: "26",
    next: "confessed-mobile",
    metaFields: [
      meta("Role", "Design & Fullstack Development"),
      meta("Stack", "React, Vite, TypeScript"),
      meta("Year", "2026"),
      meta("Live site", "contribute.confessed.faith ↗", "https://contribute.confessed.faith"),
      meta("Part of", "Confessed ↗", "https://daniel.co.ke/projects/confessed"),
    ],
    overview: [
      "Confessed Contribute is a role-gated editorial portal I built in React and Vite for writing, publishing and moderating articles on the Confessed platform.",
      "It's the publishing side of Confessed, kept as a separate app on its own subdomain so readers never see editor or admin interface. Approved writers draft and publish articles, and administrators run the platform from one console.",
      "Access follows the role. A member who signs in lands on a gate screen with a path to apply, contributors get a Markdown editor with live preview, series, excerpt and tags, and admins get a six-tab console. Role checks happen in the app and again on every API route.",
      "The editor creates the article on first save and autosaves drafts every 30 seconds, so a refresh never loses work. Admins review contributor applications with a reason, change roles, suspend users, suspend and reinstate articles, send bulk email, manage the newsletter list and upload resource PDFs to Sanity.",
      "It runs on the same Hono API and Clerk identity as the main site, and every moderation action lands in the audit log.",
    ],
    didList: [
      ["Role-gated routing for members, contributors and admins", "Development"],
      ["Gate screen with an apply path for members", "Design"],
      ["Sign-in with Clerk and a JWT on every API call", "Development"],
      ["Contributor dashboard with draft and published lists", "Design"],
      ["Markdown editor with live preview, series, excerpt and tags", "Development"],
      ["Draft autosave every 30 seconds", "Development"],
      ["Admin console with six tabs", "Design"],
      ["Application review: approve or reject with a reason", "Development"],
      ["User management: change roles, suspend, reactivate", "Development"],
      ["Article moderation: suspend with a reason, reinstate", "Development"],
      ["Bulk email composer", "Development"],
      ["Resource library manager with PDF upload to Sanity", "Development"],
      ["Newsletter subscriber management", "Development"],
      ["Deployment on Vercel", "Infrastructure"],
    ],
  },
  {
    slug: "confessed-mobile",
    title: "Confessed Mobile",
    category: "development",
    filterTags: ["Development"],
    year: "26",
    next: "lisa-hospitals-his",
    metaFields: [
      meta("Role", "Design & Mobile Development"),
      meta("Stack", "React Native, Expo, TypeScript"),
      meta("Year", "2026"),
      meta("Platform", "Android (iOS configured)"),
      meta("Part of", "Confessed ↗", "https://daniel.co.ke/projects/confessed"),
    ],
    overview: [
      "Confessed Mobile is the React Native app for the Confessed platform, built with Expo to bring articles, series and study resources to a phone.",
      "It's a native port of the Confessed web app: the same navy and gold identity, the same copy, and the same API, in a five-tab layout for Home, Articles, Resources, Account and More.",
      "Readers can browse and filter articles by series, read them in a Markdown reader, download free study resources from Sanity, subscribe to the newsletter and send a message through the contact form. Signed-in members edit their profile and reading preferences.",
      "Sign-in uses Clerk with email and a verification code, or Google, and the session is kept in secure storage. Public screens call the API without a token, and account screens attach the Clerk session token.",
      "Writing stays on the web: contributor and apply links open in the in-app browser. Builds run through EAS, with an internal Android APK for testing and a shrunk production bundle for release.",
    ],
    didList: [
      ["Mobile design system: navy and gold tokens, EB Garamond and Barlow", "Design"],
      ["Five-tab navigation: Home, Articles, Resources, Account, More", "Design"],
      ["Article reader with Markdown rendering and series filter", "Development"],
      ["Home screen with latest articles, series showcase and newsletter signup", "Development"],
      ["Resource library fed from Sanity", "Development"],
      ["Authentication: email with verification code, and Google (Clerk)", "Development"],
      ["Secure session storage", "Development"],
      ["Account screen: profile and reading preferences", "Development"],
      ["Contact form, About and Statement of Faith screens", "Development"],
      ["Coming-soon screens for Videos, Podcasts and Shop", "Design"],
      ["Deep linking with the confessed:// scheme", "Development"],
      ["EAS build profiles: internal APK and production bundle", "Infrastructure"],
    ],
  },
  {
    slug: "lisa-hospitals-his",
    title: "Lisa HIS",
    category: "development",
    filterTags: ["Development"],
    year: "26",
    next: "majeurs",
    metaFields: [
      meta("Role", "Design & Fullstack Development"),
      meta("Stack", "Next.js, Express, PostgreSQL"),
      meta("Year", "2026"),
      meta("Type", "Concept project"),
    ],
    overview: [
      "Lisa HIS is a hospital information system concept I designed and built: a public site, a patient portal, and a staff system from check-in to billing.",
      "It covers 12 departments and 9 user roles. Visitors get a public hospital website, patients get a portal to book appointments and see results and invoices, and staff work a live queue from check-in and triage through consultation, lab, radiology, pharmacy, admission and billing.",
      "Behind it is a Next.js 16 frontend and an Express API on Neon PostgreSQL with Drizzle ORM, with about 100 endpoints and 30 tables. Clerk handles sign-in, and each person's role is stored in the hospital's own database.",
      "Access is treated as the product. Records are visible only to assigned clinicians. A doctor can request access from the treating doctor, or use a time-limited emergency grant that needs a reason, and every grant and sensitive action is written to an audit log.",
      "Billing is automatic and can't double-charge. Each consultation, lab order, medicine and ward day becomes an invoice line exactly once, priced from the price list, and unpriced items are flagged instead of forgotten. Patients can pay online by M-Pesa or card through Paystack, with signature-verified webhooks and payments re-checked with the provider.",
      "The public pages are built to be found, with structured data for the hospital, doctors, departments and FAQs, a sitemap, and an llms.txt file for AI assistants.",
    ],
    didList: [
      ["Public hospital website: departments, doctors, news, FAQ, contact", "Design"],
      ["Patient portal: appointments, results, invoices, documents, admissions", "Design"],
      ["Staff workspace: check-in, queue, triage, consultation, lab, radiology, pharmacy", "Design"],
      ["Five-level triage with a live department queue", "Development"],
      ["Consultations, prescriptions, lab and radiology orders and results", "Development"],
      ["Admissions and discharge summaries", "Development"],
      ["Automatic billing from a price list", "Development"],
      ["Insurance claims tracking (SHA, Maki, AON, M-Tiba)", "Development"],
      ["Online payments with Paystack (M-Pesa, card)", "Development"],
      ["Role-based access, doctor sharing and emergency access", "Development"],
      ["Audit log with IP and device", "Development"],
      ["Admin tools: users, news, enquiries, audit viewer", "Development"],
      ["Database design: 30 tables with sequence-based numbering", "Development"],
      ["Structured data, sitemap, robots and llms.txt", "Development"],
      ["Deployment on Vercel and Render", "Infrastructure"],
    ],
  },
  {
    slug: "majeurs",
    title: "Majeurs",
    category: "development",
    filterTags: ["Web Design", "Development"],
    year: "26",
    next: "confessed",
    metaFields: [
      meta("Role", "Design & Fullstack Development"),
      meta("Stack", "Next.js, Supabase, Tailwind"),
      meta("Year", "2026"),
      meta("Client", "Majeurs Ltd"),
      // Add this line only when the real site is live:
      // meta("Live site", "majeurs.co.ke ↗", "https://majeurs.co.ke"),
    ],
    overview: [
      "Majeurs is an accounting and tax firm website I designed and built, with live chat, a staff inbox, lead capture and free Kenyan tax calculators.",
      "Majeurs is a Nairobi firm offering accounting, tax, payroll, audit, advisory and financial reporting. It needed a site that explains six services clearly, answers visitors on the spot, and turns interest into conversations instead of letting it vanish in a contact form.",
      "Beyond the service and industry pages, I built what makes it work as a front desk: a live chat widget, a private staff inbox that updates in real time, a lead pipeline, six free calculators and a tax-deadline calendar, with plain-language articles on VAT, PAYE and audits.",
      "If nobody replies to a chat within five minutes, the visitor automatically gets a message asking them to call, and staff are alerted on Telegram as soon as a chat or consultation request arrives.",
      "The database is closed to the public. Visitors reach it only through server routes that validate input and rate-limit chats and forms, IP addresses are stored only as a keyed hash, and row-level security leaves access to logged-in staff.",
      "Tax deadlines are stored as rules, such as VAT on the 20th, so the calendar always calculates the next due date from today instead of going stale. Built with Next.js 16, Supabase, Upstash QStash and MDX, and hosted on Vercel.",
    ],
    didList: [
      ["Brand look: navy and blue palette, Fraunces and Inter type", "Design"],
      ["Site structure: services, industries, resources, tools", "Planning"],
      ["Six service pages and four industry pages", "Development"],
      ["Live chat widget with saved conversations", "Development"],
      ["Five-minute fallback reply for unanswered chats", "Development"],
      ["Telegram alerts for new chats and requests", "Development"],
      ["Staff inbox with real-time updates and overdue flags", "Development"],
      ["Lead inbox: new, contacted, closed", "Development"],
      ["Consultation request form with spam protection", "Development"],
      ["Six calculators: VAT, PAYE, profit margin, loan, break-even, expenses", "Development"],
      ["Tax calendar computed from rules", "Development"],
      ["Six MDX articles on tax and compliance", "Content"],
      ["Supabase database, auth and row-level security", "Development"],
      ["Sitemap, robots and structured data", "Development"],
      ["Deployment on Vercel", "Infrastructure"],
    ],
  },
];

const ids = {};

for (const p of projects) {
  const found = await client.fetch(
    `*[_type=="project" && slug.current==$slug][0]._id`,
    { slug: p.slug }
  );
  const id = (found ?? `project-${p.slug}`).replace(/^drafts\./, "");
  ids[p.slug] = id;
  console.log(`${found ? "UPDATE" : "CREATE"}  ${p.slug}  (${id})`);
  if (!WRITE) continue;

  // New documents get category, tags and year. Existing ones keep theirs.
  await client.createIfNotExists({
    _id: id,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    category: p.category,
    filterTags: p.filterTags,
    year: p.year,
  });

  await client
    .patch(id)
    .set({
      metaFields: p.metaFields,
      overview: p.overview.map(block),
      didList: p.didList.map(([task, tag]) => did(task, tag)),
    })
    .commit();
}

if (WRITE) {
  for (const p of projects) {
    await client
      .patch(ids[p.slug])
      .set({ nextProject: { _type: "reference", _ref: ids[p.next] } })
      .commit();
  }
  console.log("Done. Open the Studio, add images and the order number, then Publish.");
} else {
  console.log("Dry run only. Add --write to apply.");
}