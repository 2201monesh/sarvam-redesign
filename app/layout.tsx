import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const seasonMix = localFont({
  src: "../public/fonts/SeasonMix-Medium.67ababab.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-season-mix",
  display: "swap",
});

const matter = localFont({
  src: [
    {
      path: "../public/fonts/MatterRegular.0692aaf2.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MatterMedium.1b78bcc1.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-matter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarvam AI",
  description: "Sarvam AI Developer Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${matter.variable} ${seasonMix.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-matter)]">
        {children}
      </body>
    </html>
  );
}
