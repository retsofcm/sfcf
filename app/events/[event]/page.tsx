import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";
import { notFound } from "next/navigation";

const QUERY = `
  query Event($relativePath: String!) {
    event(relativePath: $relativePath) {
      eventName
      heroImg
      startDate
      endDate
      location
      body
      price
    }
  }
`;

async function fetchEvent(event: string) {
  const candidates = [
    `${event}.mdx`,
    ...(event.endsWith("-") ? [`${event.replace(/-+$/, "")}.mdx`] : [`${event}-.mdx`]),
  ];

  for (const relativePath of candidates) {
    try {
      const { data } = await client.request(
        {
          query: QUERY,
          variables: { relativePath },
        },
        {}
      );
      if (data?.event) {
        return { data, relativePath };
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

export async function generateMetadata(props: {
  params: Promise<{ event: string }>;
}) {
  const { event } = await props.params;

  try {
    const result = await fetchEvent(event);
    const eventData = result?.data?.event;

    if (!eventData) {
      return {
        title: "Event Not Found | Stenson Fields Christian Fellowship",
        description: "This event could not be found.",
      };
    }

    const description =
      eventData.body ||
      "Discover upcoming events at Stenson Fields Christian Fellowship.";

    return {
      title: eventData.eventName
        ? `${eventData.eventName} | Stenson Fields Christian Fellowship`
        : "Upcoming event | Stenson Fields Christian Fellowship",
      description,
    };
  } catch {
    return {
      title: "Event Not Found | Stenson Fields Christian Fellowship",
      description: "This event could not be found.",
    };
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event } = await params;
  const result = await fetchEvent(event);

  if (!result || !result.data?.event) {
    notFound();
  }

  return (
    <Layout>
      <ClientPage
        query={QUERY}
        variables={{ relativePath: result.relativePath }}
        data={result.data}
      />
    </Layout>
  );
}
