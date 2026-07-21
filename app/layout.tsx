import type { Metadata, Viewport } from "next";

import { Inter, Manrope } from "next/font/google";

import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from "@/lib/theme";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jadwal Ku",
  description: "Aplikasi jadwal dan task harian offline",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: THEMES[DEFAULT_THEME].themeColor,
};

/**
 * Script ini dijalankan sebelum isi halaman ditampilkan.
 *
 * Tujuannya agar tema yang tersimpan langsung diterapkan
 * ke elemen <html> dan mengurangi theme flash.
 */
const themeInitScript = `
(function () {
  try {
    var storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
    var defaultTheme = ${JSON.stringify(DEFAULT_THEME)};
    var validThemes = ${JSON.stringify(Object.keys(THEMES))};
    var themeColors = ${JSON.stringify(
      Object.fromEntries(
        Object.entries(THEMES).map(([themeName, configuration]) => [
          themeName,
          configuration.themeColor,
        ]),
      ),
    )};

    var storedTheme =
      window.localStorage.getItem(storageKey);

    var selectedTheme =
      validThemes.indexOf(storedTheme) !== -1
        ? storedTheme
        : defaultTheme;

    document.documentElement.dataset.theme =
      selectedTheme;

    function updateThemeColor() {
      var themeColorMeta =
        document.querySelector(
          'meta[name="theme-color"]'
        );

      if (themeColorMeta) {
        themeColorMeta.setAttribute(
          "content",
          themeColors[selectedTheme]
        );
      }
    }

    updateThemeColor();

    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        updateThemeColor,
        { once: true }
      );
    }
  } catch (error) {
    document.documentElement.dataset.theme =
      ${JSON.stringify(DEFAULT_THEME)};
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>

      <body className={[inter.variable, manrope.variable].join(" ")}>
        {children}
      </body>
    </html>
  );
}
