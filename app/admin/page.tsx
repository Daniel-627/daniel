import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getDb } from "@/lib/db";
import { countByStatus, countLeads, isLeadStatus, listLeads, type LeadCounts, type LeadFilter } from "@/lib/db/leads";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/db/schema";
import { logout, markReplied, removeLead, saveNotes, updateStatus } from "@/app/admin/actions";
import { buildReply, zohoComposeUrl } from "@/lib/admin/reply";
import DeleteButton from "@/components/admin/DeleteButton";
import CopyButton from "@/components/admin/CopyButton";

const PAGE_SIZE = 20;

export const dynamic = "force-dynamic";
export const metadata = { title: "Inbox", robots: { index: false, follow: false } };

const statusStyle: Record<LeadStatus, string> = {
  new: "border-accent-blue/50 text-accent-blue",
  contacted: "border-amber-300/50 text-amber-300",
  won: "border-emerald-300/50 text-emerald-300",
  lost: "border-border text-text-secondary",
};

const fmt = new Intl.DateTimeFormat("en-KE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Nairobi",
});

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[12px] text-text-secondary">{label}</dt>
      <dd className="text-[14px]">{value}</dd>
    </div>
  );
}

function LeadItem({ lead }: { lead: Lead }) {
  const status = isLeadStatus(lead.status) ? lead.status : "new";
  const about = lead.service || lead.projectType;

  return (
    <details className="group border-t border-border last:border-b">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-1 py-5 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1 basis-56">
          <div className="flex items-center gap-2 font-display text-lg font-medium">
            {status === "new" && <span className="h-2 w-2 shrink-0 rounded-full bg-accent-blue" />}
            <span className="truncate">{lead.name}</span>
          </div>
          <div className="truncate text-[13.5px] text-text-secondary">{lead.email}</div>
        </div>
        <div className="basis-48 truncate text-[13.5px] text-text-secondary">{about ?? "—"}</div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11.5px] ${statusStyle[status]}`}
        >
          {status}
        </span>
        {lead.repliedAt ? (
          <span className="rounded-full border border-emerald-300/50 px-2.5 py-0.5 text-[11.5px] text-emerald-300">
            replied
          </span>
        ) : status !== "lost" ? (
          <span className="rounded-full border border-amber-300/50 px-2.5 py-0.5 text-[11.5px] text-amber-300">
            unreplied
          </span>
        ) : null}
        <div className="basis-40 text-[13px] sm:text-right text-text-secondary">
          {fmt.format(lead.createdAt)}
        </div>
      </summary>

      <div className="space-y-6 pb-8 pt-1">
        <p className="max-w-2xl whitespace-pre-wrap text-[15px] leading-relaxed text-[#c7c7c7]">
          {lead.message}
        </p>

        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          <Row label="Project type" value={lead.projectType} />
          <Row label="Service" value={lead.service} />
          <Row label="Budget" value={lead.budgetRange} />
          <Row label="Came from" value={lead.source} />
        </dl>

        <div className="flex flex-wrap items-center gap-2.5">
          <a href={zohoComposeUrl(lead)} target="_blank" rel="noreferrer" className="cta">
            Reply in Zoho
            <span className="dot" />
          </a>
          <CopyButton text={lead.email} label="Copy email" />
          <CopyButton text={buildReply(lead).body} label="Copy template" />
          <form action={markReplied}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="replied" value={lead.repliedAt ? "0" : "1"} />
            <button
              type="submit"
              className="pill rounded-full border border-border px-3.5 py-1.5 text-[13px] text-text-secondary"
            >
              {lead.repliedAt ? "Clear replied" : "Mark replied"}
            </button>
          </form>
          {LEAD_STATUSES.filter((s) => s !== status).map((s) => (
            <form key={s} action={updateStatus}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="status" value={s} />
              <button
                type="submit"
                className="pill rounded-full border border-border px-3.5 py-1.5 text-[13px] text-text-secondary"
              >
                Mark {s}
              </button>
            </form>
          ))}
          <form action={removeLead}>
            <input type="hidden" name="id" value={lead.id} />
            <DeleteButton />
          </form>
        </div>

        <form action={saveNotes} className="max-w-2xl space-y-2">
          <input type="hidden" name="id" value={lead.id} />
          <label className="block text-[12px] text-text-secondary">Private notes</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={lead.notes ?? ""}
            className="w-full resize-none rounded-lg border border-border bg-transparent p-3 text-[14px] outline-none transition-colors focus:border-accent-blue"
          />
          <button
            type="submit"
            className="pill rounded-full border border-border px-3.5 py-1.5 text-[13px] text-text-secondary"
          >
            Save notes
          </button>
        </form>
      </div>
    </details>
  );
}

type Search = { status?: string; page?: string };

function hrefFor(tab: string, page = 1) {
  const q = new URLSearchParams();
  if (tab !== "all") q.set("status", tab);
  if (page > 1) q.set("page", String(page));
  const qs = q.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Search> }) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { status, page: pageParam } = await searchParams;
  const tab = status === "unreplied" ? "unreplied" : isLeadStatus(status) ? status : "all";
  const filter: LeadFilter =
    tab === "unreplied" ? { unreplied: true } : tab === "all" ? {} : { status: tab };
  const requested = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  let leads: Lead[] = [];
  let counts: LeadCounts | null = null;
  let total = 0;
  let error: string | null = null;
  try {
    const db = getDb();
    [counts, total] = await Promise.all([countByStatus(db), countLeads(db, filter)]);
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    leads = await listLeads(db, filter, Math.min(requested, pages), PAGE_SIZE);
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load messages.";
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requested, pages);

  const tabs: { key: string; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unreplied", label: "Unreplied" },
    ...LEAD_STATUSES.map((st) => ({ key: st as string, label: st[0].toUpperCase() + st.slice(1) })),
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Inbox</h1>
        <form action={logout}>
          <button
            type="submit"
            className="pill rounded-full border border-border px-3.5 py-1.5 text-[13px] text-text-secondary"
          >
            Sign out
          </button>
        </form>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2.5">
        {tabs.map((t) => {
          const active = tab === t.key;
          const n = counts?.[t.key as keyof LeadCounts];
          return (
            <Link
              key={t.key}
              href={hrefFor(t.key)}
              className={`rounded-full border px-4 py-1.5 text-[13.5px] transition-colors ${
                active
                  ? "border-text-primary bg-text-primary text-bg"
                  : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
              }`}
            >
              {t.label}
              {n !== undefined && <span className="ml-1.5 opacity-60">{n}</span>}
            </Link>
          );
        })}
      </nav>

      {error ? (
        <p className="rounded-lg border border-border p-5 text-[14px] text-red-400">
          Couldn&apos;t load messages: {error}
        </p>
      ) : leads.length === 0 ? (
        <p className="text-[15px] text-text-secondary">No messages here yet.</p>
      ) : (
        <>
          <div>
            {leads.map((l) => (
              <LeadItem key={l.id} lead={l} />
            ))}
          </div>

          {pages > 1 && (
            <div className="mt-10 flex items-center justify-between text-[13.5px] text-text-secondary">
              {page > 1 ? (
                <Link href={hrefFor(tab, page - 1)} className="pill rounded-full border border-border px-4 py-1.5">
                  ← Newer
                </Link>
              ) : (
                <span />
              )}
              <span>
                Page {page} of {pages} · {total} messages
              </span>
              {page < pages ? (
                <Link href={hrefFor(tab, page + 1)} className="pill rounded-full border border-border px-4 py-1.5">
                  Older →
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
