'use client';

import React from "react";
import { useTina } from "tinacms/dist/react";
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDateRange } from '@/utils/formatDate'; // Adjust path as needed

function renderBodyContent(content: any) {
  if (!content || !Array.isArray(content)) return null;

  return content.map((block, index) => {
    switch (block.type) {
      case 'p':
        return <p key={index}>{renderBodyContent(block.children)}</p>;
      case 'text':
        return <span key={index}>{block.text}</span>;
      default:
        return null;
    }
  });
}

export default function ClientPage({ query, variables, data }: any) {
  const { data: tinaData } = useTina({ query, variables, data });

  const sermon = tinaData?.sermon;
  if (!sermon) {
    return <div>Loading...</div>;
  }

  const {
    speaker,
    date,
    passage,
    description,
    sermonImage,
    audioFile
  } = sermon;

  return (
    <div className="container px-4 md:px-20">
      <Link
        href="/sermons"
        className="mb-6 flex items-center text-green transition-colors hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sermons
      </Link>

      {speaker} {passage} {date}
    </div>
  );
}
