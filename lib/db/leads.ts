import { and, count, desc, eq, gte, isNull, ne, type SQL } from "drizzle-orm";
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

export type LeadFilter = { status?: LeadStatus; unreplied?: boolean };

function whereFor(filter: LeadFilter): SQL | undefined {
  const parts: SQL[] = [];
  if (filter.status) parts.push(eq(leads.status, filter.status));
  // "Unreplied" = you haven't marked it replied, and it isn't closed as lost.
  if (filter.unreplied) parts.push(isNull(leads.repliedAt), ne(leads.status, "lost"));
  return parts.length ? and(...parts) : undefined;
}

export async function listLeads(
  db: Db,
  filter: LeadFilter = {},
  page = 1,
  pageSize = 20
): Promise<Lead[]> {
  return db
    .select()
    .from(leads)
    .where(whereFor(filter))
    .orderBy(desc(leads.createdAt))
    .limit(pageSize)
    .offset((Math.max(1, page) - 1) * pageSize);
}

export async function countLeads(db: Db, filter: LeadFilter = {}): Promise<number> {
  const [row] = await db.select({ n: count() }).from(leads).where(whereFor(filter));
  return Number(row?.n ?? 0);
}

export type LeadCounts = Record<LeadStatus | "all" | "unreplied", number>;

export async function countByStatus(db: Db): Promise<LeadCounts> {
  const rows = await db
    .select({ status: leads.status, n: count() })
    .from(leads)
    .groupBy(leads.status);
  const out: LeadCounts = { all: 0, unreplied: 0, new: 0, contacted: 0, won: 0, lost: 0 };
  for (const r of rows) {
    const n = Number(r.n);
    out.all += n;
    if (isLeadStatus(r.status)) out[r.status] = n;
  }
  out.unreplied = await countLeads(db, { unreplied: true });
  return out;
}

export async function setLeadStatus(db: Db, id: string, status: LeadStatus) {
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

/** Mark replied (true) or clear it (false). Replying moves a "new" lead to "contacted". */
export async function setReplied(db: Db, id: string, replied: boolean) {
  await db
    .update(leads)
    .set({ repliedAt: replied ? new Date() : null })
    .where(eq(leads.id, id));
  if (replied) {
    await db.update(leads).set({ status: "contacted" }).where(and(eq(leads.id, id), eq(leads.status, "new")));
  }
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

