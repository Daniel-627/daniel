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
      name: "description",
      title: "Short description",
      description: "Used on the homepage teaser.",
      type: "text",
    }),
    defineField({
      name: "extendedBody",
      title: "Extended description",
      description:
        "Used on the full /process page. Write it generally enough to cover both design and development work — separate paragraphs with a blank line.",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Typical duration",
      description: 'e.g. "3–5 days"',
      type: "string",
    }),
    defineField({
      name: "deliverables",
      title: "What you get",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatINeed",
      title: "What I need from you",
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
    select: { title: "label", subtitle: "number" },
  },
});