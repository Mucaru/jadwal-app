import { formatDateKey } from "@/lib/utils";

interface Props {
  dates: Date[];
  selectedDateKey: string;
  onSelect: (date: Date) => void;
}

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function DateStrip({ dates, selectedDateKey, onSelect }: Props) {
  return (
    <div className="flex gap-1.5 px-4 -mt-5 relative z-10">
      {dates.map((d) => {
        const isActive = formatDateKey(d) === selectedDateKey;
        return (
          <button
            key={d.toISOString()}
            onClick={() => onSelect(d)}
            className={`flex-1 text-center py-2 rounded-xl transition-colors ${
              isActive ? "bg-[var(--color-primary)] text-white" : "bg-gray-50 text-gray-700"
            }`}
          >
            <p className={`text-xs ${isActive ? "opacity-85" : "text-gray-400"}`}>
              {dayNames[d.getDay()]}
            </p>
            <p className="text-sm font-medium">{d.getDate()}</p>
          </button>
        );
      })}
    </div>
  );
}