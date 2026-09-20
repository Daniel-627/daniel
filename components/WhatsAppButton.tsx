import { client } from "@/sanity/lib/client";
import { SOCIAL_LINKS_QUERY } from "@/sanity/lib/queries";
import WhatsAppButtonClient from "@/components/WhatsAppButtonClient";

type Social = { label: string; platform: string; url: string };

export default async function WhatsAppButton() {
  const socials: Social[] = await client.fetch(SOCIAL_LINKS_QUERY);
  const whatsapp = socials.find((s) => s.platform === "whatsapp");

  if (!whatsapp) return null;

  return <WhatsAppButtonClient url={whatsapp.url} />;
}