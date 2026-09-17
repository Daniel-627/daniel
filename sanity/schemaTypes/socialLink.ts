import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
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
          // Dev
          { title: "GitHub", value: "github" },
          { title: "GitLab", value: "gitlab" },
          { title: "CodePen", value: "codepen" },
          { title: "Stack Overflow", value: "stackoverflow" },
          { title: "Dev.to", value: "devto" },
          { title: "Hashnode", value: "hashnode" },
          // Design
          { title: "Behance", value: "behance" },
          { title: "Dribbble", value: "dribbble" },
          { title: "Figma", value: "figma" },
          { title: "ArtStation", value: "artstation" },
          // Social / general
          { title: "LinkedIn", value: "linkedin" },
          { title: "X / Twitter", value: "x" },
          { title: "Instagram", value: "instagram" },
          { title: "Threads", value: "threads" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Pinterest", value: "pinterest" },
          { title: "Medium", value: "medium" },
          { title: "Substack", value: "substack" },
          { title: "Discord", value: "discord" },
          { title: "Telegram", value: "telegram" },
          { title: "WhatsApp", value: "whatsapp" },
          // Freelance / commerce
          { title: "Upwork", value: "upwork" },
          { title: "Fiverr", value: "fiverr" },
          { title: "Gumroad", value: "gumroad" },
          { title: "Patreon", value: "patreon" },
          { title: "Buy Me a Coffee", value: "bmc" },
          // Utility
          { title: "Email", value: "email" },
          { title: "Other / Generic link", value: "other" },
        ],
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