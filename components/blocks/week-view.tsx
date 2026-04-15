import { 
  startOfWeek, endOfWeek, eachDayOfInterval, format,
  startOfDay, endOfDay, isToday
} from "date-fns";

export default function WeekView({ events, currentDate, onEventClick }) {
  // Sunday→Saturday. If you want Monday→Sunday, change weekStartsOn to 1.
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end   = endOfWeek(  currentDate, { weekStartsOn: 0 });
  const days  = eachDayOfInterval({ start, end });

  return (
    <div className="prose prose-lg mx-auto">
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
          <div 
            key={day.toISOString()} 
            className={`flex flex-col gap-4 border-b last:border-0 transition-colors py-4 px-6 ${
              isToday(day) ? "bg-green-10" : ""
            }`}
          >
            <h3 className={`font-semibold text-lg !m-0 ${isToday(day) ? "text-green" : ""}`}>
              {format(day, "EEEE, MMM d")}
            </h3>
            <ul className="flex flex-col text-sm gap-2 list-none p-0 !m-0">
              {dayEvents.map((event, i) => (
                <li
                  key={`${event.summary}-${event.start}-${i}`}
                  className="cursor-pointer p-0 !m-0 hover:text-green transition-colors"
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
