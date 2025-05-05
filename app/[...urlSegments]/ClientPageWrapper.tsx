'use client';

import React, { useEffect, useState } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./client-page";
import { EventSummary } from "@/types/EventSummary";

interface WrapperProps {
  relativePath: string;
}

export default function ClientPageWrapper({ relativePath }: WrapperProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const pageQuery = await client.queries.page({ relativePath });
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

      setData({
        data: pageQuery.data,
        query: pageQuery.query,
        variables: pageQuery.variables,
        events,
      });
    }

    fetchData();
  }, [relativePath]);

  if (!data) return <div></div>;

  return <ClientPage {...data} />;
}
