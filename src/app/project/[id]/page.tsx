import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WORK_PROJECTS } from "@/features/portfolio/portfolio.data";
import { ProjectDetailView } from "@/features/portfolio/ProjectDetailView";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = WORK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Murat Baş`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = WORK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-[#1e2d42]">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <ProjectContent params={params} />
    </Suspense>
  );
}
