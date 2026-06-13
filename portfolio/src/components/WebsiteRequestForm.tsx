"use client";

import { useMemo, useState } from "react";

const budgetOptions = ["300-600 €", "600-1000 €", "1000+ €"];

export default function WebsiteRequestForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [message, setMessage] = useState("");

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Website-Anfrage${company ? ` für ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        "Hallo Florian,",
        "",
        "ich interessiere mich für eine Website.",
        "",
        `Name: ${name || "-"}`,
        `Unternehmen / Projekt: ${company || "-"}`,
        `E-Mail: ${email || "-"}`,
        `Was ich brauche: ${need || "-"}`,
        `Budget grob: ${budget}`,
        "",
        "Nachricht:",
        message || "-",
      ].join("\n"),
    );

    return `mailto:hello@florianlux.dev?subject=${subject}&body=${body}`;
  }, [budget, company, email, message, name, need]);

  return (
    <div className="request-form-card">
      <div>
        <p className="section-kicker">Anfrage</p>
        <h2>Erzähl kurz, was du vorhast.</h2>
        <p>
          Das Formular öffnet einen vorbereiteten E-Mail-Entwurf. Es sendet
          nichts automatisch und braucht deshalb kein Backend.
        </p>
      </div>

      <form className="request-form" action={mailHref} method="post">
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} name="name" />
        </label>
        <label>
          Unternehmen / Projekt
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            name="company"
          />
        </label>
        <label>
          E-Mail
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            type="email"
          />
        </label>
        <label>
          Was brauchst du?
          <input value={need} onChange={(event) => setNeed(event.target.value)} name="need" />
        </label>
        <label>
          Budget grob
          <select value={budget} onChange={(event) => setBudget(event.target.value)} name="budget">
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="request-form-wide">
          Nachricht
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            name="message"
            rows={5}
          />
        </label>
        <a className="premium-button premium-button-primary request-form-submit" href={mailHref}>
          E-Mail mit Anfrage öffnen
        </a>
      </form>
    </div>
  );
}
