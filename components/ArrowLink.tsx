import Link from "next/link";
import { ReactNode } from "react";

const dirs = {
  right: { arrow: "→", move: "group-hover:translate-x-1" },
  down: { arrow: "↓", move: "group-hover:translate-y-1" },
  left: { arrow: "←", move: "group-hover:-translate-x-1" },
  upRight: { arrow: "↗", move: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" },
};

/**
 * Underlined text link with a gradient underline that draws in on hover
 * and an arrow that nudges in its own direction.
 */
export default function ArrowLink({
  href,
  children,
  direction = "right",
  className = "text-[15px]",
}: {
  href: string;
  children: ReactNode;
  direction?: keyof typeof dirs;
  className?: string;
}) {
  const d = dirs[direction];
  const arrow = (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none ${d.move}`}
    >
      {d.arrow}
    </span>
  );

  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 pb-0.5 ${className}`}
    >
      {direction === "left" && arrow}
      <span>{children}</span>
      {direction !== "left" && arrow}
      <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-50" />
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-blue to-accent-purple transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </Link>
  );
}
