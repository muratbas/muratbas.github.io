"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "tr",
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("muratbas_lang") as Language;
    if (saved === "tr" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === "tr" ? "en" : "tr";
    setLanguageState(nextLang);
    localStorage.setItem("muratbas_lang", nextLang);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("muratbas_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
