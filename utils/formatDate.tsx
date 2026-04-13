import { formatInTimeZone } from "date-fns-tz";

const timeZone = "Europe/London";

export function formatDateRange(startDate?: string | Date, endDate?: string | Date) {
  if (!startDate && !endDate) return "Ongoing";
  if (!startDate) return "Date TBC";

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate ? (endDate instanceof Date ? endDate : new Date(endDate)) : undefined;

  const formatTime = (date: Date) => {
    const hour = formatInTimeZone(date, timeZone, "h");
    const minutes = formatInTimeZone(date, timeZone, "mm");
    const ampm = formatInTimeZone(date, timeZone, "a").toLowerCase();
    return minutes === "00" ? `${hour}${ampm}` : `${hour}:${minutes}${ampm}`;
  };

  if (!end) return `${formatInTimeZone(start, timeZone, "MMMM do")}, ${formatTime(start)}`;

  const sameDay =
    formatInTimeZone(start, timeZone, "yyyy-MM-dd") ===
    formatInTimeZone(end, timeZone, "yyyy-MM-dd");

  const sameMonth =
    formatInTimeZone(start, timeZone, "yyyy-MM") ===
    formatInTimeZone(end, timeZone, "yyyy-MM");

  if (sameDay) {
    return `${formatInTimeZone(start, timeZone, "MMMM do")}, ${formatTime(start)}-${formatTime(end)}`;
  }

  if (sameMonth) {
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    return `${formatInTimeZone(start, timeZone, "MMMM do")}-${formatInTimeZone(end, timeZone, "do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
  }

  const startTime = formatTime(start);
  const endTime = formatTime(end);
  return `${formatInTimeZone(start, timeZone, "MMMM do")}-${formatInTimeZone(end, timeZone, "MMMM do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
}
