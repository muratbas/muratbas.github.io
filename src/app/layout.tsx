import type { Metadata } from "next";
import { Newsreader, Urbanist } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Murat Baş — Full-stack Engineer & Designer",
  description:
    "Murat Baş — Full-stack engineer and designer based in Samsun, Turkey. Building web products.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Murat Baş",
    "Portfolio",
    "Software Engineer",
    "Design Engineer",
    "Next.js",
    "TypeScript",
    "Visuals",
    "Samsun",
  ],
  authors: [{ name: "Murat Baş" }],
  openGraph: {
    title: "Murat Baş — Portfolio",
    description:
      "Full-stack engineer and designer based in Samsun, Turkey. Building web products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="paperback"
      suppressHydrationWarning
      className={`${newsreader.variable} ${urbanist.variable} min-h-screen antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen font-serif text-[18px] leading-relaxed selection:bg-[#ff3b3b] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
