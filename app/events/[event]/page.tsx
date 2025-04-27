import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './page.client';

export const revalidate = 300;

type Params = Promise<{ event: string[] }>;

export default async function EventPage(props: { params: Params }) {
  const { event } = await props.params;
  
  let data;
  try {
    data = await client.queries.event({
      relativePath: `${event}.mdx`,
    });
  } catch (err) {
    console.error('Error loading event:', err);
    return (
      <Layout>
        <h1>Event not found</h1>
      </Layout>
    );
  }

  return (
    <Layout rawPageData={data}>
      <Section>
        <ClientPage data={data.data.event} />
      </Section>
    </Layout>
  );
}
