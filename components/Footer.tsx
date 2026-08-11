import Image from "next/image";
import { siteConfig } from "@/data/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#e2e8f0]" id="footer">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-margin-page max-w-7xl mx-auto gap-6">
        {/* Left Side: Logo Icon (Favicon) */}
        <a
          href="#"
          aria-label="Home"
          className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
            unoptimized
          />
        </a>

        {/* Middle: Social Icons (GitHub, LinkedIn, Email - Twitter removed) */}
        <div className="flex items-center space-x-5 text-slate-600">
          {/* GitHub */}
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#209CEE]/10 hover:text-[#209CEE] flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#209CEE]/10 hover:text-[#209CEE] flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href={siteConfig.socials.email}
            aria-label="Email"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#209CEE]/10 hover:text-[#209CEE] flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </a>
        </div>

        {/* Right Side: Copyright */}
        <div className="font-caption text-sm text-slate-500 font-medium">
          © {currentYear} Murat Baş. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
