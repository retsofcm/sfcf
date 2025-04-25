import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Event = {
  eventName: string;
  startDate: Date;  // Start date as a Date object
  endDate?: Date;   // End date as a Date object (optional)
  heroImg?: string;
  slug: string;
};

export const Events = (): Event[] => {
  const eventsDir = path.join(process.cwd(), "content/events");
  const filenames = fs.readdirSync(eventsDir);

  const events: Event[] = filenames
    .map((filename) => {
      const filePath = path.join(eventsDir, filename);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) return null;

      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      if (data.eventName && data.startDate) {
        const event: Event = {
          eventName: data.eventName,
          startDate: new Date(data.startDate), // Ensure startDate is a Date object
          heroImg: data.heroImg,
          slug: filename.replace(/\.mdx$/, ""),
        };

        // Ensure endDate is treated as a Date object (if it exists)
        if (data.endDate) {
          const parsedEndDate = new Date(data.endDate);
          if (!isNaN(parsedEndDate.getTime())) {
            event.endDate = parsedEndDate; // Only assign if it's a valid date
          }
        }

        return event;
      }

      return null;
    })
    .filter((event): event is Event => event !== null)
    .filter((e) => new Date(e.startDate) >= new Date()) // Filter out past events
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()); // Sort events by start date

  return events;
};
