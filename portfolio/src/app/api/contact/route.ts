import { contactConfiguration, createContactService } from "@/lib/contact-service";
import evidence from "../../release-evidence.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;
function service() {
  const reviewed = evidence.checks.privacyReviewed && evidence.checks.managementMailboxVerified && evidence.checks.dataFlowsReviewed;
  return createContactService(contactConfiguration(process.env, reviewed));
}
export async function GET(request: Request) { return service().challenge(request); }
export async function POST(request: Request) { return service().submit(request); }
