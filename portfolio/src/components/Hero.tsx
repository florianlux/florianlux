import Link from "next/link";
import LuxMark from "@/components/LuxMark";
import { identity } from "@/app/site-data";
export default function Hero() {
  return (
    <section id="hero" className="identity-hero" aria-labelledby="hero-title">
      <div className="page-shell hero-content">
        <div className="hero-edition">
          <span>Independent thinking. Connected systems.</span>
          <span>Digital identity / 2026</span>
        </div>
        <h1 id="hero-title" className="hero-name">
          FLORIAN LUX<span className="hero-period">.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-manifesto">
            <p className="eyebrow">A little curiosity. A lot of intention.</p>
            <h2>
              BUILDING
              <br />
              WHAT’S NEXT<span className="hero-period">.</span>
            </h2>
            <p className="hero-role">{identity.role}</p>
            <p className="hero-description">
              Thoughtful digital products.
              <br />
              Built for the people on the other side.
            </p>
            <Link href="#selected-work" className="button button-light">
              Explore the work <span aria-hidden="true">↘</span>
            </Link>
          </div>
          <div className="hero-object" aria-hidden="true">
            <LuxMark />
            <span className="object-label">
              Perspective changes everything.
            </span>
          </div>
        </div>
        <div className="hero-baseline">
          <span>Technology × creativity × human needs</span>
          <Link href="#about">
            Scroll to discover <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
