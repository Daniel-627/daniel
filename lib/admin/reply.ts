import type { Lead } from "@/lib/db/schema";

const WHATSAPP = "+254 745 253 664";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function quote(text: string, max = 600) {
  const t = text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
  return t
    .split(/\r?\n/)
    .map((l) => `> ${l}`)
    .join("\n");
}

/** Plain-text reply template. Your Zoho signature is added below it automatically. */
export function buildReply(lead: Lead): { subject: string; body: string } {
  const about = lead.service || lead.projectType;
  const subject = "Re: your message to daniel.co.ke";

  const body = [
    `Hi ${firstName(lead.name)},`,
    "",
    `Thanks for getting in touch${about ? ` about ${about}` : ""}. I've read your message and I'd like to understand a bit more before suggesting the best way forward.`,
    "",
    "A few quick questions:",
    "1. What is the main thing you want this to achieve?",
    "2. Do you have a deadline or launch date in mind?",
    "3. Is there anything existing (brand, website, content) I should look at?",
    "",
    `If it's easier to talk, reply with a time that suits you, or message me on WhatsApp (${WHATSAPP}) and we'll set up a short call.`,
    "",
    "Best regards,",
    "",
    "",
    `On ${lead.createdAt.toISOString().slice(0, 10)}, ${lead.name} wrote:`,
    quote(lead.message),
  ].join("\n");

  return { subject, body };
}

/**
 * Opens the Zoho Mail composer with the template filled in.
 * Set ZOHO_MAIL_URL if your Zoho account is on another data centre
 * (e.g. https://mail.zoho.eu or https://mail.zoho.in).
 */
export function zohoComposeUrl(lead: Lead): string {
  const base = (process.env.ZOHO_MAIL_URL || "https://mail.zoho.com").replace(/\/$/, "");
  const { subject, body } = buildReply(lead);
  const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `${base}/zm/#compose?extsrc=mailto&mailto=${encodeURIComponent(mailto)}`;
}
