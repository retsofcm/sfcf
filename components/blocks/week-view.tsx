import { 
  startOfWeek, endOfWeek, eachDayOfInterval, format,
  startOfDay, endOfDay
} from "date-fns";

export default function WeekView({ events, currentDate, onEventClick }) {
  // Sunday→Saturday. If you want Monday→Sunday, change weekStartsOn to 1.
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end   = endOfWeek(  currentDate, { weekStartsOn: 0 });
  const days  = eachDayOfInterval({ start, end });

  return (
    <div className="prose prose-lg mx-auto space-y-4">
      {days.map((day) => {
        const dayStart = startOfDay(day);
        const dayEnd   = endOfDay(  day);

        const dayEvents = events.filter((event) => {
          const evStart = new Date(event.start);
          const evEnd   = new Date(event.end);
          return evStart <= dayEnd && evEnd >= dayStart;
        });

        if (dayEvents.length === 0) return null;

        return (
          <div key={day.toISOString()} className="border-b pb-2">
            <h3 className="font-semibold text-lg">{format(day, "EEEE, MMM d")}</h3>
            <ul className="text-sm mt-1 space-y-1">
              {dayEvents.map((event, i) => (
                <li
                  key={`${event.summary}-${event.start}-${i}`}
                  className="cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <span className="font-medium">{event.summary}</span> —{" "}
                  {format(new Date(event.start), "h:mm a")}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
