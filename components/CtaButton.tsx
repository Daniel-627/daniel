import Link from "next/link";
import { ReactNode } from "react";

export default function CtaButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="cta">
      {children}
      <span className="dot" />
    </Link>
  );
}
