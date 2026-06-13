import Link from "next/link";

type ContactSectionProps = {
  links: Array<{ label: string; href: string }>;
};

export default function ContactSection({ links }: ContactSectionProps) {
  return (
    <section id="contact-cta" className="section-shell pt-0">
      <div className="relative overflow-hidden border-t border-white/[0.05] pt-8 sm:pt-10 lg:pt-12">
        <div aria-hidden="true" className="contact-ambient" />
        <p className="section-kicker">Contact</p>
        <div className="relative mt-5 grid gap-9 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-12">
          <div>
            <h2 className="max-w-[14ch] text-4xl font-medium leading-[0.98] tracking-normal text-gradient sm:text-5xl lg:text-6xl">
              Let&apos;s build something structured, useful and beautiful.
            </h2>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <a href="mailto:hello@florianlux.dev" className="premium-button premium-button-primary">
                Email Florian
              </a>
              <Link href="/contact" className="premium-button premium-button-secondary">
                Start a project
              </Link>
            </div>
          </div>

          <div>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between border-t border-white/[0.07] py-4 text-[15px] text-white/70 transition-colors duration-200 hover:border-white/[0.13] hover:text-white"
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
