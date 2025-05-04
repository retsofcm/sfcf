import * as React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./ClientPageWrapper";

type RouteParams = { urlSegments: string[] };

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { urlSegments } = await params;
  const relativePath = urlSegments.join("/") + ".mdx";

  return (
    <Layout>
      <ClientPageWrapper relativePath={relativePath} />
    </Layout>
  );
}
