import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { Blocks } from "@/components/blocks";
import { Event as TinaEvent } from "@/tina/__generated__/types";

export const revalidate = 300;

export default async function Home() {
  try {
    // Fetch page data
    const pageData = await client.queries.page({
      relativePath: `home.mdx`,
    });

    // Fetch all events using the eventConnection query
    const eventsQuery = await client.queries.eventConnection();
    const events: TinaEvent[] = eventsQuery.data.eventConnection.edges
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined)
      .map((node) => ({
        id: node.id,
        eventName: node.eventName,
        heroImg: node.heroImg ?? null,
        startDate: node.startDate ?? null,
        endDate: node.endDate ?? null,
        body: node.body ?? null,
        _sys: node._sys,
      }));

    const page = pageData?.data?.page;

    if (!page || !page.blocks) {
      return (
        <Layout>
          <div>No content available.</div>
        </Layout>
      );
    }

    // Pass events as a prop to the Blocks component
    return (
      <Layout rawPageData={pageData}>
        <Blocks {...page} events={events} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <Layout>
        <div>Error loading content.</div>
      </Layout>
    );
  }
}
