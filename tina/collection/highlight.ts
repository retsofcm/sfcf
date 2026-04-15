import { Collection } from 'tinacms';

const Highlight: Collection = {
  label: "Highlights",
  name: "highlight",
  path: "content/highlights",
  format: "mdx",
  defaultItem: () => {
    return {
      date: new Date().toISOString(),
    };
  },
  ui: {
    router: ({ document }) => {
      return `/highlights/${document._sys.breadcrumbs.join("/")}`;
    },
  },

  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
      ui: {
        component: "hidden",
      },
    },
    {
      type: "image",
      label: "Image",
      name: "image",
      required: true,
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      isBody: true,
      required: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
      required: false,
    },
  ],
};


export default Highlight;

