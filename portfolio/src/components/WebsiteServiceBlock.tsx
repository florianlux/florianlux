import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import WebsiteMockup from "@/components/WebsiteMockup";
import "@/app/website-service.css";

const benefits = [
  "Modernes Design statt Baukasten-Look",
  "Mobile-first und schnell",
  "Texte, Struktur und Kontaktwege inklusive",
  "Optional mit Google- und SEO-Grundlagen",
];

export default function WebsiteServiceBlock() {
  return (
    <div className="website-page" lang="de"><section id="website-service" className="section-shell website-service-section">
      <FadeIn direction="none" duration={0.7}>
        <div className="website-service-card">
          <div className="website-service-copy">
            <p className="section-kicker">Websites für lokale Unternehmen</p>
            <h2>Websites, die sofort professioneller wirken.</h2>
            <p>
              Für lokale Unternehmen, Selbstständige und kleine Marken, die
              online endlich so gut aussehen wollen, wie sie arbeiten.
            </p>
            <div className="website-service-actions">
              <Link href="/websites#anfrage" className="premium-button premium-button-primary">
                Website anfragen
              </Link>
              <Link href="/websites#beispiele" className="premium-button premium-button-secondary">
                Beispiele ansehen
              </Link>
            </div>
          </div>

          <div className="website-service-benefits">
            {benefits.map((benefit) => (
              <div key={benefit} className="website-benefit-card">
                <span />
                <p>{benefit}</p>
              </div>
            ))}
          </div>

          <div className="website-service-visual">
            <div className="before-after-card before-card">
              <span>Vorher</span>
              <i />
              <i />
              <i />
            </div>
            <WebsiteMockup variant="beauty" compact />
            <div className="before-after-card after-card">
              <span>Nachher</span>
              <strong>+ Klarer Eindruck</strong>
            </div>
          </div>
        </div>
      </FadeIn>
    </section></div>
  );
}
