"use client";
import { useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { contactCategories, contactLimits, validateContact, type ContactErrors } from "@/lib/contact-policy";

type Status = "idle" | "pending" | "accepted" | "error";
const subscribeToHydration = () => () => {};
export default function ContactForm({ enabled, email }: { enabled: boolean; email: string }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState({ name: "", email: "", subject: "", message: "", category: "General Contact" });
  const busy = useRef(false);
  const challenge = useRef<Promise<{ token: string; received: number }> | null>(null);
  const mailto = useMemo(() => `mailto:${email}?subject=${encodeURIComponent(`[${draft.category}] ${draft.subject || "Portfolio inquiry"}`)}&body=${encodeURIComponent(`Name: ${draft.name}\nReply email: ${draft.email}\n\n${draft.message}`)}`, [draft, email]);

  function obtainChallenge() {
    if (!enabled) return null;
    challenge.current ??= fetch("/api/contact", { cache: "no-store", signal: AbortSignal.timeout(8000) }).then(async response => {
      const data = await response.json();
      if (!response.ok || typeof data.token !== "string") throw new Error("Unavailable");
      return { token: data.token, received: performance.now() };
    });
    return challenge.current;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const checked = validateContact(values);
    if (!checked.ok) {
      setErrors(checked.errors); setStatus("error"); setNotice("Bitte prüfe die markierten Felder.");
      form.querySelector<HTMLElement>(`[name="${Object.keys(checked.errors)[0]}"]`)?.focus();
      return;
    }
    busy.current = true; setErrors({}); setStatus("pending"); setNotice("");
    try {
      const issued = await obtainChallenge(); if (!issued) throw new Error("Unavailable");
      await new Promise(resolve => setTimeout(resolve, Math.max(0, 1250 - (performance.now() - issued.received))));
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...checked.data, website: values.website, token: issued.token }), signal: AbortSignal.timeout(25000) });
      const result = await response.json();
      if (response.status === 202 && result.code === "accepted") {
        setStatus("accepted"); setNotice("Deine Anfrage wurde zum Versand angenommen."); form.reset();
        setDraft({ name: "", email: "", subject: "", message: "", category: "General Contact" });
      } else {
        if (response.status === 422 && result.errors) setErrors(result.errors);
        setStatus("error");
        setNotice(response.status === 429 ? "Zu viele Versuche. Bitte warte einige Minuten oder nutze den E-Mail-Link." : response.status === 409 ? "Diese Anfrage wurde bereits verarbeitet. Bitte prüfe den letzten Status, bevor du sie erneut sendest." : "Der Versand ist nicht bestätigt. Es wird nichts automatisch erneut gesendet. Du kannst stattdessen einen E-Mail-Entwurf öffnen.");
      }
    } catch {
      setStatus("error"); setNotice("Der Versand ist nicht bestätigt. Bitte prüfe deine Verbindung oder öffne einen E-Mail-Entwurf.");
    } finally { busy.current = false; challenge.current = null; }
  }
  return <div className="contact-module" lang="de">
    <div><p className="eyebrow">Business / Collaboration / Press</p><h2 className="display-heading">Eine gute Idee beginnt mit einer Nachricht.</h2></div>
    {!enabled && <p className="contact-availability" role="status">Online-Versand ist derzeit deaktiviert. Du kannst deine Angaben als E-Mail-Entwurf öffnen und vor dem Senden prüfen.</p>}
    <noscript><style>{`.contact-enhanced-form { display: none; }`}</style><p>Für eine Anfrage kannst du direkt <a className="text-link" href={`mailto:${email}`}>{email} ↗</a> verwenden.</p></noscript>
    <form className="contact-enhanced-form" noValidate onSubmit={submit} aria-busy={status === "pending"} onFocusCapture={() => { if (enabled) void obtainChallenge()?.catch(() => { challenge.current = null; }); }} onChange={event => {
      const target = event.target; if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) setDraft(current => ({ ...current, [target.name]: target.value }));
    }}>
      <fieldset disabled={status === "pending"} className="contact-fields"><legend className="sr-only">Kontaktanfrage</legend>
        <label>Thema<select name="category" defaultValue="General Contact">{contactCategories.map(category => <option key={category}>{category}</option>)}</select></label>
        {([ ["name", "Name", "text", "name"], ["email", "E-Mail", "email", "email"], ["subject", "Betreff", "text", "off"] ] as const).map(([key, label, type, autoComplete]) => <label key={key}>{label}<input name={key} type={type} autoComplete={autoComplete} maxLength={contactLimits[key]} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `contact-${key}-error` : undefined} />{errors[key] && <span id={`contact-${key}-error`} className="field-error">{errors[key]}</span>}</label>)}
        <label className="contact-message">Nachricht<textarea name="message" rows={6} maxLength={contactLimits.message} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : "contact-privacy"} />{errors.message && <span id="contact-message-error" className="field-error">{errors.message}</span>}</label>
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      </fieldset>
      <p id="contact-privacy" className="contact-privacy">Deine Angaben werden für deine Anfrage verwendet. Ohne aktiven Serverversand bleiben die Eingaben bis zum Öffnen des Entwurfs im Browser. <a href="/datenschutz">Datenschutzhinweise ↗</a></p>
      <div className="contact-actions"><button className="contact-submit" type="submit" disabled={!enabled || !hydrated || status === "pending"}>{status === "pending" ? "Wird verarbeitet…" : enabled ? "Anfrage senden ↗" : "Online-Versand deaktiviert"}</button><a className="text-link" href={mailto}>E-Mail-Entwurf öffnen ↗</a></div>
      {notice && <p className="contact-result" role={status === "error" ? "alert" : "status"}>{notice}</p>}
    </form>
  </div>;
}
