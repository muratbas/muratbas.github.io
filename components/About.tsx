"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  const isTr = language === "tr";

  return (
    <section className="py-stack-lg px-margin-page max-w-container-max mx-auto" id="about">
      <div className="flex flex-col md:flex-row items-center gap-gutter">
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-[#f1f5f9] rounded-2xl overflow-hidden relative group shadow-sm border border-[#e2e8f0]">
            <Image
              src={siteConfig.about.portraitImage}
              alt="Murat Baş Portre"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="font-headline-md text-headline-md text-[#0f172a]">
            {isTr ? "Hakkımda" : "About Me"}
          </h2>
          <p className="font-body-lg text-body-lg text-[#565e74] leading-relaxed">
            {isTr
              ? "Bilgisayar Programcılığı mezunu olarak, problem çözme ve yazılım mimarisine sistemli bir yaklaşımla odaklanıyorum. Tutkum, güçlü arka plan (backend) sistemleri ile kullanıcı dostu ön yüz (frontend) deneyimlerini birleştirmektir."
              : siteConfig.about.paragraph1}
          </p>
          <p className="font-body-md text-body-md text-[#64748b] leading-relaxed">
            {isTr
              ? "İster ölçeklenebilir bir web uygulaması mimarisi tasarlayayım, ister 2D çok oyunculu bir oyun mekaniği kodlayayım; her bir satırda yüksek kalite ve zarafet için çalışıyorum. Sürekli öğrenmeye inanıyor, daha akıllı dijital ürünler inşa etmek için veri bilimi ve makine öğrenmesi alanındaki uzmanlığımı genişletiyorum."
              : siteConfig.about.paragraph2}
          </p>
        </div>
      </div>
    </section>
  );
}
