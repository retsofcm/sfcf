'use client'

import { useEffect, useState } from "react";
import ical from "ical.js";
import { format } from "date-fns";
import { Template } from "tinacms";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

export default function CalendarBlock({
  data,
}: {
  data: { calendarIds?: ({ calendarId?: string | null } | null)[] | null; };
}) {
  const [view, setView] = useState<"month" | "week">("month");
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!data.calendarIds || data.calendarIds.length === 0) return;

    const fetchEvents = async () => {
      let allEvents: any[] = [];

      // Filter out null or undefined items
      const validCalendarIds = data.calendarIds!.filter(
        (item): item is { calendarId?: string | null } => item !== null && item !== undefined
      );

      for (let { calendarId } of validCalendarIds) {
        if (!calendarId) continue;

        const url = `/api/proxy-calendar?calendarId=${encodeURIComponent(calendarId)}`;

        try {
          const res = await fetch(url);
          if (!res.ok) {
            console.error('Failed to fetch calendar:', res.statusText);
            continue;
          }

          const icsText = await res.text();
          const jcalData = ical.parse(icsText);
          const comp = new ical.Component(jcalData);
          const vevents = comp.getAllSubcomponents('vevent');

          const parsedEvents = vevents.map((ve: any) => {
            const event = new ical.Event(ve);
            return {
              start: event.startDate.toJSDate(),
              end: event.endDate.toJSDate(),
              summary: event.summary,
            };
          });

          allEvents = [...allEvents, ...parsedEvents];
        } catch (err) {
          console.error('Failed to fetch or parse calendar events:', err);
        }
      }

      setEvents(allEvents);
    };

    fetchEvents();
  }, [data.calendarIds]);

  const handleMonthChange = (direction: "next" | "previous") => {
    setCurrentDate((prev) => (direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)));
  };

  const handleWeekChange = (direction: "next" | "previous") => {
    setCurrentDate((prev) => (direction === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1)));
  };

  if (!data.calendarIds || data.calendarIds.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView("month")}
          className={`px-3 py-1 rounded ${
            view === "month" ? "bg-green text-white" : "bg-gray-200"
          }`}
        >
          Month View
        </button>
        <button
          onClick={() => setView("week")}
          className={`px-3 py-1 rounded ${
            view === "week" ? "bg-green text-white" : "bg-gray-200"
          }`}
        >
          Week View
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => (view === "month" ? handleMonthChange("previous") : handleWeekChange("previous"))}>
            &lt; Prev
          </button>
          <button onClick={() => (view === "month" ? handleMonthChange("next") : handleWeekChange("next"))}>
            Next &gt;
          </button>
        </div>
        <div className="font-semibold text-lg">
          {view === "month" 
            ? format(startOfMonth(currentDate), "MMMM yyyy")
            : format(startOfWeek(currentDate, { weekStartsOn: 1 }), "MMMM d, yyyy") + " - " + format(endOfWeek(currentDate, { weekStartsOn: 1 }), "MMMM d, yyyy")}
        </div>
      </div>

      {view === "month" ? (
        <MonthView events={events} currentDate={currentDate} />
      ) : (
        <WeekView events={events} currentDate={currentDate} />
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
  