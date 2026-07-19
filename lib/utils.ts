export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getWeekDates(centerDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = -2; i <= 2; i++) {
    const d = new Date(centerDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];