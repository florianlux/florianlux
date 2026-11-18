import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
export const metadata: Metadata = pageMetadata(
  "Synapedia",
  "A public knowledge platform connecting structured substance profiles, interactions and sources. Founded by Florian Lux.",
  "/projects/synapedia",
);
export default function Page() {
  return <ProjectDetail slug="synapedia" />;
}
