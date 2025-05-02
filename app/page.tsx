import React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./[...urlSegments]/client-page-wrapper";

export const revalidate = 300;

export default function Home() {
  return (
    <Layout>
      <ClientPageWrapper relativePath="home.mdx" />
    </Layout>
  );
}
