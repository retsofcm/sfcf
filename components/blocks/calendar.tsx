import { useEffect, useState, useRef } from "react";

export interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
  description: string;
}
import ical from "ical.js";
import { Template } from "tinacms";
import { format, addMonths, subMonths, addWeeks, subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import MonthView from "./month-view";
import WeekView from "./week-view";

export default function CalendarBlock({
  data,
}: {
  data: { calendarIds?: ({ calendarId?: string | null } | null)[] | null; };
}) {
  const [view, setView] = useState<"week" | "month">("week");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cache, setCache] = useState<{ [key: string]: CalendarEvent[] }>({});
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const isFetching = useRef(false);

  function formatWeekRange(date: Date) {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const weekEnd   = endOfWeek(  date, { weekStartsOn: 0 });
  
    const startMon = format(weekStart, "MMM");
    const endMon   = format(weekEnd,   "MMM");
    const startDay = format(weekStart, "d");
    const endDay   = format(weekEnd,   "d");
  
    if (startMon === endMon) {
      return `${startMon} ${startDay} – ${endDay}`;
    }
  
    return `${startMon} ${startDay} – ${endMon} ${endDay}`;
  }

  const getRange = (date: Date, view: "week" | "month") => {
    if (view === "month") {
      return {
        start: startOfMonth(date),
        end:   endOfMonth(  date),
      };
    } else {
      return {
        start: startOfWeek(date, { weekStartsOn: 0 }),
        end:   endOfWeek(  date, { weekStartsOn: 0 }),
      };
    }
  };
  
  const getCacheKey = (date: Date, view: "week" | "month") => {
    const { start } = getRange(date, view);
    return `${view}-${format(start, "yyyy-MM-dd")}`;
  };
  
  const fetchEvents = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
  
    const { start: rangeStart, end: rangeEnd } = getRange(currentDate, view);
    const cacheKey = getCacheKey(currentDate, view);
  
    if (cache[cacheKey]) {
      setEvents(cache[cacheKey]);
      isFetching.current = false;
      return;
    }
  
    let allEvents: CalendarEvent[] = [];
    const validCalendarIds = data.calendarIds!
      .filter((i): i is { calendarId: string } => !!i && !!i.calendarId);
  
    for (let { calendarId } of validCalendarIds) {
      const url = `/api/proxy-calendar?calendarId=${encodeURIComponent(calendarId)}`;
      const res = await fetch(url);
      if (!res.ok) continue;
  
      const jcal = ical.parse(await res.text());
      const comp = new ical.Component(jcal);
      const vevents = comp.getAllSubcomponents("vevent");
  
      for (let ve of vevents) {
        const ev = new ical.Event(ve);
        if (ev.isRecurrenceException()) continue;
  
        const description = ev.description || "No description";
        const origStart = ev.startDate.toJSDate();
        const origEnd   = ev.endDate.toJSDate();
  
        // Helper to push an occurrence
        const pushOcc = (startDate: Date) => {
          const duration = origEnd.getTime() - origStart.getTime();
          const endDate  = new Date(startDate.getTime() + duration);
          if (endDate >= rangeStart && startDate <= rangeEnd) {
            allEvents.push({
              start:   startDate,
              end:     endDate,
              summary: ev.summary,
              description,
            });
          }
        };
  
        // Non-recurring: just check overlap
        if (!ev.isRecurring()) {
          if (origEnd >= rangeStart && origStart <= rangeEnd) {
            pushOcc(origStart);
          }
        } else {
          // Recurring: iterate occurrences within range
          const it = ev.iterator();
          let next;
          let count = 0, limit = 500;
          while ((next = it.next()) && count++ < limit) {
            const occ = next.toJSDate();
            if (occ > rangeEnd) break;
            pushOcc(occ);
          }
        }
      }
    }
  
    // Cache and set
    allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    setCache((c) => ({ ...c, [cacheKey]: allEvents }));
    setEvents(allEvents);
    isFetching.current = false;
  };   

  useEffect(() => {
    fetchEvents();
  }, [currentDate, data.calendarIds, view]);

  const handleMonthChange = (direction: "next" | "previous") => {
    setCurrentDate((prev) => (direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)));
  };

  const handleWeekChange = (direction: "next" | "previous") => {
    setCurrentDate((prev) => (direction === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1)));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const closeEventPopup = () => {
    setSelectedEvent(null);
  };

  if (!data.calendarIds || data.calendarIds.length === 0) return null;

  return (
    <section className="container">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView("week")}
          className={`px-3 py-1 rounded-none cursor-pointer transition-colors ${
            view === "week" ? "bg-green text-white hover:bg-green-90" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Weekly Schedule
        </button>
        <button
          onClick={() => setView("month")}
          className={`px-3 py-1 rounded-none cursor-pointer transition-colors ${
            view === "month" ? "bg-green text-white hover:bg-green-90" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Monthly Schedule
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-4 h-10">
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer hover:text-green transition-colors"
            onClick={() => {
              setCurrentDate(prev => {
                return view === "month" ? subMonths(prev, 1) : subWeeks(prev, 1);
              });
            }}
          >
            <ArrowLeft className="mr-16 h-4 w-4" />
          </button>
        </div>
        <div className="font-semibold text-lg">
          {view === "month"
            ? format(currentDate, "MMMM")
            : formatWeekRange(currentDate)
          }
        </div>
        <div className="flex items-center gap-2">
            <button
              className="cursor-pointer hover:text-green transition-colors"
              onClick={() => {
                setCurrentDate(prev => {
                  return view === "month" ? addMonths(prev, 1) : addWeeks(prev, 1);
                });
              }}
            >
              <ArrowRight className="ml-16 h-4 w-4" />
            </button>
        </div>
      </div>

      {view === "month" ? (
        <MonthView events={events} currentDate={currentDate} onEventClick={handleEventClick} />
      ) : (
        <WeekView events={events} currentDate={currentDate} onEventClick={handleEventClick} />
      )}

      {selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-8 prose prose-lg">
            <h2 className="text-xl font-semibold">{selectedEvent.summary}</h2>
            <p className="text-sm">{format(new Date(selectedEvent.start), "MMM d, h:mm")} - {format(new Date(selectedEvent.end), "h:mm a")}</p>
            <div 
              className="mt-2 prose prose-sm max-w-none" 
              dangerouslySetInnerHTML={{ __html: selectedEvent.description?.replaceAll("\n", "<br />") || "No description available." }} 
            />
            <button onClick={closeEventPopup} className="mt-4 border border-black px-4 py-2 cursor-pointer rounded-none hover:bg-black hover:text-white transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export const CalendarBlockSchema: Template = {
  name: "calendarBlock",
  label: "Calendar Block",
  fields: [
    {
      type: "object",
      name: "calendarIds",
      label: "Google Calendar IDs",
      list: true,
      fields: [
        {
          type: "string",
          name: "calendarId",
          label: "Calendar ID",
        },
      ]
    },
  ],
};
