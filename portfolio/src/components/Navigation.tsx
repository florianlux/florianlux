"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const links = [
  { href: "/#selected-work", label: "Work" },
  { href: "/#story", label: "Story" },
  { href: "/#archive", label: "Archive" },
  { href: "/#now", label: "Now" },
];
export default function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const sentinel = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  function closeMenu(returnFocus = false) {
    if (menu.current) menu.current.open = false;
    setOpen(false);
    if (returnFocus) menu.current?.querySelector("summary")?.focus();
  }
  useEffect(() => {
    if (!sentinel.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const compact = window.matchMedia("(max-width: 800px)");
    function resize() { if (!compact.matches) closeMenu(); }
    compact.addEventListener("change", resize);
    return () => compact.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, .site-footer"));
    const priorInert = background.map(el => el.inert);
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gap}px`;
    background.forEach(el => { el.inert = true; });
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      background.forEach((el, i) => { el.inert = priorInert[i]; });
    };
  }, [open]);
  return <>
    <span ref={sentinel} className="header-sentinel" aria-hidden="true" />
    <header className="site-header" data-scrolled={scrolled}>
      <nav className="page-shell nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand" onClick={() => closeMenu()}>
          <span className="brand-mark" aria-hidden="true">fl<span>↗</span></span>
          <span>FLORIAN LUX</span><span className="sr-only"> — home</span>
        </Link>
        <div className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        <Link href="/contact" className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
        <details ref={menu} className="mobile-menu" onToggle={() => setOpen(menu.current?.open ?? false)}
          onKeyDown={event => {
            if (event.key === "Escape") { event.preventDefault(); closeMenu(true); return; }
            if (event.key !== "Tab" || !menu.current?.open) return;
            const focusable = Array.from(menu.current.querySelectorAll<HTMLElement>("summary, a[href]"));
            const first = focusable[0], last = focusable.at(-1);
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }}>
          <summary aria-controls="mobile-navigation" aria-expanded={open}>Menu <span aria-hidden="true">+</span></summary>
          <div id="mobile-navigation" className="mobile-links">
            <p className="eyebrow">FLORIAN LUX / INDEX</p>
            {[...links, { href: "/projects", label: "All projects" }, { href: "/websites", label: "Website services" }, { href: "/contact", label: "Let’s talk" }].map((link, i) => <Link key={link.href} href={link.href} onClick={() => closeMenu()}><span><small aria-hidden="true">{String(i + 1).padStart(2, "0")}</small>{link.label}</span><span aria-hidden="true">↗</span></Link>)}
            <p className="mobile-menu-note">BUILD / CREATE / EXPLORE</p>
          </div>
        </details>
      </nav>
    </header>
  </>;
}
