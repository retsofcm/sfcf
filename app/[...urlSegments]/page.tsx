// app/[...urlSegments]/page.tsx

import * as React from "react";
import Layout from "@/components/layout/layout";
import { Metadata } from "next";
import { getPageData } from "@/lib/getPageData";
import ClientPageWrapper from "./ClientPageWrapper";
import { notFound } from "next/navigation";

type RouteParams = { urlSegments: string[] };


export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params;

  try {
    const page = await getPageData(awaitedParams.urlSegments);
    if (!page) {
      notFound();
    }

    return {
      title: page.metaTitle || "Stenson Fields Christian Fellowship",
      description: page.metaDescription || "We're a group of Christians who take the Bible seriously and seek to share God's love for every individual in our community and further afield.",
    };
  } catch {
    notFound();
  }
}

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