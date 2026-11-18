"use client";

import { useMemo, useState } from "react";
import { identity } from "@/app/site-data";
import { validateWebsiteRequest, websiteBudgets, websiteRequestLimits, websiteRequestMailto, type WebsiteRequestErrors } from "@/lib/website-request";

export default function WebsiteRequestForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [budget, setBudget] = useState<string>(websiteBudgets[1]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<WebsiteRequestErrors>({});

  const mailHref = useMemo(() => {
    return websiteRequestMailto(identity.email, { name, company, email, need, budget, message });
  }, [budget, company, email, message, name, need]);

  return (
    <div className="request-form-card">
      <div>
        <p className="section-kicker">Anfrage</p>
        <h2 id="website-request-title">Erzähl kurz, was du vorhast.</h2>
        <p id="website-request-hint">
          Das Formular öffnet einen vorbereiteten E-Mail-Entwurf. Es sendet
          nichts automatisch. Prüfe deinen Entwurf vor dem Senden.
        </p>
      </div>

      <noscript>
        <p>
          Schreib dein Vorhaben direkt per E-Mail:{" "}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>.
        </p>
        <style>
          {".website-page .request-form { display: none !important; }"}
        </style>
      </noscript>
      <form
        className="request-form"
        action={`mailto:${identity.email}`}
        method="get"
        noValidate
        aria-labelledby="website-request-title"
        aria-describedby="website-request-hint"
        onSubmit={(event) => {
          event.preventDefault();
          const nextErrors = validateWebsiteRequest({ name, company, email, need, budget, message });
          setErrors(nextErrors);
          const firstError = Object.keys(nextErrors)[0];
          if (firstError) {
            event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
            return;
          }
          // Replace this handoff with an approved server action only after delivery is authorized.
          window.location.href = mailHref;
        }}
      >
        <label>
          <span id="website-name-label">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            aria-labelledby="website-name-label"
            maxLength={websiteRequestLimits.name}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "website-name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && <span id="website-name-error" className="field-error">{errors.name}</span>}
        </label>
        <label>
          <span id="website-company-label">Unternehmen / Projekt</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            name="company"
            aria-labelledby="website-company-label"
            maxLength={websiteRequestLimits.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "website-company-error" : undefined}
            autoComplete="organization"
          />
          {errors.company && <span id="website-company-error" className="field-error">{errors.company}</span>}
        </label>
        <label>
          <span id="website-email-label">E-Mail</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            aria-labelledby="website-email-label"
            maxLength={websiteRequestLimits.email}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "website-email-error" : undefined}
            autoComplete="email"
            type="email"
          />
          {errors.email && <span id="website-email-error" className="field-error">{errors.email}</span>}
        </label>
        <label>
          <span id="website-need-label">Was brauchst du?</span>
          <input
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            name="need"
            aria-labelledby="website-need-label"
            maxLength={websiteRequestLimits.need}
            aria-invalid={!!errors.need}
            aria-describedby={errors.need ? "website-need-error" : undefined}
          />
          {errors.need && <span id="website-need-error" className="field-error">{errors.need}</span>}
        </label>
        <label>
          <span id="website-budget-label">Budget grob</span>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            name="budget"
            aria-labelledby="website-budget-label"
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? "website-budget-error" : undefined}
          >
            {websiteBudgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.budget && <span id="website-budget-error" className="field-error">{errors.budget}</span>}
        </label>
        <label className="request-form-wide">
          <span id="website-message-label">Nachricht</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            name="message"
            aria-labelledby="website-message-label"
            maxLength={websiteRequestLimits.message}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "website-message-error" : undefined}
            rows={5}
          />
          {errors.message && <span id="website-message-error" className="field-error">{errors.message}</span>}
        </label>
        {Object.keys(errors).length > 0 && <p className="request-form-wide field-error" role="alert">Bitte prüfe die markierten Felder. Es wurde kein Entwurf geöffnet.</p>}
        <button
          type="submit"
          className="premium-button premium-button-primary request-form-submit"
        >
          E-Mail-Entwurf öffnen
        </button>
      </form>
    </div>
  );
}
