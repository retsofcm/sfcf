import { use } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";

const QUERY = `
  query Highlight($relativePath: String!) {
    highlight(relativePath: $relativePath) {
      title
      date
      image
      content
      buttonText
      buttonUrl
    }
  }
`;




export async function generateMetadata(props: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const { urlSegments } = await props.params;
  const relativePath = `${urlSegments.join("/")}.mdx`;
  
  try {
    const { data } = await client.request({
      query: QUERY,
      variables: { relativePath },
    }, {});
    
    const highlightData = data?.highlight;
    const title = highlightData?.title ? `${highlightData.title} | Stenson Fields Christian Fellowship` : "Highlight | Stenson Fields Christian Fellowship";
    
    return {
      title,
      description: "Stay up to date with the latest highlights.",
    };
  } catch {
    return {
      title: "Highlight not found | Stenson Fields Christian Fellowship",
      description: "This highlight could not be found.",
    };
  }
}

export default function HighlightPage({ params }: { params: Promise<{ urlSegments: string[] }> }) {

  const { urlSegments } = use(params);
  const relativePath = `${urlSegments.join("/")}.mdx`;
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
