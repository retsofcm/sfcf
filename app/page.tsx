import React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./[...urlSegments]/ClientPageWrapper";
import client from "@/tina/__generated__/client";
import { EventSummary } from "@/types/EventSummary";
import { HighlightSummary } from "@/types/HighlightSummary";



export const revalidate = 300;

export const metadata = {
  title: "Stenson Fields Christian Fellowship",
  description: "Welcome to Stenson Fields Christian Fellowship, a caring community dedicated to sharing God’s love through scripture, worship, and fellowship.",
};

export default async function Home() {
  const relativePath = "home.mdx";
  let initialData: any = null;

  try {
    const [pageQuery, eventsQuery, highlightsQuery] = await Promise.all([
      client.queries.page({ relativePath }),
      client.queries.eventConnection(),
      client.queries.highlightConnection(),
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



    const highlights = (highlightsQuery.data.highlightConnection.edges ?? [])
      .map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => !!node)
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
      
    const latestHighlight: HighlightSummary | null = highlights.length > 0 ? {
      id: highlights[0].id,
      title: highlights[0].title,
      subtitle: highlights[0].subtitle ?? null,
      date: highlights[0].date ?? "",
      image: highlights[0].image,
      content: highlights[0].content,
      buttonText: highlights[0].buttonText ?? null,
      buttonUrl: highlights[0].buttonUrl ?? null,
      filename: highlights[0]._sys.filename,
    } : null;





    initialData = {
      data: pageQuery.data,
      query: pageQuery.query,
      variables: pageQuery.variables,
      events,
      latestHighlight,
    };


  } catch (error) {
    console.error("Error fetching home page data:", error);
  }

  if (!initialData) return null;

  return (
    <Layout isHome={true}>
      <ClientPageWrapper initialData={initialData} />
    </Layout>
  );
}
