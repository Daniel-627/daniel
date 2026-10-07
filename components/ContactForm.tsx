"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PROJECT_TYPES = [
  "Website",
  "Branding / Design",
  "Web App",
  "Mobile App",
  "Business System (POS, CRM, ERP, etc.)",
  "Something else",
];

const BUDGET_RANGES = [
  "Under KSh 20,000 / $400",
  "KSh 20,000–60,000 / $400–1,200",
  "KSh 60,000–150,000 / $1,200–3,000",
  "KSh 150,000+ / $3,000+",
  "Not sure yet",
];

export default function ContactForm({
  initialMessage = "",
  initialProjectType = "",
}: {
  initialMessage?: string;
  initialProjectType?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: initialMessage,
    projectType: initialProjectType,
    budgetRange: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "", projectType: "", budgetRange: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-bg-raised p-8 text-[15px] text-text-secondary"
      >
        Thanks — that&apos;s sent. I typically reply within 24–48 hours.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>

      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">Project type</label>
        <select
          value={form.projectType}
          onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] text-text-primary outline-none transition-colors focus:border-accent-blue"
        >
          <option value="" className="bg-bg">Select one</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t} className="bg-bg">{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">Rough budget</label>
        <select
          value={form.budgetRange}
          onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] text-text-primary outline-none transition-colors focus:border-accent-blue"
        >
          <option value="" className="bg-bg">Select one</option>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b} className="bg-bg">{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>

      {status === "error" && (
        <p className="text-[13.5px] text-red-400">
          Something went wrong — try again, or email me directly.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cta disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="dot" />
      </motion.button>
      <p className="text-[12.5px] text-text-secondary">
        I typically reply within 24–48 hours.
      </p>
    </form>
  );
}