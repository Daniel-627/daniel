import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/motion/FadeIn";

export default function ClosingCta({ source }: { source: string }) {
  return (
    <FadeIn once={false}>
      <section
        id="contact"
        className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-24"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="relative mt-1 h-10 w-10 shrink-0 sm:mt-2 sm:h-[52px] sm:w-[52px]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-[#3a3b3e] to-[#222]">
              <Image
                src="/daniel.jpg"
                alt="Daniel Ochieng"
                fill
                sizes="52px"
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent-blue sm:h-3 sm:w-3" />
          </div>
          <h2 className="font-display text-[24px] font-medium leading-tight tracking-tight sm:text-[30px] md:text-[56px]">
            Let&apos;s talk about a project, collaboration, or an idea you may have
          </h2>
        </div>
        <div className="mt-8 flex justify-end sm:mt-10">
          <CtaButton href={`/contact?source=${source}`}>Drop me a line</CtaButton>
        </div>
      </section>
    </FadeIn>
  );
}
