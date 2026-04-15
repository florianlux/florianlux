"use client";

import { useEffect, useState } from "react";

export default function HeroTimestamp() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      return now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
    };

    setTimestamp(format());
    const interval = setInterval(() => setTimestamp(format()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute right-10 top-10 hidden flex-col items-end gap-1.5 text-right sm:flex"
      style={{ color: "#4A4A55" }}
    >
      <span className="font-mono text-[11px] tracking-wide">Bonn, DE</span>
      <span className="font-mono text-[11px] tracking-wide">System Builder</span>
      <span className="font-mono text-[10px] tabular-nums tracking-wide">
        {timestamp}
      </span>
    </div>
  );
}
