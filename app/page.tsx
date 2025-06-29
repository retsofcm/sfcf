import React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./[...urlSegments]/ClientPageWrapper";

export const revalidate = 300;

export const metadata = {
  title: "Stenson Fields Christian Fellowship",
  description: "Welcome to Stenson Fields Christian Fellowship, a caring community dedicated to sharing God’s love through scripture, worship, and fellowship.",
};

export default function Home() {
  return (
    <Layout>
      <ClientPageWrapper relativePath="home.mdx" />
    </Layout>
  );
}
