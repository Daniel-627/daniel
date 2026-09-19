import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Logo = { name: string; logo?: unknown; url?: string };

export default function ClientLogos({ logos }: { logos: Logo[] }) {
  if (!logos?.length) return null;

  return (
    <div className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 md:grid-cols-4">
      {logos.map((l) => (
        <div
          key={l.name}
          className="flex h-[90px] items-center justify-center border-r border-b border-border px-4 opacity-55 grayscale transition-opacity hover:opacity-100 sm:h-[110px]"
        >
          {l.logo ? (
            <Image
              src={urlFor(l.logo).width(160).url()}
              alt={l.name}
              width={120}
              height={40}
              className="h-auto max-h-8 w-auto sm:max-h-10"
            />
          ) : (
            <span className="whitespace-nowrap font-display text-[13px] text-text-secondary sm:text-[15px]">
              {l.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}