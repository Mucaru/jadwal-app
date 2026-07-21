export type ThemeName = "indigo" | "pink";

const STORAGE_KEY = "jadwalku-theme";

export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "indigo";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "pink" ? "pink" : "indigo";
}

export function applyTheme(theme: ThemeName) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme === "pink" ? "pink" : "");
  localStorage.setItem(STORAGE_KEY, theme);
}