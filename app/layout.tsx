import type { Metadata } from "next";
import Image from "next/image";
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
      <body
        className={`px-6 py-6 sm:py-12 font-sans antialiased flex flex-col max-w-xl mx-auto w-full min-h-screen`}
      >
        <header className="w-full mb-6">
          <Image
            className="rounded-lg sm:rounded-full w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
            src="/me.svg"
            width={80}
            height={80}
            alt=""
            aria-hidden="true"
          />
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
