import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectsSection } from "@/components/ProjectsSection";
import ogCache from "@/data/og-cache.json";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "All Projects | Vasilii Samarin",
  description:
    "Full project archive for Vasilii Samarin, Webflow and JavaScript developer.",
};

const ogCacheByProject = ogCache as Record<string, Partial<Project["og"]>>;
const projectsWithOg = projects.map((project) => ({
  ...project,
  og: {
    ...project.og,
    ...ogCacheByProject[project.id],
  },
}));

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <ProjectsSection projects={projectsWithOg} variant="all" />
        <Footer />
      </main>
    </>
  );
}
