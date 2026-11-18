import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LegalDraft from "@/components/LegalDraft";
import evidence from "../release-evidence.json";
import { pageMetadata } from "../page-metadata";
import { isPublicRelease } from "../publication";

export const metadata: Metadata = { ...pageMetadata("Impressum", "Betreiber- und Kontaktangaben für das Portfolio von Florian Lux.", "/impressum", "de_DE"), robots: { index: isPublicRelease, follow: isPublicRelease } };
export default function Impressum() {
  return <><BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Impressum", href: "/impressum" }]} /><LegalDraft title="Impressum">
    <section><h2>Betreiber</h2><p>{evidence.operator.name}</p><p>{evidence.operator.address || "[Ladungsfähige Anschrift: NICHT BESTÄTIGT]"}</p></section>
    <section><h2>Geschäftlicher Kontakt</h2><a className="text-link" href={`mailto:${evidence.operator.email}`}>{evidence.operator.email} ↗</a>{!evidence.checks.managementMailboxVerified && <p>[Erreichbarkeit dieser Empfängeradresse: noch zu bestätigen.]</p>}</section>
    <section><h2>Weitere Betreiberangaben</h2><p>{evidence.operator.legalForm || "[Rechtsform beziehungsweise Art der selbstständigen Tätigkeit: zu bestätigen.]"}</p><p>{evidence.operator.register || "[Register und Registernummer: Anwendbarkeit prüfen; keine Eintragung bestätigt.]"}</p><p>{evidence.operator.vatId || "[Umsatzsteuer- oder Wirtschafts-Identifikationsnummer: nur ergänzen, wenn tatsächlich vorhanden und anzugeben.]"}</p><p>[Berufsrechtliche Angaben oder Aufsichtsbehörde: anhand der tatsächlichen Tätigkeit prüfen.]</p></section>
    <section><h2>Redaktionelle Verantwortung</h2><p>{evidence.operator.mediaResponsible || "[Anwendbarkeit von § 18 Abs. 2 MStV für die Journal-Inhalte prüfen. Falls erforderlich: verantwortliche Person und bestätigte Anschrift ergänzen.]"}</p></section>
    <section><h2>Inhalte und Bildmaterial</h2><p>Das Portfolio enthält eigene Projektbeschreibungen, bereitgestelltes Portrait-Artwork, lokale Schriftdateien sowie gekennzeichnete Projektansichten und Konzeptdarstellungen. Die Herkunft der Materialien und eine gegebenenfalls erforderliche Kennzeichnung künstlich erzeugter Inhalte werden vor Veröffentlichung geprüft. Eine Markenpartnerschaft wird nicht behauptet.</p></section>
    <section><h2>Datenschutz</h2><Link className="text-link" href="/datenschutz">Datenschutzhinweise ↗</Link></section>
  </LegalDraft></>;
}
