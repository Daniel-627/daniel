"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <motion.span
        className="bg-gradient-to-br from-accent-blue to-accent-purple bg-clip-text font-display text-6xl font-bold text-transparent"
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
      >
        d
      </motion.span>
    </div>
  );
}