import React from "react";
import { GithubIcon, InstagramIcon, MailIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="w-full mt-24 pb-12 pt-8 border-t border-neutral-300/50 flex flex-col sm:flex-row items-center justify-between text-xs tracking-[-0.02em] uppercase text-[#2d2a24]/60 max-w-7xl mx-auto px-4 sm:px-8 gap-4">
      <div>
        <span> © 2026 Murat Bas</span>
      </div>
      <div className="flex items-center space-x-6 text-[#2d2a24]">
        <a
          href="https://github.com/muratbas"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors p-1"
          aria-label="GitHub"
        >
          <GithubIcon size={18} className="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://www.instagram.com/muuratbas/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors p-1"
          aria-label="Instagram"
        >
          <InstagramIcon size={18} className="w-[18px] h-[18px]" />
        </a>
        <a
          href="mailto:muuratbas@gmail.com"
          className="hover:text-blue-600 transition-colors p-1"
          aria-label="Email"
        >
          <MailIcon size={18} className="w-[18px] h-[18px]" />
        </a>
      </div>
    </footer>
  );
}
