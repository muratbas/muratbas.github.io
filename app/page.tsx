import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse delay-1000"></div>

      <main className="flex flex-col gap-8 row-start-2 items-center text-center z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <h1 className="relative text-6xl sm:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Murat Bas
          </h1>
        </div>
        
        <p className="text-xl sm:text-2xl text-gray-400 max-w-lg font-light">
          Software Engineer. Creative Developer.
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 px-8 py-3 text-lg font-medium backdrop-blur-sm"
            href="https://github.com/muratbas"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 px-8 py-3 text-lg font-medium backdrop-blur-sm"
            href="mailto:contact@muratbas.com"
          >
            Contact
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Murat Bas. All rights reserved.</p>
      </footer>
    </div>
  );
}
