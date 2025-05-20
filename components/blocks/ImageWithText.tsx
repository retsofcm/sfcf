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
  };
};

export const ImageWithTextBlock = ({ data }: Props) => {
  const { imageSrc, title, content, buttonText, buttonUrl } = data;

  const imagePosition =
    data.imagePosition === "left" || data.imagePosition === "right"
      ? data.imagePosition
      : "right";
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 md:gap-4 items-center">
        {/* Text Section (5 cols) */}
        <div className={`col-span-12 lg:col-span-4  order-2 ${imagePosition === "left" ? "lg:col-start-8 lg:order-2" : "lg:col-start-2 lg:order-1"}`}>
          <h2 
            className="text-[32px] font-light leading-[1.5] mb-6 underline decoration-green-500 underline-offset-3"
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

          <button
            type="submit"
            className="w-full py-4 px-5 bg-green text-white"
          >
            {buttonText}
          </button>
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
      type: "boolean",
      name: "enableForm",
      label: "Enable Form",
      required: false,
      ui: {
        defaultValue: true,
      },
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
