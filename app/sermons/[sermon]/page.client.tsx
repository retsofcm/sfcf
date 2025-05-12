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
    date,
    passage,
    passageLink,
    description,
    sermonImage,
    audioFile
  } = sermon;

  // Fallback description if none is provided
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
        className="mb-6 flex items-center text-green transition-colors hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sermons
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {sermonImage && (
          <div>
            <img
              src={sermonImage}
              alt={passage || 'Sermon image'}
              className="h-96 w-full object-cover rounded-lg"
            />
          </div>
        )}

        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{passage}</h1>

          <div className="mb-4 text-gray-600 space-y-1">
            {speaker && <div><strong>Speaker:</strong> {speaker}</div>}
            {date && (
              <div><strong>Date:</strong> {format(new Date(date), 'MMMM d, yyyy')}</div>
            )}
          </div>

          {audioFile && (
            <div className="my-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Listen</h2>
              <audio controls className="w-full">
                <source src={audioFile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <a
                href={audioFile}
                download
                className="mt-2 inline-block text-sm text-green hover:underline"
              >
                Download Audio
              </a>
            </div>
          )}

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
