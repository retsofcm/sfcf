import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { EventConnectionQuery } from '@/tina/__generated__/types';

export default async function EventsPage() {
  const eventsData = await client.queries.eventConnectionQuery();
  console.log(eventsData.data.eventConnection.edges);  // Log the entire event data structure

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {eventsData.data.eventConnection.edges.map((edge, index) => {
        const event = edge.node;
        return (
          <div key={index}>
            <h2>{event.eventName}</h2>
            <img src={event.heroImg} alt={event.eventName} />
            <p>
              {new Date(event.startDate).toLocaleDateString()} -{' '}
              {new Date(event.endDate).toLocaleDateString()}
            </p>
            <Link href={`/events/${event.slug}`}>Read More</Link>
          </div>
        );
      })}
    </Layout>
  );
}
