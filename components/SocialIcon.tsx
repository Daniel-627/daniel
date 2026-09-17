import type { IconType } from "react-icons";
import { FaLinkedin, FaCodepen } from "react-icons/fa"
import {
  SiGithub,
  SiGitlab,
  SiStackoverflow,
  SiDevdotto,
  SiHashnode,
  SiBehance,
  SiDribbble,
  SiFigma,
  SiArtstation,
  SiX,
  SiInstagram,
  SiThreads,
  SiFacebook,
  SiYoutube,
  SiTiktok,
  SiPinterest,
  SiMedium,
  SiSubstack,
  SiDiscord,
  SiTelegram,
  SiWhatsapp,
  SiUpwork,
  SiFiverr,
  SiGumroad,
  SiPatreon,
  SiBuymeacoffee,
} from "react-icons/si";
import { Mail, Link as LinkIcon } from "lucide-react";

const iconMap: Record<string, IconType> = {
  github: SiGithub,
  gitlab: SiGitlab,
  codepen: FaCodepen,
  stackoverflow: SiStackoverflow,
  devto: SiDevdotto,
  hashnode: SiHashnode,
  behance: SiBehance,
  dribbble: SiDribbble,
  figma: SiFigma,
  artstation: SiArtstation,
  linkedin: FaLinkedin,
  x: SiX,
  instagram: SiInstagram,
  threads: SiThreads,
  facebook: SiFacebook,
  youtube: SiYoutube,
  tiktok: SiTiktok,
  pinterest: SiPinterest,
  medium: SiMedium,
  substack: SiSubstack,
  discord: SiDiscord,
  telegram: SiTelegram,
  whatsapp: SiWhatsapp,
  upwork: SiUpwork,
  fiverr: SiFiverr,
  gumroad: SiGumroad,
  patreon: SiPatreon,
  bmc: SiBuymeacoffee,
};

export default function SocialIcon({
  platform,
  size = 18,
}: {
  platform: string;
  size?: number;
}) {
  if (platform === "email") return <Mail size={size} />;
  if (platform === "other") return <LinkIcon size={size} />;

  const Icon = iconMap[platform];
  if (!Icon) return <LinkIcon size={size} />;
  return <Icon size={size} />;
}