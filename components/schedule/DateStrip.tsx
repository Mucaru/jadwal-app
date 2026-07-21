import GlassSurface from "@/components/ui/GlassSurface";
import { formatDateKey } from "@/lib/utils";

type DateStripProps = {
  dates: Date[];
  selectedDateKey: string;
  onSelect: (date: Date) => void;
};

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] as const;

function getAccessibleDateLabel(date: Date, isToday: boolean): string {
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return isToday ? `${formattedDate}, hari ini` : formattedDate;
}

export default function DateStrip({
  dates,
  selectedDateKey,
  onSelect,
}: DateStripProps) {
  const todayKey = formatDateKey(new Date());

  return (
    <div className="relative z-20 -mt-4 px-3">
      <GlassSurface
        variant="strong"
        radius="panel"
        className="flex gap-1 p-1.5"
        aria-label="Pilih tanggal"
      >
        {dates.map((date) => {
          const currentDateKey = formatDateKey(date);

          const isActive = currentDateKey === selectedDateKey;

          const isToday = currentDateKey === todayKey;

          return (
            <button
              key={currentDateKey}
              type="button"
              onClick={() => onSelect(date)}
              aria-label={getAccessibleDateLabel(date, isToday)}
              aria-pressed={isActive}
              aria-current={isToday ? "date" : undefined}
              className={[
                "relative min-w-0 flex-1",
                "flex h-[3.35rem] flex-col",
                "items-center justify-center",
                "rounded-[1rem]",
                "transition-[background-color,color,transform]",
                "duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[var(--border-focus)]",
                "focus-visible:ring-offset-1",
                "focus-visible:ring-offset-transparent",
                "active:scale-[0.97]",
                isActive
                  ? ["bg-primary", "text-text-on-accent"].join(" ")
                  : [
                      "bg-white/30",
                      "text-text-secondary",
                      "hover:bg-white/55",
                    ].join(" "),
              ].join(" ")}
              style={
                isActive
                  ? {
                      boxShadow: "0 8px 20px rgb(var(--accent-rgb) / 0.24)",
                    }
                  : undefined
              }
            >
              <span
                className={[
                  "truncate text-[11px]",
                  "font-medium leading-none",
                  isActive ? "text-white/80" : "text-text-muted",
                ].join(" ")}
              >
                {DAY_NAMES[date.getDay()]}
              </span>

              <span
                className={[
                  "mt-1 text-sm",
                  "font-semibold leading-none",
                  "tabular-numbers",
                ].join(" ")}
              >
                {date.getDate()}
              </span>

              {isToday && !isActive && (
                <span
                  aria-hidden="true"
                  className={[
                    "absolute bottom-1",
                    "h-1 w-1 rounded-full",
                    "bg-primary",
                  ].join(" ")}
                />
              )}
            </button>
          );
        })}
      </GlassSurface>
    </div>
  );
}
