export const websiteRequestLimits = { name: 100, company: 160, email: 254, need: 240, message: 2000 } as const;
export const websiteBudgets = ["300-600 €", "600-1000 €", "1000+ €"] as const;
export type WebsiteRequest = Record<keyof typeof websiteRequestLimits, string> & { budget: string };
export type WebsiteRequestErrors = Partial<Record<keyof WebsiteRequest, string>>;

export function validateWebsiteRequest(input: WebsiteRequest): WebsiteRequestErrors {
  const errors: WebsiteRequestErrors = {};
  for (const key of Object.keys(websiteRequestLimits) as Array<keyof typeof websiteRequestLimits>) {
    const text = input[key].trim();
    if (["name", "email", "message"].includes(key) && !text) errors[key] = "Bitte fülle dieses Feld aus.";
    else if (text.length > websiteRequestLimits[key]) errors[key] = `Bitte verwende höchstens ${websiteRequestLimits[key]} Zeichen.`;
    else if (/\u0000/.test(text) || (key !== "message" && /[\r\n]/.test(text))) errors[key] = "Bitte entferne ungültige Zeilenumbrüche oder Steuerzeichen.";
  }
  if (!errors.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(input.email.trim())) errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  if (!websiteBudgets.some(value => value === input.budget)) errors.budget = "Bitte wähle einen Budgetrahmen aus.";
  return errors;
}

export function websiteRequestMailto(recipient: string, input: WebsiteRequest): string {
  const singleLine = (value: string) => value.replace(/[\r\n\u0000]/g, " ").trim();
  const company = singleLine(input.company);
  const subject = `Website-Anfrage${company ? ` für ${company}` : ""}`;
  const body = ["Hallo Florian,", "", "ich interessiere mich für eine Website.", "",
    `Name: ${singleLine(input.name)}`, `Unternehmen / Projekt: ${company || "-"}`,
    `E-Mail: ${singleLine(input.email)}`, `Was ich brauche: ${singleLine(input.need) || "-"}`,
    `Budget grob: ${input.budget}`, "", "Nachricht:", input.message.trim()].join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
