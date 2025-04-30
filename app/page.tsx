import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { Blocks } from "@/components/blocks";
import { Event } from "@/tina/__generated__/types";

export const revalidate = 300;

export default async function Home() {
  try {
    const pageData = await client.queries.page({
      relativePath: `home.mdx`,
    });

    const eventsQuery = await client.queries.eventConnection();
    
    const events: Event[] = eventsQuery.data.eventConnection.edges
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined);

    const page = pageData?.data?.page;

    if (!page || !page.blocks) {
      return (
        <Layout>
          <div>No content available.</div>
        </Layout>
      );
    }

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
