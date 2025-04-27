import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { EventConnectionQuery } from '@/tina/__generated__/types';

export default async function EventsPage() {
  const eventsData = await client.queries.eventConnectionQuery();

  // Use optional chaining to check if edges exists
  const edges = eventsData?.data?.eventConnection?.edges;

  if (!edges || edges.length === 0) {
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
      {edges.map((edge, index) => {
        const event = edge?.node;  // Use optional chaining to check for null or undefined edge.node
        if (!event) {
          return null; // Skip this iteration if event is undefined or null
        }

        const heroImg = event.heroImg || '/default-image.jpg';  // Fallback to default image if heroImg is null or undefined

        // Check if startDate and endDate are valid
        const startDate = event.startDate ? new Date(event.startDate) : null;
        const endDate = event.endDate ? new Date(event.endDate) : null;

        return (
          <div key={index}>
            <h2>{event.eventName}</h2>
            <img src={heroImg} alt={event.eventName} />
            <p>
              {startDate ? startDate.toLocaleDateString() : 'No start date'} -{' '}
              {endDate ? endDate.toLocaleDateString() : 'Ongoing'}
            </p>
            <Link href={`/events/${event.slug}`}>Read More</Link>
          </div>
        );
      })}
    </Layout>
  );
}
