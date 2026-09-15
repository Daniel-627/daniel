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
