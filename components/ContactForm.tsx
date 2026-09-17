"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
      setForm({ name: "", email: "", message: "" });
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
        Thanks — that&apos;s sent. I&apos;ll get back to you soon.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">
          Name
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">
          Email
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-[13px] text-text-secondary">
          Message
        </label>
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
    </form>
  );
}