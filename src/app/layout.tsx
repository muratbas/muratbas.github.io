import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const customFont = localFont({
  src: "./fonts/font.otf",
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "murat baş — work & visuals",
  description:
    "Personal portfolio of Murat Baş. Software engineering, high-performance web systems, visuals, and editorial writing.",
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
      className={`${customFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
