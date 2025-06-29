import { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { pageTitleSchema } from '@/components/blocks/pageTitle';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventCollageBlockSchema } from "@/components/blocks/event-collage";
import { staticImageBlockSchema } from "@/components/blocks/StaticImageBlock";
import { ImageWithTextBlockSchema } from "@/components/blocks/ImageWithText";
import { IconWithTextBlockSchema } from "@/components/blocks/IconWithText";
import { footerHeroBlockSchema } from '@/components/blocks/footer-hero';
import { GoogleMapBlockSchema } from "@/components/blocks/GoogleMapBlock";
import { AccordionBlockSchema } from "@/components/blocks/Accordion";
import { CalendarBlockSchema } from "@/components/blocks/Calendar";
import { TeamMembersBlockSchema } from '@/components/blocks/TeamMembers';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  defaultItem: () => {
    return {
      blocks: [],
    };
  },
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      return filepath === 'home' ? '/' : `/${filepath}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "metaTitle",
      label: "Meta Title",
    },
    {
      type: "string",
      name: "metaDescription",
      label: "Meta Description",
      ui: {
        component: "textarea",
      },
    },
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
        pageTitleSchema,
        eventCollageBlockSchema,
        staticImageBlockSchema,
        ImageWithTextBlockSchema,
        IconWithTextBlockSchema,
        contentBlockSchema,
        footerHeroBlockSchema,
        GoogleMapBlockSchema,
        AccordionBlockSchema,
        CalendarBlockSchema,
        TeamMembersBlockSchema,
      ],
    },
  ],
};

export default Page;
