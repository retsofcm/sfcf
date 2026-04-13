import Layout from '@/components/layout/layout';
import ClientPageWrapper from "./../[...urlSegments]/ClientPageWrapper";
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { format } from 'date-fns';

import { formatDateRange } from '@/utils/formatDate';
import { handleize } from '@/utils/handleize';
import { EventSummary } from "@/types/EventSummary";

export const metadata = {
  title: "Upcoming events | Stenson Fields Christian Fellowship",
  description: "Discover upcoming events at Stenson Fields Christian Fellowship: meaningful worship, family activities, and opportunities to grow in faith and fellowship.",
};

export default async function EventsPage() {
  const relativePath = "events.mdx";
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
    console.error("Error fetching events page data:", error);
  }

  if (!initialData) return null;

  return (
    <Layout>
      <ClientPageWrapper initialData={initialData} />
    </Layout>
  );
}
