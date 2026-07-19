import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDateKey, getWeekDates } from "@/lib/utils";

export function useSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    jadwalList,
    taskList,
    loadJadwal,
    loadTasks,
    deleteJadwal,
    deleteTask,
  } = useAppStore();

  const dateKey = formatDateKey(selectedDate);
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  useEffect(() => {
    loadJadwal(dateKey);
    loadTasks();
  }, [dateKey]);

  return {
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
  };
}