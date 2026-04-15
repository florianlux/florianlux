import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-faint">
        Nicht gefunden
      </p>
      <h1 className="mt-4 text-6xl font-semibold tracking-tight">
        404
      </h1>
      <p className="mt-6 text-lg text-muted">Diese Seite existiert nicht.</p>
      <Link
        href="/"
        className="mt-10 border-b border-transparent text-sm text-muted transition-all duration-400 hover:border-faint hover:text-foreground"
      >
        Zur Startseite
      </Link>
    </section>
  );
}
