import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#191c1e] selection:bg-[#209CEE] selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-margin-page max-w-container-max mx-auto text-center flex-grow flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#209CEE]/10 text-[#209CEE] flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-3xl">edit_note</span>
        </div>
        <h1 className="font-headline-md text-3xl sm:text-4xl text-[#0f172a] mb-4">
          Blog
        </h1>
        <p className="font-body-lg text-[#64748b] max-w-md mx-auto mb-8 leading-relaxed">
          Yazı ve görsel içeriklerimi paylaşacağım blog sayfam yakında aktif olacak!
        </p>
        <Link
          href="/"
          className="bg-black text-white hover:bg-[#27272a] px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          <span>Ana Sayfaya Dön</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
