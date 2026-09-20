"use client";

import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppButtonClient({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Message me on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 md:h-[60px] md:w-[60px]"
    >
      <SiWhatsapp size={22} className="sm:hidden" />
      <SiWhatsapp size={26} className="hidden sm:block md:hidden" />
      <SiWhatsapp size={28} className="hidden md:block" />
    </motion.a>
  );
}