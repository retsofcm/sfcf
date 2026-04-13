
import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import { PageWrapper } from "./PageWrapper";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  let globalData: any = { global: {} };
  
  try {
    const response = await client.queries.global({
      relativePath: "index.json",
    }, {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    });
    globalData = response.data;
  } catch (error) {
    console.error("Warning: Failed to fetch global layout data. Using empty defaults.", error);
  }

  const pageData = rawPageData ?? {};

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={pageData}>
      <Header />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </LayoutProvider>
  );
}
