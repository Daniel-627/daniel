import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, projectType, budgetRange } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const details = [
      projectType ? `Project type: ${projectType}` : null,
      budgetRange ? `Budget: ${budgetRange}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: "daniel.co.ke <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New message from ${name} via daniel.co.ke${projectType ? ` — ${projectType}` : ""}`,
      text: `From: ${name} (${email})\n${details ? details + "\n" : ""}\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}