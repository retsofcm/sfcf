import { use } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";

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

export default function EventPage({ params }: { params: Promise<{ event: string }> }) {
  const { event } = use(params);
  const relativePath = `${event}.mdx`;
  const options = {};

  const { data } = use(
    client.request({
      query: QUERY,
      variables: { relativePath },
    }, options)
  );

  return (
    <Layout>
      <ClientPage
        query={QUERY}
        variables={{ relativePath }}
        data={data}
      />
    </Layout>
  );
}
