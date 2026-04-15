"use client";

import { useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Node coordinates in a 1200 × 700 viewBox.
// Distribution is deliberately right-weighted so the dense cluster appears
// in the right half of the hero — the "charged empty space" on the right side
// of the left-anchored typography. The left zone has only 3 sparse bridge nodes.
// ─────────────────────────────────────────────────────────────────────────────
const NODES = [
  // Sparse left bridge — a few outliers to imply the field extends further
  { x: 318, y: 380 }, { x: 392, y: 248 }, { x: 456, y: 490 },

  // Upper constellation — floats above the main cluster, suggests hierarchy
  { x: 522, y: 68 }, { x: 612, y: 44 }, { x: 706, y: 82 },
  { x: 774, y: 36 }, { x: 752, y: 148 }, { x: 648, y: 128 },

  // Main hub cluster — the densest zone, center-right
  { x: 568, y: 232 }, { x: 636, y: 192 }, { x: 714, y: 220 },
  { x: 658, y: 304 }, { x: 588, y: 356 }, { x: 742, y: 302 },
  { x: 806, y: 240 }, { x: 828, y: 318 },

  // Right extension — continues the field toward the edge
  { x: 876, y: 180 }, { x: 908, y: 268 }, { x: 946, y: 186 },
  { x: 968, y: 306 }, { x: 1010, y: 238 }, { x: 1048, y: 312 },

  // Lower cluster — anchors the graph vertically, prevents floating feeling
  { x: 612, y: 468 }, { x: 676, y: 506 }, { x: 746, y: 444 },
  { x: 818, y: 478 }, { x: 876, y: 404 }, { x: 768, y: 566 },
  { x: 686, y: 592 },
];

// Max distance (in viewBox units) for two nodes to be connected by an edge
const EDGE_THRESHOLD = 155;

// Nodes that breathe with a slow opacity pulse — these are the "active" ones.
// Key = node index, value = CSS animation-delay in seconds.
const PULSE_CONFIG: Record<number, number> = {
  3: 0,     // upper constellation — first breath
  8: 1.4,   // upper hub spoke
  12: 2.8,  // hub center
  17: 0.7,  // right extension hub
  20: 4.2,  // right far node
  24: 3.5,  // lower cluster
  28: 2.1,  // lower isolated
};

function computeEdges(nodes: typeof NODES) {
  const result: Array<[number, number]> = [];
  const t2 = EDGE_THRESHOLD * EDGE_THRESHOLD;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (dx * dx + dy * dy < t2) result.push([i, j]);
    }
  }
  return result;
}

export default function KnowledgeField() {
  // Computed once on mount — 30 nodes, ~60-80 edges depending on distribution
  const edges = useMemo(() => computeEdges(NODES), []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Layer 1: Faint ambient light ─────────────────────────────────────
          A barely perceptible green tinge in the upper-right area.
          Opacity is so low (~2%) that it reads as dimensionality, not glow.
          ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 82% 30%, rgba(0,229,160,0.02) 0%, transparent 60%)",
        }}
      />

      {/* ── Layer 2: Knowledge graph ──────────────────────────────────────────
          SVG fills the section. viewBox is 1200×700, node distribution is
          right-heavy. xMidYMid meet keeps the full graph visible and scaled.
          ─────────────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Connecting edges — neutral warm-white at 7% opacity */}
        {edges.map(([i, j], k) => (
          <line
            key={k}
            x1={NODES[i].x}
            y1={NODES[i].y}
            x2={NODES[j].x}
            y2={NODES[j].y}
            stroke="#E8E8EC"
            strokeWidth="0.6"
            strokeOpacity="0.07"
          />
        ))}

        {/* Nodes — small dots, pulse nodes use accent color */}
        {NODES.map((node, i) => {
          const hasPulse = i in PULSE_CONFIG;
          return (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={hasPulse ? 2.2 : 1.5}
              fill={hasPulse ? "#00E5A0" : "#E8E8EC"}
              style={{
                opacity: 0.13,
                ...(hasPulse && {
                  animation: `knowledge-node-pulse 7s ease-in-out ${PULSE_CONFIG[i]}s infinite`,
                }),
              }}
            />
          );
        })}
      </svg>

      {/* ── Layer 3: Scan sweep — the signature element ───────────────────────
          A soft vertical gradient band (80px wide) moves left → right once
          every ~22 seconds, then pauses for ~11 seconds before sweeping again.
          It reads as a system scanning its own structure.
          GPU-composited (transform + opacity only). No layout impact.
          ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-y-0"
        style={{
          left: "-80px",
          width: "80px",
          background:
            "linear-gradient(to right, transparent 0%, rgba(0,229,160,0.065) 50%, transparent 100%)",
          animation: "scan-sweep 22s ease-in-out 3s infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* ── Layer 4: Left-edge fade mask ──────────────────────────────────────
          Fades the graph out over the left ~44% of the hero — the zone where
          the typography lives. The graph is still present but recessive here,
          the text reads on clean background.
          ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: "44%",
          background:
            "linear-gradient(to right, #0A0A0F 18%, rgba(10,10,15,0.65) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
