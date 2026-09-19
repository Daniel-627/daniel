"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/logo.png" alt="Loading" width={64} height={64} priority />
      </motion.div>
    </div>
  );
}