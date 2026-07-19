"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDateKey, getWeekDates, dayNames } from "@/lib/utils";
import AddSheet from "@/components/AddSheet";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sheetOpen, setSheetOpen] = useState(false);
  const {
    jadwalList,
    taskList,
    loadJadwal,
    loadTasks,
    deleteJadwal,
    toggleTaskDone,
    deleteTask,
  } = useAppStore();
  const dateKey = formatDateKey(selectedDate);
  const weekDates = getWeekDates(selectedDate);

  useEffect(() => {
    loadJadwal(dateKey);
    loadTasks();
  }, [dateKey]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen p-4 relative">
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            {selectedDate.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="text-2xl font-medium">
            {selectedDate.toLocaleDateString("id-ID", { day: "numeric" })}{" "}
            {selectedDate.toLocaleDateString("id-ID", { weekday: "long" })}
          </h1>
        </div>

        {/* Strip 5 hari */}
        <div className="flex gap-1 mb-5">
          {weekDates.map((d) => {
            const isActive = formatDateKey(d) === dateKey;
            return (
              <button
                key={d.toISOString()}
                onClick={() => setSelectedDate(d)}
                className={`flex-1 text-center py-2 rounded-xl ${
                  isActive ? "bg-indigo-500 text-white" : "text-gray-700"
                }`}
              >
                <p className="text-xs opacity-70">{dayNames[d.getDay()]}</p>
                <p className="text-sm font-medium">{d.getDate()}</p>
              </button>
            );
          })}
        </div>

        {/* Jadwal */}
        <p className="text-sm font-medium text-gray-500 mb-2">Jadwal</p>
        <div className="space-y-2 mb-6">
          {jadwalList.length === 0 && (
            <p className="text-sm text-gray-400">Belum ada jadwal hari ini</p>
          )}
          {jadwalList.map((j) => (
            <div key={j.id} className="flex gap-3">
              <div className="w-1 rounded bg-indigo-500" />
              <div className="flex-1 bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{j.title}</p>
                  <p className="text-xs text-gray-500">
                    {j.startTime} - {j.endTime}
                  </p>
                </div>
                <button
                  onClick={() => deleteJadwal(j.id)}
                  className="text-gray-300 text-lg px-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <p className="text-sm font-medium text-gray-500 mb-2">Tasks</p>
        <div className="space-y-2 mb-24">
          {taskList.length === 0 && (
            <p className="text-sm text-gray-400">Belum ada task</p>
          )}
          {taskList.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>

        {/* FAB */}
        <button
          onClick={() => setSheetOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-indigo-500 text-white text-2xl flex items-center justify-center shadow-lg"
        >
          +
        </button>

        <AddSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          defaultDate={dateKey}
        />
      </div>
    </div>
  );
}
