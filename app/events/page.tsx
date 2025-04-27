import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { formatDateRange } from '@/utils/formatDate';
import { handleize } from '@/utils/handleize';

export default async function EventsPage() {
  const eventsData = await client.queries.eventConnectionQuery();
  const edges = eventsData?.data?.eventConnection?.edges;
  const now = new Date();

  const sortedEdges = edges
    ?.filter(edge => {
      const start = edge?.node?.startDate ? new Date(edge.node.startDate) : null;
      return start && start >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(a?.node?.startDate || 0).getTime();
      const dateB = new Date(b?.node?.startDate || 0).getTime();
      return dateA - dateB;
  });


  if (!sortedEdges || sortedEdges.length === 0) {
    return (
      <Layout>
        <h1>Upcoming Events</h1>
        <p>No events available.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {sortedEdges.map((edge, index) => {
        const event = edge?.node;
        if (!event) return null;

        const heroImg = event.heroImg || '/default-image.jpg';
        const startDate = event.startDate ? new Date(event.startDate) : undefined;
        const endDate = event.endDate ? new Date(event.endDate) : undefined;

        return (
          <div key={index}>
            <h2>{event.eventName}</h2>
            <img src={heroImg} alt={event.eventName} />
            <p>{formatDateRange(startDate, endDate)}</p>
            <Link href={`/events/${handleize(event.eventName || '')}`}>Read More</Link>
          </div>
        );
      })}
    </Layout>
  );
}
