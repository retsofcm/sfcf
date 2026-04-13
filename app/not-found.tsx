import React from "react";

import Link from "next/link";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "Page not found | Stenson Fields Christian Fellowship",
  description: "Uh oh, this page is missing! Try returning to the homepage or check out our latest events.",
};

export default function NotFound() {
  return (
    <Layout>
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="hidden md:block w-full h-full relative">
            <img
              src="/uploads/404.png"
              alt="Church member in stocks"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="block md:hidden w-full h-full relative">
            <img
              src="/uploads/404-mobile.png"
              alt="Church member in stocks (mobile)"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-start justify-end px-4 md:px-20 py-16 text-left z-10">
          <h1 className="text-6xl font-light text-white mb-4">
            Uh oh, this page is missing!
          </h1>

          <p className="text-xl text-white font-medium mb-6">
            Rejosh isn't very happy about it either.
          </p>

          <Link
            href="/"
            className="block py-5 px-6 border text-white"
          >
            Back to safety
          </Link>
        </div>
      </section>
    </Layout>
  );
}
