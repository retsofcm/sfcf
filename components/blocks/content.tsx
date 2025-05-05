"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section
      className="prose prose-lg flex flex-col gap-8 max-w-[842px] px-4"
      data-tina-field={tinaField(data, "body")}
    >
      <TinaMarkdown
        content={data.body}
      />
    </Section>
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
      type: "rich-text",
      label: "Body",
      name: "body",
    }
  ],
};
