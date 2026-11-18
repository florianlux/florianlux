"use client";
import { useEffect, useRef, useState } from "react";
import type { AnalyticsAdapter, AnalyticsEvent } from "@/app/motionswitch-data";
declare global { interface Window { fluxAnalytics?: AnalyticsAdapter } }
function track(event: AnalyticsEvent, data: Record<string, string | number>) {
  try { const adapter = window.fluxAnalytics; if (adapter?.hasConsent()) adapter.track(event, data); } catch { /* Optional analytics cannot own the interface. */ }
}
export default function MotionEnhancer() {
  const [sound, setSound] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => () => { void audio.current?.close(); }, []);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".motionswitch-root");
    if (!root) return;
    const cleanups = new Set<() => void>();
    function changed(event: Event) {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.name !== "motion-mode") return;
      setAnnouncement(`${input.value.toUpperCase()} mode selected.`);
      track("mode_switch", { mode: input.value });
      if (sound && audio.current) {
        const ctx = audio.current; void ctx.resume();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = "sine"; osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + .07);
        gain.gain.setValueAtTime(.025, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .13);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .14);
        const cleanup = () => { osc.disconnect(); gain.disconnect(); cleanups.delete(cleanup); };
        osc.onended = cleanup; cleanups.add(cleanup);
      }
    }
    function clicked(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[data-event]");
      if (anchor) track(anchor.dataset.event as AnalyticsEvent, { href: anchor.getAttribute("href") ?? "" });
    }
    function expanded(event: Event) {
      const target = event.target;
      if (target instanceof HTMLDetailsElement && target.dataset.timeline && target.open) track("timeline_interaction", { entry: target.dataset.timeline });
    }
    root.addEventListener("change", changed); root.addEventListener("toggle", expanded, true); document.addEventListener("click", clicked);
    return () => { root.removeEventListener("change", changed); root.removeEventListener("toggle", expanded, true); document.removeEventListener("click", clicked); cleanups.forEach(fn => fn()); };
  }, [sound]);
  useEffect(() => {
    const media = document.querySelector<HTMLElement>(".ms-portrait-frame"); if (!media) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)"), fine = window.matchMedia("(pointer: fine)");
    let frame = 0, x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, previous = 0, px = 0, py = 0;
    let measure = false;
    function tick(now: number) {
      if (measure) { const box = media!.getBoundingClientRect(); tx = ((px - box.left) / box.width - .5) * 8; ty = ((py - box.top) / box.height - .5) * 6; measure = false; }
      const dt = Math.min((now - (previous || now - 16)) / 1000, .032); previous = now;
      vx += ((tx - x) * 140 - vx * 22) * dt; vy += ((ty - y) * 140 - vy * 22) * dt;
      x += vx * dt; y += vy * dt;
      media!.style.setProperty("--portrait-x", `${x.toFixed(2)}px`); media!.style.setProperty("--portrait-y", `${y.toFixed(2)}px`);
      if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy) > .03) frame = requestAnimationFrame(tick);
      else { frame = 0; previous = 0; }
    }
    function move(event: PointerEvent) {
      if (reduced.matches || !fine.matches) return;
      px = event.clientX; py = event.clientY; measure = true;
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function reset() {
      tx = ty = 0; measure = false;
      if (reduced.matches) { cancelAnimationFrame(frame); frame = previous = 0; x = y = vx = vy = 0; media!.style.setProperty("--portrait-x", "0px"); media!.style.setProperty("--portrait-y", "0px"); }
      else if (!frame) frame = requestAnimationFrame(tick);
    }
    media.addEventListener("pointermove", move); media.addEventListener("pointerleave", reset); reduced.addEventListener("change", reset);
    return () => { cancelAnimationFrame(frame); media.removeEventListener("pointermove", move); media.removeEventListener("pointerleave", reset); reduced.removeEventListener("change", reset); };
  }, []);
  useEffect(() => {
    try { const a = window.fluxAnalytics; if (a?.hasConsent() && a.visitorStatus?.() === "returning") track("return_visit", { page: "/" }); } catch { /* Optional adapter. */ }
    const seen = new Set<number>(); let frame = 0;
    function scroll() {
      try { if (!window.fluxAnalytics?.hasConsent()) return; } catch { return; }
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0;
        try { if (!window.fluxAnalytics?.hasConsent()) return; } catch { return; }
        const extent = document.documentElement.scrollHeight - window.innerHeight, depth = extent > 0 ? window.scrollY / extent * 100 : 0;
        for (const n of [25, 50, 75, 100]) if (depth >= n - .5 && !seen.has(n)) { seen.add(n); track("scroll_depth", { percent: n }); }
      });
    }
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);
  async function toggleSound() {
    if (sound) { setSound(false); return; }
    if (!window.AudioContext) { setAnnouncement("Sound is unavailable in this browser."); return; }
    try { audio.current ??= new AudioContext(); await audio.current.resume(); setSound(true); }
    catch { setAnnouncement("Sound is unavailable in this browser."); }
  }
  return <><button type="button" className="ms-sound" aria-pressed={sound} onClick={toggleSound}><span aria-hidden="true">{sound ? "◉" : "○"}</span> Sound {sound ? "on" : "off"}</button><span className="sr-only" role="status" aria-live="polite">{announcement}</span></>;
}
