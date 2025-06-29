// lib/getPageData.ts
import { client } from "@/tina/__generated__/client";

export async function getPageData(urlSegments: string[]) {
  // Build the relative path to the MDX file
  const relativePath =
    urlSegments.length === 0 ? "home.mdx" : urlSegments.join("/") + ".mdx";

  // Query TinaCMS content using the generated client
  const response = await client.queries.page({
    relativePath,
  });

  return response.data.page;
}
