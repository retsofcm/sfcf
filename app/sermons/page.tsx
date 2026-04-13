import Layout from '@/components/layout/layout';
import ClientPageWrapper from "./../[...urlSegments]/ClientPageWrapper";
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { EventSummary } from "@/types/EventSummary";

export const metadata = {
  title: "Sermons | Stenson Fields Christian Fellowship",
  description: "Explore our collection of sermons to grow in your spiritual journey with messages grounded in the Bible and relevant to everyday life.",
};

export default async function SermonsPage() {
  const relativePath = "sermons.mdx";
  let initialData: any = null;
  let sortedEdges: any[] = [];

  try {
    const [pageQuery, sermonsQuery, eventsQuery] = await Promise.all([
      client.queries.page({ relativePath }),
      client.queries.sermonConnectionQuery(),
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

    const edges = sermonsQuery?.data?.sermonConnection?.edges;
    sortedEdges = (edges
      ?.sort((a, b) => {
        const dateA = new Date(a?.node?.date || 0).getTime();
        const dateB = new Date(b?.node?.date || 0).getTime();
        return dateB - dateA;
      })) || [];

  } catch (error) {
    console.error("Error fetching sermons page data:", error);
  }

  if (!initialData) return null;

  return (
    <Layout>
      <ClientPageWrapper initialData={initialData} />

      <div className="container">
        {sortedEdges?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEdges.map((edge, index) => {
              const sermon = edge?.node;
              if (!sermon) return null;

              const heroImg = sermon.sermonImage || '/default-image.jpg';
              const startDate = sermon.date ? new Date(sermon.date) : undefined;

              // Format date for display (without time)
              const formattedDate = startDate ? format(startDate, 'MMMM dd, yyyy') : '';

              return (
                <Link
                  key={index}
                  href={`/sermons/${sermon.link}`}
                  className="relative aspect-[1] overflow-hidden block group"
                >
                  <img
                    src={heroImg}
                    alt={`${sermon.speaker}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"></div>

                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-end text-white p-6 z-10">
                    <p className="text-sm mb-1 opacity-80">{formattedDate}</p>
                    
                    {/* Title of the sermon */}
                    {sermon.title && (
                      <h2 className="text-2xl font-semibold mb-1">{sermon.title}</h2>
                    )}
                    
                    <h3 className="text-lg font-light">{sermon.passage}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-12">No sermons available.</p>
        )}
      </div>
    </Layout>
  );
}
