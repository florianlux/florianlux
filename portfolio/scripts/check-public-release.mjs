import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export function releaseBlockers(evidence) {
  const required = ["operatorAddressConfirmed", "impressumReviewed", "privacyReviewed", "hostingConfirmed", "dataFlowsReviewed", "mediaRightsConfirmed", "fontLicensesVerified", "managementMailboxVerified", "consentRequirementsReviewed", "securityReviewApproved", "productionChecksApproved", "canonicalOriginConfirmed", "ownerPublicReleaseApproved"];
  const blockers = required.filter(key => evidence?.checks?.[key] !== true);
  for (const [key, value] of Object.entries({ operatorAddress: evidence?.operator?.address, hostingProvider: evidence?.hosting?.provider, hostingLocation: evidence?.hosting?.location, hostLogRetention: evidence?.hosting?.logRetention, hostingAgreement: evidence?.hosting?.processorAgreement, mailRetention: evidence?.mail?.retention, mailAgreement: evidence?.mail?.processorAgreement })) {
    if (typeof value !== "string" || !value.trim() || /NOT_CONFIRMED|NICHT BESTÄTIGT|PLACEHOLDER|TBD/i.test(value)) blockers.push(key);
  }
  return [...new Set(blockers)];
}

export function checkPublication(mode = process.env.PORTFOLIO_PUBLICATION_MODE || "preview") {
  if (!["preview", "public"].includes(mode)) throw new Error("Unknown publication mode. Use preview or public.");
  if (mode === "preview") return;
  const evidence = JSON.parse(readFileSync(new URL("../src/app/release-evidence.json", import.meta.url), "utf8"));
  const blockers = releaseBlockers(evidence);
  for (const route of ["impressum", "datenschutz"]) {
    const source = readFileSync(new URL(`../src/app/${route}/page.tsx`, import.meta.url), "utf8");
    if (/\[[A-ZÄÖÜ]/.test(source)) blockers.push(`${route}DraftMarkers`);
  }
  if (blockers.length) throw new Error(`PUBLIC RELEASE BLOCKED: ${blockers.join(", ")}. Complete and independently review release evidence first.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { checkPublication(); console.log(`Publication check: ${process.env.PORTFOLIO_PUBLICATION_MODE === "public" ? "public evidence complete" : "preview / no public release"}`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
