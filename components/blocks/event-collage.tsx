import React from "react";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import type { Template } from "tinacms";

export interface Event {
  title: string;
  slug: string;
  heroImg?: string;
  startDate: Date;
  endDate?: Date;
}

export interface EventCollageBlockProps {
  events: Event[];
}

function formatDateRange(startDate?: Date, endDate?: Date) {
  if (!startDate) return "Date TBC";

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : endDate ? new Date(endDate) : null;

  const formatTime = (date: Date) => {
    const hour = format(date, "h");
    const minutes = format(date, "mm");
    const ampm = format(date, "a").toLowerCase();

    return minutes === "00" ? `${hour}${ampm}` : `${hour}:${minutes}${ampm}`;
  };

  if (!end) return `${format(start, "MMMM do")}, ${formatTime(start)}`;

  const sameDay = format(start, "yyyy-MM-dd") === format(end, "yyyy-MM-dd");
  const sameMonth = format(start, "yyyy-MM") === format(end, "yyyy-MM");

  // If the event is on the same day, show a single time for both start and end
  if (sameDay) {
    return `${format(start, "MMMM do")}, ${formatTime(start)}-${formatTime(start)}`;
  }

  // If the event is in the same month, show the date range and time range
  if (sameMonth) {
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    return `${format(start, "MMMM do")}-${format(end, "do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
  }

  // For different months or multiple months, show full date range and time range
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  return `${format(start, "MMMM do")}-${format(end, "MMMM do")}, ${startTime}${startTime === endTime ? "" : `-${endTime}`}`;
}

export function EventCollageBlock({ events }: EventCollageBlockProps) {
  const [mainEvent, ...restEvents] = events || [];

  return (
    <div className="event-collage-container py-20 max-w-7xl m-auto">
      <h2 className="text-4xl font-extrabold text-center mb-10">What's on</h2>
      {events.length === 0 ? (
        <p className="text-center">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {mainEvent && (
            <div className="relative lg:col-span-7 aspect-w-1 aspect-h-1">
              {mainEvent.heroImg && (
                <Image
                  src={mainEvent.heroImg}
                  alt={mainEvent.title}
                  width={727}
                  height={720}
                  className="object-cover w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{mainEvent.title}</h3>
                <p className="text-md mb-4">{formatDateRange(mainEvent.startDate, mainEvent.endDate)}</p>
                <Link href={`/events/${mainEvent.slug}`} className="underline text-white font-semibold font-heading">
                  Find out more
                </Link>
              </div>
            </div>
          )}
          
          {/* Second Column: Filling remaining space with height matching first column */}
          <div className="flex flex-col lg:col-span-5 gap-10">
            {restEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="relative flex-1 h-full">
                {event.heroImg && (
                  <Image
                    src={event.heroImg}
                    alt={event.title}
                    width={515}
                    height={340}
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm mb-2">{formatDateRange(event.startDate, event.endDate)}</p>
                  <Link href={`/events/${event.slug}`} className="underline text-white font-semibold font-heading">
                    Find out more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const eventCollageBlockSchema: Template = {
  name: "eventCollage",
  label: "Event Collage",
  fields: [
    {
      type: "string",
      name: "label",
      label: "Label (not shown)",
      ui: {
        component: "hidden",
      },
    },
  ],
};
