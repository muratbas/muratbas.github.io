import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const aeonik = localFont({
  src: "../public/fonts/AeonikTRIAL-Bold.otf",
  variable: "--font-aeonik",
  display: "swap",
});

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Medium.ttf",
  variable: "--font-clash",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Murat Baş - Portfolio",
  description:
    "Full-Stack Web Developer & Game Creator. Building scalable web applications, interactive 2D multiplayer games, and exploring data science.",
  keywords: [
    "Murat Baş",
    "Full-Stack Developer",
    "Web Developer",
    "Game Dev",
    "Godot",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Murat Baş" }],
  openGraph: {
    title: "Murat Baş - Portfolio",
    description:
      "Full-Stack Web Developer & Game Creator. Building scalable web applications, interactive 2D multiplayer games, and exploring data science.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`scroll-smooth ${aeonik.variable} ${clashDisplay.variable} ${roboto.variable} ${inter.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased bg-white text-[#191c1e] font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
