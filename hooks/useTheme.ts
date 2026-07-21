"use client";

import { useEffect, useState } from "react";
import { getStoredTheme, applyTheme, type ThemeName } from "@/lib/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>("indigo");

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    applyTheme(t);
  };

  return { theme, setTheme };
}