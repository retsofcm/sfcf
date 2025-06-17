"use client";

import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type Props = {
  data: {
    imageSrc: string | null | undefined;
    imagePosition?: string | null;
    title?: string | null;
    content: TinaMarkdownContent | TinaMarkdownContent[];
    buttonText?: string | null;
    buttonUrl?: string | null;
    audioFile?: string | null;
  };
};

export const ImageWithTextBlock = ({ data }: Props) => {
  const { imageSrc, title, content, buttonText, buttonUrl, audioFile } = data;

  const imagePosition =
    data.imagePosition === "left" || data.imagePosition === "right"
      ? data.imagePosition
      : "right";
  
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-y-8 md:gap-x-4 items-center">
        {/* Text Section (5 cols) */}
        <div className={`col-span-12 lg:col-span-5 xl:col-span-4 order-2 ${imagePosition === "left" ? "lg:col-start-8 xl:col-start-8 lg:order-2" : "lg:col-start-1 xl:col-start-2 lg:order-1"}`}>
          <h2 
            className="text-[32px] font-light leading-[2] mb-6 underline decoration-green-500 underline-offset-3"
            style={{
              textDecorationColor: '#008000',
              textDecorationThickness: '3px',
              textUnderlineOffset: '16px',
            }}
          >
            {title}
          </h2>
          <div className="prose prose-lg mb-6">
            <TinaMarkdown content={content} />
          </div>

          {buttonText && buttonUrl && (
            <a
              href={buttonUrl || ""}
              target={buttonUrl?.includes('mailto') ? "_blank" : undefined}
              className="block text-center w-full py-4 px-5 bg-green text-white"
            >
              {buttonText}
            </a>
          )}

          {audioFile && (
            <div className="my-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Listen</h2>
              <audio 
                controls 
                className="w-full"
                onPlay={() =>
                  window.gtag?.("event", "audio_play", {
                    event_category: "Audio",
                    event_label: audioFile,
                    value: 1,
                  })
                }
              >
                <source src={`https://res.cloudinary.com/dmzgq497q/video/upload/v1747092681/${audioFile}.mp3`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <a
                href={`https://res.cloudinary.com/dmzgq497q/video/upload/v1747092681/${audioFile}.mp3`}
                download
                className="mt-2 inline-block text-sm text-green hover:underline"
                onClick={() =>
                  window.gtag?.("event", "audio_download", {
                    event_category: "Audio",
                    event_label: audioFile,
                    value: 1,
                  })
                }
              >
                Download Audio
              </a>
            </div>
          )}
        </div>

        <div className={`col-span-12 lg:col-span-6 order-1 ${imagePosition === "left" ? "lg:order-1" : "lg:col-start-7 lg:order-2"}`}>
          <div className="relative w-full aspect-1">
            <Image
              src={imageSrc || ""}
              alt={title ?? ""}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageWithTextBlockSchema: Template = {
  name: "ImageWithText",
  label: "Image with Text",
  ui: {
    previewSrc: "/blocks/image-with-text.png",
  },
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
      required: true,
    },
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
      required: true,
    },    
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      required: true,
    }, 
    {
      type: "string",
      label: "Audio File Name",
      name: "audioFile",
      required: false,
      description: "Only enter the filename (no extension). Example: sermon-2025-06-16"
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      ui: {
        component: "text",
      },
      required: false,
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
      required: false,
    },
  ],
};
