import React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./[...urlSegments]/ClientPageWrapper";
import client from "@/tina/__generated__/client";
import { EventSummary } from "@/types/EventSummary";

export const revalidate = 300;

export const metadata = {
  title: "Stenson Fields Christian Fellowship",
  description: "Welcome to Stenson Fields Christian Fellowship, a caring community dedicated to sharing God’s love through scripture, worship, and fellowship.",
};

export default async function Home() {
  const relativePath = "home.mdx";
  let initialData: any = null;

  try {
    const [pageQuery, eventsQuery] = await Promise.all([
      client.queries.page({ relativePath }),
      client.queries.eventConnection(),
    ]);

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

    initialData = {
      data: pageQuery.data,
      query: pageQuery.query,
      variables: pageQuery.variables,
      events,
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
  }

  if (!initialData) return null;

  return (
    <Layout>
      <ClientPageWrapper initialData={initialData} />
    </Layout>
  );
}
