import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Event = {
  title: string;
  startDate: string;
  endDate?: string;
  heroImg: string;
  slug: string;
};

export const Events = (): Event[] => {
  const eventsDir = path.join(process.cwd(), "content/events");
  const filenames = fs.readdirSync(eventsDir);

  const events: Event[] = filenames
    .map((filename) => {
      const filePath = path.join(eventsDir, filename);

      // Check if the item is a file, not a directory
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) return null; // Skip directories

      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      // Return the event data
      return data.title && data.date ? {
        title: data.title,
        date: data.date,
        heroImg: data.heroImg,
        slug: filename.replace(/\.mdx$/, ""),
      } : null;
    })
    .filter((event): event is Event => event !== null); // Ensuring proper filtering and type assertion

  // Ensure events have a valid date and sort by most recent
  return events
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
