'use client';

import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./client-page-wrapper";
import { useParams } from "next/navigation";

export default function Page() {
  const { urlSegments } = useParams() as { urlSegments: string[] };
  const relativePath = urlSegments.join("/") + ".mdx";

  return (
    <Layout>
      <ClientPageWrapper relativePath={relativePath} />
    </Layout>
  );
}
