import "@/app/website-service.css";
import type { Metadata } from "next";
import Link from "next/link";
import { identity } from "@/app/site-data";
import FadeIn from "@/components/FadeIn";
import WebsiteMockup from "@/components/WebsiteMockup";
import WebsiteRequestForm from "@/components/WebsiteRequestForm";
import {
  BreadcrumbSchema,
  ProfessionalServiceSchema,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: {
    absolute: "Websites für lokale Unternehmen | Florian Lux",
  },
  description:
    "Moderne Websites für lokale Unternehmen, Selbstständige und kleine Marken. Persönlich umgesetzt von Florian Lux - mobil optimiert, hochwertig gestaltet und klar strukturiert.",
  alternates: {
    canonical: "/websites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites für lokale Unternehmen | Florian Lux",
    description: "Moderne Websites für lokale Unternehmen, Selbstständige und kleine Marken. Persönlich umgesetzt, mobil optimiert und klar strukturiert.",
    images: ["/opengraph-image"],
  },
  openGraph: {
    title: "Websites für lokale Unternehmen | Florian Lux",
    description:
      "Moderne Websites für lokale Unternehmen, Selbstständige und kleine Marken - persönlich umgesetzt, mobil optimiert und klar strukturiert.",
    url: "/websites",
    locale: "de_DE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Florian Lux — Websites für lokale Unternehmen",
      },
    ],
    type: "website",
  },
};

const audiences = [
  {
    title: "Gastronomie & Imbiss",
    text: "Speisekarte, Standort, Öffnungszeiten und Bestellweg so klar, dass niemand lange suchen muss.",
  },
  {
    title: "Kosmetik & Beauty",
    text: "Ein hochwertiger Auftritt für Leistungen, Preise, Stil und einfache Terminanfragen.",
  },
  {
    title: "Handwerk & lokale Dienstleister",
    text: "Seriöse Präsenz mit Leistungen, Referenzen, Einzugsgebiet und direkter Kontaktmöglichkeit.",
  },
  {
    title: "Pflege, Beratung & soziale Angebote",
    text: "Vertrauensvolle Struktur, klare Sprache und ruhige Wege zu Erstkontakt oder Beratung.",
  },
  {
    title: "Kleine Shops / Produktseiten",
    text: "Produkte, Vorteile und Anfragewege kompakt präsentiert, ohne direkt ein großes Shopsystem zu brauchen.",
  },
  {
    title: "Vereine & lokale Initiativen",
    text: "Aktuelles, Angebote, Mitgliederinfos und Kontakt sauber gebündelt für alle Altersgruppen.",
  },
];

const features = [
  "Moderne Startseite",
  "Responsive Design",
  "Kontaktformular oder klare Kontakt-CTA",
  "Google Maps / Standortbereich",
  "Angebots- und Leistungssektionen",
  "Überzeugende Texte",
  "SEO-Basics",
  "Performance-Optimierung",
  "Technische Einrichtung",
  "Optional Wartung / Erweiterung",
];

const demos = [
  {
    title: "Dönerwagen / Streetfood",
    variant: "streetfood" as const,
    text: "Mutig, appetitlich und schnell erfassbar: Karte, Standort und Öffnungszeiten auf den ersten Blick.",
  },
  {
    title: "Kosmetik / Beauty Studio",
    variant: "beauty" as const,
    text: "Elegant, weich und hochwertig: Leistungen, Atmosphäre und Termin-CTA mit ruhigem Premium-Gefühl.",
  },
  {
    title: "Technikhilfe für Senioren",
    variant: "senior" as const,
    text: "Vertrauenswürdig, klar und lokal: einfache Sprache, klare Pakete und ein direkter Anrufweg.",
  },
  {
    title: "Portfolio / Personal Brand",
    variant: "brand" as const,
    text: "Modern, clean und hochwertig: Persönlichkeit, Angebot und Arbeitsproben in einer starken Struktur.",
  },
];

