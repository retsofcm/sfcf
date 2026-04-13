import * as React from "react";
import Layout from "@/components/layout/layout";
import { Metadata } from "next";
import { getPageData } from "@/lib/getPageData";
import ClientPageWrapper from "./ClientPageWrapper";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import { EventSummary } from "@/types/EventSummary";

type RouteParams = { urlSegments: string[] };


export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params;
  const urlSegments = awaitedParams.urlSegments || [];
  const lastSegment = urlSegments[urlSegments.length - 1] || "";

  // Prevent metadata queries for static files/assets
  if (lastSegment.includes(".") || urlSegments.includes(".well-known")) {
    return {
      title: "Stenson Fields Christian Fellowship",
    };
  }

  try {
    const page = await getPageData(urlSegments);
    if (!page) {
      notFound();
    }

    return {
      title: page.metaTitle || "Stenson Fields Christian Fellowship",
      description: page.metaDescription || "We're a group of Christians who take the Bible seriously and seek to share God's love for every individual in our community and further afield.",
    };
  } catch {
    notFound();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { urlSegments } = await params;
  
  // Prevent common static files or assets from being treated as dynamic page segments
  const lastSegment = urlSegments[urlSegments.length - 1] || "";
  if (lastSegment.includes(".")) {
    notFound();
  }

  const relativePath = urlSegments.join("/") + ".mdx";

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

    const initialData = {
      data: pageQuery.data,
      query: pageQuery.query,
      variables: pageQuery.variables,
      events,
    };

    return (
      <Layout>
        <ClientPageWrapper initialData={initialData} />
      </Layout>
    );
  } catch (error) {
    console.error(`Error fetching data for ${relativePath}:`, error);
    notFound();
  }
}