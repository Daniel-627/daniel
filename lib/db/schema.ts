import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    projectType: text("project_type"),
    budgetRange: text("budget_range"),
    service: text("service"),
    source: text("source"),
    status: text("status").notNull().default("new"),
    notes: text("notes"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("leads_created_idx").on(t.createdAt),
    index("leads_status_idx").on(t.status),
    index("leads_ip_idx").on(t.ipHash, t.createdAt),
  ]
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
