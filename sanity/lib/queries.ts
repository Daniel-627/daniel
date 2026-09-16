export const FEATURED_PROJECTS_QUERY = /* groq */ `
*[_type == "project"] | order(order asc) [0...4] {
  "slug": slug.current,
  title,
  category,
  filterTags,
  year,
  thumbnail
}
`;

export const ALL_PROJECTS_QUERY = /* groq */ `
*[_type == "project"] | order(order asc) {
  "slug": slug.current,
  title,
  category,
  filterTags,
  year,
  thumbnail
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
  label
}
`;