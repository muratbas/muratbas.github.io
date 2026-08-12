"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const isTr = language === "tr";

  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-margin-page py-stack-lg max-w-container-max mx-auto relative overflow-hidden">
      {/* Decorative background animation */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#209CEE]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#bec6e0] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 bg-[#209CEE]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl space-y-6 z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
          Murat Baş
        </h1>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#334155] leading-snug">
          {isTr
            ? "Full-Stack Web Geliştirici & Oyun Tasarımcısı"
            : "Full-Stack Web Developer & Game Creator"}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-medium text-[#475569] max-w-2xl mx-auto leading-relaxed">
          {isTr
            ? "Ölçeklenebilir web uygulamaları, interaktif 2D çok oyunculu oyunlar geliştiriyor ve veri bilimi üzerinde çalışıyorum."
            : "Building scalable web applications, interactive 2D multiplayer games, and exploring data science."}
        </p>
      </div>
    </section>
  );
}
