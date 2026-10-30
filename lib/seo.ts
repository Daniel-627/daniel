import type { Metadata } from "next";

export const SITE_URL = "https://daniel.co.ke";
export const SITE_NAME = "Daniel Ochieng";

/** Social share image. Without a title it falls back to the site tagline. */
export function ogImage(title?: string) {
  return title ? `/og?title=${encodeURIComponent(title)}` : "/og";
}

/**
 * Per-page metadata with its own canonical URL, Open Graph and Twitter tags.
 * Every page must set its own canonical: a canonical set on the root layout
 * is inherited by pages that do not override it.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  suffix = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  suffix?: boolean;
}): Metadata {
  const fullTitle = suffix ? `${title} | daniel.co.ke` : title;
  const img = image ?? ogImage(title);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: img, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}

/** Plain text from the first block of a Sanity portable-text overview. */
export function firstParagraph(overview: unknown, max = 160): string | undefined {
  if (!Array.isArray(overview)) return undefined;
  const text = (overview[0] as { children?: { text: string }[] } | undefined)?.children
    ?.map((c) => c.text)
    .join("");
  return text ? text.slice(0, max) : undefined;
}
