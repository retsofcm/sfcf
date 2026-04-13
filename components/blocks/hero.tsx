'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero } from '../../tina/__generated__/types';
import { TextEffect } from '../motion-primitives/text-effect';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { MediaBlock } from '@/components/ui/media-block';

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const totalSlides = data.slides?.length || 0;
  const slides = (data.slides ?? []).filter(
    (s): s is NonNullable<typeof s> => s != null
  );

  const goToSlide = React.useCallback((index: number) => {
    let newDirection = index > currentSlide ? 1 : -1;

    // Exception: Wrap-around forward (last to first)
    if (currentSlide === totalSlides - 1 && index === 0) {
      newDirection = 1;
    }
    // Exception: Wrap-around backward (first to last)
    if (currentSlide === 0 && index === totalSlides - 1) {
      newDirection = -1;
    }

    setDirection(newDirection);
    setCurrentSlide(index);
  }, [currentSlide, totalSlides]);

  React.useEffect(() => {
    if (!totalSlides) return;
    const interval = setInterval(() => {
      setDirection(1); // Auto-play always goes forward
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, currentSlide]); // Resets timer when manually changed

  return (
    <section className="mx-auto relative with-overlay h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {slides && slides.length > 0 && (
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? '125vw' : '-125vw',
                scale: 1.5,
              }),
              center: {
                zIndex: 0,
                x: 0,
                scale: 1,
              },
              exit: (direction: number) => ({
                zIndex: -1,
                x: direction < 0 ? '20vw' : '-20vw',
                scale: 1,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { duration: 1.0, ease: 'easeInOut' },
              scale: { duration: 1.0, ease: 'easeInOut' },
            }}
            className="absolute inset-0 h-full w-full"
          >
            <MediaBlock
              imageSrc={slides[currentSlide]?.imageSrc}
              mobileImageSrc={slides[currentSlide]?.mobileImageSrc}
              videoSrc={slides[currentSlide]?.videoSrc}
              alt={slides[currentSlide]?.alt}
              className="absolute"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 w-full px-4 lg:px-20 py-16 z-10">
        <div className="relative h-full max-w-7xl m-auto flex flex-col lg:flex-row lg:justify-between lg:items-end">
          <div className="flex-1 flex items-center justify-center lg:block px-4 lg:px-0 text-center lg:text-left">
            {(data.headline || data.tagline) && (
              <div>
                {data.headline && (
                  <div
                    data-tina-field={tinaField(data, 'headline')}
                    className="text-white font-light text-[32px] lg:text-[64px] leading-tight whitespace-pre-line prose-h1:text-[32px] lg:prose-h1:text-[64px] prose-h1:my-0 prose-p:my-0"
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
                      className="mt-2 lg:mt-6 max-w-2xl text-white lg:text-xl lg:leading-[36px]">
                      {data.tagline}
                    </TextEffect>
                  </div>
                )}
              </div>
            )}
          </div>

          {(data.day || data.time || data.location) && (
            <div className="absolute bottom-4 left-4 right-4 text-center lg:static lg:self-end lg:mb-4 lg:mr-0 lg:text-right">
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
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hidden preloading layer to prevent grey flashes on transition */}
      <div className="hidden" aria-hidden="true">
        {slides.map((s, i) => (
          <React.Fragment key={i}>
            {s.imageSrc && <img src={s.imageSrc} alt="" />}
            {s.mobileImageSrc && <img src={s.mobileImageSrc} alt="" />}
          </React.Fragment>
        ))}
      </div>
    </section>
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
