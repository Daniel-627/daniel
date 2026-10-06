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
      description: "On: appears on the homepage and at the top of /services. Off: appears only further down the /services page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Services page)",
      type: "string",
    }),
    defineField({
      name: "startingPriceKsh",
      title: "Starting price (KSh)",
      description: 'e.g. "From KSh 20,000"',
      type: "string",
    }),
    defineField({
      name: "startingPriceUsd",
      title: "Starting price (USD)",
      description: 'e.g. "From $400"',
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
    select: { title: "title", subtitle: "tagline", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
      };
    },
  },
});