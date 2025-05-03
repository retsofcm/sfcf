import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="max-w-[1440px] px-20 mx-auto">
          <h1 className="text-[48px] font-light mb-6">Upcoming Events</h1>
          <p>No events available.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 md:px-20 mx-auto">
        <h1 className="text-[32px] md:text-[48px] font-light mb-2 md:mb-4">Upcoming Events</h1>

        {/* Descriptive Text */}
        <p className="mb-10 md:mb-20">
          Explore our exciting events happening soon. Stay tuned for updates and don't miss out on the fun!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEdges.map((edge, index) => {
            const event = edge?.node;
            if (!event) return null;

            const heroImg = event.heroImg || '/default-image.jpg';
            const startDate = event.startDate ? new Date(event.startDate) : undefined;
            const endDate = event.endDate ? new Date(event.endDate) : undefined;

            return (
              <Link
                key={index}
                href={`/events/${handleize(event.eventName || "")}`}
                className="relative aspect-[1] overflow-hidden block group"
              >
                <Image
                  src={heroImg}
                  alt={event.eventName}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"></div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end text-white p-6 z-10">
                  <p className="text-sm mb-1 opacity-80">{formatDateRange(startDate, endDate)}</p>
                  <h3 className="text-2xl font-semibold">{event.eventName}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
