"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
}

export default function AddSheet({ open, onClose, defaultDate }: Props) {
  const [tab, setTab] = useState<"jadwal" | "task">("jadwal");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [dueDate, setDueDate] = useState(defaultDate);

  const { addJadwal, addTask } = useAppStore();

  if (!open) return null;

  const reset = () => {
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setDueDate(defaultDate);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (tab === "jadwal") {
      await addJadwal({
        title,
        startTime,
        endTime,
        date: defaultDate,
        category: "umum",
      });
    } else {
      await addTask({
        title,
        dueDate,
        completed: false,
        category: "umum",
      });
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <div className="relative w-full max-w-sm bg-white rounded-t-3xl p-5 pb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-500">Tambah Baru</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>
        {/* tabs */}
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

        <input
          type="text"
          placeholder={tab === "jadwal" ? "Nama kegiatan" : "Nama task"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm"
        />

        {tab === "jadwal" ? (
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500">Mulai</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500">Selesai</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="text-xs text-gray-500">Deadline</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white rounded-xl py-3 text-sm font-medium"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
