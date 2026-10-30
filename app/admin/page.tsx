import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getDb } from "@/lib/db";
import { countByStatus, isLeadStatus, listLeads } from "@/lib/db/leads";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/db/schema";
import { logout, removeLead, saveNotes, updateStatus } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

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
          <a
            href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: your message to daniel.co.ke")}`}
            className="cta"
          >
            Reply
            <span className="dot" />
          </a>
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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { status } = await searchParams;
  const filter = isLeadStatus(status) ? status : undefined;

  let leads: Lead[] = [];
  let counts: Awaited<ReturnType<typeof countByStatus>> | null = null;
  let error: string | null = null;
  try {
    const db = getDb();
    [leads, counts] = await Promise.all([listLeads(db, filter), countByStatus(db)]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load messages.";
  }

  const tabs: { key: string; label: string; href: string; n?: number }[] = [
    { key: "all", label: "All", href: "/admin", n: counts?.all },
    ...LEAD_STATUSES.map((s) => ({
      key: s,
      label: s[0].toUpperCase() + s.slice(1),
      href: `/admin?status=${s}`,
      n: counts?.[s],
    })),
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
          const active = (filter ?? "all") === t.key;
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`rounded-full border px-4 py-1.5 text-[13.5px] transition-colors ${
                active
                  ? "border-text-primary bg-text-primary text-bg"
                  : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
              }`}
            >
              {t.label}
              {t.n !== undefined && <span className="ml-1.5 opacity-60">{t.n}</span>}
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
        <div>
          {leads.map((l) => (
            <LeadItem key={l.id} lead={l} />
          ))}
        </div>
      )}
    </div>
  );
}
