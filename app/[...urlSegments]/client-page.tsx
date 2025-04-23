"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import type { Event } from "@/components/blocks/event-collage";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  latestEvents: Event[];
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });

  // Optional safety check if needed:
  const filteredEvents = props.latestEvents.filter(
    (e) => e.eventName && e.slug && e.startDate
  );

  return (
    <ErrorBoundary>
      <Blocks {...data?.page} latestEvents={filteredEvents} />
    </ErrorBoundary>
  );
}
