export const THEMES = {
  indigo: {
    label: "Indigo",
    themeColor: "#6366F1",
  },
  pink: {
    label: "Pink",
    themeColor: "#EC4899",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

export const DEFAULT_THEME: ThemeName = "indigo";
export const THEME_STORAGE_KEY = "jadwalku-theme";

/**
 * Memastikan nilai yang dibaca merupakan nama tema yang valid.
 */
export function isThemeName(value: unknown): value is ThemeName {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(THEMES, value)
  );
}

/**
 * Membaca tema tersimpan.
 *
 * Saat dijalankan di server atau localStorage tidak tersedia,
 * aplikasi menggunakan tema default.
 */
export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return isThemeName(storedTheme)
      ? storedTheme
      : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/**
 * Menerapkan tema ke document.
 *
 * Fungsi ini tidak menyimpan tema agar tanggung jawab
 * penerapan DOM dan penyimpanan tetap terpisah.
 */
export function applyTheme(theme: ThemeName): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;

  const themeColorMeta =
    document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

  if (themeColorMeta) {
    themeColorMeta.content = THEMES[theme].themeColor;
  }
}

/**
 * Menyimpan preferensi pengguna.
 */
export function persistTheme(theme: ThemeName): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      theme,
    );
  } catch {
    /*
     * Aplikasi tetap berjalan apabila localStorage
     * diblokir atau tidak tersedia.
     */
  }
}

/**
 * Entry point utama ketika pengguna mengganti tema.
 */
export function setThemePreference(
  theme: ThemeName,
): void {
  applyTheme(theme);
  persistTheme(theme);
}