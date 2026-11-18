import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
export const metadata: Metadata = pageMetadata(
  "Synapedia Suite",
  "A macOS research workspace in development. Explore the public product preview; download not yet available.",
  "/projects/suite",
);
export default function Page() {
  return <ProjectDetail slug="suite" />;
}
