export const FEATURED_PROJECTS_QUERY = /* groq */ `
*[_type == "project"] | order(order asc) [0...4] {
  "slug": slug.current,
  title,
  category,
  filterTags,
  year,
  thumbnail,
  "thumbAspect": thumbnail.asset->metadata.dimensions.aspectRatio
}
`;

export const ALL_PROJECTS_QUERY = /* groq */ `
*[_type == "project"] | order(order asc) {
  "slug": slug.current,
  title,
  category,
  filterTags,
  year,
  thumbnail,
  "thumbAspect": thumbnail.asset->metadata.dimensions.aspectRatio
}
`;

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  category,
  filterTags,
  year,
  heroImage,
  metaFields,
  overview,
  didList,
  gallery,
  "nextProject": nextProject->{"slug": slug.current, title}
}
`;

export const TESTIMONIALS_QUERY = /* groq */ `
*[_type == "testimonial"] | order(order asc) {
  quote,
  name,
  role,
  avatar
}
`;

export const CLIENT_LOGOS_QUERY = /* groq */ `
*[_type == "clientLogo"] | order(order asc) {
  name,
  logo,
  url
}
`;

export const SERVICES_QUERY = /* groq */ `
*[_type == "service"] | order(order asc) {
  "num": number,
  title,
  body
}
`;

export const PROCESS_STEPS_QUERY = /* groq */ `
*[_type == "processStep"] | order(order asc) {
  "num": number,
  label,
  description
}
`;

export const SOCIAL_LINKS_QUERY = /* groq */ `
*[_type == "socialLink"] | order(order asc) {
  label,
  platform,
  url
}
`;

export const SKILLS_QUERY = /* groq */ `
*[_type == "skill"] | order(order asc) {
  label,
  value
}
`;

export const TIMELINE_QUERY = /* groq */ `
*[_type == "timelineEntry"] | order(order asc) {
  year,
  title,
  body
}
`;

export const ABOUT_PAGE_QUERY = /* groq */ `
*[_type == "aboutPage"][0]{
  headline,
  intro
}
`;

export const PROCESS_STEPS_DETAILED_QUERY = /* groq */ `
*[_type == "processStep"] | order(order asc) {
  "num": number,
  label,
  extendedBody,
  duration,
  deliverables,
  whatINeed
}
`;