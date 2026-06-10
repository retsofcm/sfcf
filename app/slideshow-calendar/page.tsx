"use client";

import React, { useEffect, useState, useRef } from "react";
import ical from "ical.js";
import { startOfWeek, endOfWeek } from "date-fns";
import SlideshowWeekView from "@/components/blocks/slideshow-week-view";
import { CalendarEvent } from "@/components/blocks/calendar";

const CALENDAR_ID =
  "062cf23cac39b1d33c777a629be171147b1cbde0587205ae71087b2313aff7d4@group.calendar.google.com";

export default function SlideshowCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const isFetching = useRef(false);
  const currentDate = new Date();

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;

    const rangeStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const rangeEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

    const fetchEvents = async () => {
      const url = `/api/proxy-calendar?calendarId=${encodeURIComponent(CALENDAR_ID)}`;
      const res = await fetch(url);
      if (!res.ok) return;

      const jcal = ical.parse(await res.text());
      const comp = new ical.Component(jcal);
      const vevents = comp.getAllSubcomponents("vevent");

      const allEvents: CalendarEvent[] = [];

      for (const ve of vevents) {
        const ev = new ical.Event(ve);
        if (ev.isRecurrenceException()) continue;

        const description = ev.description || "No description";
        const origStart = ev.startDate.toJSDate();
        const origEnd = ev.endDate.toJSDate();

        const pushOcc = (startDate: Date) => {
          const duration = origEnd.getTime() - origStart.getTime();
          const endDate = new Date(startDate.getTime() + duration);
          if (endDate >= rangeStart && startDate <= rangeEnd) {
            allEvents.push({ start: startDate, end: endDate, summary: ev.summary, description });
          }
        };

        if (!ev.isRecurring()) {
          if (origEnd >= rangeStart && origStart <= rangeEnd) {
            pushOcc(origStart);
          }
        } else {
          const it = ev.iterator();
          let next;
          let count = 0;
          while ((next = it.next()) && count++ < 500) {
            const occ = next.toJSDate();
            if (occ > rangeEnd) break;
            pushOcc(occ);
          }
        }
      }

      allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
      setEvents(allEvents);
      isFetching.current = false;
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-white p-8 flex items-center justify-center">
      <SlideshowWeekView events={events} currentDate={currentDate} />
    </main>
  );
}
