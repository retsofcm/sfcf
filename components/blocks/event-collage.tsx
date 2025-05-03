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
    <div className="container py-10 md:py-20">
      <h2 
        className="text-[24px] md:text-[36px] font-light mb-8 md:mb-12 underline decoration-green-500 underline-offset-3"
        style={{
          textDecorationColor: '#028103',
          textDecorationThickness: '3px',
          textUnderlineOffset: '16px',
        }}
      >
        What's on
      </h2>

      {sortedEvents.length === 0 ? (
        <p className="mb-20">No upcoming events found.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible scroll-snap-x snap-x snap-mandatory">
          {sortedEvents.slice(0, 3).map((event, index) => (
            <Link
              key={index}
              href={`/events/${handleize(event.eventName || "")}`}
              className="relative aspect-[1] overflow-hidden block group min-w-[80%] snap-start md:min-w-0"
            >
              {event.heroImg && (
                <Image
                  src={event.heroImg}
                  alt={event.eventName}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end text-white p-6 z-10">
                <p className="text-sm mb-1 opacity-80">{formatDateRange(event.startDate, event.endDate)}</p>
                <h3 className="text-2xl font-semibold">{event.eventName}</h3>
              </div>
            </Link>
          ))}
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
