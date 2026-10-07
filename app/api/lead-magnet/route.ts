import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, resourceTitle, resourceUrl } = await req.json();

    if (!name || !email || !resourceTitle || !resourceUrl) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "daniel.co.ke <onboarding@resend.dev>",
      to: email,
      subject: `Here's your download: ${resourceTitle}`,
      text: `Hi ${name},\n\nHere's the link you asked for:\n${resourceUrl}\n\nIf you're working on something and want a hand, just reply to this email.\n\n— Daniel`,
    });

    await resend.emails.send({
      from: "daniel.co.ke <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New resource lead: ${name} wants "${resourceTitle}"`,
      text: `${name} (${email}) requested: ${resourceTitle}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}