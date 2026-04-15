"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/projects", label: "Projekte" },
  { href: "/about", label: "Über" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-white/[0.04] bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="text-[11px] font-normal uppercase tracking-[0.2em] text-faint/80 transition-colors duration-500 hover:text-muted"
          >
            Florian Lux
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-10 sm:flex">
            {links.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isActive
                      ? "text-muted"
                      : "text-faint/70 hover:text-muted/80"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center sm:hidden"
            aria-label="Menü öffnen"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-4 bg-faint transition-all duration-300 ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-faint transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 sm:hidden ${
            mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 pt-2">
            <div className="flex flex-col gap-5">
              {links.map(({ href, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive
                        ? "text-muted"
                        : "text-faint/70 hover:text-muted/80"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
