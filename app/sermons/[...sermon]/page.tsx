import { use } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";

const QUERY = `
  query Sermon($relativePath: String!) {
    sermon(relativePath: $relativePath) {
      speaker
      title
      series
      link
      date
      passage
      description
      passageLink
      sermonImage
      audioFile
    }
  }
`;



export async function generateMetadata(props: {
  params: Promise<{ sermon: string[] }>;
}) {
  const { sermon } = await props.params;
  const relativePath = `${sermon.join("/")}.mdx`;
  
  try {
    const { data } = await client.request({
      query: QUERY,
      variables: { relativePath },
    }, {});
    
    const sermon = data?.sermon;
    const description =
      sermon?.description || 
      "Discover past sermons at Stenson Fields Christian Fellowship.";
    
      return {
      title: sermon?.title ? `${sermon.title} | Stenson Fields Christian Fellowship` : "Sermon | Stenson Fields Christian Fellowship",
      description,
    };
  } catch {
    return {
      title: "Sermon not found | Stenson Fields Christian Fellowship",
      description: "This sermon could not be found.",
    };
  }
}

export default function SermonPage({ params }: { params: Promise<{ sermon: string[] }> }) {
  const { sermon } = use(params);
  const relativePath = `${sermon.join("/")}.mdx`;
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
