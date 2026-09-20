import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Logo = { name: string; logo?: unknown; url?: string };

export default function ClientLogos({ logos }: { logos: Logo[] }) {
  if (!logos?.length) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <StaggerGroup
        once={false}
        className="grid grid-cols-2 border-t border-border sm:grid-cols-3 md:grid-cols-4"
      >
        {logos.map((l) => (
          <StaggerItem
            key={l.name}
            className="flex h-[90px] items-center justify-center px-4 transition-transform duration-300 hover:scale-125 sm:h-[110px]"
          >
            {l.logo ? (
              <Image
                src={urlFor(l.logo).width(160).url()}
                alt={l.name}
                width={200}
                height={66}
                className="h-auto max-h-8 w-auto sm:max-h-10"
              />
            ) : (
              <span className="whitespace-nowrap font-display text-[13px] text-text-secondary sm:text-[15px]">
                {l.name}
              </span>
            )}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}