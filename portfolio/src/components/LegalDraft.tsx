import Link from "next/link";
import type { ReactNode } from "react";
import { isPublicRelease } from "@/app/publication";

export default function LegalDraft({ title, children }: { title: string; children: ReactNode }) {
  return <article className="section-shell legal-page" lang="de">
    <Link className="text-link" href="/">← Florian Lux</Link>
    <p className="eyebrow">Rechtliche Informationen / 11. Oktober 2026</p>
    <h1>{title}</h1>
    {!isPublicRelease && <aside className="legal-draft-notice" aria-label="Entwurfsstatus">
      <p className="eyebrow">BLOCKED / Entwurf</p>
      <p>Dieser Entwurf ist nicht zur öffentlichen Veröffentlichung freigegeben. Anschrift, Anbieterangaben und rechtliche Prüfung fehlen noch. Die aufgeführten Datenflüsse beschreiben den geprüften Entwicklungsstand.</p>
    </aside>}
    <div className="editorial-copy legal-copy">{children}</div>
  </article>;
}
