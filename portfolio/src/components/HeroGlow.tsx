"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroGlow() {
  const { scrollY } = useScroll();

  // Parallax: orbs drift upward at different speeds
  const y1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);

  // Fade out as user scrolls past the hero
  const fadeOut = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary — cool indigo, top-right area */}
      <motion.div
        className="absolute -right-[10%] -top-[15%] h-[850px] w-[850px]"
        style={{
          y: y1,
          opacity: fadeOut,
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 65%)",
        }}
      />

      {/* Secondary — warm amber, center-left area */}
      <motion.div
        className="absolute -left-[5%] top-[20%] h-[650px] w-[650px]"
        style={{
          y: y2,
          opacity: fadeOut,
          background:
            "radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Tertiary — neutral white, bottom-center */}
      <motion.div
        className="absolute bottom-[-5%] left-[30%] h-[550px] w-[550px]"
        style={{
          opacity: fadeOut,
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.025) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
