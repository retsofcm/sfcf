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
  console.log(data); // Log the data object

  return (
    <section className="mx-auto relative with-overlay h-screen overflow-hidden">
      {data.imageOrVideo && (
        <AnimatedGroup variants={transitionVariants} className="h-full w-full">
          <ImageBlock image={data.imageOrVideo} />
        </AnimatedGroup>
      )}

      <div className="absolute inset-0 w-full px-4 md:px-20 py-16 z-10">
        <div className="relative h-full max-w-7xl m-auto flex flex-col md:flex-row md:justify-between md:items-end">
          {/* Centered headline + tagline (mobile) */}
          <div className="flex-1 flex items-center justify-center md:block px-4 md:px-0 text-center md:text-left">
            {(data.headline || data.tagline) && (
              <div>
                {data.headline && (
                  <div
                    data-tina-field={tinaField(data, 'headline')}
                    className="text-white font-light text-[32px] md:text-[64px] leading-tight whitespace-pre-line"
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
                      className="mt-2 md:mt-6 max-w-2xl text-white md:text-xl md:leading-[36px]">
                      {data.tagline!}
                    </TextEffect>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom-pinned date block (mobile), bottom-right on desktop */}
          {(data.day || data.time || data.location) && (
            <div className="absolute bottom-4 left-4 right-4 text-center md:static md:self-end md:mb-4 md:mr-0 md:text-right">
              <div className="text-white">
                {data.day && (
                  <div data-tina-field={tinaField(data, 'day')}>
                    <p className="text-green font-black uppercase text-[20px]">{data.day}</p>
                  </div>
                )}
                {data.time && (
                  <div data-tina-field={tinaField(data, 'time')}>
                    <p className="text-green font-black text-[20px]">{data.time}</p>
                  </div>
                )}
                {data.location && (
                  <div data-tina-field={tinaField(data, 'location')} className="mt-3 text-[16px]">
                    {data.location.split(',').map((part, index) => (
                      <div key={index}>{part.trim()}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImageOrVideo }) => {
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

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Stenson Fields Christian Fellowship",
      headline: 'Rooted in Truth. Reaching in Love.',
      day: 'Sunday',
      time: '10:45am & 6pm',
      location: 'Pilgrims Way, Stenson Fields, DE24 3JG',
    },
  },
  fields: [
    {
      type: 'rich-text',
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
    {
      type: 'string',
      label: 'Day',
      name: 'day',
    },
    {
      type: 'string',
      label: 'Time',
      name: 'time',
    },
    {
      type: 'string',
      label: 'Location',
      name: 'location',
    },    
  ],
};
