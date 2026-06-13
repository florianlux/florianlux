"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#hero", label: "Portfolio" },
    { href: "/projects", label: "Projekte" },
    { href: "/websites", label: "Websites" },
    { href: "/contact", label: "Kontakt" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5">
      <div
        className={`page-shell flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/10 bg-black/45 shadow-[0_16px_50px_rgba(0,0,0,0.28)]"
            : "border-white/8 bg-black/28"
        }`}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-accent">
            FL
          </span>
          <span className="hidden text-sm tracking-[-0.03em] text-white/90 sm:block">
            Florian Lux
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/6 bg-white/[0.02] p-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/68 transition-colors duration-200 hover:bg-white/6 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="https://github.com/florianlux"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/62 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link href="/websites#anfrage" className="premium-button premium-button-secondary px-4 py-2 text-sm">
            Website anfragen
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-4 text-sm text-white/78 sm:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="page-shell surface mt-3 rounded-[2rem] p-5 sm:hidden"
          style={{
            backgroundColor: "rgba(10, 10, 15, 0.92)",
          }}
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-white/82 transition-colors hover:bg-white/6"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hairline my-4" />
          <div className="flex items-center justify-between">
            <a
              href="https://github.com/florianlux"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/65"
            >
              GitHub
            </a>
            <Link
              href="/websites#anfrage"
              onClick={() => setMobileOpen(false)}
              className="premium-button premium-button-secondary px-4 py-2 text-sm"
            >
              Anfrage
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
