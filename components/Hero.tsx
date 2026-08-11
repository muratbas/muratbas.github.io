import { siteConfig } from "@/data/siteData";

export default function Hero() {
  return (
    <section className="min-h-[85vh] lg:min-h-[921px] flex flex-col justify-center items-center text-center px-margin-page py-stack-lg max-w-container-max mx-auto relative overflow-hidden">
      {/* Decorative background animation */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#209CEE]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#bec6e0] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 bg-[#209CEE]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl space-y-stack-md z-10">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-[#0f172a] mb-4 tracking-tight">
          {siteConfig.name}
        </h1>

        <h2 className="font-headline-md text-headline-md text-[#64748b] mb-6 font-medium">
          {siteConfig.role}
        </h2>

        <p className="font-body-lg text-body-lg text-[#565e74] mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
          {siteConfig.bio}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#work"
            className="bg-[#0f172a] text-[#ffffff] px-8 py-3.5 rounded-2xl font-label-caps text-label-caps hover:bg-[#209CEE] transition-all duration-300 inline-flex items-center justify-center shadow-sm hover:shadow-md"
          >
            View My Work
            <span className="material-symbols-outlined ml-2 text-[18px]">
              arrow_forward
            </span>
          </a>

          <a
            href="#contact"
            className="glass-panel text-[#0f172a] px-8 py-3.5 rounded-2xl font-label-caps text-label-caps hover:bg-[#f8fafc] hover:border-[#209CEE]/50 transition-all duration-300 inline-flex items-center justify-center shadow-xs"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
