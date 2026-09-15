import type { Metadata } from "next";
import { Geist, Geist_Pixel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistPixel = Geist_Pixel({
  subsets: ["latin"],
  axes: ["ELSH"],
  variable: "--font-geist-pixel",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Taylor Bryant",
  description: "A software engineer based in Memphis, TN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistPixel.variable} min-h-screen bg-gray-50 font-sans text-stone-950 antialiased`}
      >
        <article className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-12 sm:px-8 sm:py-16">
          {children}
        </article>
      </body>
    </html>
  );
}
