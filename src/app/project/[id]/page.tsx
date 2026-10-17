import { notFound } from "next/navigation";
import { WORK_PROJECTS } from "@/features/portfolio/portfolio.data";
import { ProjectDetailView } from "@/features/portfolio/ProjectDetailView";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = WORK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView key={project.id} project={project} />;
}
