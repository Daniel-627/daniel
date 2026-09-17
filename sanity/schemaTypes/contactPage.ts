import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (optional)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability note",
      description: 'e.g. "Currently available for new projects"',
      type: "string",
    }),
  ],
  preview: {
    select: { title: "headline" },
  },
});