import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;

  // Handle events separately
  console.log(filepath)
  if (filepath.startsWith('events/')) {
    const slug = filepath.replace(/^events\//, '');
    console.log(slug)
    data = await client.queries.event({
      relativePath: `${slug}.mdx`,
    });
  } else {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  }

  return (
    <Layout rawPageData={data}>
      <Section>
        <ClientPage {...data} />
      </Section>
    </Layout>
  );
}

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const events = await client.queries.eventConnection();

  const allPages = pages.data.pageConnection.edges || [];
  const allEvents = events.data.eventConnection.edges || [];

  const pageParams = allPages
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === 'home')); // exclude the home page

  const eventParams = allEvents.map((edge) => ({
    urlSegments: ['events', ...(edge?.node?._sys.breadcrumbs || [])],
  }));

  return [...pageParams, ...eventParams];
}
