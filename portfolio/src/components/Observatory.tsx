"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Observatory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle rotation: 0° at top, ~45° after 3000px scroll
  const rawRotation = useTransform(scrollY, [0, 3000], [0, 45]);
  const rotation = useSpring(rawRotation, { stiffness: 40, damping: 30 });

  // Gentle opacity pulse based on scroll
  const opacity = useTransform(scrollY, [0, 600, 1200], [0.07, 0.04, 0.06]);

  const size = 520;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ rotate: rotation }}
        className="relative"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          className="h-[min(520px,75vw)] w-[min(520px,75vw)]"
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 1}
            stroke="white"
            strokeWidth={1}
            style={{ opacity }}
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
