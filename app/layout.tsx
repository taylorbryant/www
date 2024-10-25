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
        className={`font-sans antialiased flex flex-col max-w-xl mx-auto w-full min-h-screen`}
      >
        <header className="pt-12 px-6 w-full mb-9">
          <Image
            className="rounded-full w-[60px] h-[60px] phone:w-[90px] phone:h-[90px]"
            src="/me.svg"
            width={90}
            height={90}
            alt=""
            aria-hidden="true"
          />
        </header>

        <main className="flex-1 px-6">{children}</main>
      </body>
    </html>
  );
}
