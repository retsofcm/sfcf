import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from "date-fns";

export default function MonthView({ events, currentDate }: { events: any[]; currentDate: Date }) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const gridStart = getDay(start); // 0 = Sunday

  return (
    <div className="grid grid-cols-7 border rounded text-sm">
      <div className="col-span-7 grid grid-cols-7 text-center font-bold bg-gray-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="p-2 border-b">{d}</div>
        ))}
      </div>

      {Array(gridStart).fill(null).map((_, i) => (
        <div key={`empty-${i}`} className="h-24 border" />
      ))}

      {days.map((day) => {
        const dayEvents = events.filter((event) => format(new Date(event.start), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"));

        return (
          <div key={day.toISOString()} className="h-24 border p-1">
            <div className="text-xs text-gray-500">{format(day, "d")}</div>
            {dayEvents.map((event, i) => (
              <div key={i} className="text-xs bg-green-90 mt-1 rounded px-1 truncate">{event.summary}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
