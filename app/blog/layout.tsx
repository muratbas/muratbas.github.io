import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Blog - Murat Baş",
  description: "Web geliştirme, oyun tasarımları, veri bilimi ve teknoloji üzerine yazılar.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} min-h-screen flex flex-col bg-white text-slate-900`}>
      <Navbar />
      <main
        className="flex-1 pt-24 pb-16"
        style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
