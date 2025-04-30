// app/[...urlSegments]/client-page.tsx
import { Event as TinaEvent } from "@/tina/__generated__/types";
import client from "@/tina/__generated__/client";
import { EventCollageBlock } from "@/components/blocks/event-collage";
import { Blocks } from "@/components/blocks";
import ErrorBoundary from "@/components/error-boundary";

// Fetch the list of available dynamic pages at build time
export async function getStaticPaths() {
  const pageList = await client.queries.pageConnection();
  const edges = pageList.data?.pageConnection?.edges ?? [];

  // Ensure paths is initialized as an array
  const paths = edges
    .map((edge) => edge?.node?._sys?.filename)
    .filter(Boolean)
    .map((filename) => ({
      params: { urlSegments: filename === "index" ? [] : [filename] },
    }));

  console.log("Paths:", paths); // Log the generated paths

  return {
    paths,
    fallback: "blocking", // Can be set to true/false depending on your need
  };
}

// Fetch page and events data based on the dynamic URL
export async function getStaticProps({ params }: { params: { urlSegments?: string[] } }) {
  console.log("getStaticProps called"); // This should log to the console


  const slug = params?.urlSegments?.join("/") || "index"; // default to 'index'
  
  console.log("Slug:", slug); // Log the slug to ensure it's correct


  try {
    // Fetch the page data based on the dynamic slug
    const pageQuery = await client.queries.page({ relativePath: `${slug}.mdx` });
    
    // Log the page query result to inspect the structure
    console.log("Page Query Response:", pageQuery);

    // Check if the data is there
    if (!pageQuery?.data?.page) {
      console.error("No page data found for", slug);
      return {
        notFound: true,
      };
    }

    const blocks = pageQuery.data.page.blocks ?? [];

    // Fetch events from TinaCMS
    const eventsQuery = await client.queries.eventConnection();
    const events: Event[] = eventsQuery.data.eventConnection.edges
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined)
      .map((node) => ({
        id: node.id,
        eventName: node.eventName,
        heroImg: node.heroImg ?? null,
        startDate: node.startDate ?? null,
        endDate: node.endDate ?? null,
        body: node.body ?? null,
        _sys: node._sys,
      }));

    return {
      props: {
        data: {
          page: pageQuery.data?.page ?? null,
          blocks,
        },
        events,
      },
    };
  } catch (error) {
    console.error("Error loading page or events:", error);
    return {
      notFound: true,
    };
  }
}

// The main component to render the page
export default function ClientPage({ events, data }: { events: TinaEvent[]; data: any }) {
  console.log('ClientPage Data:', data); // Check the whole data object
  console.log('ClientPage Events:', events); // Check the events array

  if (!data || !data.page || !events) {
    return <div>No data to display</div>; // Simple check if data is missing
  }

  return (
    <ErrorBoundary>
      {/* Pass the data.page as props to the Blocks component */}
      <Blocks {...data.page} events={events} />
    </ErrorBoundary>
  );
}
