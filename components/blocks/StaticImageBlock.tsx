"use client";

import { Template } from 'tinacms';

type Props = {
  data: {
    src: string | null | undefined;
    alt?: string | null;
    fullWidth?: boolean | null;
    secondSrc?: string | null;
    secondAlt?: string | null;
  };
};

export const StaticImageBlock = ({ data }: Props) => {
  const { src, alt, fullWidth, secondSrc, secondAlt } = data;

  // Class for full width or default container class
  const containerClass = fullWidth !== undefined ? (fullWidth ? 'w-full' : 'container') : 'container';
  
  // Check if the second image is provided
  const isDualImage = secondSrc !== undefined && secondSrc !== null;

  return (
    <div className={`${containerClass} flex flex-col md:flex-row ${isDualImage ? 'gap-4 md:gap-8' : ''}`}>
      {/* First Image */}
      <div className={`${isDualImage ? 'md:w-1/2' : ''} w-full h-[400px]`}>
        <img
          src={src || ''}
          alt={alt || 'Static Image'}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Second Image */}
      {isDualImage && (
        <div className="w-full md:w-1/2 h-[400px]">
          <img
            src={secondSrc || ''}
            alt={secondAlt || 'Second Static Image'}
            className="object-cover w-full h-full"
          />
        </div>
      )}
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
    {
      type: 'boolean',
      label: 'Full Width',
      name: 'fullWidth',
      required: false,
    },
    {
      type: 'image',
      label: 'Second Image Source',
      name: 'secondSrc',
      required: false,
    },
    {
      type: 'string',
      label: 'Second Image Alt Text',
      name: 'secondAlt',
      required: false,
    }
  ],
};
