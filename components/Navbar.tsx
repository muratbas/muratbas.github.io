"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "Tech", href: "/#tech" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 focus:outline-none group"
          aria-label="Home"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-200">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        </Link>

        {/* Right Side: Nav Links + Blog, CV, LAB + Language Switcher at absolute far right */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Nav Links */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-800 hover:text-[#209CEE] hover:scale-105 transition-all duration-200 inline-block origin-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons: Blog, CV, LAB, and Language Switcher (FAR RIGHT) */}
          <div className="flex items-center space-x-3">
            {/* 1. Blog Button */}
            <Link
              href="/blog"
              className="bg-black text-white hover:bg-[#27272a] hover:scale-105 px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 inline-block shadow-xs"
            >
              Blog
            </Link>

            {/* 2. CV Button */}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white hover:bg-[#27272a] hover:scale-105 px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 inline-block shadow-xs"
            >
              CV
            </a>

            {/* 3. LAB Button */}
            <a
              href="https://lab.muratbas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lab-button-blue-gradient text-white hover:scale-105 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-transform duration-200 inline-block whitespace-nowrap shadow-md"
              style={{
                backgroundImage: "linear-gradient(90deg, #000000 0%, #003b66 25%, #209CEE 50%, #003b66 75%, #000000 100%)",
                backgroundSize: "200% 200%",
                animation: "blueGradientShift 3s linear infinite",
              }}
            >
              LAB
            </a>

            {/* 4. Language Switcher Button (At Far Right of Navbar) */}
            <button
              onClick={toggleLanguage}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/90 hover:scale-105 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs cursor-pointer ml-2"
              title="Dil Değiştir / Change Language"
              aria-label="Language Switcher"
            >
              <span className="material-symbols-outlined text-sm text-[#209CEE]">language</span>
              <span>{language === "tr" ? "TR" : "EN"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle & Action Buttons */}
        <div className="md:hidden flex items-center space-x-2">
          <Link
            href="/blog"
            className="bg-black text-white hover:bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors"
          >
            Blog
          </Link>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white hover:bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors"
          >
            CV
          </a>
          <a
            href="https://lab.muratbas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="lab-button-blue-gradient text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all inline-block whitespace-nowrap"
            style={{
              backgroundImage: "linear-gradient(90deg, #000000 0%, #003b66 25%, #209CEE 50%, #003b66 75%, #000000 100%)",
              backgroundSize: "200% 200%",
              animation: "blueGradientShift 3s linear infinite",
            }}
          >
            LAB
          </a>

          {/* Mobile Language Switcher (At Far Right before menu icon) */}
          <button
            onClick={toggleLanguage}
            className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/90 px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors inline-flex items-center gap-0.5"
            aria-label="Language Switcher"
          >
            <span className="material-symbols-outlined text-xs text-[#209CEE]">language</span>
            <span>{language === "tr" ? "TR" : "EN"}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-900 p-2 rounded-full hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl flex items-center justify-center">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200/80 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-800 hover:text-[#209CEE] py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
