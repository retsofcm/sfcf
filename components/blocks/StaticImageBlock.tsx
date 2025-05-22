"use client";

import { Template } from 'tinacms';

type Props = {
  data: {
    src: string | null | undefined;
    mobileSrc?: string | null;
    alt?: string | null;
    fullWidth?: boolean | null;
    secondSrc?: string | null;
    mobileSecondSrc?: string | null;
    secondAlt?: string | null;
  };
};

export const StaticImageBlock = ({ data }: Props) => {
  const { src, mobileSrc, alt, fullWidth, secondSrc, mobileSecondSrc, secondAlt } = data;

  const containerClass = fullWidth !== undefined ? (fullWidth ? 'w-full' : 'container') : 'container';
  const isDualImage = secondSrc !== undefined && secondSrc !== null;

  return (
    <div className={`${containerClass} flex flex-col md:flex-row ${isDualImage ? 'gap-4 md:gap-8' : ''}`}>
      {/* First Image: Mobile */}
      {mobileSrc && (
        <div className={`${isDualImage ? 'md:w-1/2' : ''} w-full h-[400px] block md:hidden`}>
          <img src={mobileSrc} alt={alt || 'Static Image'} className="object-cover w-full h-full" />
        </div>
      )}

      {/* First Image: Desktop */}
      {src && (
        <div className={`${isDualImage ? 'md:w-1/2' : ''} w-full h-[400px] ${mobileSrc ? 'hidden md:block' : ''}`}>
          <img src={src} alt={alt || 'Static Image'} className="object-cover w-full h-full" />
        </div>
      )}

      {/* Second Image: Mobile */}
      {isDualImage && mobileSecondSrc && (
        <div className="w-full md:w-1/2 h-[400px] block md:hidden">
          <img src={mobileSecondSrc} alt={secondAlt || 'Second Static Image'} className="object-cover w-full h-full" />
        </div>
      )}

      {/* Second Image: Desktop */}
      {isDualImage && secondSrc && (
        <div className={`w-full md:w-1/2 h-[400px] ${mobileSecondSrc ? 'hidden md:block' : ''}`}>
          <img src={secondSrc} alt={secondAlt || 'Second Static Image'} className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  );
};

export const staticImageBlockSchema: Template = {
  name: 'staticImageBlock',
  label: 'Image Block',
  ui: {
    previewSrc: '/blocks/image-block.png',
  },
  fields: [
    {
      type: 'image',
      label: 'Image Source',
      name: 'src',
      required: true,
    },
    {
      type: 'image',
      label: 'Mobile Image Source',
      name: 'mobileSrc',
      required: false,
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
      type: 'image',
      label: 'Mobile Second Image Source',
      name: 'mobileSecondSrc',
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
