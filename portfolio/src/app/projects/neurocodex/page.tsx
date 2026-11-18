import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
export const metadata: Metadata = pageMetadata(
  "Neurocodex",
  "An exploratory research direction in neuroscience and connected knowledge. No separate product release claimed.",
  "/projects/neurocodex",
);
export default function Page() {
  return <ProjectDetail slug="neurocodex" />;
}
