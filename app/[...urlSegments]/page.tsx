import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./ClientPageWrapper";
import * as React from 'react';

interface PageProps {
  params: {
    urlSegments: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const { urlSegments } = await params;

  const relativePath = urlSegments.join("/") + ".mdx";

  return (
    <Layout>
      <ClientPageWrapper relativePath={relativePath} />
    </Layout>
  );
}
