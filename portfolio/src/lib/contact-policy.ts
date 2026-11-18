export const contactCategories = ["Business Inquiry", "Collaboration", "Press", "General Contact"] as const;
export type ContactCategory = typeof contactCategories[number];
export type ContactMessage = { name: string; email: string; subject: string; message: string; category: ContactCategory };
export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;
export const contactLimits = { name: 100, email: 254, subject: 160, message: 4000 } as const;

export function validateContact(value: unknown): { ok: true; data: ContactMessage } | { ok: false; errors: ContactErrors } {
  const input = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  const errors: ContactErrors = {};
  const data = {} as ContactMessage;
  for (const key of ["name", "email", "subject", "message"] as const) {
    const text = typeof input[key] === "string" ? input[key].trim().normalize("NFC") : "";
    data[key] = text;
    if (!text) errors[key] = "Bitte fülle dieses Feld aus.";
    else if (text.length > contactLimits[key]) errors[key] = `Bitte verwende höchstens ${contactLimits[key]} Zeichen.`;
    else if (key !== "message" && /[\r\n\u0000]/.test(text)) errors[key] = "Bitte verwende eine einzelne Textzeile.";
  }
  if (!errors.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  if (contactCategories.includes(input.category as ContactCategory)) data.category = input.category as ContactCategory;
  else errors.category = "Bitte wähle ein Thema aus.";
  if (data.message.includes("\u0000")) errors.message = "Bitte entferne ungültige Steuerzeichen.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
