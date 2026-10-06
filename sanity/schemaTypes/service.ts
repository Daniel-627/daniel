import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number label",
      description: 'Shown as-is, e.g. "01". Only needed for featured services.',
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Short description",
      description: "Used on the homepage teaser cards (featured services only).",
      type: "text",
    }),
    defineField({
      name: "featured",
      title: "Featured (core service)",
      description: "On: appears on the homepage and at the top of /services. Off: grouped by category further down the page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category (additional services only)",
      description: "Groups non-featured services under a heading on /services.",
      type: "string",
      options: {
  list: [
    { title: "Design", value: "design" },
    { title: "Web & Apps", value: "web-apps" },
    { title: "No-Code & Platform Builds", value: "platform-builds" },
    { title: "Business Systems", value: "business-systems" },
    { title: "Infrastructure & Other", value: "infrastructure" },
  ],
},
      hidden: ({ document }) => Boolean(document?.featured),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Services page)",
      type: "string",
    }),
    defineField({
      name: "startingPriceKsh",
      title: "Starting price (KSh)",
      type: "string",
    }),
    defineField({
      name: "startingPriceUsd",
      title: "Starting price (USD)",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return { title: featured ? `★ ${title}` : title, subtitle };
    },
  },
});