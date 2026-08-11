import Image from "next/image";
import { siteConfig } from "@/data/siteData";

export default function About() {
  return (
    <section className="py-stack-lg px-margin-page max-w-container-max mx-auto" id="about">
      <div className="flex flex-col md:flex-row items-center gap-gutter">
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-[#f1f5f9] rounded-2xl overflow-hidden relative group shadow-sm border border-[#e2e8f0]">
            <Image
              src={siteConfig.about.portraitImage}
              alt="Portrait of Murat Baş"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="font-headline-md text-headline-md text-[#0f172a]">About Me</h2>
          <p className="font-body-lg text-body-lg text-[#565e74] leading-relaxed">
            {siteConfig.about.paragraph1}
          </p>
          <p className="font-body-md text-body-md text-[#64748b] leading-relaxed">
            {siteConfig.about.paragraph2}
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-[#e2e8f0] text-[#0f172a] px-6 py-3 rounded-xl font-label-caps text-label-caps hover:bg-[#f8fafc] hover:border-[#209CEE]/60 hover:text-[#209CEE] transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
