"use client";

import { useState } from "react";
import { X } from "lucide-react";
import JadwalForm from "@/components/forms/JadwalForm";
import TaskForm from "@/components/forms/TaskForm";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
}

export default function AddSheet({ open, onClose, defaultDate }: Props) {
  const [tab, setTab] = useState<"jadwal" | "task">("jadwal");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-t-3xl p-5 pb-8 animate-sheet-in">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1.5 rounded-full bg-gray-200" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-500">Tambah Baru</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-2 mb-4 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTab("jadwal")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              tab === "jadwal"
                ? "bg-white shadow text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Jadwal
          </button>
          <button
            onClick={() => setTab("task")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              tab === "task"
                ? "bg-white shadow text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Task
          </button>
        </div>

        {tab === "jadwal" ? (
          <JadwalForm defaultDate={defaultDate} onDone={onClose} />
        ) : (
          <TaskForm defaultDate={defaultDate} onDone={onClose} />
        )}
      </div>
    </div>
  );
}
