"use client";

import Image from "next/image";
import { TinaField } from "tinacms";

type Props = {
  data: {
    src: string;
    alt?: string;
  };
};

export const StaticImageBlock = ({ data }: Props) => {
  return (
    <div className="relative w-full h-[560px]">
      {/* Static background image */}
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${data.src})`,
          backgroundColor: "white", // white background color for empty space
        }}
        aria-label={data.alt}
      />
    </div>
  );
};

export const staticImageBlockSchema: TinaField = {
  type: "object",
  label: "Static Image",
  name: "staticImage",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "src",
    },
    {
      type: "string",
      label: "Alt Text",
      name: "alt",
    },
  ],
};
