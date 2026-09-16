import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: 'e.g. "GitHub", "LinkedIn", "X / Twitter"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});