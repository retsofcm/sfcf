import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "tinacms";
import { EventSummary } from "@/types/EventSummary";
import { formatDateRange } from "@/utils/formatDate";
import { handleize } from "@/utils/handleize";

// Type guard to check if a value is a valid Date object or string
function isValidDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

interface EventCollageBlockProps {
  events: EventSummary[];
}

export function EventCollageBlock({ events }: EventCollageBlockProps) {
  console.log("EVENTS passed to collage:", events);

  const sortedEvents = events
    .map((event) => {
      // Check if startDate and endDate are valid and convert them to Date objects
      const startDate = event.startDate && isValidDate(new Date(event.startDate))
        ? new Date(event.startDate)
        : undefined;
      const endDate = event.endDate && isValidDate(new Date(event.endDate))
        ? new Date(event.endDate)
        : undefined;

      return {
        ...event,
        startDate,
        endDate,
      };
    })
    .sort((a, b) => (a.startDate ? a.startDate.getTime() : 0) - (b.startDate ? b.startDate.getTime() : 0));

  const [mainEvent, ...restEvents] = sortedEvents;

  return (
    <div className="event-collage-container py-20 max-w-7xl m-auto">
      <h2 
        className="text-[48px] font-light mb-12 underline decoration-green-500 underline-offset-3"
        style={{
          textDecorationColor: '#028103',
          textDecorationThickness: '3px',
          textUnderlineOffset: '16px',
        }}
      >
          What's on
        </h2>
      {events.length === 0 ? (
        <p className="mb-20">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {mainEvent && (
            <div className="relative lg:col-span-7 aspect-w-1 aspect-h-1">
              {mainEvent.heroImg && (
                <Image
                  src={mainEvent.heroImg}
                  alt={mainEvent.eventName}
                  width={727}
                  height={720}
                  className="object-cover w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{mainEvent.eventName}</h3>
                <p className="text-md mb-4">{formatDateRange(mainEvent.startDate, mainEvent.endDate)}</p>
                <Link
                  href={`/events/${handleize(mainEvent.eventName || "")}`}
                  className="underline text-white font-semibold font-heading"
                >
                  Find out more
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:col-span-5 gap-10">
            {restEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="relative flex-1 h-full">
                {event.heroImg && (
                  <Image
                    src={event.heroImg}
                    alt={event.eventName}
                    width={515}
                    height={340}
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{event.eventName}</h3>
                  <p className="text-sm mb-2">{formatDateRange(event.startDate, event.endDate)}</p>
                  <Link
                    href={`/events/${handleize(event.eventName || "")}`}
                    className="underline text-white font-semibold font-heading"
                  >
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
