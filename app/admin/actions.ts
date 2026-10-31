"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { deleteLead, isLeadStatus, setLeadNotes, setLeadStatus, setReplied } from "@/lib/db/leads";
import { requireAdmin, startSession, endSession } from "@/lib/admin/auth";
import { passwordMatches } from "@/lib/admin/session";
import { clientIp, hashIp } from "@/lib/contact";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Best-effort brute-force guard. Serverless instances don't share memory,
// so this slows guessing down but the long password is the real protection.
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 5;

export type LoginState = { error?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  await new Promise((r) => setTimeout(r, 500)); // slow down guessing

  const key = hashIp(clientIp(await headers()));
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && now - entry.first > WINDOW_MS) attempts.delete(key);
  const current = attempts.get(key);
  if (current && current.count >= MAX_ATTEMPTS) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    attempts.set(key, {
      count: (current?.count ?? 0) + 1,
      first: current?.first ?? now,
    });
    return { error: "Wrong password." };
  }

  attempts.delete(key);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

function leadId(formData: FormData): string | null {
  const id = String(formData.get("id") ?? "");
  return UUID.test(id) ? id : null;
}

export async function updateStatus(formData: FormData) {
  await requireAdmin();
  const id = leadId(formData);
  const status = formData.get("status");
  if (!id || !isLeadStatus(status)) return;
  await setLeadStatus(getDb(), id, status);
  revalidatePath("/admin");
}

export async function markReplied(formData: FormData) {
  await requireAdmin();
  const id = leadId(formData);
  if (!id) return;
  await setReplied(getDb(), id, formData.get("replied") === "1");
  revalidatePath("/admin");
}

export async function saveNotes(formData: FormData) {
  await requireAdmin();
  const id = leadId(formData);
  if (!id) return;
  await setLeadNotes(getDb(), id, String(formData.get("notes") ?? "").slice(0, 5000));
  revalidatePath("/admin");
}

export async function removeLead(formData: FormData) {
  await requireAdmin();
  const id = leadId(formData);
  if (!id) return;
  await deleteLead(getDb(), id);
  revalidatePath("/admin");
}
