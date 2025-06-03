import Layout from '@/components/layout/layout';
import ClientPageWrapper from "./../[...urlSegments]/ClientPageWrapper";
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export default async function SermonsPage() {
  const SermonsData = await client.queries.sermonConnectionQuery();
  const edges = SermonsData?.data?.sermonConnection?.edges;

  const sortedEdges = (edges
    ?.sort((a, b) => {
      const dateA = new Date(a?.node?.date || 0).getTime();
      const dateB = new Date(b?.node?.date || 0).getTime();
      return dateB - dateA;
    })) || [];
  
  if (!sortedEdges || sortedEdges.length === 0) {
    return (
      <Layout>
        <div className="max-w-[1440px] px-20 mx-auto">
          <h1 className="text-[48px] font-light mb-6">Sermons</h1>
          <p>No sermons available.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ClientPageWrapper relativePath="sermons.mdx" />

      <div className="container">
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
                <Image
                  src={heroImg}
                  alt={`${sermon.speaker}`}
                  fill
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
      </div>
    </Layout>
  );
}
