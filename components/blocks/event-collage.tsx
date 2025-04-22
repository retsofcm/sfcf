import React from "react";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import type { Template } from "tinacms";
export interface Event {
  title: string;
  slug: string;
  heroImg?: string;
  startDate: string;
  endDate?: string;
}

export interface EventCollageBlockProps {
  events: Event[];
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate) return "Date TBC";

  const start = parseISO(startDate);
  const end = endDate ? parseISO(endDate) : null;

  if (!end) return format(start, "MMMM do, h:mmaaa");

  const sameMonth = format(start, "MMMM") === format(end, "MMMM");
  const sameDay = format(start, "do") === format(end, "do");

  if (sameDay) {
    return `${format(start, "MMMM do")}, ${format(start, "h:mmaaa")}`;
  }

  if (sameMonth) {
    return `${format(start, "MMMM do")}-${format(end, "do")}, ${format(start, "h:mmaaa")}`;
  }

  return `${format(start, "MMMM do")}-${format(end, "MMMM do")}, ${format(start, "h:mmaaa")}`;
}

export function EventCollageBlock({ events }: EventCollageBlockProps) {
  const [mainEvent, ...restEvents] = events || [];

  return (
    <div className="event-collage-container px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10">What's on</h2>
      {events.length === 0 ? (
        <p className="text-center">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mainEvent && (
            <div className="relative lg:col-span-2 h-[720px]">
              {mainEvent.heroImg && (
                <Image
                  src={mainEvent.heroImg}
                  alt={mainEvent.title}
                  width={727}
                  height={720}
                  className="object-cover w-full h-full rounded-lg"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-end p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{mainEvent.title}</h3>
                <p className="text-md mb-4">{formatDateRange(mainEvent.startDate, mainEvent.endDate)}</p>
                <Link href={`/events/${mainEvent.slug}`} className="underline text-white font-semibold">
                  Find out more →
                </Link>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-8">
            {restEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="relative h-[350px]">
                {event.heroImg && (
                  <Image
                    src={event.heroImg}
                    alt={event.title}
                    width={727}
                    height={350}
                    className="object-cover w-full h-full rounded-lg"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm mb-2">{formatDateRange(event.startDate, event.endDate)}</p>
                  <Link href={`/events/${event.slug}`} className="underline text-white text-sm">
                    Find out more →
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
