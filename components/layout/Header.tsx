import { CalendarDays, Clock, ListChecks } from "lucide-react";

interface Props {
  greeting: string;
  dateLabel: string;
  jadwalCount: number;
  taskCount: number;
}

export default function Header({
  greeting,
  dateLabel,
  jadwalCount,
  taskCount,
}: Props) {
  return (
    <div className="bg-indigo-500 text-white px-5 pt-6 pb-9 rounded-b-[32px]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80">{dateLabel}</p>
          <h1 className="text-2xl font-display font-bold mt-1">{greeting}</h1>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
          <CalendarDays size={22} />
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-xs opacity-90">
        <span className="flex items-center gap-1">
          <Clock size={14} /> {jadwalCount} jadwal
        </span>
        <span className="flex items-center gap-1">
          <ListChecks size={14} /> {taskCount} task
        </span>
      </div>
    </div>
  );
}
