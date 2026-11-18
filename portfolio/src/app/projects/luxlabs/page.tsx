import type { Metadata } from "next";
import { pageMetadata } from "@/app/page-metadata";
import ProjectDetail from "@/components/ProjectDetail";
export const metadata: Metadata = pageMetadata("LuxLabs", "A private editorial workspace in development, with versioning, source evidence and human review.", "/projects/luxlabs");
export default function Page() { return <ProjectDetail slug="luxlabs" />; }
