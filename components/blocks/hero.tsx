'use client';
import * as React from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero, PageBlocksHeroImageOrVideo } from '../../tina/__generated__/types';
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

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const headline = data.headline || ''; // Default to an empty string if headline is undefined

  return (
    <section className="mx-auto relative with-overlay">
      {data.imageOrVideo && (
        <AnimatedGroup variants={transitionVariants}>
          <ImageBlock image={data.imageOrVideo} />
        </AnimatedGroup>
      )}

      <div className="absolute bottom-16 left-20 max-w-7xl w-full">
        {data.headline && (
          <div
            data-tina-field={tinaField(data, 'headline')}
            className="text-white text-[64px] leading-tight whitespace-pre-line"
          >
            <TinaMarkdown content={data.headline} />
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, 'tagline')}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mt-6 max-w-2xl text-white text-xl leading-[36px]">
              {data.tagline!}
            </TextEffect>
          </div>
        )}
      </div>
    </section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImageOrVideo }) => {
  // Check if the uploaded file is a video or an image
  const isVideo = image?.videoSrc && !image?.imageSrc;

  if (isVideo) {
    return (
      <video className="inset-0 w-full h-screen object-cover z-0" autoPlay loop muted>
        <source src={image.videoSrc} type="video/mp4" />
        <source src={image.videoSrc} type="video/webm" />
        <source src={image.videoSrc} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (image?.imageSrc) {
    return (
      <Image
        className="inset-0 w-full h-screen object-cover z-0"
        alt={image.alt || 'Hero Image'}
        src={image.imageSrc}
        height={4000}
        width={3000}
      />
    );
  }

  return null; // In case no valid image or video is provided
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
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
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
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
