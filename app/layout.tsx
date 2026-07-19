import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jadwal Ku",
  description: "Aplikasi jadwal dan task harian offline",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
} 