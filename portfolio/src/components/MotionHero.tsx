import Link from "next/link";
import { identity } from "@/app/site-data";
import { modes } from "@/app/motionswitch-data";
import MotionPortrait from "./MotionPortrait";
import MotionEnhancer from "./MotionEnhancer";
export default function MotionHero() {
  return <section id="hero" className="ms-hero" aria-labelledby="hero-title">
    <div className="ms-hero-media"><MotionPortrait hero /><span className="ms-portrait-credit">PORTRAIT ARTWORK / FLORIAN LUX</span><div className="ms-image-corner" aria-hidden="true">{modes.map(mode => <span key={mode.id} className={`ms-image-mode ms-image-${mode.id}`}>FL / {mode.code}</span>)}</div></div>
    <div className="ms-hero-copy"><div className="ms-edition"><span>INDEPENDENT BY DESIGN</span><span>EST. {identity.birthYear}</span></div>
      <h1 id="hero-title" aria-label={identity.name}><span className="ms-name-line"><span>FLORIAN</span></span><span className="ms-name-line"><span>LUX<i aria-hidden="true">{"//"}</i></span></span></h1><p className="ms-descriptor">BUILD / CREATE / EXPLORE</p>
      <div className="ms-hero-panels">{modes.map(mode => <div key={mode.id} className={`ms-hero-panel ms-hero-${mode.id}`}><p className="eyebrow">{mode.code} / {mode.label} MODE</p><h2>{mode.heading}</h2><p className="ms-hero-description">{mode.description}</p><div className="ms-hero-actions"><Link href={mode.destination.href} className="text-link">{mode.destination.label} <span aria-hidden="true">↘</span></Link><Link href="/contact" className="text-link">Get in touch <span aria-hidden="true">↗</span></Link></div></div>)}</div>
      <div className="ms-hero-end"><span>ONE PERSON. MULTIPLE MODES.</span><MotionEnhancer /></div>
    </div>
  </section>;
}
