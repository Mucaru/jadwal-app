"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
}

const categories = [
  { value: "kerja", label: "Kerja" },
  { value: "olahraga", label: "Olahraga" },
  { value: "coding", label: "Coding" },
  { value: "personal", label: "Personal" },
  { value: "belajar", label: "Belajar" },
];

export default function AddSheet({ open, onClose, defaultDate }: Props) {
  const [tab, setTab] = useState<"jadwal" | "task">("jadwal");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [dueDate, setDueDate] = useState(defaultDate);
  const [category, setCategory] = useState("kerja");
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [weeksAhead, setWeeksAhead] = useState(8);

  const { addJadwal, addTask, addRecurringJadwal } = useAppStore();
  if (!open) return null;

  const reset = () => {
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setDueDate(defaultDate);
    setCategory("kerja");
    setIsRecurring(false);
    setSelectedDays([]);
    setWeeksAhead(8);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    if (tab === "jadwal") {
      if (isRecurring && selectedDays.length > 0) {
        await addRecurringJadwal(
          { title, startTime, endTime, category },
          defaultDate,
          selectedDays,
          weeksAhead,
        );
      } else {
        await addJadwal({
          title,
          startTime,
          endTime,
          date: defaultDate,
          category,
        });
      }
    } else {
      await addTask({
        title,
        dueDate,
        completed: false,
        category,
      });
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-t-3xl p-5 pb-8">
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

        <input
          type="text"
          placeholder={tab === "jadwal" ? "Nama kegiatan" : "Nama task"}
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

        {tab === "jadwal" && (
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
                  {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                    (label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setSelectedDays((prev) =>
                            prev.includes(idx)
                              ? prev.filter((d) => d !== idx)
                              : [...prev, idx],
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
                    ),
                  )}
                </div>

                <label className="text-xs text-gray-500">
                  Selama berapa minggu?
                </label>
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
