import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/uploads/6Y9A7292.jpeg" 
            alt="Church member in stocks"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
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
