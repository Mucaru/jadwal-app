import {
  Video,
  Dumbbell,
  Code2,
  Coffee,
  BookOpen,
  CircleDot,
  Repeat,
  X,
} from "lucide-react";
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
  const Icon = getCategoryIcon(jadwal.category);

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
      <button
        onClick={() => onDelete(jadwal.id)}
        className="text-gray-300 px-2"
        aria-label="Hapus jadwal"
      >
        <X size={18} />
      </button>
    </div>
  );
}
