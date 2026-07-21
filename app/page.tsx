"use client";

import { useSchedule } from "@/hooks/useSchedule";
import Header from "@/components/layout/Header";
import DateStrip from "@/components/schedule/DateStrip";
import JadwalCard from "@/components/schedule/JadwalCard";
import TaskCard from "@/components/schedule/TaskCard";
import AddSheet from "@/components/AddSheet";
import { Plus } from "lucide-react";

export default function Home() {
  const {
    selectedDate,
    setSelectedDate,
    dateKey,
    weekDates,
    sheetOpen,
    setSheetOpen,
    jadwalList,
    taskList,
    deleteJadwal,
    deleteTask,
  } = useSchedule();

  const dateLabel = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen relative pb-24">
        <Header
          greeting="Halo, Mucaru"
          dateLabel={dateLabel}
          jadwalCount={jadwalList.length}
          taskCount={taskList.length}
        />

        <DateStrip
          dates={weekDates}
          selectedDateKey={dateKey}
          onSelect={setSelectedDate}
        />

        <div className="px-4 mt-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Jadwal</p>
          <div className="space-y-2 mb-6">
            {jadwalList.length === 0 && (
              <p className="text-sm text-gray-400">Belum ada jadwal hari ini</p>
            )}
            {jadwalList.map((j) => (
              <JadwalCard key={j.id} jadwal={j} onDelete={deleteJadwal} />
            ))}
          </div>

          <p className="text-sm font-medium text-gray-500 mb-2">Tasks</p>
          <div className="space-y-2">
            {taskList.length === 0 && (
              <p className="text-sm text-gray-400">Belum ada task</p>
            )}
            {taskList.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        </div>

        <button
          onClick={() => setSheetOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg"
          aria-label="Tambah baru"
        >
          <Plus size={26} />
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
