'use client';
import * as React from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero } from '../../tina/__generated__/types';
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = data.slides?.length || 0;
  const slides = data.slides ?? [];

  React.useEffect(() => {
    if (!totalSlides) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="mx-auto relative with-overlay h-screen overflow-hidden">
      {slides && slides.length > 0 && (
        <AnimatedGroup variants={transitionVariants} className="h-full w-full">
          <SlideBlock slide={slides[currentSlide]} />
        </AnimatedGroup>
      )}

      <div className="absolute inset-0 w-full px-4 md:px-20 py-16 z-10">
        <div className="relative h-full max-w-7xl m-auto flex flex-col md:flex-row md:justify-between md:items-end">
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
                      {data.tagline}
                    </TextEffect>
                  </div>
                )}
              </div>
            )}
          </div>

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

      {slides?.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const SlideBlock = ({ slide }: { slide: PageBlocksHero['slides'][0] }) => {
  const videoSrc = slide?.videoSrc;
  const imageSrc = slide?.imageSrc;
  const mobileImageSrc = slide?.mobileImageSrc;
  const alt = slide?.alt ?? 'Hero Slide';

  const isVideo = !!videoSrc && !imageSrc && !mobileImageSrc;

  if (isVideo) {
    return (
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <>
      {mobileImageSrc && (
        <Image
          className="absolute inset-0 h-full w-full object-cover z-0 block md:hidden"
          alt={alt}
          src={mobileImageSrc}
          height={4000}
          width={3000}
        />
      )}
      {imageSrc && (
        <Image
          className={`absolute inset-0 h-full w-full object-cover z-0 ${mobileImageSrc ? 'hidden md:block' : 'block'}`}
          alt={alt}
          src={imageSrc}
          height={4000}
          width={3000}
        />
      )}
    </>
  );
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
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
      label: 'Slides',
      name: 'slides',
      list: true,
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
