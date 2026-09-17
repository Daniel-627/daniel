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
      name: "platform",
      title: "Platform",
      description: "Controls which icon is shown.",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "X / Twitter", value: "x" },
          { title: "Instagram", value: "instagram" },
          { title: "Email", value: "email" },
          { title: "Other / Generic link", value: "other" },
        ],
        layout: "radio",
      },
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
    select: { title: "label", subtitle: "platform" },
  },
});