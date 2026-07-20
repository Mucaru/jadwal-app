"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { categories } from "@/lib/categories";

interface Props {
  defaultDate: string;
  onDone: () => void;
}

export default function TaskForm({ defaultDate, onDone }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(defaultDate);
  const [category, setCategory] = useState("kerja");

  const { addTask } = useAppStore();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await addTask({ title, dueDate, completed: false, category });
    onDone();
  };

  return (
    <>
      <input
        type="text"
        placeholder="Nama task"
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

      <div className="mb-4">
        <label className="text-xs text-gray-500">Deadline</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
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