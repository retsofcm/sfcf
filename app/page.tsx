import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";
import { Events } from "@/lib/events";

export const revalidate = 300;

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  const latestEvents = Events().slice(0, 3);

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} latestEvents={latestEvents} />
    </Layout>
  );
}
