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
    <html lang="en-US" data-theme="light">
      <body>
        <article>{children}</article>
      </body>
    </html>
  );
}
