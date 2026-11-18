"use client";
import Image from "next/image";
import { useState } from "react";
import { identityMedia } from "@/app/motionswitch-data";
export default function MotionPortrait({ hero = false }: { hero?: boolean }) {
  const [failed, setFailed] = useState(false), media = identityMedia[0];
  return <div className="ms-portrait-frame" data-media-state={failed ? "fallback" : "ready"}>
    <span className="ms-portrait-fallback" aria-hidden="true">FL<span>{"//"}</span></span>
    {!failed && <Image src={media.src} alt={media.alt} fill sizes={hero ? "(min-width: 800px) 48vw, 100vw" : "(min-width: 1000px) 40vw, 100vw"} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} onError={() => setFailed(true)} />}
    {failed && <span className="sr-only">Florian Lux. Portrait image unavailable.</span>}
  </div>;
}
