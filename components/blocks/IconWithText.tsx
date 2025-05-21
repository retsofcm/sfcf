'use client';

import React from "react";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type Props = {
  data: {
    heading?: string | null;
    items?: (
      | {
        icon?: string | null;
        title?: string | null;
        description?: TinaMarkdownContent | TinaMarkdownContent[];
        alignment: string | null;
      }
      | null
    )[] | null;
  };
};

export const IconWithTextBlock = ({ data }: Props) => {
  const itemCount = data.items?.filter(Boolean).length ?? 0;
  const columns = Math.min(Math.max(itemCount, 1), 4);
  const gridClass = `grid grid-cols-${columns} gap-8 mt-10`;

  return (
    <section className="container">
      <h2 
        className="text-[24px] md:text-[36px] font-light mb-12 md:mb-12 underline decoration-green-500 underline-offset-3"
        style={{
          textDecorationColor: '#008000',
          textDecorationThickness: '3px',
          textUnderlineOffset: '16px',
        }}
      >
        {data.heading}
        </h2>
      <div className={gridClass}>
        {data.items?.map((item, idx) => {
          if (!item) return null;
          const alignmentClass = item.alignment === 'center' ? 'items-center text-center' : 'items-start text-left';
          return (            
            <div key={idx} className={`flex flex-col gap-3 ${alignmentClass}`}>
              <h3 className="text-lg font-semibold flex items-center gap-3">
                  {item.icon && (
                  <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6"
                      loading="lazy"
                  />
                  )}
                  <span>{item.title}</span>
              </h3>
              <div className="text-gray-700">
                <TinaMarkdown content={item.description ?? []} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}


export const IconWithTextBlockSchema: Template = {
  name: "iconWithText",
  label: "Icon with Text Block",
  ui: {
    previewSrc: '/blocks/icon-with-text.png',
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
    },
    {
      type: "object",
      name: "items",
      label: "Items",
      list: true,
      fields: [
        {
          type: "image",
          name: "icon",
          label: "Icon (SVG upload)",
        },
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "rich-text",
          name: "description",
          label: "Description",
        },
        {
          type: "string",
          name: "alignment",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
      ],
    },
  ],
};