'use client';

import React from "react";
import { useTina } from "tinacms/dist/react";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientPage({ query, variables, data }: { query: string; variables: object; data: any }) {
  const { data: tinaData } = useTina({ query, variables, data });
  const highlight = tinaData?.highlight;

  if (!highlight) return <div></div>;

  const {
    title,
    image,
    content,
    buttonText,
    buttonUrl,
  } = highlight;



  return (
    <div className="container px-4 md:px-20 py-12">
      <Link
        href="/highlights"
        className="mb-8 inline-flex items-center text-green transition-colors hover:opacity-80"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Highlights
      </Link>


      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left column: Image */}
        <div>
          {image && (
            <div className="w-full">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover shadow-md aspect-square lg:aspect-auto"
              />
            </div>
          )}
        </div>

        {/* Right column: Content */}
        <div>
          <h1 className="mb-6 text-4xl font-light text-gray-900 underline decoration-green-500 underline-offset-[16px]" style={{ textDecorationThickness: '3px' }}>
            {title}
          </h1>

          <div className="prose prose-lg text-gray-700 mt-12">
            <TinaMarkdown content={content} />
          </div>

          {buttonText && buttonUrl && (
            <div className="mt-8">
              <a
                href={buttonUrl}
                target={buttonUrl?.includes('mailto') || buttonUrl?.includes('http') ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-block py-4 px-8 bg-green text-white font-medium hover:bg-green-600 transition-colors"
                onClick={() => {
                  if (buttonUrl?.includes("youtube.com") || buttonUrl?.includes("youtu.be")) {
                    window.gtag?.("event", "youtube_click", {
                      event_category: "Engagement",
                      event_label: buttonUrl,
                      value: 1,
                      link_text: buttonText,
                      component_title: title
                    });
                  }
                }}
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

