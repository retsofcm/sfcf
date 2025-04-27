'use client';

import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function ClientPage({ data }: { data: any }) {
  const { eventName, heroImg, startDate, endDate, body } = data;

  return (
    <>
      <h1>{eventName}</h1>
      <img src={heroImg || '/default-image.jpg'} alt={eventName || 'Event'} />
      <p>
        {new Date(startDate).toLocaleDateString()} –{' '}
        {endDate ? new Date(endDate).toLocaleDateString() : 'Ongoing'}
      </p>
      <div>
        <TinaMarkdown content={body} />
      </div>
    </>
  );
}
