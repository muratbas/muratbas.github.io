import Image from "next/image";
import { siteConfig } from "@/data/siteData";

export default function Projects() {
  return (
    <section className="py-stack-lg px-margin-page bg-[#f8fafc]" id="work">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-stack-md">
          <h2 className="font-headline-md text-headline-md text-[#0f172a] mb-2">
            Featured Projects
          </h2>
          <p className="font-body-md text-body-md text-[#64748b]">
            A selection of recent work across web and game development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {siteConfig.projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-[#e2e8f0]/80 rounded-2xl overflow-hidden group hover:shadow-xl hover:border-[#209CEE]/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-[#f1f5f9] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-headline-sm text-headline-sm text-[#0f172a] mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-body-md text-[#565e74] mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[#64748b] uppercase tracking-wider bg-[#f1f5f9] px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center font-label-caps text-label-caps text-[#209CEE] hover:text-[#1b87d2] transition-colors group-hover:translate-x-1 duration-200"
                >
                  View Project{" "}
                  <span className="material-symbols-outlined ml-1 text-[16px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
