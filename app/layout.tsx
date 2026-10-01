import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50 font-sans text-stone-950 antialiased">
        <article className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-12 sm:px-8 sm:py-16">
          {children}
        </article>
      </body>
    </html>
  );
}
