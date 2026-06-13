export default function Footer() {
  return (
    <footer id="footer" className="pb-8 pt-6">
      <div className="page-shell">
        <div className="hairline" />
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">
              Florian Lux
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
              Intelligent web products, automation systems and knowledge platforms with a sharp product lens.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/58 sm:items-end">
            <div className="flex flex-wrap gap-4">
              <a href="/websites" className="transition-colors hover:text-white">
                Websites
              </a>
              <a href="https://github.com/florianlux" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                GitHub
              </a>
              <a href="https://linkedin.com/in/florian-lux-75a198258" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                LinkedIn
              </a>
              <a href="mailto:hello@florianlux.dev" className="transition-colors hover:text-white">
                Email
              </a>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/35">
              Bonn, Germany · 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
