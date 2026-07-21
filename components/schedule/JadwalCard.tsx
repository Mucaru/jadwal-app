"use client";

import { useState } from "react";
import {
  Video,
  Dumbbell,
  Code2,
  Coffee,
  BookOpen,
  CircleDot,
  Repeat,
  Trash2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Jadwal } from "@/lib/db";
import SwipeToDelete from "@/components/ui/SwipeToDelete";

interface Props {
  jadwal: Jadwal;
  onDelete: (id: number) => void;
}

function CategoryIcon({ category }: { category: string }) {
  const iconProps = {
    size: 16,
    className: "text-[var(--color-primary)] flex-shrink-0",
    style: { opacity: 0.7 },
    "aria-hidden": true as const,
  };

  switch (category.toLowerCase()) {
    case "kerja":
      return <Video {...iconProps} />;

    case "olahraga":
      return <Dumbbell {...iconProps} />;

    case "coding":
      return <Code2 {...iconProps} />;

    case "personal":
      return <Coffee {...iconProps} />;

    case "belajar":
      return <BookOpen {...iconProps} />;

    default:
      return <CircleDot {...iconProps} />;
  }
}

export default function JadwalCard({ jadwal, onDelete }: Props) {
  const [confirmSeries, setConfirmSeries] = useState(false);
  const { deleteJadwalSeries } = useAppStore();

  const handleDeleteSeries = async () => {
    if (jadwal.recurringId) {
      await deleteJadwalSeries(jadwal.recurringId, jadwal.date);
    }
    setConfirmSeries(false);
  };

  const actions = (
    <button
      onClick={() => onDelete(jadwal.id)}
      className="flex-1 bg-red-500 text-white text-xs font-medium flex flex-col items-center justify-center gap-1"
    >
      <Trash2 size={16} />
      Hapus
    </button>
  );

  if (confirmSeries) {
    return (
      <div className="bg-gray-50 rounded-2xl p-3">
        <p className="text-sm font-medium mb-1">{jadwal.title}</p>
        <p className="text-xs text-gray-500 mb-3">
          Hapus semua jadwal berulang ini ke depan?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setConfirmSeries(false)}
            className="flex-1 text-xs font-medium py-2 rounded-lg border border-gray-200 text-gray-600"
          >
            Batal
          </button>
          <button
            onClick={handleDeleteSeries}
            className="flex-1 text-xs font-medium py-2 rounded-lg bg-red-500 text-white"
          >
            Ya, hapus semua
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-card-in">
      <SwipeToDelete
        actions={actions}
        onSwipeDelete={() => onDelete(jadwal.id)}
      >
        <div className="flex items-center gap-3 bg-white p-3.5 shadow-card rounded-2xl">
          <div className="text-center min-w-[42px]">
            <p className="text-sm font-medium">{jadwal.startTime}</p>
            <p className="text-xs text-gray-400">{jadwal.endTime}</p>
          </div>
          <div className="w-px self-stretch bg-gray-200" />
          <div className="flex-1 flex items-center gap-2">
          <CategoryIcon category={jadwal.category} />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium">{jadwal.title}</p>
                {jadwal.recurringId && (
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmSeries(true);
                    }}
                    className="text-gray-400 flex-shrink-0 p-1 -m-1"
                    aria-label="Hapus semua ke depan"
                  >
                    <Repeat size={14} />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{jadwal.category}</p>
            </div>
          </div>
        </div>
      </SwipeToDelete>
    </div>
  );
}
