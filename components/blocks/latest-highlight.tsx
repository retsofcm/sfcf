import { Template } from "tinacms";
import { ImageWithTextBlock } from "./image-with-text";
import { HighlightSummary } from "@/types/HighlightSummary";


type Props = {
  data: {
    imagePosition?: string | null;
  };
  latestHighlight?: HighlightSummary | null;
};

export const LatestHighlightBlock = ({ data, latestHighlight }: Props) => {
  if (!latestHighlight) {

    return null;
  }

  const mappedData = {
    imageSrc: latestHighlight.image,
    imagePosition: data.imagePosition || "left",
    title: latestHighlight.subtitle,
    content: latestHighlight.content,
    buttonText: latestHighlight.buttonText,
    buttonUrl: latestHighlight.buttonUrl,
  };

  return <ImageWithTextBlock data={mappedData} />;


};

export const LatestHighlightBlockSchema: Template = {
  name: "LatestHighlight",
  label: "Latest Highlight",

  ui: {
    previewSrc: "/blocks/image-with-text.png",
  },
  fields: [
    {
      type: "string",
      name: "imagePosition",
      label: "Image Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      ui: {
        component: "radio-group",
        defaultValue: "left",
      },
    },
  ],
};

