import { format } from "date-fns";

export function formatDateRange(startDate?: Date, endDate?: Date) {
  if (!startDate) return "Date TBC";

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : endDate ? new Date(endDate) : null;

  const formatTime = (date: Date) => {
    const hour = format(date, "h");
    const minutes = format(date, "mm");
    const ampm = format(date, "a").toLowerCase();
    return minutes === "00" ? `${hour}${ampm}` : `${hour}:${minutes}${ampm}`;
  };

  if (!end) return `${format(start, "MMMM do")}, ${formatTime(start)}`;

  const sameDay = format(start, "yyyy-MM-dd") === format(end, "yyyy-MM-dd");
  const sameMonth = format(start, "yyyy-MM") === format(end, "yyyy-MM");

  if (sameDay) {
    return `${format(start, "MMMM do")}, ${formatTime(start)}-${formatTime(end)}`;
  }

  if (sameMonth) {
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    return `${format(start, "MMMM do")}-${format(end, "do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
  }

  const startTime = formatTime(start);
  const endTime = formatTime(end);
  return `${format(start, "MMMM do")}-${format(end, "MMMM do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
}
