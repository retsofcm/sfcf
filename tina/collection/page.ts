import { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventCollageBlockSchema } from "@/components/blocks/event-collage";
import { staticImageBlockSchema } from "@/components/blocks/StaticImageBlock";
import { parallaxImageBlockSchema } from "@/components/blocks/ParallaxImageBlock";
import { ImageTextSignupBlockSchema } from "@/components/blocks/image-text-signup-block";
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
        eventCollageBlockSchema,
        staticImageBlockSchema,
        parallaxImageBlockSchema,
        ImageTextSignupBlockSchema,
        contentBlockSchema,
        footerHeroBlockSchema,
      ],
    },
  ],
};

export default Page;
