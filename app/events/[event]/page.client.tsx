'use client';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDateRange } from '@/utils/formatDate';

export default function ClientPage({ data }: { data: any }) {
  const { eventName, heroImg, startDate, endDate, body } = data;

  const formattedDate = formatDateRange(
    startDate ? new Date(startDate) : undefined,
    endDate ? new Date(endDate) : undefined
  );

  return (
    <>
      <h1>{eventName}</h1>
      <img src={heroImg || '/default-image.jpg'} alt={eventName || 'Event'} />
      <p>{formattedDate}</p>
      <div>
        <TinaMarkdown content={body} />
      </div>
    </>
  );
}
