"use client";

import { Template } from 'tinacms';

type Props = {
  data: {
    src: string | null | undefined;
    alt?: string;
  };
};

export const StaticImageBlock = ({ data }: Props) => {
  const imageUrl = data.src ?? '';

  return (
    <div className="relative w-full h-[560px]">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        aria-label={data.alt || 'Static Image'} // Fallback for alt text
      />
    </div>
  );
};

export const staticImageBlockSchema: Template = {
  name: 'staticImageBlock',
  label: 'Static Image Block',
  ui: {
    previewSrc: '/blocks/static-image.png',
  },
  fields: [
    {
      type: 'image',
      label: 'Image Source',
      name: 'src',
      required: true,
    },
    {
      type: 'string',
      label: 'Alt Text',
      name: 'alt',
      required: false,
    },
  ],
};
