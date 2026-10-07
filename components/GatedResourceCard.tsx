"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  title: string;
  description?: string;
  category: string;
  url: string;
  thumbnail?: unknown;
  categoryLabel: string;
};

export default function GatedResourceCard({
  title,
  description,
  url,
  thumbnail,
  categoryLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, resourceTitle: title, resourceUrl: url }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-border">
      {thumbnail ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image src={urlFor(thumbnail).width(600).url()} alt={title} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#232427] to-[#17181a]">
          <ExternalLink size={24} className="text-text-secondary" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-secondary">
          {categoryLabel}
        </span>
        <h3 className="font-display text-lg font-medium">{title}</h3>
        {description && <p className="text-[13.5px] text-text-secondary">{description}</p>}

        {!open && status !== "sent" && (
          <button
            onClick={() => setOpen(true)}
            className="mt-3 w-fit rounded-full border border-border px-4 py-1.5 text-[13px] transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            Get the link
          </button>
        )}

        {open && status !== "sent" && (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-b border-border bg-transparent py-2 text-[13.5px] outline-none focus:border-accent-blue"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border-b border-border bg-transparent py-2 text-[13.5px] outline-none focus:border-accent-blue"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 w-fit rounded-full bg-text-primary px-4 py-1.5 text-[13px] text-bg disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send me the link"}
            </button>
            {status === "error" && (
              <p className="text-[12px] text-red-400">Something went wrong, try again.</p>
            )}
          </form>
        )}

        {status === "sent" && (
          <p className="mt-3 text-[13.5px] text-accent-blue">
            Check your email — it&apos;s on its way.
          </p>
        )}
      </div>
    </div>
  );
}