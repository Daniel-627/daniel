import { Resend } from "resend";
import type { ContactInput } from "./contact";

const SITE = "https://daniel.co.ke";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Telegram alert. Returns true if sent, false if skipped or failed. Never throws. */
export async function sendTelegram(lead: ContactInput): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const about = lead.service || lead.projectType;
  const lines = [
    "📩 <b>New enquiry</b>",
    `<b>Name:</b> ${escapeHtml(lead.name)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    about ? `<b>About:</b> ${escapeHtml(about)}` : null,
    lead.budgetRange ? `<b>Budget:</b> ${escapeHtml(lead.budgetRange)}` : null,
    lead.source ? `<b>From:</b> ${escapeHtml(lead.source)}` : null,
    "",
    escapeHtml(lead.message.length > 600 ? `${lead.message.slice(0, 600)}…` : lead.message),
    "",
    `Inbox: ${SITE}/admin`,
  ].filter((l) => l !== null);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error("Telegram error", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Telegram request failed", err);
    return false;
  }
}

/** Backup email to you. Returns true if sent, false if skipped or failed. Never throws. */
export async function sendLeadEmail(lead: ContactInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return false;

  const details = [
    lead.projectType ? `Project type: ${lead.projectType}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    lead.budgetRange ? `Budget: ${lead.budgetRange}` : null,
    lead.source ? `Source: ${lead.source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.RESEND_FROM || "daniel.co.ke <onboarding@resend.dev>",
      to,
      replyTo: lead.email,
      subject: `New message from ${lead.name} via daniel.co.ke${
        lead.service || lead.projectType ? ` — ${lead.service || lead.projectType}` : ""
      }`,
      text: `From: ${lead.name} (${lead.email})\n${details ? details + "\n" : ""}\n${lead.message}`,
    });
    if (error) console.error("Resend error", error);
    return !error;
  } catch (err) {
    console.error("Resend request failed", err);
    return false;
  }
}
