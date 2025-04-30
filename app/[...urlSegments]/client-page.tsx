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

// Fetch page data based on the dynamic URL
export async function getStaticProps({ params }: { params: { urlSegments?: string[] } }) {
  console.log("getStaticProps called"); // This should log to the console

  const slug = params?.urlSegments?.join("/") || "index"; // default to 'index'
  
  console.log("Slug:", slug); // Log the slug to ensure it's correct

  try {
    // Fetch the page data based on the dynamic slug
    const pageQuery = await client.queries.page({ relativePath: `${slug}.mdx` });
    
    // Log the page query result to inspect the structure
    console.log("Page Query Response:", pageQuery);

    if (!pageQuery?.data?.page) {
      console.error("No page data found for", slug);
      return {
        notFound: true,
      };
    }

    const blocks = pageQuery.data.page.blocks ?? [];

    // No need to fetch events, so we can return only the page data
    return {
      props: {
        data: {
          page: pageQuery.data?.page ?? null,
          blocks,
        },
      },
    };
  } catch (error) {
    console.error("Error loading page:", error);
    return {
      notFound: true,
    };
  }
}

// The main component to render the page
export default function ClientPage({ data }: { data: any }) {
  console.log('ClientPage Data:', data); // Check the whole data object

  if (!data || !data.page) {
    return <div>No data to display</div>; // Simple check if data is missing
  }

  return (
    <ErrorBoundary>
      {/* Pass the data.page as props to the Blocks component */}
      <Blocks {...data.page} />
    </ErrorBoundary>
  );
}
