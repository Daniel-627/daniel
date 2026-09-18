import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Logo = { name: string; logo?: unknown; url?: string };

export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const doubled = [...logos, ...logos];

  return (
    <div className="overflow-hidden border-t border-b border-border">
      <div className="animate-marquee flex w-max gap-16 py-8">
        {doubled.map((l, i) => (
          <div
            key={`${l.name}-${i}`}
            className="flex h-10 shrink-0 items-center opacity-55 grayscale transition-opacity hover:opacity-100"
          >
            {l.logo ? (
              <Image
                src={urlFor(l.logo).width(160).url()}
                alt={l.name}
                width={120}
                height={40}
                className="h-auto max-h-10 w-auto"
              />
            ) : (
              <span className="whitespace-nowrap font-display text-[15px] text-text-secondary">
                {l.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}