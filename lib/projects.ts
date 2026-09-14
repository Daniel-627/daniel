export type MetaField = { label: string; value: string; href?: string };
export type DidItem = { task: string; tag: string };
export type GalleryItem = { label: string; layout?: "wide" | "tall" };

export type Project = {
  slug: string;
  title: string;
  category: "development" | "design" | "hybrid";
  filterTags: string[];
  year: string;
  thumbHeight: "h1" | "h2" | "h3" | "h4" | "h5";
  metaFields: MetaField[];
  overview: string[];
  didList: DidItem[];
  gallery: GalleryItem[];
  nextSlug: string;
};

export const projects: Project[] = [
  {
    slug: "confessed",
    title: "Confessed",
    category: "development",
    filterTags: ["Development", "Web Design"],
    year: "26",
    thumbHeight: "h2",
    metaFields: [
      { label: "Role", value: "Design & Development" },
      { label: "Stack", value: "Next.js, TypeScript" },
      { label: "Year", value: "2026" },
      { label: "Live site", value: "confessed.faith ↗", href: "#" },
    ],
    overview: [
      "Confessed is a Reformed/confessional Christian content platform — built to give a scattered community of writers and readers one clear, well-designed home.",
      "I owned the project end to end: structuring the content model, designing the reading and contribution experience, and building it out in Next.js with an eye on speed and long-term maintainability.",
    ],
    didList: [
      { task: "Content architecture & CMS setup", tag: "Planning" },
      { task: "UI design for reading & contribution flows", tag: "Design" },
      { task: "Frontend build in Next.js + TypeScript", tag: "Development" },
      { task: "Contributor submission system", tag: "Development" },
    ],
    gallery: [
      { label: "Screen 1", layout: "wide" },
      { label: "Screen 2" },
      { label: "Screen 3" },
      { label: "Screen 4" },
    ],
    nextSlug: "chefowiti",
  },
  {
    slug: "chefowiti",
    title: "Chefowiti",
    category: "development",
    filterTags: ["Development"],
    year: "26",
    thumbHeight: "h3",
    metaFields: [
      { label: "Role", value: "Design & Development" },
      { label: "Stack", value: "Next.js, Booking & CMS" },
      { label: "Year", value: "2026" },
    ],
    overview: [
      "A booking and content platform built for speed and simple day-to-day content management.",
    ],
    didList: [
      { task: "Booking flow design & build", tag: "Development" },
      { task: "CMS integration", tag: "Development" },
    ],
    gallery: [{ label: "Screen 1", layout: "wide" }, { label: "Screen 2" }],
    nextSlug: "urbnx-design",
  },
  {
    slug: "urbnx-design",
    title: "URBNX Design",
    category: "design",
    filterTags: ["Branding", "Web Design"],
    year: "25",
    thumbHeight: "h1",
    metaFields: [
      { label: "Role", value: "Brand Design" },
      { label: "Deliverables", value: "Identity, Guidelines, Assets" },
      { label: "Year", value: "2025" },
      { label: "Client", value: "URBNX" },
    ],
    overview: [
      "URBNX needed a visual identity that could stretch across content, apparel, and a design portfolio without losing a consistent voice.",
      "I developed the mark, color system, and typography, then documented it all into a guideline set so the identity holds up consistently across every surface it touches — digital, print, and product.",
    ],
    didList: [
      { task: "Logo & mark design", tag: "Identity" },
      { task: "Color system & typography", tag: "Identity" },
      { task: "Brand guidelines document", tag: "Documentation" },
      { task: "Social & merch asset templates", tag: "Application" },
    ],
    gallery: [
      { label: "Logo lockups", layout: "wide" },
      { label: "Color palette", layout: "tall" },
      { label: "Typography" },
      { label: "Business card" },
      { label: "Merch mockup", layout: "wide" },
    ],
    nextSlug: "project-four",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "development",
    filterTags: ["Web Design", "Development"],
    year: "25",
    thumbHeight: "h4",
    metaFields: [
      { label: "Role", value: "Design & Development" },
      { label: "Year", value: "2025" },
    ],
    overview: ["Details for this project are coming soon."],
    didList: [{ task: "Web design & development", tag: "Development" }],
    gallery: [{ label: "Screen 1" }],
    nextSlug: "project-five",
  },
  {
    slug: "project-five",
    title: "Project Five",
    category: "development",
    filterTags: ["Webflow"],
    year: "24",
    thumbHeight: "h2",
    metaFields: [
      { label: "Role", value: "Webflow Development" },
      { label: "Year", value: "2024" },
    ],
    overview: ["Details for this project are coming soon."],
    didList: [{ task: "Webflow build", tag: "Development" }],
    gallery: [{ label: "Screen 1" }],
    nextSlug: "project-six",
  },
  {
    slug: "project-six",
    title: "Project Six",
    category: "development",
    filterTags: ["Web Design"],
    year: "24",
    thumbHeight: "h5",
    metaFields: [
      { label: "Role", value: "Web Design, WordPress" },
      { label: "Year", value: "2024" },
    ],
    overview: ["Details for this project are coming soon."],
    didList: [{ task: "WordPress build", tag: "Development" }],
    gallery: [{ label: "Screen 1" }],
    nextSlug: "project-seven",
  },
  {
    slug: "project-seven",
    title: "Project Seven",
    category: "design",
    filterTags: ["Branding", "Web Design"],
    year: "23",
    thumbHeight: "h1",
    metaFields: [
      { label: "Role", value: "Branding, Web Design" },
      { label: "Year", value: "2023" },
    ],
    overview: ["Details for this project are coming soon."],
    didList: [{ task: "Brand identity", tag: "Identity" }],
    gallery: [{ label: "Screen 1" }],
    nextSlug: "project-eight",
  },
  {
    slug: "project-eight",
    title: "Project Eight",
    category: "development",
    filterTags: ["Development"],
    year: "23",
    thumbHeight: "h3",
    metaFields: [
      { label: "Role", value: "Development" },
      { label: "Year", value: "2023" },
    ],
    overview: ["Details for this project are coming soon."],
    didList: [{ task: "Development", tag: "Development" }],
    gallery: [{ label: "Screen 1" }],
    nextSlug: "confessed",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
