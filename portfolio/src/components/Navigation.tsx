"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }

    // Show nav once hero section scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        height: "48px",
        background: "rgba(10, 10, 15, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex h-full items-center justify-between px-6 sm:px-10">
        {/* FL monogram */}
        <Link
          href="/"
          className="font-mono text-[14px] transition-opacity duration-300 hover:opacity-70"
          style={{ color: "#00E5A0" }}
        >
          FL
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            href="/#synapedia"
            className="font-mono text-[12px] transition-colors duration-300"
            style={{ color: "#A0A0AA" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#E8E8EC")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#A0A0AA")
            }
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="font-mono text-[12px] transition-colors duration-300"
            style={{ color: "#A0A0AA" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#E8E8EC")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#A0A0AA")
            }
          >
            About
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center sm:hidden"
          aria-label="Menu"
          style={{ color: "#A0A0AA" }}
        >
          <span className="font-mono text-[12px]">
            {mobileOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="flex flex-col gap-6 px-6 py-8 sm:hidden"
          style={{
            background: "rgba(10, 10, 15, 0.97)",
            borderTop: "1px solid #1A1A22",
          }}
        >
          <Link
            href="/#synapedia"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-[14px]"
            style={{ color: "#A0A0AA" }}
          >
            Work
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-[14px]"
            style={{ color: "#A0A0AA" }}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
