import { after, NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { countRecentByIp, insertLead } from "@/lib/db/leads";
import { clientIp, hashIp, validateContact } from "@/lib/contact";
import { sendLeadEmail, sendTelegram } from "@/lib/notify";

const MAX_PER_HOUR = 5;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const lead = result.data;
  const ipHash = hashIp(clientIp(req.headers));

  let saved = false;
  try {
    const db = getDb();
    if ((await countRecentByIp(db, ipHash, 60)) >= MAX_PER_HOUR) {
      return NextResponse.json(
        { error: "Too many messages from this connection. Please try again later." },
        { status: 429 }
      );
    }
    await insertLead(db, { ...lead, ipHash });
    saved = true;
  } catch (err) {
    // Never lose a lead because the database hiccupped: fall through to alerts.
    console.error("Saving lead failed", err);
  }

  const notify = async () => {
    const results = await Promise.all([sendTelegram(lead), sendLeadEmail(lead)]);
    return results.some(Boolean);
  };

  if (saved) {
    after(notify);
    return NextResponse.json({ success: true });
  }

  const delivered = await notify();
  return delivered
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
