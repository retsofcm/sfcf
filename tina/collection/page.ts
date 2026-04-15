import { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { pageTitleSchema } from '@/components/blocks/page-title';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventCollageBlockSchema } from "@/components/blocks/event-collage";
import { staticImageBlockSchema } from "@/components/blocks/static-image-block";
import { ImageWithTextBlockSchema } from "@/components/blocks/image-with-text";
import { IconWithTextBlockSchema } from "@/components/blocks/icon-with-text";
import { footerHeroBlockSchema } from '@/components/blocks/footer-hero';
import { GoogleMapBlockSchema } from "@/components/blocks/google-map-block";
import { AccordionBlockSchema } from "@/components/blocks/accordion";
import { CalendarBlockSchema } from "@/components/blocks/calendar";
import { TeamMembersBlockSchema } from '@/components/blocks/team-members';
import { LatestHighlightBlockSchema } from '@/components/blocks/latest-highlight';


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
        LatestHighlightBlockSchema,
      ],


    },
  ],
};

export default Page;
