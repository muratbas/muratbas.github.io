import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader, Urbanist } from "next/font/google";
import "./globals.css";

const customFont = localFont({
  src: "./fonts/font.otf",
  variable: "--font-custom",
  display: "swap",
});

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
  title: "Murat Baş",
  description:
    "Hi, I'm Murat and I create things. Based in Samsun, Turkiye.",
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
    "Illustrations",
    "Writing",
  ],
  authors: [{ name: "Murat Baş" }],
  openGraph: {
    title: "murat baş — work & visuals",
    description:
      "Personal portfolio of Murat Baş. Software engineering, visuals, and editorial writing.",
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
      suppressHydrationWarning
      className={`${customFont.variable} ${newsreader.variable} ${urbanist.variable} h-full antialiased bg-[#F5EFE6]`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#F5EFE6] text-[#2d2a24] selection:bg-[#2d2a24] selection:text-white font-sans"
      >
        {children}
      </body>
    </html>
  );
}
