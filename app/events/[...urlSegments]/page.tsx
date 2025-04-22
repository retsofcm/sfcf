import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import EventClientPage from './client-page';

export const revalidate = 300;

export default async function EventPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.event({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <EventClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let events = await client.queries.eventConnection();
  const allEvents = events;

  if (!allEvents.data.eventConnection.edges) {
    return [];
  }

  while (events.data?.eventConnection.pageInfo.hasNextPage) {
    events = await client.queries.eventConnection({
      after: events.data.eventConnection.pageInfo.endCursor,
    });

    if (!events.data.eventConnection.edges) {
      break;
    }

    allEvents.data.eventConnection.edges.push(...events.data.eventConnection.edges);
  }

  const params =
    allEvents.data?.eventConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}