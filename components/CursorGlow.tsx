"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full opacity-25 blur-[130px]"
        style={{
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, #2f8fff 0%, #7c3aed 55%, transparent 72%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}