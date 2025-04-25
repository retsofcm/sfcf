import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { type PageProps } from 'next';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const revalidate = 300;

function formatTime(date: Date) {
  const hours = format(date, 'h');
  const minutes = format(date, 'mm');
  const ampm = format(date, 'a').toLowerCase();
  return minutes === '00' ? `${hours}${ampm}` : `${hours}:${minutes}${ampm}`;
}

function formatEventDate(startDate: string, endDate?: string): string {
  const start = parseISO(startDate);
  const startDateStr = format(start, 'MMMM do');
  const startTimeStr = formatTime(start);

  if (!endDate) {
    return `${startDateStr}, ${startTimeStr}`;
  }

  const end = parseISO(endDate);
  const endTimeStr = formatTime(end);

  // Same month
  if (start.getMonth() === end.getMonth()) {
    const endDay = format(end, 'do');
    return `${startDateStr}–${endDay}, ${endTimeStr}`;
  }

  // Different months
  const endDateStr = format(end, 'MMMM do');
  return `${startDateStr} – ${endDateStr}, ${endTimeStr}`;
}

export default async function EventPage({ params }: PageProps) {
  const { event } = await params;
  console.log('Fetching event from:', `${event}.mdx`);

  let result;
  try {
    result = await client.queries.event({
      relativePath: `${event}.mdx`,
    });
  } catch (err) {
    console.error('Failed to fetch event:', err);
    return <h1>Event not found</h1>;
  }

  console.log(result)

  if (!result?.data?.event) {
    return <h1>Event not found</h1>;
  }

  const { eventName, heroImg, startDate, endDate, body } = result.data.event;

  return (
    <Layout>
      <h1>{eventName}</h1>
      <img src={heroImg || '/default-image.jpg'} alt={eventName || 'Event image'} />
      <p>{formatEventDate(startDate, endDate)}</p>
      <div>{/* render MDX body */}</div>
    </Layout>
  );
}
