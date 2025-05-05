"use client";

import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import ErrorBoundary from "@/components/error-boundary";
import { EventSummary } from "@/types/EventSummary";
import { PageQuery } from "@/tina/__generated__/types";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  events: EventSummary[];
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });

  if (!data?.page) {
    return <div></div>;
  }

  return (
    <ErrorBoundary>
      <Blocks {...data.page} events={props.events} />
    </ErrorBoundary>
  );
}
