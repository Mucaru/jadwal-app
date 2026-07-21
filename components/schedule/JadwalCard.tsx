"use client";

import { useState } from "react";
import { Video, Dumbbell, Code2, Coffee, BookOpen, CircleDot, Repeat, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Jadwal } from "@/lib/db";

interface Props {
  jadwal: Jadwal;
  onDelete: (id: number) => void;
}

const categoryIcons: Record<string, typeof CircleDot> = {
  kerja: Video,
  olahraga: Dumbbell,
  coding: Code2,
  personal: Coffee,
  belajar: BookOpen,
};

function getCategoryIcon(category: string) {
  const key = category.toLowerCase();
  return categoryIcons[key] ?? CircleDot;
}

export default function JadwalCard({ jadwal, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const { deleteJadwalSeries } = useAppStore();
  const Icon = getCategoryIcon(jadwal.category);

  const handleDeleteClick = () => {
    if (jadwal.recurringId) {
      setConfirming(true);
    } else {
      onDelete(jadwal.id);
    }
  };

  const handleDeleteThisOnly = () => {
    onDelete(jadwal.id);
    setConfirming(false);
  };

  const handleDeleteSeries = async () => {
    if (jadwal.recurringId) {
      await deleteJadwalSeries(jadwal.recurringId, jadwal.date);
    }
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div className="bg-gray-50 rounded-2xl p-3">
        <p className="text-sm font-medium mb-1">{jadwal.title}</p>
        <p className="text-xs text-gray-500 mb-3">Hapus jadwal berulang ini?</p>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteThisOnly}
            className="flex-1 text-xs font-medium py-2 rounded-lg border border-gray-200 text-gray-600"
          >
            Ini saja
          </button>
          <button
            onClick={handleDeleteSeries}
            className="flex-1 text-xs font-medium py-2 rounded-lg bg-red-500 text-white"
          >
            Ini & seterusnya
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-xs font-medium py-2 px-3 rounded-lg text-gray-400"
          >
            Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
      <div className="text-center min-w-[42px]">
        <p className="text-sm font-medium">{jadwal.startTime}</p>
        <p className="text-xs text-gray-400">{jadwal.endTime}</p>
      </div>
      <div className="w-px self-stretch bg-gray-200" />
      <div className="flex-1 flex items-center gap-2">
        <Icon size={16} className="text-indigo-400 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium">{jadwal.title}</p>
            {jadwal.recurringId && (
              <Repeat size={12} className="text-gray-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{jadwal.category}</p>
        </div>
      </div>
      <button onClick={handleDeleteClick} className="text-gray-300 px-2" aria-label="Hapus jadwal">
        <X size={18} />
      </button>
    </div>
  );
}