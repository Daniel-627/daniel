const socials = [
  { href: "https://github.com/Daniel-627", label: "GitHub" },
  { href: "https://linkedin.com/in/daniel-ochieng", label: "LinkedIn" },
  { href: "https://x.com/Daniel__627", label: "X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-7 text-[13.5px] text-text-secondary">
        <div>© {new Date().getFullYear()} Daniel. All rights reserved.</div>
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>
        <a
          href="#top"
          className="transition-colors hover:text-text-primary"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