const packages = [
  {
    name: "Starter Website",
    price: "ab 299 €",
    intro: "Für einfache Online-Präsenz",
    items: [
      "1 Seite / Landingpage",
      "Modernes Design",
      "Mobil optimiert",
      "Kontaktbereich",
      "Basis-Texte",
      "Schnelle Veröffentlichung",
    ],
  },
  {
    name: "Business Website",
    price: "ab 599 €",
    intro: "Für Unternehmen, die professionell wirken wollen",
    featured: true,
    items: [
      "Bis zu 5 Sektionen oder Unterseiten",
      "Individuelles Design",
      "Leistungen / Angebot / Über mich",
      "Kontaktformular",
      "SEO-Basics",
      "Google Maps / Standortbereich",
      "Technische Einrichtung",
    ],
  },
  {
    name: "Premium Website",
    price: "ab 999 €",
    intro: "Für starke Markenwirkung",
    items: [
      "Individuelle visuelle Richtung",
      "Mehrere Unterseiten",
      "Hochwertige Animationen",
      "Conversion-Struktur",
      "Erweiterte SEO-Grundlagen",
      "Performance-Optimierung",
      "Launch-Begleitung",
    ],
  },
];

const process = [
  [
    "Kurzes Gespräch",
    "Wir klären Ziel, Umfang und ob eine kleine oder größere Lösung sinnvoll ist.",
  ],
  [
    "Inhalte & Ziel klären",
    "Du lieferst, was vorhanden ist. Ich helfe bei Struktur, Texten und fehlenden Stellen.",
  ],
  [
    "Design und Umsetzung",
    "Ich baue die Website modern, schnell und passend zu deinem Angebot.",
  ],
  [
    "Veröffentlichung und Feinschliff",
    "Zum Schluss gehen wir mobil, Kontaktwege und Details gemeinsam sauber durch.",
  ],
];

