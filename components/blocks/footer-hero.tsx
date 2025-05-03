'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksFooter_Hero, PageBlocksFooter_HeroImageOrVideo } from '../../tina/__generated__/types';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export const FooterHero = ({ data }: { data: PageBlocksFooter_Hero }) => {
  const headline = data.headline || ''; // Default to an empty string if headline is undefined

  return (
    <section className="grid mx-auto relative with-overlay h-[236px] overflow-hidden">
      {data.imageOrVideo && (
        <AnimatedGroup variants={transitionVariants} className="h-full w-full col-start-1 row-start-1">
          <ImageBlock image={data.imageOrVideo} />
        </AnimatedGroup>
      )}

      <div className="max-w-7xl w-full px-4 md:px-0 z-10 col-start-1 row-start-1 flex flex-col md:flex-row justify-between items-center m-auto">
        {data.headline && (
          <div
            data-tina-field={tinaField(data, 'headline')}
            className="text-white text-[32px] md:text-[48px] text-center md:text-left leading-tight whitespace-pre-line"
          >
            <TinaMarkdown content={data.headline} />
          </div>
        )}

        <AnimatedGroup variants={transitionVariants} containerClassName="block mt-6 md:mt-0">
          {data.actions?.map(action => (
            <Link
              key={action!.label}
              href={action!.link!}
              data-tina-field={tinaField(action)}
              className="block py-5 px-6 border text-white"
            >
              {action!.label}
            </Link>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksFooter_HeroImageOrVideo }) => {
  const videoSrc = image?.videoSrc ?? undefined;
  const imageSrc = image?.imageSrc ?? undefined;
  const alt = image?.alt ?? 'Hero Image';

  const isVideo = !!videoSrc && !imageSrc;

  if (isVideo) {
    return (
      <video className="inset-0 w-full object-cover z-0" autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (imageSrc) {
    return (
      <Image
        className="inset-0 h-full w-full object-cover z-0"
        alt={alt}
        src={imageSrc}
        height={4000}
        width={3000}
      />
    );
  }

  return null;
};

export const footerHeroBlockSchema: Template = {
  name: 'footer_hero',
  label: 'Footer Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    {
      type: 'rich-text', // Changed to 'rich-text' to allow rich text input
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
          type: 'image',  // This is for image files
        },
        {
          name: 'videoSrc',
          label: 'Video Source',
          type: 'string',  // This is for video file URLs or paths
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
