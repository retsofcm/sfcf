import React from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./client-page";
import { EventSummary } from "@/types/EventSummary";

interface WrapperProps {
  relativePath: string;
}

export default async function ClientPageWrapper({ relativePath }: WrapperProps) {
  // Fetch page data
  const pageQuery = await client.queries.page({ relativePath });

  if (!pageQuery?.data?.page) {
    return <div>No page data found.</div>;
  }

  // Fetch event data
  const eventsQuery = await client.queries.eventConnection();
  const events: EventSummary[] = (eventsQuery.data.eventConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => !!node)
    .map((node) => ({
      id: node.id,
      eventName: node.eventName,
      heroImg: node.heroImg ?? null,
      startDate: node.startDate ?? null,
      endDate: node.endDate ?? null,
      body: node.body ?? null,
    }));

  return (
    <ClientPage
      data={pageQuery.data}
      query={pageQuery.query}
      variables={pageQuery.variables}
      events={events}
    />
  );
}
