import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStep",
  title: "Process Step",
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
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "number" },
  },
});
