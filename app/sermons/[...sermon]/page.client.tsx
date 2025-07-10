'use client';

import React from "react";
import { useTina } from "tinacms/dist/react";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { format } from 'date-fns';

export default function ClientPage({ query, variables, data }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const sermon = tinaData?.sermon;

  if (!sermon) return <div></div>;

  const {
    speaker,
    title,
    series,
    date,
    passage,
    passageLink,
    description,
    youtubeUrl,
  } = sermon;

  const getYoutubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  const defaultDescription = (
    <p>
      In this sermon, we reflect on {passage || 'a selected scripture'} with {speaker || 'the speaker'}.
      {passageLink && (
        <> If you'd like to follow along, the passage is available <a href={passageLink} className="text-green underline" target="_blank" rel="noopener noreferrer">here</a>.</>
      )}
    </p>
  );

  return (
    <div className="container px-4 md:px-20">
      <Link
        href="/sermons"
        className="mb-6 flex items-center text-green transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sermons
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left column: YouTube embed */}
        <div>
          {youtubeEmbedUrl && (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-[16/9]"
              ></iframe>
            </div>
          )}
        </div>

        {/* Right column: Info and description */}
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>

          <div className="mb-4 text-gray-600 space-y-1">
            {series && <div><strong>Series:</strong> {series}</div>}
            {date && (
              <div><strong>Date:</strong> {format(new Date(date), 'MMMM d, yyyy')}</div>
            )}
          </div>

          <div className="prose prose-lg text-gray-700 mt-8">
            {description ? (
              <TinaMarkdown content={description} />
            ) : (
              defaultDescription
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
