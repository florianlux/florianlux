import Link from "next/link";
import { socialLinks } from "@/app/site-data";
export default function Footer() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-top">
        <Link href="/" className="footer-wordmark">
          FLORIAN LUX<span>↗</span>
        </Link>
        <p>
          Independent thinking.
          <br />
          Thoughtful things.
        </p>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Florian Lux</p>
        <nav aria-label="Footer navigation">
          <Link href="/websites">Website services</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          {socialLinks
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
        </nav>
        <Link href="/#hero">Back to top ↑</Link>
      </div>
    </footer>
  );
}
