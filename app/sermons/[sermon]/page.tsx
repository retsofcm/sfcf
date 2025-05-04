import { use } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";

const QUERY = `
  query Sermon($relativePath: String!) {
    sermon(relativePath: $relativePath) {
      speaker
      link
      date
      passage
      description
      sermonImage
      audioFile
    }
  }
`;

export default function SermonPage({ params }: { params: Promise<{ sermon: string }> }) {
  const { sermon } = use(params);
  const relativePath = `${sermon}.mdx`;
  const options = {};

  const { data } = use(
    client.request({
      query: QUERY,
      variables: { relativePath },
    }, options)
  );

  return (
    <Layout>
      <ClientPage
        query={QUERY}
        variables={{ relativePath }}
        data={data}
      />
    </Layout>
  );
}
