// app/[...urlSegments]/page.tsx (or your dynamic route)

import * as React from "react";
import Layout from "@/components/layout/layout";
import ClientPageWrapper from "./ClientPageWrapper";
import { notFound } from "next/navigation"; // Import notFound from next/navigation
import fs from 'fs';
import path from 'path';

type RouteParams = { urlSegments: string[] };

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { urlSegments } = await params;
  const relativePath = urlSegments.join("/") + ".mdx";

  // Check if the page exists
  const pageExists = await checkIfPageExists(relativePath);

  // If the page doesn't exist, trigger a 404
  if (!pageExists) {
    notFound();
  }

  return (
    <Layout>
      <ClientPageWrapper relativePath={relativePath} />
    </Layout>
  );
}

// Function to check if the .mdx file exists
async function checkIfPageExists(relativePath: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'content', 'pages', relativePath);
  
  try {
    // Try accessing the file. If it doesn't exist, it will throw an error
    await fs.promises.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}
