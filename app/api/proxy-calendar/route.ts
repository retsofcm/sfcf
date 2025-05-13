import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const calendarId = req.nextUrl.searchParams.get('calendarId');

  if (!calendarId) {
    return NextResponse.json({ error: 'Missing calendarId' }, { status: 400 });
  }

  const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
    calendarId
  )}/public/basic.ics`;

  try {
    const response = await fetch(icsUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch calendar' },
        { status: response.status }
      );
    }

    const text = await response.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
