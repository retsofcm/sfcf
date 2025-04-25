'use client';
import { useEffect } from 'react';
import Layout from '@/components/layout/layout';

export default function EventDisplay({ eventData }: { eventData: any }) {
  const { eventName, heroImg, startDate, endDate, body } = eventData;

  useEffect(() => {
    // any client-side stuff
  }, []);

  return (
    <Layout>
      <h1>{eventName}</h1>
      <img src={heroImg} alt={eventName} />
      <p>
        {new Date(startDate).toLocaleDateString()} –{' '}
        {endDate ? new Date(endDate).toLocaleDateString() : 'Ongoing'}
      </p>
      <div>{body}</div>
    </Layout>
  );
}
