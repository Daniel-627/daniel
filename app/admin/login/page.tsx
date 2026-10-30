import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto max-w-md px-5 py-20 sm:px-8 sm:py-28">
      <h1 className="mb-10 font-display text-3xl font-semibold tracking-tight">Inbox</h1>
      <LoginForm />
    </div>
  );
}
