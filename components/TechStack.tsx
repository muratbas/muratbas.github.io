"use client";

import { siteConfig } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function TechStack() {
  const { language } = useLanguage();
  const isTr = language === "tr";

  return (
    <section className="py-stack-lg px-margin-page max-w-container-max mx-auto" id="tech">
      <div className="text-center mb-stack-md">
        <h2 className="font-headline-md text-headline-md text-[#0f172a] mb-2">
          {isTr ? "Teknik Yetkinlikler" : "Technical Arsenal"}
        </h2>
        <p className="font-body-md text-body-md text-[#64748b]">
          {isTr
            ? "Dijital deneyimler geliştirmek için kullandığım araçlar ve teknolojiler."
            : "Tools and technologies I use to build digital experiences."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {siteConfig.skills.map((category) => (
          <div
            key={category.title}
            className="glass-panel rounded-2xl p-8 hover:shadow-lg hover:border-[#209CEE]/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center mb-6">
                <span className="material-symbols-outlined text-[#209CEE] text-3xl mr-3">
                  {category.icon}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-[#0f172a]">
                  {category.title === "Web Development" && isTr
                    ? "Web Geliştirme"
                    : category.title === "Game Development" && isTr
                    ? "Oyun Geliştirme"
                    : category.title === "Data & AI" && isTr
                    ? "Veri & Yapay Zeka"
                    : category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-full px-3.5 py-1.5 font-caption text-caption text-[#565e74] hover:text-[#209CEE] hover:border-[#209CEE]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
