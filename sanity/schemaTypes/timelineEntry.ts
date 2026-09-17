import { defineField, defineType } from "sanity";

export default defineType({
  name: "timelineEntry",
  title: "Timeline Entry",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      description: 'e.g. "2026" or "Earlier"',
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
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});