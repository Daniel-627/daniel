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
            className="flex h-[120px] items-center justify-center px-6 transition-transform duration-300 hover:scale-125 sm:h-[150px]"
          >
            {l.logo ? (
              <Image
                src={urlFor(l.logo).width(320).url()}
                alt={l.name}
                width={240}
                height={80}
                className="h-auto max-h-14 w-auto sm:max-h-[72px]"
              />
            ) : (
              <span className="whitespace-nowrap font-display text-base text-text-secondary sm:text-lg">
                {l.name}
              </span>
            )}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}