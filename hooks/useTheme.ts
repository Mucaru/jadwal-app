"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  getStoredTheme,
  setThemePreference,
  THEMES,
  type ThemeName,
} from "@/lib/theme";

export function useTheme() {
  const [theme, setThemeState] =
    useState<ThemeName>(getStoredTheme);

  const setTheme = useCallback(
    (nextTheme: ThemeName) => {
      setThemeState(nextTheme);
      setThemePreference(nextTheme);
    },
    [],
  );

  return {
    theme,
    setTheme,
    themeConfig: THEMES[theme],
  } as const;
}