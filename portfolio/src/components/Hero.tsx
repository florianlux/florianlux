import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88svh] overflow-hidden bg-[#07080c] lg:min-h-[90svh]"
    >
      <div className="portfolio-backdrop" aria-hidden="true" />
      <div className="page-shell hero-shell relative grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.62fr)] lg:items-center lg:gap-12">
        <div>
          <p className="section-kicker text-accent/70">Florian Lux</p>
          <h1 className="mt-5 max-w-[8.2ch] text-6xl font-medium leading-[0.9] tracking-normal text-gradient sm:text-7xl lg:text-8xl xl:text-9xl">
            Florian Lux
          </h1>
          <p className="mt-6 max-w-[38rem] text-lg leading-[1.58] tracking-normal text-white/74 sm:text-xl lg:text-2xl">
            I turn dense knowledge into navigable platforms, automation systems
            and product interfaces with a calm, usable edge.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-8">
            <Link href="/#featured-projects" className="premium-button premium-button-primary sm:w-auto">
              View projects
            </Link>
            <Link href="/contact" className="premium-button premium-button-secondary sm:w-auto">
              Contact
            </Link>
          </div>
        </div>

        <div className="hero-portfolio-frame" aria-hidden="true">
          <div className="hero-portfolio-panel hero-portfolio-panel-primary">
            <div className="hero-panel-bar">
              <span>Synapedia</span>
              <i />
            </div>
            <Image
              src="/artifacts/synapedia-product-home.png"
              alt=""
              fill
              className="hero-artifact-image hero-artifact-synapedia"
              sizes="(min-width: 1024px) 420px, 90vw"
              priority
            />
          </div>
          <div className="hero-portfolio-panel hero-portfolio-panel-secondary">
            <div className="hero-panel-bar">
              <span>Neurocodex</span>
              <i />
            </div>
            <Image
              src="/artifacts/neurocodex-architecture-page.png"
              alt=""
              fill
              className="hero-artifact-image hero-artifact-neurocodex"
              sizes="(min-width: 1024px) 320px, 70vw"
            />
          </div>
          <div className="hero-portfolio-panel hero-portfolio-panel-tertiary">
            <div className="hero-panel-bar">
              <span>Architecture</span>
              <i />
            </div>
            <Image
              src="/artifacts/neurocodex-architecture-page.png"
              alt=""
              fill
              className="hero-artifact-image hero-artifact-case"
              sizes="(min-width: 1024px) 230px, 48vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
