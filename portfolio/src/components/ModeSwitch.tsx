"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { ModeId } from "@/app/motionswitch-data";

type Option = { id: ModeId; code: string; label: string };
const subscribe = () => () => {};

/** Buttons enhance the server-rendered native radio fallback without owning its content. */
export default function ModeSwitch({ options }: { options: Option[] }) {
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const [selected, setSelected] = useState<ModeId>("build");
  const root = useRef<HTMLFieldSetElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      const checked = root.current?.querySelector<HTMLInputElement>("input:checked");
      if (active && checked) setSelected(checked.value as ModeId);
    });
    return () => { active = false; };
  }, []);
  function select(id: ModeId) {
    const input = root.current?.querySelector<HTMLInputElement>(`#mode-${id}`);
    if (!input || input.checked) return;
    input.checked = true;
    setSelected(id);
    // Existing announcements, sound and consent-gated analytics consume this event.
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function key(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1
      : event.key === "ArrowRight" ? (index + 1) % options.length
      : event.key === "ArrowLeft" ? (index + options.length - 1) % options.length : null;
    if (next === null) return;
    event.preventDefault(); select(options[next].id); buttons.current[next]?.focus();
  }
  return <fieldset ref={root} className="ms-switch" id="motion-switch" data-enhanced={enhanced}>
    <legend>MOTION {"//"} SWITCH. Choose an identity mode.</legend>
    <span className="ms-switch-brand" aria-hidden="true">MOTION <span>{"//"}</span> SWITCH</span>
    <div className="ms-switch-options" role={enhanced ? "group" : undefined} aria-label={enhanced ? "Identity modes" : undefined}>
      {options.map((mode, index) => <div key={mode.id}>
        <input type="radio" name="motion-mode" id={`mode-${mode.id}`} value={mode.id}
          defaultChecked={index === 0} className="sr-only" aria-controls="hero selected-work"
          aria-hidden={enhanced || undefined} tabIndex={enhanced ? -1 : undefined}
          onChange={() => setSelected(mode.id)} />
        <label className="ms-mode-label" htmlFor={`mode-${mode.id}`}>
          <span className="ms-mode-code" aria-hidden="true">{mode.code}</span>{mode.label}
        </label>
        <button type="button" className="ms-mode-button" aria-pressed={selected === mode.id}
          aria-controls="hero selected-work" tabIndex={selected === mode.id ? 0 : -1}
          ref={node => { buttons.current[index] = node; }} onClick={() => select(mode.id)}
          onKeyDown={event => key(event, index)}>
          <span className="ms-mode-code" aria-hidden="true">{mode.code}</span>{mode.label}
        </button>
      </div>)}
    </div>
    <span className="ms-switch-tail" aria-hidden="true">↘</span>
  </fieldset>;
}
