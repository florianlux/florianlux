import ModeSwitch from "@/components/ModeSwitch";
import FadeIn from "@/components/FadeIn";
import MotionHero from "@/components/MotionHero";
import Ecosystem from "@/components/Ecosystem";
import MotionWork from "@/components/MotionWork";
import WebsiteServiceBlock from "@/components/WebsiteServiceBlock";
import { MotionStory, MotionTimeline, MotionNow, MotionConnect } from "@/components/MotionStory";
import { PersonSchema, WebSiteSchema } from "@/components/StructuredData";
import { modes } from "./motionswitch-data";
export default function HomePage() {
  return <div className="motionswitch-root"><PersonSchema /><WebSiteSchema />
    <ModeSwitch options={modes.map(({ id, code, label }) => ({ id, code, label }))} />
    <MotionHero /><FadeIn><MotionWork /></FadeIn><WebsiteServiceBlock /><FadeIn><MotionStory /></FadeIn>
    <FadeIn><section id="ecosystem" className="section-shell ms-universe" aria-labelledby="ecosystem-title"><div className="section-heading-row"><div><p className="eyebrow">03 / Project universe</p><h2 id="ecosystem-title" className="display-heading">Different ideas.<br />Connected by intention.</h2></div><p className="section-aside">One important project.<br />A bigger field of curiosity.</p></div><Ecosystem /></section></FadeIn>
    <FadeIn><MotionTimeline /></FadeIn><FadeIn><MotionNow /></FadeIn><FadeIn><MotionConnect /></FadeIn>
  </div>;
}
