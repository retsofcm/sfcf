"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  latestEvents: Event[]; // Add latestEvents to the prop interface
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  return (
    <ErrorBoundary>
      <Blocks {...data?.page} latestEvents={props.latestEvents} />
    </ErrorBoundary>
  );
}
