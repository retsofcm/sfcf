import Layout from '@/components/layout/layout';
import ClientPageWrapper from "./../[...urlSegments]/ClientPageWrapper";
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { EventSummary } from "@/types/EventSummary";

export const metadata = {
  title: "Highlights | Stenson Fields Christian Fellowship",
  description: "Stay up to date with the latest highlights and news from Stenson Fields Christian Fellowship.",
};

export default async function HighlightsPage() {
  const relativePath = "highlights.mdx";
  let initialData: any = null;
  let sortedEdges: any[] = [];

  try {
    const [pageQuery, highlightsQuery, eventsQuery] = await Promise.all([
      client.queries.page({ relativePath }),
      client.queries.highlightConnection(),
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

    const edges = highlightsQuery?.data?.highlightConnection?.edges;
    sortedEdges = (edges

      ?.sort((a, b) => {
        const dateA = new Date(a?.node?.date || 0).getTime();
        const dateB = new Date(b?.node?.date || 0).getTime();
        return dateB - dateA;
      })) || [];

  } catch (error) {
    console.error("Error fetching highlights page data:", error);
  }


  if (!initialData) return null;

  return (
    <Layout>
      <ClientPageWrapper initialData={initialData} />

      <div className="container pb-24">
        {sortedEdges?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {sortedEdges.map((edge, index) => {
              const highlight = edge?.node;
              if (!highlight) return null;

              const heroImg = highlight.image || '/default-image.jpg';
              // Hide date physically but order by it as requested
              // The user said: "We don't need an author or visible date, but the entries should be ordered by date"

              return (
                <Link
                  key={index}
                  href={`/highlights/${highlight._sys.filename}`}
                  className="relative aspect-[1] overflow-hidden block group bg-green-900"
                >
                  <img
                    src={heroImg}
                    alt={highlight.title}

                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"></div>
                  <div className="absolute inset-0 flex flex-col justify-end text-white p-6 z-10">
                    <h2 className="text-2xl font-semibold mb-1">{highlight.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">No highlights available at the moment.</p>
        )}
      </div>
    </Layout>
  );
}

