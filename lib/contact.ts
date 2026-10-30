import { createHash } from "node:crypto";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  projectType: string | null;
  budgetRange: string | null;
  service: string | null;
  source: string | null;
};

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters (including CR/LF) and trim.
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function validateContact(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request" };
  const b = body as Record<string, unknown>;

  const name = clean(b.name, 100).replace(/[\r\n]+/g, " ");
  const email = clean(b.email, 200).replace(/[\r\n]+/g, "");
  const message = clean(b.message, 5000);

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!EMAIL.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5) return { ok: false, error: "Please write a short message." };

  const source = clean(b.source, 40);

  return {
    ok: true,
    data: {
      name,
      email,
      message,
      projectType: clean(b.projectType, 100) || null,
      budgetRange: clean(b.budgetRange, 100) || null,
      service: clean(b.service, 120) || null,
      source: /^[a-z0-9-]{1,40}$/i.test(source) ? source : null,
    },
  };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

/** One-way hash so rate limiting works without storing raw IP addresses. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "daniel.co.ke";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
