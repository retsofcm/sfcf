import React from "react";
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

async function EventPage({ params }: { params: { event: string } }) {
  const { event } = await params; // Await params to resolve the dynamic route

  const relativePath = `${event}.mdx`;
  const options = {};

  const variables = { relativePath };
  const { data } = await client.request({ query: QUERY, variables }, options);

  const eventData = data?.event;

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const bodyContent = eventData.body?.children || []; // Extract body content
  console.log("Body Content:", bodyContent); // Log the body content for debugging

  return (
    <Layout>
      <ClientPage
        query={QUERY}
        variables={variables}
        data={data}
        bodyContent={bodyContent} // Render the rich-text content
      />
    </Layout>
  );
}

export default EventPage;
