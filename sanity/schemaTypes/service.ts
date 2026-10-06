import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number label",
      description: 'Shown as-is, e.g. "01".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Description",
      description: "Used on the homepage teaser cards.",
      type: "text",
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Services page)",
      description: "One short line under the title on the full /services page.",
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
    select: { title: "title", subtitle: "number" },
  },
});