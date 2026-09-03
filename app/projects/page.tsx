import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectsSection } from "@/components/ProjectsSection";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All Projects | Vasilii Samarin",
  description:
    "Full project archive for Vasilii Samarin, Webflow and JavaScript developer.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  return (
    <>
      <Header />
      <main>
        <ProjectsSection projects={projects} variant="all" />
        <Footer />
      </main>
    </>
  );
}
