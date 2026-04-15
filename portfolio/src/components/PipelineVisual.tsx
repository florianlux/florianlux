"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  {
    label: "Search",
    shape: "circle",
    desc: "Raw query enters the system",
  },
  {
    label: "Signal",
    shape: "diamond",
    desc: "Noise filtered, pattern extracted",
  },
  {
    label: "Aggregation",
    shape: "square",
    desc: "Fragments unified into structure",
  },
  {
    label: "Knowledge",
    shape: "hexagon",
    desc: "Queryable, navigable understanding",
  },
] as const;

type NodeShape = (typeof NODES)[number]["shape"];

function NodeShape({ shape, active }: { shape: NodeShape; active: boolean }) {
  const stroke = active ? "#00E5A0" : "#4A4A55";
  const size = 24;

  if (shape === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }
  if (shape === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <polygon
          points="12,3 21,12 12,21 3,12"
          stroke={stroke}
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (shape === "square") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }
  // hexagon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function PipelineVisual() {
  const [activeCount, setActiveCount] = useState(0);
  const [particlesActive, setParticlesActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasActivated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasActivated.current) {
          hasActivated.current = true;

          // Illuminate nodes sequentially with 400ms stagger
          NODES.forEach((_, i) => {
            setTimeout(() => {
              setActiveCount(i + 1);
              if (i === NODES.length - 1) {
                // All nodes active — start particles
                setTimeout(() => setParticlesActive(true), 300);
              }
            }, i * 400);
          });
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full">
      {/* Nodes row — desktop horizontal, mobile vertical */}
      <div className="flex flex-col items-start gap-16 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
        {NODES.map((node, i) => {
          const isActive = i < activeCount;
          const isLast = i === NODES.length - 1;

          return (
            <div key={node.label} className="flex flex-col items-start sm:flex-1">
              <div className="flex w-full items-center">
                {/* Connector line before node (desktop) — skip first */}
                {i > 0 && (
                  <div className="relative mr-4 hidden h-px flex-1 overflow-hidden sm:block">
                    <div
                      className="absolute inset-0 transition-colors duration-500"
                      style={{
                        background: isActive ? "#00E5A0" : "#4A4A55",
                        opacity: isActive ? 0.6 : 0.3,
                      }}
                    />
                    {/* Travelling particle */}
                    {particlesActive && isActive && (
                      <div
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                        style={{
                          animation: `particle-travel ${2 + i * 0.4}s ease-in-out infinite`,
                          animationDelay: `${i * 0.6}s`,
                          background: "#00E5A0",
                          boxShadow: "0 0 6px #00E5A0",
                        }}
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-col items-center gap-3">
                  <NodeShape shape={node.shape} active={isActive} />
                  <span
                    className="font-mono text-[13px] transition-colors duration-500"
                    style={{
                      color: isActive ? "#E8E8EC" : "#4A4A55",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {node.label}
                  </span>
                </div>

                {/* Connector line after node (desktop) — skip last */}
                {!isLast && (
                  <div className="relative ml-4 hidden h-px flex-1 overflow-hidden sm:block">
                    <div
                      className="absolute inset-0 transition-colors duration-500"
                      style={{
                        background: i + 1 < activeCount ? "#00E5A0" : "#4A4A55",
                        opacity: i + 1 < activeCount ? 0.6 : 0.3,
                      }}
                    />
                    {/* Travelling particle */}
                    {particlesActive && i + 1 < activeCount && (
                      <div
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                        style={{
                          animation: `particle-travel ${2.2 + i * 0.4}s ease-in-out infinite`,
                          animationDelay: `${(i + 1) * 0.5}s`,
                          background: "#00E5A0",
                          boxShadow: "0 0 6px #00E5A0",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Mobile: vertical connector below node */}
              {!isLast && (
                <div
                  className="ml-3 mt-4 block h-10 w-px sm:hidden"
                  style={{
                    background: i + 1 < activeCount ? "#00E5A0" : "#4A4A55",
                    opacity: i + 1 < activeCount ? 0.6 : 0.3,
                    transition: "background 500ms, opacity 500ms",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <p
        className="mt-16 text-center font-sans text-[16px] leading-relaxed"
        style={{ color: "#6A6A75" }}
      >
        Every system I build lives somewhere on this line.
      </p>
    </div>
  );
}
