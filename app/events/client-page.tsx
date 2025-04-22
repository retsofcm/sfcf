'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BsArrowRight } from 'react-icons/bs';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { EventConnectionQuery, EventConnectionQueryVariables } from '@/tina/__generated__/types';
import { mermaid } from '@/components/blocks/mermaid';
import ErrorBoundary from '@/components/error-boundary';

interface ClientEventProps {
  data: EventConnectionQuery;
  variables: EventConnectionQueryVariables;
  query: string;
}

export default function EventsClientPage(props: ClientEventProps) {
  return (
    <ErrorBoundary>
      {props.data?.eventConnection.edges!.map((eventData) => {
        const event = eventData!.node!;
        const date = new Date(event.startDate!);
        let formattedDate = '';
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, 'MMM dd, yyyy');
        }
        return (
          <Link
            key={event.id}
            href={`/events/` + event._sys.breadcrumbs.join('/')}
            className='group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-md shadow-xs transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800'
          >
            <h3 className={'text-gray-700 dark:text-white text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out'}>
              {event.title}{' '}
              <span className='inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out'>
                <BsArrowRight className='inline-block h-8 -mt-1 ml-1 w-auto opacity-70' />
              </span>
            </h3>
            <div className='flex items-center'>
              {formattedDate && (
                <>
                  <span className='font-bold text-gray-200 dark:text-gray-500 mx-2'>—</span>
                  <p className='text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150'>{formattedDate}</p>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </ErrorBoundary>
  );
}