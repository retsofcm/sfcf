"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <section className="flex flex-col mx-auto px-4 md:px-0 prose prose-lg">
      {data.heading && (
        <h2 
          className="text-[32px] font-light leading-[2] mb-6 underline decoration-green-500 underline-offset-3"
          data-tina-field={tinaField(data, "heading")}
          style={{
            textDecorationColor: '#008000',
            textDecorationThickness: '3px',
            textUnderlineOffset: '16px',
          }}
        >
          {data.heading}
        </h2>
      )}
      <div
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown
          content={data.body}
        />
      </div>
    </section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Rich Text",
  ui: {
    previewSrc: "/blocks/rich-text.png",
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    }
  ],
};
