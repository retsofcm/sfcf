// app/[...urlSegments]/page.tsx

import * as React from "react";
import Layout from "@/components/layout/layout";
import { Metadata } from "next";
import { getPageData } from "@/lib/getPageData";
import ClientPageWrapper from "./ClientPageWrapper";
import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';

type RouteParams = { urlSegments: string[] };


// export async function generateMetadata({ params }): Promise<Metadata> {
//   const awaitedParams = await params;

//   try {
//     const page = await getPageData(awaitedParams.urlSegments);
//     if (!page) throw new Error("Page not found");

//     console.log("Meta title in generateMetadata:", page.metaTitle);
//     console.log("Meta description in generateMetadata:", page.metaDescription);

//     return {
//       title: page.metaTitle || "Default Site Title",
//       description: page.metaDescription || "Default site description",
//     };
//   } catch {
//     notFound();
//   }
// }

export async function generateMetadata() {
  return {
    title: "Hello from generateMetadata!",
    description: "Testing dynamic title",
  };
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