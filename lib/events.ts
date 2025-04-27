import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Event = {
  eventName: string;
  startDate: Date;
  endDate?: Date;
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
          startDate: new Date(data.startDate),
          heroImg: data.heroImg,
          slug: filename.replace(/\.mdx$/, ""),
        };

        if (data.endDate) {
          const parsedEndDate = new Date(data.endDate);
          if (!isNaN(parsedEndDate.getTime())) {
            event.endDate = parsedEndDate;
          }
        }

        return event;
      }

      return null;
    })
    .filter((event): event is Event => event !== null)
    .filter((e) => new Date(e.startDate) >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return events;
};
