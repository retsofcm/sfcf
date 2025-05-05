'use client';

import React from "react";
import { Template } from "tinacms";

type Props = {
  data: {
    heading?: string | null;
    items?: (
      | {
        icon?: string | null;
        title?: string | null;
        description?: string | null;
      }
      | null
    )[] | null;
  };
};
  

export const IconWithTextBlock = ({ data }: Props) => {
  return (
    <section className="container py-10 md:py-20">
      <h2 
        className="text-[24px] md:text-[36px] font-light mb-12 md:mb-12 underline decoration-green-500 underline-offset-3"
        style={{
          textDecorationColor: '#028103',
          textDecorationThickness: '3px',
          textUnderlineOffset: '16px',
        }}
      >
        {data.heading}
        </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.items?.map((item, idx) => (
          (item ?
            <div key={idx} className="flex flex-col gap-3">
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
                <p className="text-gray-700">{item.description}</p>
            </div>
          : null)
        ))}
      </div>
    </section>
  );
}


export const IconWithTextBlockSchema: Template = {
  name: "iconWithText",
  label: "Icon with Text Block",
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
          type: "string",
          name: "description",
          label: "Description",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};