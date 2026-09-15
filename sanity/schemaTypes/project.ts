import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "Design", value: "design" },
          { title: "Hybrid", value: "hybrid" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterTags",
      title: "Filter tags",
      description:
        "Used by the Projects page filter buttons (Web Design, Development, Webflow, Branding, etc).",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "year",
      title: "Year (short)",
      description: 'Two-digit year shown as "/26" on cards.',
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first in Selected Work.",
      type: "number",
    }),
    defineField({
      name: "thumbnail",
      title: "Card thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "metaFields",
      title: "Meta row",
      description:
        "Flexible label/value pairs under the title — e.g. Role, Stack or Deliverables, Year, Live site or Client.",
      type: "array",
      of: [
        {
          type: "object",
          name: "metaField",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
            defineField({ name: "href", title: "Link (optional)", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "didList",
      title: "What I did",
      type: "array",
      of: [
        {
          type: "object",
          name: "didItem",
          fields: [
            defineField({ name: "task", type: "string" }),
            defineField({ name: "tag", type: "string" }),
          ],
          preview: { select: { title: "task", subtitle: "tag" } },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            defineField({
              name: "layout",
              title: "Layout (design category only)",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Wide", value: "wide" },
                  { title: "Tall", value: "tall" },
                ],
              },
            }),
          ],
          preview: { select: { media: "image", subtitle: "layout" } },
        },
      ],
    }),
    defineField({
      name: "nextProject",
      title: "Next project",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
  },
});
