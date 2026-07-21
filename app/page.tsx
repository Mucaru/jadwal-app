"use client";

import { Plus } from "lucide-react";

import AddSheet from "@/components/AddSheet";
import AppShell from "@/components/layout/AppShell";
import Header from "@/components/layout/Header";
import DateStrip from "@/components/schedule/DateStrip";
import JadwalCard from "@/components/schedule/JadwalCard";
import TaskCard from "@/components/schedule/TaskCard";
import EmptyState from "@/components/ui/EmptyState";
import { useSchedule } from "@/hooks/useSchedule";

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
  } = useSchedule();

  const dateLabel = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AppShell>
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

      <div className="mt-6 px-4">
        <p className="mb-2 text-sm font-medium text-text-secondary">Jadwal</p>

        <div className="mb-6 space-y-2">
          {jadwalList.length === 0 && (
            <EmptyState message="Belum ada jadwal hari ini" />
          )}

          {jadwalList.map((jadwal) => (
            <JadwalCard
              key={jadwal.id}
              jadwal={jadwal}
              onDelete={deleteJadwal}
            />
          ))}
        </div>

        <p className="mb-2 text-sm font-medium text-text-secondary">Tasks</p>

        <div className="space-y-2">
          {taskList.length === 0 && <EmptyState message="Belum ada task" />}

          {taskList.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className={[
          "fixed z-40",
          "flex h-14 w-14 items-center justify-center",
          "rounded-full",
          "bg-primary text-text-on-accent",
          "shadow-floating",
          "transition-transform duration-150",
          "active:scale-95",
        ].join(" ")}
        style={{
          right:
            "max(1rem, calc((100vw - var(--app-shell-max-width)) / 2 + 1rem))",
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
        aria-label="Tambah baru"
      >
        <Plus size={26} aria-hidden="true" />
      </button>

      <AddSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        defaultDate={dateKey}
      />
    </AppShell>
  );
}
