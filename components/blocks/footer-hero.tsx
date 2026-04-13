'use client';
import * as React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksFooter_Hero } from '../../tina/__generated__/types';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { transitionVariants } from '@/lib/animation-variants';
import { MediaBlock } from '@/components/ui/media-block';

export const FooterHero = ({ data }: { data: PageBlocksFooter_Hero }) => {
  return (
    <section className="grid mx-auto relative with-overlay overflow-hidden">
      {data.imageOrVideo && (
        <AnimatedGroup variants={transitionVariants} containerClassName="h-[inherit] w-full col-start-1 row-start-1">
          <MediaBlock
            imageSrc={data.imageOrVideo.imageSrc}
            mobileImageSrc={data.imageOrVideo.mobileImageSrc}
            videoSrc={data.imageOrVideo.videoSrc}
            alt={data.imageOrVideo.alt ?? 'Hero Image'}
            imageHeight={236}
            imageWidth={1440}
            className="h-[236px] object-center"
          />
        </AnimatedGroup>
      )}

      <div className="container w-full z-10 col-start-1 row-start-1 flex flex-col lg:flex-row justify-between items-center m-auto">
        {data.headline && (
          <div
            data-tina-field={tinaField(data, 'headline')}
            className="text-white text-[32px] lg:text-[48px] text-center lg:text-left leading-tight whitespace-pre-line"
          >
            <TinaMarkdown content={data.headline} />
          </div>
        )}

        <AnimatedGroup variants={transitionVariants} containerClassName="block mt-6 lg:mt-0">
          {data.actions?.map(action => (
            <Link
              key={action?.label}
              href={action?.link ?? '/'}
              data-tina-field={tinaField(action)}
              target={action?.link?.includes('mailto') ? "_blank" : undefined}
              className="block py-5 px-6 border text-white"
            >
              {action?.label}
            </Link>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
};

export const footerHeroBlockSchema: Template = {
  name: 'footer_hero',
  label: 'Footer Hero',
  ui: {
    previewSrc: '/blocks/footer-hero.png',
  },
  fields: [
    {
      type: 'rich-text',
      label: 'Headline',
      name: 'headline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      required: false,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        {
          label: 'Link',
          name: 'link',
          type: 'string'
        },
      ],
    },
    {
      type: 'object',
      label: 'Image or Video',
      name: 'imageOrVideo',
      fields: [
        {
          name: 'imageSrc',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'mobileImageSrc',
          label: 'Mobile Image Source',
          type: 'image',
        },
        {
          name: 'videoSrc',
          label: 'Video Source',
          type: 'string',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
      ],
    },
  ],
};
