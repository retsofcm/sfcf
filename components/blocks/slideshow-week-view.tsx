import {
  startOfWeek, endOfWeek, eachDayOfInterval, format,
  startOfDay, endOfDay
} from "date-fns";
import { CalendarEvent } from "./calendar";

export default function SlideshowWeekView({
  events,
  currentDate,
}: {
  events: CalendarEvent[];
  currentDate: Date;
}) {
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="mx-auto">
      {days.map((day) => {
        const dayStart = startOfDay(day);
        const dayEnd = endOfDay(day);

        const dayEvents = events.filter((event) => {
          const evStart = new Date(event.start);
          const evEnd = new Date(event.end);
          return evStart <= dayEnd && evEnd >= dayStart;
        });

        if (dayEvents.length === 0) return null;

        return (
          <div
            key={day.toISOString()}
            className="flex flex-row items-center gap-8 border-b last:border-0 py-5 px-6"
          >
            <div className="shrink-0 w-72 m-0">
              <p className="font-semibold text-5xl m-0">{format(day, "EEEE")}</p>
              <p className="text-3xl m-0">{format(day, "MMMM do")}</p>
            </div>
            <ul className="flex flex-col gap-2 text-3xl list-none p-0 m-0">
              {dayEvents.map((event, i) => (
                <li
                  key={`${event.summary}-${event.start}-${i}`}
                  className="p-0 m-0"
                >
                  <span className="font-medium">{event.summary}</span> @{" "}
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
