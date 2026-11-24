import type { Metadata } from "next";
import {
  Momo_Trust_Display,
  Newsreader,
  Stack_Sans_Headline,
} from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const momoTrustDisplay = Momo_Trust_Display({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-momo",
  display: "swap",
});

const stackSansHeadline = Stack_Sans_Headline({
  subsets: ["latin", "latin-ext"],
  variable: "--font-stack-sans",
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
      className={`${newsreader.variable} ${momoTrustDisplay.variable} ${stackSansHeadline.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen font-sans text-[#0A0A0A] bg-[#FAFAFA] selection:bg-[#0A0A0A] selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
