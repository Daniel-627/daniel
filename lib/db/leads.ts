import { and, count, desc, eq, gte } from "drizzle-orm";
import type { PgDatabase } from "drizzle-orm/pg-core";
import { leads, LEAD_STATUSES, type Lead, type LeadStatus, type NewLead } from "./schema";

// Any drizzle Postgres database (Neon in production, PGlite in tests).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Db = PgDatabase<any, any, any>;

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export async function insertLead(
  db: Db,
  data: Pick<NewLead, "name" | "email" | "message"> &
    Partial<Pick<NewLead, "projectType" | "budgetRange" | "service" | "source" | "ipHash">>
): Promise<string> {
  const [row] = await db.insert(leads).values(data).returning({ id: leads.id });
  return row.id;
}

/** How many leads this (hashed) IP has sent in the last N minutes. */
export async function countRecentByIp(db: Db, ipHash: string, minutes: number): Promise<number> {
  const since = new Date(Date.now() - minutes * 60_000);
  const [row] = await db
    .select({ n: count() })
    .from(leads)
    .where(and(eq(leads.ipHash, ipHash), gte(leads.createdAt, since)));
  return Number(row?.n ?? 0);
}

export async function listLeads(db: Db, status?: LeadStatus): Promise<Lead[]> {
  const query = db.select().from(leads);
  return status
    ? query.where(eq(leads.status, status)).orderBy(desc(leads.createdAt))
    : query.orderBy(desc(leads.createdAt));
}

export async function countByStatus(db: Db): Promise<Record<LeadStatus | "all", number>> {
  const rows = await db
    .select({ status: leads.status, n: count() })
    .from(leads)
    .groupBy(leads.status);
  const out: Record<LeadStatus | "all", number> = { all: 0, new: 0, contacted: 0, won: 0, lost: 0 };
  for (const r of rows) {
    const n = Number(r.n);
    out.all += n;
    if (isLeadStatus(r.status)) out[r.status] = n;
  }
  return out;
}

export async function setLeadStatus(db: Db, id: string, status: LeadStatus) {
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

export async function setLeadNotes(db: Db, id: string, notes: string) {
  await db
    .update(leads)
    .set({ notes: notes.trim() ? notes.trim() : null })
    .where(eq(leads.id, id));
}

export async function deleteLead(db: Db, id: string) {
  await db.delete(leads).where(eq(leads.id, id));
}

