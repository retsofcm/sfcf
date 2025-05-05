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

  const event = tinaData?.event;
  if (!event) {
    return <div></div>;
  }

  const {
    eventName,
    heroImg,
    startDate,
    endDate,
    location,
    price,
    body
  } = event;

  return (
    <div className="container px-4 md:px-20">
      <Link
        href="/events"
        className="mb-6 flex items-center text-green transition-colors hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="overflow-hidden">
            <img
              src={heroImg}
              alt={eventName}
              className="h-96 w-full object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Event Details */}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{eventName}</h1>

          <div className="mb-6 flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0">
            {(startDate || endDate) && (
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-5 w-5 text-green" />
                <span>{formatDateRange(startDate, endDate)}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5 text-green" />
                <span>{location}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">About this event</h2>
            <div className="prose text-gray-600 leading-relaxed">
              {/* Render content here */}
              {renderBodyContent(body?.children)}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Registration</h2>
            <div className="border-2 border-gray-300 bg-gray-100 p-4">
              <div className="mb-2 text-lg font-semibold text-gray-900">
                {price == null || price == "Free" || price == 0 ? 'Free Event' : `Cost: ${price}`}
              </div>
              <p className="text-sm text-gray-600">
                {price == null || price == "Free" || price == 0
                  ? 'No payment required. All are welcome to attend.'
                  : 'Please register to secure your spot at this event.'}
              </p>
            </div>
          </div>

          {price == null 
            ? '' 
            : <button className="w-full sm:w-auto bg-green-100 px-4 py-2 text-white">
                Register Now
              </button>
          }
        </div>
      </div>
    </div>
  );
}
