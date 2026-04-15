import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Über Florian Lux — Denkweise, Hintergrund & Perspektive",
  description:
    "Wer ist Florian Lux? Builder digitaler Systeme mit Fokus auf Wissensarchitektur, Produktdesign und technische Tiefe.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Über mich", href: "/about" },
        ]}
      />

      <section className="mx-auto max-w-[960px] px-6 pt-32 pb-[120px] sm:pt-40 sm:pb-[160px]">
        <FadeIn direction="none" duration={0.8}>
          <Link
            href="/"
            className="text-sm text-faint transition-colors duration-300 hover:text-muted"
          >
            ← Zurück
          </Link>
          <h1 className="mt-12 text-4xl font-semibold tracking-tight sm:text-5xl">
            Über mich
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Ich denke in Systemen. Nicht, weil es ein Buzzword ist — sondern
            weil komplexe Probleme selten mit einzelnen Lösungen verschwinden.
          </p>
        </FadeIn>

        <div className="mt-24 max-w-2xl space-y-20">
          <FadeIn direction="none" duration={0.8}>
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                Wie ich denke
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Mein Ansatz beginnt nie beim Code. Er beginnt bei der Frage: Was
                ist das eigentliche Problem — und wie sieht ein System aus, das
                es nicht nur löst, sondern langfristig tragfähig macht? Ich
                denke in Datenstrukturen, in Relationen, in Informationsflüssen.
                Bevor eine Zeile Code entsteht, steht die Architektur.
              </p>
              <p className="mt-4 leading-[1.8] text-muted">
                Diese Denkweise stammt nicht aus einem einzelnen Fach — sie
                entsteht an der Schnittstelle von Neurowissenschaften,
                Informationsdesign, Software Engineering und einer tiefen
                Faszination für die Struktur von Wissen.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                Was mich antreibt
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Wissen ist die wertvollste Ressource — aber nur, wenn es
                zugänglich, strukturiert und verknüpft ist. Die meisten
                digitalen Produkte behandeln Information als Content. Ich
                behandle sie als System.
              </p>
              <p className="mt-4 leading-[1.8] text-muted">
                Mich interessiert nicht das nächste Feature oder der nächste
                Launch. Mich interessiert: Wie baut man etwas, das in fünf
                Jahren relevanter ist als heute? Diese Frage treibt jedes
                meiner Projekte.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                Mein Hintergrund
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Ich komme nicht aus einem einzelnen Bereich — und genau das ist
                der Punkt. Meine Arbeit lebt davon, dass ich SEO nicht als
                Marketing verstehe, sondern als Architektur. Dass ich Design
                nicht als Oberfläche sehe, sondern als Systemsprache. Und dass
                Technologie für mich kein Selbstzweck ist, sondern ein
                Werkzeug, um Wissensstrukturen lebendig zu machen.
              </p>
              <p className="mt-4 leading-[1.8] text-muted">
                Aktuell arbeite ich an Synapedia und Neurocodex — zwei
                Projekte, die diesen Ansatz in konkrete Produkte übersetzen.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
