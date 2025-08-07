import type { Metadata } from "next";
import "./globals.css";
import Logo from "./logo";

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
        className={`px-6 py-6 sm:py-12 font-sans antialiased flex flex-col max-w-[70ch] mx-auto w-full min-h-screen`}
      >
        <header className="w-full mb-6">
          <Logo />
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
