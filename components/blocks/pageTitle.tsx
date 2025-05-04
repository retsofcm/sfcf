"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Template } from "tinacms";

interface Props {
  data: {
    pageTitle: string;
    pageDescription: any;
  };
}

export const PageTitleBlock = ({ data }: Props) => {
  console.log("PageTitleBlock data:", data); // 👈 Add this

  return (
    <>
      <h1 className="text-[32px] md:text-[48px] font-light mb-2 md:mb-4">
        {data.pageTitle} {/* This is the field mapped from the schema */}
      </h1>
      <div className="mb-10 md:mb-20">
        {/* Render the rich text content (pageDescription) here */}
        <TinaMarkdown content={data.pageDescription} />
      </div>
    </>
  );
};

export const pageTitleSchema: Template = {
  name: "pageTitle",
  label: "Page Title & Description",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "pageTitle",
      required: true,
    },
    {
      type: "rich-text",
      label: "Description",
      name: "pageDescription",
      required: true,
    },
  ],
};
