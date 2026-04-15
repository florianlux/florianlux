"use client";

import { useEffect, useState } from "react";

type LineState = "hidden" | "thin" | "thick" | "wave" | "faint";

export default function SignalLine() {
  const [state, setState] = useState<LineState>("hidden");

  useEffect(() => {
    // Map section IDs to their corresponding signal states
    const sections: Array<{ id: string; lineState: LineState }> = [
      { id: "hero", lineState: "hidden" },
      { id: "philosophy", lineState: "thin" },
      { id: "pipeline", lineState: "thick" },
      { id: "synapedia", lineState: "wave" },
      { id: "neurocodex", lineState: "wave" },
      { id: "about", lineState: "faint" },
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id, lineState }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState(lineState);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const isHidden = state === "hidden";
  const isThick = state === "thick";
  const isWave = state === "wave";
  const isFaint = state === "faint";

  return (
    <>
      {/* Desktop: horizontal line fixed at 70vh */}
      <div
        aria-hidden="true"
        className="signal-line pointer-events-none fixed left-0 right-0 z-40 hidden transition-all duration-700 ease-out sm:block"
        style={{
          top: "70vh",
          height: isThick ? "2px" : "1px",
          background: "#00E5A0",
          opacity: isHidden ? 0 : isFaint ? 0.4 : 1,
          boxShadow: isHidden ? "none" : isThick
            ? "0 0 12px rgba(0, 229, 160, 0.4), 0 0 24px rgba(0, 229, 160, 0.15)"
            : "0 0 6px rgba(0, 229, 160, 0.25)",
          animation: isWave ? "signal-sine 4s ease-in-out infinite" : "none",
        }}
      />

      {/* Mobile: vertical line on left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 block transition-all duration-700 ease-out sm:hidden"
        style={{
          width: "2px",
          height: "100vh",
          background: "#00E5A0",
          opacity: isHidden ? 0 : isFaint ? 0.4 : 1,
          boxShadow: isHidden ? "none" : "0 0 6px rgba(0, 229, 160, 0.25)",
        }}
      />
    </>
  );
}
