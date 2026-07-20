"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { categories, dayLabels } from "@/lib/categories";

interface Props {
  defaultDate: string;
  onDone: () => void;
}

export default function JadwalForm({ defaultDate, onDone }: Props) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [category, setCategory] = useState("kerja");
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [weeksAhead, setWeeksAhead] = useState(8);

  const { addJadwal, addRecurringJadwal } = useAppStore();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (isRecurring && selectedDays.length > 0) {
      await addRecurringJadwal(
        { title, startTime, endTime, category },
        defaultDate,
        selectedDays,
        weeksAhead
      );
    } else {
      await addJadwal({ title, startTime, endTime, date: defaultDate, category });
    }
    onDone();
  };

  return (
    <>
      <input
        type="text"
        placeholder="Nama kegiatan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm"
      />

      <div className="mb-3">
        <label className="text-xs text-gray-500">Kategori</label>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                category === c.value
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

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

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          Ulangi tiap minggu
        </label>

        {isRecurring && (
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {dayLabels.map((label, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setSelectedDays((prev) =>
                      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
                    )
                  }
                  className={`w-9 h-9 rounded-full text-xs font-medium border ${
                    selectedDays.includes(idx)
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <label className="text-xs text-gray-500">Selama berapa minggu?</label>
            <div className="flex gap-2 mt-1.5">
              {[4, 8, 12].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeeksAhead(w)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                    weeksAhead === w
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {w} minggu
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white rounded-xl py-3 text-sm font-medium"
      >
        Simpan
      </button>
    </>
  );
}