export default function WebsitesPage() {
  return (
    <div lang="de" className="website-page">
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Websites", href: "/websites" },
        ]}
      />
      <ProfessionalServiceSchema />

      <section className="websites-hero">
        <div className="page-shell websites-hero-grid">
          <FadeIn direction="none" duration={0.7}>
            <div>
              <p className="section-kicker text-accent/70">Website-Service</p>
              <h1>Moderne Websites, die Kunden ernst nehmen.</h1>
              <p className="websites-hero-copy">
                Ich erstelle hochwertige Websites für lokale Unternehmen und
                Selbstständige - mit klarer Struktur, starker Optik und allem,
                was du brauchst, um online professionell aufzutreten.
              </p>
              <div className="websites-hero-actions">
                <Link
                  href="#anfrage"
                  className="premium-button premium-button-primary"
                >
                  Kostenlose Ersteinschätzung anfragen
                </Link>
                <Link
                  href="#beispiele"
                  className="premium-button premium-button-secondary"
                >
                  Website-Beispiele ansehen
                </Link>
              </div>
              <div
                className="websites-trust-row"
                role="group"
                aria-label="Hinweise zur Zusammenarbeit"
              >
                {[
                  "Persönliche Umsetzung",
                  "Schnelle Lieferung",
                  "Mobile optimiert",
                  "Faire Einstiegspakete",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" duration={0.75} delay={0.08}>
            <div className="websites-hero-visual" aria-hidden="true">
              <WebsiteMockup variant="streetfood" />
              <div className="floating-ui-card floating-ui-card-a">
                <span>Mobile Design</span>
                <strong>Responsive</strong>
              </div>
              <div className="floating-ui-card floating-ui-card-b">
                <span>Anfragen</span>
                <strong>Klarer Kontaktweg</strong>
              </div>
              <div className="floating-ui-card floating-ui-card-c">
                <span>SEO Basics</span>
                <strong>Struktur + Standort</strong>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell websites-section">
        <div className="section-split-heading">
          <div>
            <p className="section-kicker">Für wen ist das?</p>
            <h2>Lokale Angebote, die online nicht kleiner wirken sollen.</h2>
          </div>
          <p>
            Egal ob Laden, Praxis, Verein oder Solo-Angebot: Die Website soll
            schnell erklären, Vertrauen geben und Kontakt auslösen.
          </p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article key={audience.title} className="audience-card">
              <span />
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell websites-section">
        <div className="section-split-heading">
          <div>
            <p className="section-kicker">Was du bekommst</p>
            <h2>Alles, was eine professionelle Website wirklich braucht.</h2>
          </div>
          <p>
            Kein Technikstress und kein Baukasten-Look. Ich kombiniere Design,
            Struktur, Text und saubere Umsetzung zu einem Auftritt, der fertig
            benutzbar ist.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature} className="feature-tile">
              <span />
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section id="beispiele" className="section-shell websites-section">
        <div className="section-split-heading">
          <div>
            <p className="section-kicker">Beispiel-Designs</p>
            <h2>So kann lokale Sichtbarkeit aussehen.</h2>
          </div>
          <p>
            Die folgenden Kacheln sind Demo-Konzepte, keine echten
            Kundenprojekte. Sie zeigen Stilrichtungen, die individuell auf dein
            Angebot angepasst werden können.
          </p>
        </div>
        <div className="demo-grid">
          {demos.map((demo) => (
            <article key={demo.title} className="demo-card">
              <WebsiteMockup variant={demo.variant} compact />
              <div className="demo-card-copy">
                <span>Demo-Konzept</span>
                <h3>{demo.title}</h3>
                <p>{demo.text}</p>
                <a href="#anfrage">So könnte deine Website wirken.</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell websites-section">
        <div className="section-split-heading">
          <div>
            <p className="section-kicker">Pakete</p>
            <h2>Faire Einstiegspakete ohne Agenturpreise.</h2>
          </div>
          <p>
            Die finalen Preise hängen vom Umfang ab. Nach einer kurzen
            Einschätzung bekommst du ein klares Angebot.
          </p>
        </div>
        <div className="pricing-grid">
          {packages.map((pack) => (
            <article
              key={pack.name}
              className={`pricing-card ${pack.featured ? "pricing-card-featured" : ""}`}
            >
              {pack.featured ? (
                <span className="pricing-badge">Empfohlen</span>
              ) : null}
              <h3>{pack.name}</h3>
              <strong>{pack.price}</strong>
              <p>{pack.intro}</p>
              <ul>
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell websites-section">
        <div className="process-panel">
          <div>
            <p className="section-kicker">Ablauf</p>
            <h2>Unkompliziert, persönlich, ohne Technikstress.</h2>
          </div>
          <div className="process-grid">
            {process.map(([title, text], index) => (
              <article key={title} className="process-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell websites-section">
        <div className="why-panel">
          <div>
            <p className="section-kicker">Warum Florian?</p>
            <h2>Persönlicher Ansprechpartner mit technischem Fundament.</h2>
          </div>
          <div className="why-copy">
            <p>
              Ich bin ausgebildeter Fachinformatiker und baue moderne
              Webprodukte mit einem Auge für Struktur, Performance und klare
              Nutzerwege. Du sprichst direkt mit der Person, die dein Projekt
              versteht und umsetzt.
            </p>
            <div>
              {[
                "Technische Erfahrung",
                "Moderne Webentwicklung",
                "Keine anonyme Agentur",
                "Verständnis für lokale Unternehmen",
                "Faire Umsetzung ohne unnötigen Overhead",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="anfrage" className="section-shell websites-section">
        <WebsiteRequestForm />
      </section>

      <section className="section-shell websites-final-cta">
        <div>
          <p className="section-kicker">Nächster Schritt</p>
          <h2>
            Deine Website soll nicht nur existieren. Sie soll Eindruck machen.
          </h2>
          <p>
            Schick mir kurz, was du vorhast - ich sage dir ehrlich, welche
            Lösung sinnvoll ist.
          </p>
          <div className="websites-hero-actions">
            <Link
              href="#anfrage"
              className="premium-button premium-button-primary"
            >
              Projekt anfragen
            </Link>
            <a
              href={`mailto:${identity.email}`}
              className="premium-button premium-button-secondary"
            >
              Direkt per E-Mail
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
