import { Github, Linkedin, Mail, Link as LinkIcon } from "lucide-react";

// lucide-react has no dedicated X icon; this is a minimal custom X glyph
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-6.9L4.4 22H1.3l8.1-9.3L1 2h7.3l5 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  instagram: InstagramIcon,
  email: Mail,
  other: LinkIcon,
};

export default function SocialIcon({
  platform,
  size = 18,
}: {
  platform: string;
  size?: number;
}) {
  const Icon = iconMap[platform] ?? LinkIcon;
  return <Icon size={size} />;
}