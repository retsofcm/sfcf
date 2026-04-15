import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  isToday,
} from "date-fns";

interface MonthViewProps {
  events: any[];
  currentDate: Date;
  onEventClick: (event: any) => void;
}

export default function MonthView({
  events,
  currentDate,
  onEventClick,
}: MonthViewProps) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const gridStart = getDay(start); // 0 = Sunday

  return (
    <div className="border overflow-hidden">
      {/* Day headings */}
      <div className="grid grid-cols-7 bg-gray-50 border-b text-sm font-semibold text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 text-gray-600 border-r last:border-none">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-sm">
        {/* Empty grid cells before the first day */}
        {Array(gridStart)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="h-28 border-r border-b bg-gray-50" />
          ))}

        {/* Actual days */}
        {days.map((day) => {
          const dayEvents = events.filter(
            (event) =>
              format(new Date(event.start), "yyyy-MM-dd") ===
              format(day, "yyyy-MM-dd")
          );

          return (
            <div
              key={day.toISOString()}
              className={`h-28 border-r border-b p-1.5 flex flex-col ${
                isToday(day) ? "bg-green-10" : "bg-white"
              }`}
            >
              <div
                className={`text-xs mb-1 font-medium flex items-center justify-center w-6 h-6 transition-colors ${
                  isToday(day)
                    ? "bg-green text-white"
                    : "text-gray-500"
                }`}
              >
                {format(day, "d")}
              </div>

              <div className="space-y-1 overflow-hidden">
                {dayEvents.map((event, i) => (
                  <button
                    key={i}
                    className="block w-full px-1 py-0.5 bg-gray-200 text-xs text-left hover:text-white hover:bg-green cursor-pointer transition-colors"
                    onClick={() => onEventClick(event)}
                  >
                    {event.summary}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
