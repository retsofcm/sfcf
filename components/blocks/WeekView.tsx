import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

export default function WeekView({ events, currentDate }: { events: any[]; currentDate: Date }) {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="space-y-4">
      {days.map((day) => {
        const dayEvents = events.filter((event) => format(new Date(event.start), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"));

        return (
          dayEvents.length > 0 && (
            <div key={day.toISOString()} className="border-b pb-2">
              <h3 className="font-semibold text-lg">{format(day, "EEEE, MMM d")}</h3>
              <ul className="text-sm mt-1 space-y-1">
                {dayEvents.map((event, i) => (
                  <li key={i}>
                    <span className="font-medium">{event.summary}</span> —{" "}
                    {format(new Date(event.start), "h:mm a")}
                  </li>
                ))}
              </ul>
            </div>
          )
        );
      })}
    </div>
  );
}
