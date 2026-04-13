"use client";

import { Template } from 'tinacms';

type ImageData = {
  src?: string | null;
  mobileSrc?: string | null;
  alt?: string | null;
};

type Props = {
  data: {
    fullWidth?: boolean | null;
    images?: (ImageData | null)[] | null;
  };
};

export const StaticImageBlock = ({ data }: Props) => {
  const { fullWidth, images = [] } = data;

  const containerClass = fullWidth ? 'w-full' : 'container';
  const validImages = images?.filter(img => img?.src || img?.mobileSrc);
  const isSingleImage = validImages?.length === 1;

  return (
    <div className={`${containerClass}`}>
      <div
        className={`grid ${
          isSingleImage ? '' : 'md:grid-cols-2'
        } gap-4 md:gap-8`}
      >
        {validImages?.map((img, idx) => (
          <div key={idx} className="h-[400px] w-full">
            <picture>
              {img?.mobileSrc && (
                <source
                  srcSet={img?.mobileSrc}
                  media="(max-width: 767px)"
                />
              )}
              <img
                src={img?.src || img?.mobileSrc || ''}
                alt={img?.alt || ''}
                className="object-cover w-full h-full"
              />
            </picture>
          </div>
        ))}
      </div>
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
      type: 'boolean',
      label: 'Full Width',
      name: 'fullWidth',
    },
    {
      type: 'object',
      name: 'images',
      label: 'Images',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.alt || item?.src?.split('/').pop() || 'Image',
        }),
      },
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Desktop Image',
        },
        {
          type: 'image',
          name: 'mobileSrc',
          label: 'Mobile Image',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Alt Text',
        },
      ],
    },
  ],
};