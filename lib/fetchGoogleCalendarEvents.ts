// lib/fetchGoogleCalendarEvents.ts
export async function fetchGoogleCalendarEvents({
    calendarId,
    timeMin,
    timeMax,
  }: {
    calendarId: string;
    timeMin: string;
    timeMax: string;
  }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&key=${apiKey}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    return (data.items || []).map((event: any) => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
    }));
  }
  