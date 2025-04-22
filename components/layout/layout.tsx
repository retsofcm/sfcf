import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import Head from "next/head"; 

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    }
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="We're a group of Christians who take the Bible seriously and seek to share God's love for every individual in our community and further afield." />
      </Head>

      <Header />
      <main className="overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
