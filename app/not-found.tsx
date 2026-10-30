import ArrowLink from "@/components/ArrowLink";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/motion/FadeIn";

export default function NotFound() {
  return (
    <FadeIn once={false}>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-32 text-center sm:px-8 sm:py-48">
        <div className="mb-6 font-display text-[80px] font-semibold leading-none tracking-tight sm:text-[140px]">
          4
          <span className="bg-gradient-to-br from-accent-blue to-accent-purple bg-clip-text text-transparent">
            0
          </span>
          4
        </div>
        <h1 className="max-w-[480px] font-display text-2xl font-medium tracking-tight sm:text-3xl">
          This page doesn&apos;t exist — or moved somewhere I forgot to link.
        </h1>
        <p className="mt-4 max-w-[440px] text-[15px] text-text-secondary">
          Let&apos;s get you back to somewhere real.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href="/">Back to home</CtaButton>
          <ArrowLink href="/projects">See my work instead</ArrowLink>
        </div>
      </div>
    </FadeIn>
  );
}