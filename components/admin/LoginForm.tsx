"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] text-text-secondary">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full border-b border-border bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-accent-blue"
        />
      </div>

      {state?.error && <p className="text-[13.5px] text-red-400">{state.error}</p>}

      <button type="submit" disabled={pending} className="cta disabled:opacity-60">
        {pending ? "Checking…" : "Sign in"}
        <span className="dot" />
      </button>
    </form>
  );
}
