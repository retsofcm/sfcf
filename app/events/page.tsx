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
      <div className="max-w-[1440px] px-20 mx-auto">
        <h1 className="text-[64px] font-light mb-6">Upcoming Events</h1>

        {/* Descriptive Text */}
        <p className="text-xl text-gray-600 mb-20">
          Explore our exciting events happening soon. Stay tuned for updates and don't miss out on the fun!
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedEdges.map((edge, index) => {
            const event = edge?.node;
            if (!event) return null;
    
            const heroImg = event.heroImg || '/default-image.jpg';
            const startDate = event.startDate ? new Date(event.startDate) : undefined;
            const endDate = event.endDate ? new Date(event.endDate) : undefined;
    
            return (
              <div key={index} className="w-fullmx-auto mb-5">
                <div className="bg-white border border-gray-200">
                  <Link href={`/events/${handleize(event.eventName || '')}`}>
                    <div className="relative w-full pb-[100%] overflow-hiddeng">
                      <img
                        src={heroImg}
                        alt={event.eventName}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/events/${handleize(event.eventName || '')}`}>
                      <h5 className="text-gray-900 font-light text-2xl tracking-tight mb-2">
                        {event.eventName}
                      </h5>
                    </Link>
                    <p className="font-normal text-gray-700 mb-3">
                      {formatDateRange(startDate, endDate)}
                    </p>
                    <Link
                      href={`/events/${handleize(event.eventName || '')}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );  
}
