import client from "@/tina/__generated__/client";
import { Blocks } from "@/components/blocks";
import ErrorBoundary from "@/components/error-boundary";

export async function getStaticPaths() {
  const pageList = await client.queries.pageConnection();
  const edges = pageList.data?.pageConnection?.edges ?? [];

  const paths = edges
    .map((edge) => edge?.node?._sys?.filename)
    .filter(Boolean)
    .map((filename) => ({
      params: { urlSegments: filename === "index" ? [] : [filename] },
    }));

  return {
    paths,
    fallback: "blocking", 
  };
}

export async function getStaticProps({ params }: { params: { urlSegments?: string[] } }) {
  const slug = params?.urlSegments?.join("/") || "index";

  try {
    const pageQuery = await client.queries.page({ relativePath: `${slug}.mdx` });

    if (!pageQuery?.data?.page) {
      console.error("No page data found for", slug);
      return {
        notFound: true,
      };
    }

    const blocks = pageQuery.data.page.blocks ?? [];

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

export default function ClientPage({ data }: { data: any }) {
  if (!data || !data.page) {
    return <div>No data to display</div>;
  }

  return (
    <ErrorBoundary>
      <Blocks {...data.page} />
    </ErrorBoundary>
  );
}
