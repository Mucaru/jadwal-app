"use client";

import { useState } from "react";
import { CalendarDays, Clock, ListChecks, Palette } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  greeting: string;
  dateLabel: string;
  jadwalCount: number;
  taskCount: number;
}

export default function Header({ greeting, dateLabel, jadwalCount, taskCount }: Props) {
  const { theme, setTheme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="bg-[var(--color-primary)] text-white px-5 pt-6 pb-9 rounded-b-[32px] relative">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80">{dateLabel}</p>
          <h1 className="text-2xl font-display font-bold mt-1">{greeting}</h1>
        </div>

        <div className="flex gap-2">
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
            <CalendarDays size={22} />
          </div>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center"
            aria-label="Ganti tema"
          >
            <Palette size={20} />
          </button>
        </div>
      </div>

      {showPicker && (
        <div className="absolute right-5 top-[70px] bg-white rounded-2xl shadow-xl p-3 flex gap-3 z-20">
          <button
            onClick={() => {
              setTheme("indigo");
              setShowPicker(false);
            }}
            className={`w-9 h-9 rounded-full bg-[#6366f1] ${
              theme === "indigo" ? "ring-2 ring-offset-2 ring-[#6366f1]" : ""
            }`}
            aria-label="Tema indigo"
          />
          <button
            onClick={() => {
              setTheme("pink");
              setShowPicker(false);
            }}
            className={`w-9 h-9 rounded-full bg-[#ec4899] ${
              theme === "pink" ? "ring-2 ring-offset-2 ring-[#ec4899]" : ""
            }`}
            aria-label="Tema pink"
          />
        </div>
      )}

      <div className="flex gap-4 mt-4 text-xs opacity-90">
        <span className="flex items-center gap-1">
          <Clock size={14} /> {jadwalCount} jadwal
        </span>
        <span className="flex items-center gap-1">
          <ListChecks size={14} /> {taskCount} task
        </span>
      </div>
    </div>
  );
}