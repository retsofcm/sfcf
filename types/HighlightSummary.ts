import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export interface HighlightSummary {

  id: string;
  title: string;
  date: string;
  image: string;
  content: TinaMarkdownContent | TinaMarkdownContent[];
  buttonText?: string | null;
  buttonUrl?: string | null;
  filename: string;
}

