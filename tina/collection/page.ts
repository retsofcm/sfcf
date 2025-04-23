import { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventCollageBlockSchema } from "@/components/blocks/event-collage";
import { staticImageBlockSchema } from "@/components/blocks/StaticImageBlock";
import { parallaxImageBlockSchema } from "@/components/blocks/ParallaxImageBlock";
import { ImageTextSignupBlockSchema } from "@/components/blocks/image-text-signup-block";
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { footerHeroBlockSchema } from '@/components/blocks/footer-hero';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        eventCollageBlockSchema,
        staticImageBlockSchema,
        parallaxImageBlockSchema,
        ImageTextSignupBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        footerHeroBlockSchema,
      ],
    },
  ],
};

export default Page;
