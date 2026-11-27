import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COUPLE_INFO } from "@/data/memories";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${COUPLE_INFO.heroTitle} | ${COUPLE_INFO.herName}`,
  description: COUPLE_INFO.heroSubtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased selection:bg-rose-500/30 selection:text-rose-200`}>
        {children}
      </body>
    </html>
  );
}