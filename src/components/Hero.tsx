"use client";
import { useState, useEffect } from "react";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

export default function Hero() {
  const [graphQLresponse, setGraphQLresponse] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await client.queries.homepage({
        relativePath: "hero.md",
      });
      setGraphQLresponse(result);
    };

    fetchContent();
  }, []);

  // Use Tina CMS hooks after the data is fetched, but always call it
  const pageData = useTina({
    data: graphQLresponse?.data,
    query: graphQLresponse?.query,
    variables: graphQLresponse?.variables,
  });

  // Return a loading state until we have data
  if (!graphQLresponse) return <div>Loading...</div>;

  return (
    <div className="relative h-[600px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920"
          alt="Church gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {pageData?.data?.homepage?.title || 'Loading...'}
        </h1>
        <p className="text-xl text-white mb-8">Welcome to Stenson Fields Christian Fellowship</p>

        <div className="bg-green-700 inline-block text-white px-6 py-3 rounded-lg">
          <p className="font-semibold">SUNDAYS</p>
          <p>10:45am & 6pm</p>
          <p>Pilgrim Way, Stenson Fields</p>
          <p>DE24 3JG</p>
        </div>
      </div>
    </div>
  );
}
